import { ApiPromise, HttpProvider } from '@polkadot/api';
import { ExtrinsicPayloadValue } from '@polkadot/types/types';
import { useConnectionStore } from './connection';
import { useWalletEnvStore } from './wallet-env';
import { isElectron } from '@main/helpers/is-electron';
import isOnline from 'is-online';

export type TxStatus =
  | 'idle'
  | 'preparing'
  | 'pending-confirmation'
  | 'executing'
  | 'success'
  | 'error';

export type OnFinishData = {
  status: TxStatus;
  errorMsg?: string;
  blockHash?: string;
};

export enum ExtrinsicModule {
  TokenManager = 'tokenManager',
  WorkerNodePallet = 'workerNodePallet',
}

export enum ExtrinsicMethod {
  ScheduleDirectLower = 'scheduleDirectLower',
  SubscribeToSolutionGroup = 'subscribeToSolutionGroup',
  UnsubscribeFromSolutionGroup = 'unsubscribeFromSolutionGroup',
  SignupWorkerNodeOperator = 'signupWorkerNodeOperator',
  ClaimRewards = 'claimRewards',
  ConnectWorkerNode = 'connectWorkerNode',
  TopupStake = 'topUpStake',
  DisconnectWorkerNode = 'disconnectWorkerNode',
}

type PalletTransactionArgs = {
  extrinsicModule: ExtrinsicModule;
  extrinsicMethod: ExtrinsicMethod;
  payload: unknown[];
  setStatus: (status: TxStatus) => void;
  onFinish: (data: OnFinishData) => void;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const executePalletTransaction = async ({
  extrinsicModule,
  extrinsicMethod,
  payload,
  setStatus,
  onFinish,
}: PalletTransactionArgs) => {
  let apiRef: ApiPromise | undefined;

  try {
    const { isConnected, addressEWX, session, client } = useConnectionStore.getState();
    const { walletConst } = useWalletEnvStore.getState();

    setStatus('preparing');

    const api = await ApiPromise.create({
      provider: new HttpProvider(walletConst.ewxRpc),
    });
    apiRef = api;
    const lastHeader = await api.rpc.chain.getHeader();
    const blockNumber = api.registry.createType('BlockNumber', lastHeader.number.toNumber());

    if (!isConnected || !session) {
      throw new Error('Session is not connected');
    }

    if (!client || !addressEWX) {
      throw new Error('Client not initialized');
    }

    const balance = await api.query.system.account<any>(addressEWX);
    const tx = api.tx[extrinsicModule][extrinsicMethod](...payload);
    const method = api.createType('Call', tx);
    const era = api.registry.createType('ExtrinsicEra', {
      current: lastHeader.number.toNumber(),
      period: 64,
    });
    const accountNonce = +balance.nonce.toHuman();
    const nonce = api.registry.createType('Compact<Index>', accountNonce);
    const unsignedTransaction = {
      specVersion: api.runtimeVersion.specVersion.toHex(),
      transactionVersion: api.runtimeVersion.transactionVersion.toHex(),
      address: addressEWX,
      blockHash: lastHeader.hash.toHex(),
      blockNumber: blockNumber.toHex(),
      era: era.toHex(),
      genesisHash: api.genesisHash.toHex(),
      method: method.toHex(),
      nonce: nonce.toHex(),
      signedExtensions: api.registry.signedExtensions,
      tip: api.registry.createType('Compact<Balance>', 0).toHex(),
      version: tx.version,
    };

    setStatus('pending-confirmation');
    const result: { signature: Uint8Array | `0x${string}` } | void = await Promise.race([
      client.request({
        chainId: `polkadot:${walletConst.ewxChainId}`,
        topic: session.topic,
        request: {
          method: 'polkadot_signTransaction',
          params: {
            address: addressEWX,
            transactionPayload: unsignedTransaction,
          },
        },
      }) as Promise<{ signature: Uint8Array | `0x${string}` }>,
      (async () => {
        let isInternet = await isOnline();
        /**
         * on Electron app it should just do a while loop until approved in wallet (no breaking change)
         * on Web app it's going to stop when there's no internet connection and this would resolve Promise.race with undefined
         */
        while (isInternet || isElectron()) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          isInternet = await isOnline();
        }

        if (!isInternet && !isElectron) {
          return;
        }
      })(),
    ]);

    if (!result) {
      const errorMsg = 'Waiting for approval failed - no internet';
      console.error(errorMsg);
      onFinish({ status: 'error', errorMsg });
      return;
    }

    setStatus('executing');

    const rawUnsignedTransaction = api.registry.createType(
      'ExtrinsicPayload',
      unsignedTransaction,
      {
        version: tx.version,
      },
    ) as unknown as Uint8Array | `0x${string}` | ExtrinsicPayloadValue;

    tx.addSignature(addressEWX, result.signature, rawUnsignedTransaction);

    // eslint-disable-next-line
    await new Promise<void>(async (resolve, reject) => {
      try {
        await tx.send(async (data) => {
          let check = true;
          let isTxFailed = false;
          let errorMsg;
          let blockHash;
          // looping to find match transaction id in new header block, to determine transaction succeeded/failed
          while (check) {
            // retrieve the latest block
            const signedBlock = await api.rpc.chain.getBlock().catch(() => undefined);
            if (!signedBlock) continue;
            const lastHdr = signedBlock.block.header;
            const extrinsicHash = data.toHuman();
            await Promise.all(
              signedBlock.block.extrinsics.map(async (ex, index) => {
                if (extrinsicHash !== ex.hash.toHex()) return;

                blockHash = lastHdr.hash.toHex();

                const apiAt = await api.at(blockHash);
                const allRecords = await apiAt.query.system.events();

                allRecords
                  // @ts-expect-error
                  .filter(({ phase }) => phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index))
                  .forEach(({ event }) => {
                    if (!api.events.system.ExtrinsicFailed.is(event)) return;

                    const [dispatchError] = event.data;
                    // @ts-expect-error
                    if (dispatchError.isModule) {
                      // @ts-expect-error
                      const decoded = api.registry.findMetaError(dispatchError.asModule);
                      errorMsg = `${decoded.section}.${decoded.name}`;
                      if (decoded.section !== extrinsicModule) return;
                      isTxFailed = true;
                      check = false;
                    } else {
                      errorMsg = dispatchError.toString();
                      isTxFailed = true;
                      check = false;
                    }
                  });
                check = false;
              }),
            );

            await sleep(+walletConst.requestEwxSleep);
          }

          if (isTxFailed) {
            setStatus('error');
            onFinish({ status: 'error', errorMsg });
          } else {
            setStatus('success');
            onFinish({ status: 'success', blockHash });
          }
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.error(error);
    const errorMsg = (error as Error).message || 'Unknown error';
    onFinish({ status: 'error', errorMsg });
  } finally {
    await apiRef?.disconnect();
  }
};

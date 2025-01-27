import { create } from 'zustand';
import { sanitizeHex } from '@walletconnect/encoding';
import { BN } from 'bn.js';
import Web3 from 'web3';
import { useConnectionStore } from './connection';
import { TxStatus, OnFinishData } from './tx';
import { useWalletEnvStore } from './wallet-env';
import { useBalanceStore } from './balance';
import { isElectron } from '@main/helpers/is-electron';
import isOnline from 'is-online';

export const MIN_LIFTING_AMOUNT = '10';

type LiftingStore = {
  status: TxStatus;
  lift: (
    receiverAddress: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => Promise<void>;
  reset: () => void;
};

export const useLiftingStore = create<LiftingStore>((set) => ({
  status: 'idle',
  lift: async (
    receiverAddress: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => {
    try {
      const { client, sessionEWC } = useConnectionStore.getState();
      const { walletConst } = useWalletEnvStore.getState();
      const { setBalanceEWC } = useBalanceStore.getState();

      if (!sessionEWC) {
        throw new Error('No EWC session');
      }

      if (!client) {
        throw new Error('Client not initialized');
      }

      if (amount < Number(MIN_LIFTING_AMOUNT)) {
        set({ status: 'error' });
        throw new Error('Amount is less than the minimum');
      }

      set({ status: 'preparing' });

      const httpProvider = new Web3.providers.HttpProvider(walletConst.ewcRpc);
      const web3 = new Web3(httpProvider);
      const ftsmContract = new web3.eth.Contract(walletConst.abi, walletConst.smartContract);
      const transactionData = ftsmContract.methods.liftEWT(sanitizeHex(receiverAddress));
      const receiver = walletConst.smartContract;
      const value = Web3.utils.toWei(amount.toString(), 'ether');
      const senderAddress = String(sessionEWC.namespaces.eip155.accounts[0].split(':')[2]);
      const available = await web3.eth.getBalance(senderAddress);
      const availableBN = new BN(available);
      const valueBN = new BN(value);
      const balance = {
        token: web3.utils.fromWei(available, 'ether'),
        base: available,
        symbol: 'VT',
      };
      setBalanceEWC(balance);

      if (availableBN.lt(valueBN)) {
        set({ status: 'error' });
        throw new Error('Insufficient funds');
      }
      const tx = {
        from: senderAddress,
        to: receiver,
        data: transactionData.encodeABI(),
        gasPrice: 200000000000, //This avoids gas price spikes on Goerli
        value: value,
        nonce: Web3.utils.toHex(await web3.eth.getTransactionCount(senderAddress)),
      };
      set({ status: 'pending-confirmation' });

      const ewcTxn = await Promise.race([
        client.request({
          chainId: `eip155:${walletConst.ewcChainId}`,
          topic: sessionEWC.topic,
          request: {
            method: 'eth_sendTransaction',
            params: [tx],
          },
        }) as Promise<string>,
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

      if (!ewcTxn) {
        set({ status: 'error' });
        onFinish({ status: 'error', errorMsg: 'Waiting for approval failed - no internet' });
        return;
      }

      set({ status: 'executing' });
      // TODO: Check if the transaction was successful
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ status: 'success' });
      onFinish({ status: 'success', blockHash: ewcTxn });
    } catch (error) {
      let errorMsg;
      if (error instanceof Error) {
        errorMsg = error.message;
      } else if (typeof error === 'object' && error?.['message']) {
        errorMsg = error['message'];
      } else {
        errorMsg = 'An unknown error occurred';
      }

      set({ status: 'error' });
      onFinish({ status: 'error', errorMsg });
      console.error(error);
    }
  },
  reset: () => set({ status: 'idle' }),
}));

import { create } from 'zustand';
import { u8aToHex, hexToU8a } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { BN } from 'bn.js';
import Web3 from 'web3';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';
import { useConnectionStore } from './connection';
import { useWalletEnvStore } from './wallet-env';
import { useBalanceStore } from './balance';

export const MIN_LOWERING_AMOUNT = '1';

type LoweringStore = {
  status: TxStatus;
  lower: (
    receiverAddress: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => Promise<void>;
  reset: () => void;
};

export const useLoweringStore = create<LoweringStore>((set) => ({
  status: 'idle',
  lower: async (
    receiverAddress: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => {
    const { addressEWX } = useConnectionStore.getState();
    const { walletConst } = useWalletEnvStore.getState();
    const { balanceEWX } = useBalanceStore.getState();

    const publicKey = decodeAddress(addressEWX);
    const hexPublicKey = u8aToHex(publicKey);
    const token = hexToU8a(walletConst.avtContractAddress);
    const value = Web3.utils.toWei(amount.toString(), 'ether');

    if (!balanceEWX) {
      set({ status: 'error' });
      throw new Error('Balance not found');
    }

    if (amount < Number(MIN_LOWERING_AMOUNT)) {
      set({ status: 'error' });
      throw new Error('Amount is less than the minimum');
    }

    if (new BN(balanceEWX.base).lt(new BN(value))) {
      set({ status: 'error' });
      throw new Error('Insufficient funds');
    }

    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.TokenManager,
      extrinsicMethod: ExtrinsicMethod.ScheduleDirectLower,
      payload: [hexPublicKey, token, value, receiverAddress],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle' }),
}));

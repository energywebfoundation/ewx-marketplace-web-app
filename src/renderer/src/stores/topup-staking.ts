import { create } from 'zustand';
import { BN } from 'bn.js';
import Web3 from 'web3';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';
import { useBalanceStore } from './balance';

type TopupStakingStore = {
  status: TxStatus;
  errorMsg?: string;
  topupStake: (
    solutionName: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => Promise<void>;
  reset: () => void;
};

export const useTopupStakingStore = create<TopupStakingStore>((set) => ({
  status: 'idle',
  topupStake: async (
    solutionName: string,
    amount: number,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => {
    const { balanceEWX } = useBalanceStore.getState();

    const value = Web3.utils.toWei(amount.toString(), 'ether');

    if (!balanceEWX) {
      set({ status: 'error' });
      throw new Error('Balance not found');
    }

    if (new BN(balanceEWX.base).lt(new BN(value))) {
      set({ status: 'error' });
      throw new Error('Insufficient funds');
    }

    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.TopupStake,
      payload: [solutionName, value],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));

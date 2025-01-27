import { create } from 'zustand';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';

type ClaimRewardsStore = {
  status: TxStatus;
  errorMsg?: string;
  claimRewards: (
    namespace: string,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => Promise<void>;
  reset: () => void;
};

export const useClaimRewardsStore = create<ClaimRewardsStore>((set) => ({
  status: 'idle',
  claimRewards: async (namespace: string, onFinish: (onFinishData: OnFinishData) => void) => {
    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.ClaimRewards,
      payload: [[namespace]],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));

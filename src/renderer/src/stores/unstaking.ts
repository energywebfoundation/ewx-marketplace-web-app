import { create } from 'zustand';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';

type UnstakingStore = {
  status: TxStatus;
  errorMsg?: string;
  unstake: (solutionName: string, onFinish: (onFinishData: OnFinishData) => void) => Promise<void>;
  reset: () => void;
};

export const useUnstakingStore = create<UnstakingStore>((set) => ({
  status: 'idle',
  unstake: async (solutionName: string, onFinish: (onFinishData: OnFinishData) => void) => {
    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.UnsubscribeFromSolutionGroup,
      payload: [solutionName],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));

import { create } from 'zustand';
import { useBalanceStore } from './balance';
import {
  ExtrinsicMethod,
  ExtrinsicModule,
  OnFinishData,
  TxStatus,
  executePalletTransaction,
} from './tx';

type UnlinkWorkerStore = {
  status: TxStatus;
  errorMsg?: string;
  unlinkWorker: (onFinish: (onFinishData: OnFinishData) => void) => Promise<void>;
  reset: () => void;
};

export const useUnlinkWorkerStore = create<UnlinkWorkerStore>((set) => ({
  status: 'idle',
  unlinkWorker: async (onFinish: (onFinishData: OnFinishData) => void) => {
    const { balanceEWX } = useBalanceStore.getState();

    if (!balanceEWX) {
      set({ status: 'error' });
      throw new Error('Balance not found');
    }

    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.DisconnectWorkerNode,
      payload: [],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));

import { create } from 'zustand';
import { useApiServiceStore } from '@ewf/stores/api';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';
import { useConnectionStore } from './connection';

type LinkUpEwxWorkerStore = {
  status: TxStatus;
  errorMsg?: string;
  linkUpEWXWorker: (
    onFinish: (onFinishData: OnFinishData) => void,
    workerAddress?: string,
  ) => Promise<void>;
  reset: () => void;
};

export const useLinkUpEwxWorkerStore = create<LinkUpEwxWorkerStore>((set) => ({
  status: 'idle',
  linkUpEWXWorker: async (
    onFinish: (onFinishData: OnFinishData) => void,
    workerAddress?: string,
  ) => {
    const workerApi = useApiServiceStore.getState().api;
    if (!workerAddress) {
      workerAddress = await workerApi.walletWorkerAddress();
    }

    const operatorAddress = useConnectionStore.getState().addressEWX;

    if (!operatorAddress) {
      throw new Error('Operator address is not found');
    }

    if (operatorAddress === workerAddress) {
      throw new Error('Operator address and worker address cannot be the same');
    }

    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.ConnectWorkerNode,
      payload: [workerAddress],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));

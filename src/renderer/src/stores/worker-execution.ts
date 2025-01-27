import { create } from 'zustand';
import { useApiServiceStore } from './api';

export type WorkerExecutionStatus = 'local' | 'remote';

type WorkerExecutionStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  status: WorkerExecutionStatus;
  fetchWorkerExecutionStatus: () => Promise<void>;
};

export const useWorkerExecutionStore = create<WorkerExecutionStore>((set, get) => ({
  isInitialized: false,
  init: async () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });
    await get().fetchWorkerExecutionStatus();
  },
  cleanUp: () => {
    set({ isInitialized: false });
  },
  status: 'local',
  fetchWorkerExecutionStatus: async () => {
    const workerApi = useApiServiceStore.getState().api;
    const isWorkerLocal = await workerApi.isRunLocal();
    const status = isWorkerLocal ? 'local' : 'remote';
    set({ status });
  },
}));

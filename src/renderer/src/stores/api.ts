import { Api } from '@ewf/types/api';
import { create } from 'zustand';

type ApiStore = {
  isInitialized: boolean;
  init: (workerApi: Api) => void;
  cleanUp: () => void;
  api: Api;
};

export const useApiServiceStore = create<ApiStore>((set, get) => ({
  isInitialized: false,
  init: (workerApi: Api) => {
    if (get().isInitialized) return;
    set({ isInitialized: true, api: workerApi });
  },
  cleanUp: () => {
    set({ isInitialized: false, api: {} as Api });
  },
  api: {} as Api,
}));

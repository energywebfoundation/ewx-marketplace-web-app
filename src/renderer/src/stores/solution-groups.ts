import { create } from 'zustand';
import { WorkerApi } from '@ewf/types/api';
import { isElectron } from '@main/helpers/is-electron';
import { IpcChannel } from '@main/helpers/ipc';
import { useApiServiceStore } from './api';
import { useWalletEnvStore } from './wallet-env';

type SolutionGroupsStore = {
  init: () => void;
  cleanUp: () => void;
  isInitialized: boolean;
  isLoading: boolean;
  errorMsg: string;
  solutionGroups: WorkerApi.GetSolutionGroups;
  whitelistedSolutionGroupIds: string[];
  fetchSolutionGroups: (options?: { showLoading: boolean }) => Promise<void>;
  setFavourite: (solutionGroupId: string, isFavourite: boolean) => Promise<void>;
};

export const useSolutionGroupsStore = create<SolutionGroupsStore>((set, get) => ({
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });
    get().fetchSolutionGroups({ showLoading: true });

    if (isElectron()) {
      window.Api.on(IpcChannel.updateFetchWorkers, () => {
        get().fetchSolutionGroups();
      });

      // Clean all listeners when component unmounts
      return () => {
        window.Api.removeAllListeners(IpcChannel.updateFetchWorkers);
      };
    }
  },
  cleanUp: () => {
    set({ isInitialized: false, solutionGroups: [], whitelistedSolutionGroupIds: [] });
  },
  isInitialized: false,
  isLoading: false,
  errorMsg: '',
  solutionGroups: [],
  whitelistedSolutionGroupIds: [],
  fetchSolutionGroups: async (options?: { showLoading: boolean }) => {
    const showLoading = options?.showLoading;

    try {
      if (showLoading) {
        set({ isLoading: true });
      }

      const apiService = useApiServiceStore.getState().api;
      const [solutionGroups, whiteList] = await Promise.all([
        apiService.getSolutionGroups(),
        apiService.fetchWhitelistSolutionGroups(),
      ]);

      set({ solutionGroups: solutionGroups || [], whitelistedSolutionGroupIds: whiteList || [] });
    } catch (e) {
      console.error(e);
      const errorMsg = e instanceof Error ? e.message : 'Failed to fetch solution groups';
      set({ errorMsg });
    } finally {
      if (showLoading) {
        set({ isLoading: false });
      }
    }
  },
  setFavourite: async (solutionGroupId, isFavourite) => {
    const updatedSolutionGroups = get().solutionGroups.map((sg) => {
      if (sg.id !== solutionGroupId) return sg;
      return { ...sg, isFavourites: isFavourite };
    });

    set({ solutionGroups: updatedSolutionGroups });
  },
}));

useWalletEnvStore.subscribe((state, previousState) => {
  if (state.env !== previousState.env) {
    useSolutionGroupsStore.getState().fetchSolutionGroups({ showLoading: true });
  }
});

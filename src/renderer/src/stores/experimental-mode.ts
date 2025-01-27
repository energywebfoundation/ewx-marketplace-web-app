import { create } from 'zustand';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';

type ExperimentalModeStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  isExperimental: boolean;
  isTestVersion: boolean;
  toggleExperimental: () => void;
};

const EXPERIMENTAL_MODE_KEY = 'experimentalMode';

export const useExperimentalMode = create<ExperimentalModeStore>((set, get) => ({
  isInitialized: false,
  init: async () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    const localStorageValue = localStorage.getItem(EXPERIMENTAL_MODE_KEY);
    const isDev = isElectron() ? import.meta.env.DEV : import.meta.env.VITE_DEV;
    const initialValue = !isDev ? false : localStorageValue === 'true';
    const workerApi = useApiServiceStore.getState().api;
    const isTestVersion = (await workerApi.isTestVersion()) || isDev;
    set({ isExperimental: initialValue, isTestVersion });
  },
  cleanUp: () => {
    set({ isInitialized: false });
  },
  isExperimental: false,
  isTestVersion: false,
  toggleExperimental: () => {
    const newIsExperimental = !get().isExperimental;
    set({ isExperimental: newIsExperimental });
    localStorage.setItem(EXPERIMENTAL_MODE_KEY, String(newIsExperimental));
  },
}));

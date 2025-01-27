import { IpcChannel } from '@main/helpers/ipc';
import { isElectron } from '@main/helpers/is-electron';
import { create } from 'zustand';

type NewReleaseStore = {
  isInitialized: boolean;
  latestVersion: string;
  currentVersion: string;
  isNewRelease: boolean;
  init: () => void;
  cleanUp: () => void;
};

export const useNewReleaseStore = create<NewReleaseStore>((set, get) => ({
  isInitialized: false,
  latestVersion: '',
  currentVersion: '',
  isNewRelease: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    // TODO: browser implementation
    if (isElectron()) {
      window.Api.on(IpcChannel.newRelease, (latestVersion: string, currentVersion: string) => {
        if (!latestVersion) return;
        set({ latestVersion, currentVersion, isNewRelease: true });
      });
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.newRelease);
    }
    set({ latestVersion: '', currentVersion: '', isNewRelease: false });
  },
}));

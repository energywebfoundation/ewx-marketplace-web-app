import { create } from 'zustand';
import { IpcChannel } from '@main/helpers/ipc';
import { isElectron } from '@main/helpers/is-electron';

export type NodeRedStatus = 'starting' | 'closing' | 'online' | 'offline';

type NodeRedStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  nodeRedStatus: NodeRedStatus;
  setNodeRedStatus: (status: NodeRedStatus) => void;
};

export const useNodeRedStore = create<NodeRedStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });
    if (isElectron()) {
      window.Api.on(IpcChannel.engineStartStatus, (status: string) => {
        if (status === 'STARTING') {
          set({ nodeRedStatus: 'starting' });
          return;
        }

        if (status === 'CLOSING') {
          set({ nodeRedStatus: 'closing' });
          return;
        }

        if (status === 'STARTING_COMPLETED') {
          set({ nodeRedStatus: 'online' });
          return;
        }

        if (status === 'CLOSING_COMPLETED') {
          set({ nodeRedStatus: 'offline' });
          return;
        }

        set({ nodeRedStatus: 'offline' });
      });
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.engineStartStatus);
    }
    set({ isInitialized: false });
  },
  nodeRedStatus: 'offline',
  setNodeRedStatus: (status: NodeRedStatus) => {
    set({ nodeRedStatus: status });
  },
}));

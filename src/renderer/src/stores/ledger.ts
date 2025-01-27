import { create } from 'zustand';
import { LedgerStatus } from '@main/entities/ledger';
import { IpcChannel } from '@main/helpers/ipc';
import { isElectron } from '@main/helpers/is-electron';

type LedgerStore = {
  isInitialized: boolean;
  init: () => void;
  status: LedgerStatus;
  cleanUp: () => void;
};

export const useLedgerStore = create<LedgerStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    // TODO: browser implementation
    if (isElectron()) {
      window.Api.on(IpcChannel.walletLedgerStatus, (status: LedgerStatus) => {
        if (!status) return;
        set({ status });
      });
    }
  },
  status: 'disconnected',
  cleanUp: () => {
    set({ isInitialized: false, status: 'disconnected' });
  },
}));

export const formatLedgerError = (error: string) => {
  const errorDict = {
    USER_REFUSED_ON_DEVICE: 'User refused on device',
    CONDITIONS_OF_USE_NOT_SATISFIED: 'Conditions of use not satisfied. Rejected by the user',
    DisconnectedDevice: 'Device was disconnected',
  };

  if (error in errorDict) {
    return errorDict[error];
  }

  if (error.startsWith('cannot open device with path')) {
    return 'Could not open device. Please, try again';
  }

  return error;
};

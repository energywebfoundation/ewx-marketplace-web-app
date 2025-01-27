import { create } from 'zustand';
import { type Account } from '@main/entities/account';
import { IpcChannel } from '@main/helpers/ipc';
import { isElectron } from '@main/helpers/is-electron';
import { useApiServiceStore } from './api';

type Status = 'idle' | 'fetching' | 'submitting' | 'error';

type AddressBookStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  status: Status;
  accounts: Account[];
  errorMsg: string | undefined;
  fetchAccounts: () => Promise<void>;
  updateAccounts: () => Promise<void>;
  addAccount: (address: string) => Promise<void>;
  deleteAccount: (address: string) => Promise<void>;
  resetErrorMsg: () => void;
};

export const useAddressBookStore = create<AddressBookStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    if (isElectron()) {
      window.Api.on(IpcChannel.addressBalanceUpdated, () => {
        get().updateAccounts();
      });
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.addressBalanceUpdated);
    }
    set({ isInitialized: false });
  },
  status: 'idle',
  accounts: [],
  errorMsg: undefined,
  // This function is abstracted to update accounts optimistically without updating the status
  updateAccounts: async () => {
    const workerApi = useApiServiceStore.getState().api;
    const dbAccounts = await workerApi.addressBookList();
    const accounts = dbAccounts.map((account, index) => ({
      name: `Account ${index + 1}`,
      address: account.address,
      balance: parseFloat(account.balance),
    }));
    set({ accounts });
  },
  fetchAccounts: async () => {
    try {
      set({ status: 'fetching', errorMsg: undefined });
      await get().updateAccounts();
      set({ status: 'idle' });
    } catch (error) {
      set({ status: 'error', errorMsg: 'There was an error loading EWC accounts' });
    }
  },
  addAccount: async (address: string) => {
    set({ status: 'submitting', errorMsg: undefined });
    try {
      const workerApi = useApiServiceStore.getState().api;
      const result = await workerApi.addressBookCreate(address);

      if (result.status === 'ok') {
        await get().updateAccounts();
        set({ status: 'idle' });
        return;
      }

      set({ status: 'error', errorMsg: result.message });
    } catch (error) {
      set({ status: 'error', errorMsg: 'There was an error adding the account' });
    }
  },
  deleteAccount: async (address) => {
    try {
      const workerApi = useApiServiceStore.getState().api;
      set({ status: 'submitting', errorMsg: undefined });
      await workerApi.addressBookDelete(address);
      await get().updateAccounts();
      set({ status: 'idle' });
    } catch (error) {
      set({ status: 'error', errorMsg: 'There was an error deleting the account' });
    }
  },
  resetErrorMsg: () => set({ errorMsg: undefined }),
}));

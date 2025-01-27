import { create } from 'zustand';
import Web3 from 'web3';
import { IpcChannel } from '@main/helpers/ipc';
import { useWalletEnvStore, MARKETPLACE_ENV } from './wallet-env';
import { isElectron } from '@main/helpers/is-electron';
import { useApiServiceStore } from '@ewf/stores/api';

export interface Balance {
  symbol: string;
  token: string;
  base: string;
}

type BalanceStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  isLoading: boolean;
  balanceEWX?: Balance;
  balanceEWC?: Balance;
  intervalId?: NodeJS.Timeout;
  setBalanceEWX: (balance: string | undefined) => void;
  setBalanceEWC: (balance?: Balance) => void;
  formatBalance: (balance: string) => Balance;
};

export const useBalanceStore = create<BalanceStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    if (isElectron()) {
      window.Api.on(IpcChannel.queryBalance, (data: string) => {
        if (!data) return;
        get().setBalanceEWX(data);
      });
    } else {
      set({ isLoading: true });
      const workerApi = useApiServiceStore.getState().api;
      workerApi.queryBalance().finally(() => set({ isLoading: false }));

      const TIME_IN_SECONDS = 30;
      const intervalId = setInterval(() => {
        workerApi.queryBalance();
      }, TIME_IN_SECONDS * 1000);
      set({ intervalId });
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.queryBalance);
    } else {
      const intervalId = get().intervalId;
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
    set({ isInitialized: false });
  },
  isLoading: false,
  balanceEWX: undefined,
  balanceEWC: undefined,
  intervalId: undefined,
  setBalanceEWX: (balance) => {
    set({ balanceEWX: balance ? get().formatBalance(balance) : undefined });
  },
  setBalanceEWC: (balance) => {
    set({ balanceEWC: balance });
  },
  formatBalance: (balance: string) => {
    const { env } = useWalletEnvStore.getState();
    const UNIT = env === MARKETPLACE_ENV.PROD ? 'EWT' : 'VT';

    return {
      token: Web3.utils.fromWei(balance, 'ether'),
      base: balance.toString(),
      symbol: UNIT,
    };
  },
}));

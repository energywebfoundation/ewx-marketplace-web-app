import { create } from 'zustand';
import { isAddress } from '@polkadot/util-crypto';
import { IpcChannel } from '@main/helpers/ipc';
import { useConnectionStore } from './connection';
import { isElectron } from '@main/helpers/is-electron';
import { routerConst } from '@ewf/lib/router';
import { router } from '../main';

interface DeepLinkStore {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  deepLink: string | undefined;
  value: string | undefined;
  status: 'idle' | 'connect';
  parseDeepLink: (url: string) => string | undefined;
}

export const WORKER_ADDRESS_SEARCH_PARAM = 'workerAddress';

export const useDeepLink = create<DeepLinkStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    if (isElectron()) {
      window.Api.on(IpcChannel.deepLink, (url: string) => {
        get().parseDeepLink(url);

        const isConnected = useConnectionStore.getState().isConnected;

        if (!isConnected) {
          set({ status: 'connect' });
          return;
        }

        router.navigate(routerConst.Dashboard);
      });

      window.Api.on(IpcChannel.deepLinkLaunch, (url: string) => {
        get().parseDeepLink(url);
      });
    } else {
      const workerAddress = get().parseDeepLink(window.location.href);

      if (!workerAddress) return;

      const isConnected = useConnectionStore.getState().isConnected;
      if (!isConnected) {
        set({ status: 'connect' });
      }
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.deepLink);
      window.Api.removeAllListeners(IpcChannel.deepLinkLaunch);
    }
    set({ isInitialized: false, deepLink: undefined, value: undefined });
  },
  deepLink: undefined,
  value: undefined,
  status: 'idle',
  parseDeepLink: (deepLink: string) => {
    const urlParams = new URL(deepLink).searchParams;
    const workerAddress = urlParams.get(WORKER_ADDRESS_SEARCH_PARAM);
    removeParamFromUrl(WORKER_ADDRESS_SEARCH_PARAM);

    if (!workerAddress) {
      return;
    }

    if (!isAddress(workerAddress)) {
      return;
    }

    set({ deepLink: deepLink, value: workerAddress });
    return workerAddress;
  },
}));

const removeParamFromUrl = (paramName) => {
  const searchParams = new URLSearchParams(window.location.search);
  const paramValue = searchParams.get(paramName);

  if (!paramValue) return;

  const paramSearch = `?${paramName}=${paramValue}`;

  if (history.replaceState) {
    const newUrl = window.location.href.replace(paramSearch, '');
    history.replaceState(null, '', newUrl);
  }
};

import { create } from 'zustand';
import isOnline from 'is-online';
import Web3 from 'web3';
import { Core } from '@walletconnect/core';
import { getSdkError, SDK_ERRORS } from '@walletconnect/utils';
import { WalletConnectModal } from '@walletconnect/modal';
import { ProposalTypes, SessionTypes } from '@walletconnect/types';
import { ApiPromise, HttpProvider } from '@polkadot/api';
import SignClient from '@walletconnect/sign-client';
import { u8aToHex } from '@polkadot/util';
import { decodeAddress } from '@polkadot/util-crypto';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { useSignUpOperatorStore } from './sign-up-operator';
import { useWalletEnvStore } from './wallet-env';
import { useBalanceStore } from './balance';
import { useAddressBookStore } from './address-book';
import { useApiServiceStore } from '@ewf/stores/api';
import { routerConst } from '@ewf/lib/router';
import { router } from '../main';

type ConnectionStore = {
  init: () => void;
  isInitialized: boolean;
  cleanUp: () => void;
  status: 'preparing' | 'connecting' | 'connected' | 'disconnected';
  isConnected: boolean;
  isConnectedEWC: boolean;
  isEWX: boolean;
  addressEWX: string;
  publicAddressEWX: string;
  addressEWC: string;
  errorMsg?: string;
  session: SessionTypes.Struct | undefined;
  sessionEWC: SessionTypes.Struct | undefined;
  walletConnectModal: WalletConnectModal | undefined;
  client: SignClient | undefined;
  createClient: () => Promise<void>;
  connect: (namespace?: ProposalTypes.RequiredNamespaces, cb?: () => void) => Promise<void>;
  onSessionConnected: (session: SessionTypes.Struct) => Promise<void>;
  disconnect: (chain?: MARKETPLACE_CHAINS) => Promise<void>;
  wcSessionReload: () => Promise<void>;
  reset: () => void;
  resetWC: () => void;
};

export const useConnectionStore = create<ConnectionStore>((set, get) => ({
  init: async () => {
    if (get().isInitialized) return;

    await useWalletEnvStore.getState().constants();
    await get().createClient();
    await get().wcSessionReload();
    set({ isInitialized: true });
  },
  cleanUp: () => {
    set({
      errorMsg: undefined,
      session: undefined,
      sessionEWC: undefined,
      client: undefined,
      walletConnectModal: undefined,
      isInitialized: false,
    });
  },
  isInitialized: false,
  status: 'disconnected',
  isConnected: false,
  isConnectedEWC: false,
  isEWX: true,
  addressEWC: '',
  addressEWX: '',
  publicAddressEWX: '',
  session: undefined,
  sessionEWC: undefined,
  client: undefined,
  createClient: async () => {
    const { walletConst } = useWalletEnvStore.getState();

    if (!(await isOnline())) {
      throw new Error('network are not online');
    }

    const core = new Core({
      projectId: walletConst.projectId,
      relayUrl: walletConst.relayUrl,
      logger: 'error',
    });

    // Override default logger to capture errors
    core.logger.error = (obj, error) => {
      console.error(error);
      const msg = !error.message
        ? 'An unknown error occurred'
        : error.message.includes('JWT validation error')
        ? "WalletConnect connection error. Please check your device's time settings and internet connection."
        : error.message;

      set({ errorMsg: msg });
    };

    const client = await SignClient.init({ core, metadata: walletConst.metadata });

    client.on('session_delete', ({ topic }: { id: number; topic: string }) => {
      if (get().session?.topic === topic) {
        get().resetWC();
      }
    });

    client.on('session_expire', ({ topic }: { topic: string }) => {
      if (get().session?.topic === topic) {
        get().resetWC();
      }
    });

    set({ client: client });
  },
  walletConnectModal: undefined,
  balance: undefined,
  connect: async (
    namespace: ProposalTypes.RequiredNamespaces = useWalletEnvStore.getState().walletConst[
      MARKETPLACE_CHAINS.EWX
    ],
    connectionPendingCallback?: () => void,
  ) => {
    const { client, walletConnectModal, session: ewxSession } = get();

    if (!(await isOnline())) {
      throw new Error('network are not online');
    }

    if (!walletConnectModal) {
      throw new Error('WalletConnectModal is not initialized');
    }

    if (typeof client === 'undefined') {
      throw new Error('WalletConnect is not initialized');
    }

    try {
      const connectClientPromise = client.connect({
        requiredNamespaces: namespace,
        pairingTopic: ewxSession?.pairingTopic,
      });

      const timeoutPromise = new Promise(
        (_, reject) =>
          setTimeout(() => {
            reject(new Error('Connection timeout. Please, check your internet connection'));
          }, 5000), // 5 seconds
      );

      // If connection takes more than 5 seconds, throw timeout error
      const { uri, approval } = (await Promise.race([
        connectClientPromise,
        timeoutPromise,
      ])) as Awaited<ReturnType<typeof client.connect>>;

      if (uri) {
        walletConnectModal.openModal({ uri });
      }

      const session = await approval();
      // Callback function to let caller know that connection is pending
      // This is used when WalletConnect QR model is open, so it shouldn't be closed
      // because connection is still pending
      if (connectionPendingCallback) {
        connectionPendingCallback();
      }
      await get().onSessionConnected(session);
    } catch (e) {
      console.error(e);
      throw e;
      // ignore rejection
    } finally {
      // close modal in case it was open
      walletConnectModal.closeModal();
    }
  },
  onSessionConnected: async (session: SessionTypes.Struct) => {
    const workerApi = useApiServiceStore.getState().api;
    const { walletConst } = useWalletEnvStore.getState();

    if (session && session.namespaces && session.namespaces.eip155) {
      try {
        const httpProvider = new Web3.providers.HttpProvider(walletConst.ewcRpc);
        const web3 = new Web3(httpProvider);
        const address = session.namespaces.eip155.accounts[0].split(':')[2];
        const available = await web3.eth.getBalance(address);
        const balance = {
          token: web3.utils.fromWei(available, 'ether'),
          base: available,
          symbol: 'VT',
        };
        set({ isConnectedEWC: true, addressEWC: address, sessionEWC: session });
        useBalanceStore.setState({ balanceEWC: balance });
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      const api = await ApiPromise.create({
        provider: new HttpProvider(walletConst.ewxPalletRpc),
      });
      try {
        const address = session.namespaces.polkadot.accounts[0].split(':')[2];
        const publicAddressEWX = u8aToHex(decodeAddress(address));
        set({
          isConnected: true,
          addressEWX: address,
          session: session,
          publicAddressEWX: publicAddressEWX,
        });
        await workerApi.sendEwxAddress(address, session.topic);
        const isOperatorSignedUp = await workerApi.isKYCDone(address);
        useSignUpOperatorStore.setState({ isOperatorSignedUp });

        useBalanceStore.setState({ isLoading: true });
        workerApi
          .queryBalance()
          .catch((e) => console.error(e))
          .finally(() => {
            useBalanceStore.setState({ isLoading: false });
          });

        router.navigate(routerConst.Dashboard);
      } catch (error) {
        console.error(error);
      } finally {
        await api.disconnect();
      }
    }
    useAddressBookStore.getState().fetchAccounts();
  },
  disconnect: async (chain: MARKETPLACE_CHAINS = MARKETPLACE_CHAINS.EWX) => {
    const workerApi = useApiServiceStore.getState().api;
    const { addressEWX, session, sessionEWC, client, reset } = get();

    if (typeof client === 'undefined' || !addressEWX) {
      throw new Error('WalletConnect is not initialized');
    }

    if (chain === MARKETPLACE_CHAINS.EWC) {
      if (typeof sessionEWC === 'undefined') {
        set({ isConnectedEWC: false, sessionEWC: undefined });
        useBalanceStore.setState({ balanceEWC: undefined });
        return;
      }

      set({ isConnectedEWC: false, sessionEWC: undefined });
      useBalanceStore.setState({ balanceEWC: undefined });
    }

    if (chain === MARKETPLACE_CHAINS.EWX) {
      if (typeof session === 'undefined') {
        reset();
        return;
      }

      try {
        await client.disconnect({
          topic: session.topic,
          reason: getSdkError('USER_DISCONNECTED'),
        });
      } catch (error) {
        console.error('SignClient.disconnect failed:', error);
      } finally {
        await workerApi.resetAllSubscriptionsByEwx(addressEWX);
        reset();
      }
    }
  },
  wcSessionReload: async () => {
    const workerApi = useApiServiceStore.getState().api;
    const { client, onSessionConnected } = get();
    const { walletConst } = useWalletEnvStore.getState();

    if (!client) {
      throw new Error('Client not initialized');
    }

    const ewxAccount = await workerApi.getLastEWXAccount();
    if (walletConst.env === ewxAccount.env && ewxAccount.ewxAddress && ewxAccount.wcSessionId) {
      /**
       * We need to find all of our session
       */
      const sessions = client.find({
        requiredNamespaces: walletConst.CHAINS_NAMESPACES[MARKETPLACE_CHAINS.EWX],
      });
      const pairings = client.core.pairing.getPairings();

      /**
       * We need to match active session with active pairings
       * only those are able to make connection with WC
       */
      const activeSessions = sessions.filter((session) =>
        pairings.some(({ topic }) => session.pairingTopic === topic),
      );

      /**
       * We need to also remove all non active sessions -
       * sessions that not have any active pairing connected
       */
      const nonActiveSessions = sessions.filter((session) =>
        pairings.every(({ topic }) => session.pairingTopic !== topic),
      );
      await Promise.all(
        nonActiveSessions.map(({ topic }) =>
          client.session.delete(topic, SDK_ERRORS.USER_DISCONNECTED),
        ),
      );
      const TIMESTAMP_NOW_IN_SECONDS = Math.floor(new Date().getTime() / 1000.0);

      const [session] = activeSessions;

      if (session && session.expiry > TIMESTAMP_NOW_IN_SECONDS) {
        await client.core.pairing.activate({ topic: session.pairingTopic });
        await onSessionConnected(session);
      } else {
        if (activeSessions.length > 0) {
          await workerApi.sendEwxAddress(ewxAccount.ewxAddress);
        }
      }
    }
  },
  reset: () => {
    const workerApi = useApiServiceStore.getState().api;
    set({
      session: undefined,
      isEWX: false,
      isConnected: false,
      addressEWX: '',
      publicAddressEWX: '',
    });
    useBalanceStore.setState({ balanceEWX: undefined, balanceEWC: undefined });
    useSignUpOperatorStore.setState({ isOperatorSignedUp: false });
    workerApi.sendEwxAddress('');
  },
  resetWC: () => {
    set({
      session: undefined,
      isEWX: false,
      isConnected: false,
      addressEWX: '',
      publicAddressEWX: '',
    });
    useBalanceStore.setState({ balanceEWX: undefined, balanceEWC: undefined });
  },
}));

useConnectionStore.subscribe((state, previousState) => {
  if (state.status === previousState.status) {
    return;
  }

  const isConnected = state.status === 'connected';

  useConnectionStore.setState({ isConnected });
});

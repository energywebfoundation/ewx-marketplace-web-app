import { create } from 'zustand';
import { WalletConnectModal } from '@walletconnect/modal';
import { useConnectionStore } from './connection';
import { useApiServiceStore } from '@ewf/stores/api';
import { WalletConstant } from '@ewf/types/api';
// import { MARKETPLACE_ENV } from '@ewf/types/enums';

export enum MARKETPLACE_ENV {
  DEV = 'DEV',
  STG = 'STG',
  REX = 'REX',
  PROD = 'PROD',
}

export enum MARKETPLACE_CHAINS {
  EWX = 'EWX',
  EWC = 'EWC',
}

type WalletEnvStore = {
  env: MARKETPLACE_ENV;
  walletConst: WalletConstant; // TODO: type this
  loadEnv: () => Promise<void>;
  reloadEnv: (env?: MARKETPLACE_ENV) => Promise<void>;
  constants: () => Promise<void>;
};

export const useWalletEnvStore = create<WalletEnvStore>((set, get) => ({
  env: MARKETPLACE_ENV.PROD,
  walletConst: {} as WalletConstant,
  loadEnv: async () => {
    const workerApi = useApiServiceStore.getState().api;
    const { isConnected, disconnect } = useConnectionStore.getState();

    if (isConnected) {
      await disconnect();
    }

    const walletConst = await workerApi.getWalletConst('');
    const { env } = walletConst;
    set({ env, walletConst });
  },
  reloadEnv: async (env: MARKETPLACE_ENV = MARKETPLACE_ENV.PROD) => {
    const workerApi = useApiServiceStore.getState().api;
    const { isConnected, disconnect } = useConnectionStore.getState();

    if (isConnected) {
      await disconnect();
    }

    const walletConst = await workerApi.getWalletConst(env);
    set({ env, walletConst });
  },
  constants: async () => {
    const workerApi = useApiServiceStore.getState().api;
    if (!workerApi) {
      // TODO: investigate race condition
      throw new Error('Worker API is not initialized');
    }

    const { walletConst: walletConstStore } = get();
    const walletConstIsInitialized = Object.keys(walletConstStore).length > 0;

    if (walletConstIsInitialized) return;

    const walletConst = await workerApi.getWalletConst();
    const { env } = walletConst;
    set({ walletConst, env });

    const walletConnectModal = new WalletConnectModal({
      projectId: walletConst.projectId,
      explorerRecommendedWalletIds: [
        // SubWallet
        '9ce87712b99b3eb57396cc8621db8900ac983c712236f48fb70ad28760be3f6a',
        // Nova Wallet
        '43fd1a0aeb90df53ade012cca36692a46d265f0b99b7561e645af42d752edb92',
      ],
      // It will only show the above recommended wallets
      explorerExcludedWalletIds: 'ALL',
    });

    useConnectionStore.setState({ walletConnectModal });
  },
}));

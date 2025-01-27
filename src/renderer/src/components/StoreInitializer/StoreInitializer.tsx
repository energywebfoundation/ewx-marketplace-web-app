import { useState, ReactNode, useEffect } from 'react';
import { useConnectionStore } from '@ewf/stores/connection';
import { useNodeRedStore } from '@ewf/stores/node-red';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';
import { useBalanceStore } from '@ewf/stores/balance';
import { useAddressBookStore } from '@ewf/stores/address-book';
import { useRemoteResourcesStore } from '@ewf/stores/remote-resources';
import { useLedgerStore } from '@ewf/stores/ledger';
import { useNewReleaseStore } from '@ewf/stores/new-release';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import { useDeepLink } from '@ewf/stores/deep-link';
import { useApiServiceStore } from '@ewf/stores/api';
import { useSolutionGroupsStore } from '@ewf/stores/solution-groups';
import { createIndexer } from '@ewf/lib/indexer';
import { Api } from '@ewf/types/api';
import { Loader } from '@ewf/components/Loader/Loader';
import { isElectron } from '@main/helpers/is-electron';
import { initIndexedDBService } from '../../../../web/ui/services/IndexedDBService'; // TODO: Improve path

interface StoreInitializerProps {
  injectedApiService: Api;
  children: ReactNode;
}

export const StoreInitializer = ({ injectedApiService, children }: StoreInitializerProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const apiServiceStoreInit = useApiServiceStore((state) => state.init);
  const apiServiceStoreCleanUp = useApiServiceStore((state) => state.cleanUp);

  const stores = [
    useConnectionStore,
    useNodeRedStore,
    useNotificationStore,
    useExperimentalMode,
    useBalanceStore,
    useAddressBookStore,
    useRemoteResourcesStore,
    useLedgerStore,
    useNewReleaseStore,
    useWorkerExecutionStore,
    useDeepLink,
    useSolutionGroupsStore,
  ];
  const storeInits = stores.map((store) => store().init);
  const storeCleanUps = stores.map((store) => store().cleanUp);

  useEffect(() => {
    const initStores = async () => {
      // Indexer needs GraphQL URL to be initialized before the rest of stores and services
      const { indexerUrl } = await injectedApiService.getWalletConst();
      createIndexer(indexerUrl);
      apiServiceStoreInit(injectedApiService);

      // On the electron version, the loading screen is the Welcome page inside the children router,
      // so there is no need to wait here for the stores to be initialized.
      // On the web app, a dummy loading page is shown while the stores are being initialized.
      // This way the app can be accessed through any URL and the stores will be initialized in this wrapper.
      if (isElectron()) {
        Promise.all(storeInits.map((init) => init()));
      } else {
        await initIndexedDBService();
        await Promise.all(storeInits.map((init) => init()));
      }
      setIsInitialized(true);
    };

    initStores();

    () => {
      apiServiceStoreCleanUp();
      storeCleanUps.forEach((cleanUp) => cleanUp());
    };
  }, []);

  if (isInitialized) {
    return children;
  }

  if (isElectron()) {
    return null;
  }
  return <Loader size="lg" />;
};

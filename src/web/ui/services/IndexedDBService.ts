export const enum LocalStores {
  ADDRESS_BOOK = 'addressBook',
  FAVOURITES = 'favourites',
  NOTIFICATIONS = 'notifications',
  WALLET = 'wallet',
}

class IndexedDBService {
  private db?: IDBDatabase;
  private version = 6;

  createObjectStores() {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }

    if (!this.db.objectStoreNames.contains(LocalStores.ADDRESS_BOOK)) {
      this.db.createObjectStore(LocalStores.ADDRESS_BOOK, { keyPath: 'address' });
    }

    if (!this.db.objectStoreNames.contains(LocalStores.FAVOURITES)) {
      this.db.createObjectStore(LocalStores.FAVOURITES, { keyPath: 'groupId' });
    }

    if (!this.db.objectStoreNames.contains(LocalStores.NOTIFICATIONS)) {
      this.db.createObjectStore(LocalStores.NOTIFICATIONS, { keyPath: 'id' });
    }

    if (!this.db.objectStoreNames.contains(LocalStores.WALLET)) {
      this.db.createObjectStore(LocalStores.WALLET, { keyPath: 'id' });
    }
  }

  async init(): Promise<boolean> {
    return new Promise((resolve) => {
      const request = indexedDB.open('ew-marketplace', this.version);

      request.onupgradeneeded = (e) => {
        this.db = request.result;
        const currentVersion = e.oldVersion;
        const newVersion = e.newVersion;
        console.info(`Upgrading local DB version from ${currentVersion} to ${newVersion}`);

        this.createObjectStores();
      };

      request.onsuccess = () => {
        if (request.readyState === 'done') {
          this.db = request.result;
          this.version = this.db.version;
          this.createObjectStores();

          resolve(true);
        }
      };

      request.onerror = () => {
        console.error('Error opening database');
        resolve(false);
      };
    });
  }

  async upsertData<T>(storeName: LocalStores, data: T): Promise<T | string | null> {
    return new Promise((resolve) => {
      const request = indexedDB.open('ew-marketplace', this.version);

      request.onsuccess = () => {
        this.db = request.result;
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const putDataReq = store.put(data);

        putDataReq.onsuccess = () => {
          resolve(data);
        };

        putDataReq.onerror = () => {
          const error = putDataReq.error?.message;
          if (error) {
            console.error('Error adding data: ', error);
            resolve(error);
          } else {
            resolve('Unknown error when adding data');
          }
        };
      };

      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          console.error('Error opening database: ', error);
          resolve(error);
        } else {
          resolve('Unknown error when opening database');
        }
      };
    });
  }

  async fetchData<T>(storeName: LocalStores, key: IDBValidKey): Promise<T | string | null> {
    return new Promise((resolve) => {
      const request = indexedDB.open('ew-marketplace', this.version);

      request.onsuccess = () => {
        this.db = request.result;
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const getDataReq = store.get(key);

        getDataReq.onsuccess = () => {
          resolve(getDataReq.result);
        };

        getDataReq.onerror = () => {
          const error = getDataReq.error?.message;
          if (error) {
            console.error('Error fetching data: ', error);
            resolve(error);
          } else {
            resolve('Unknown error when fetching data');
          }
        };
      };

      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          console.error('Error opening database: ', error);
          resolve(error);
        } else {
          resolve('Unknown error when opening database');
        }
      };
    });
  }

  async fetchAll<T>(storeName: LocalStores): Promise<T[] | string | null> {
    return new Promise((resolve) => {
      const request = indexedDB.open('ew-marketplace', this.version);

      request.onsuccess = () => {
        this.db = request.result;
        const tx = this.db.transaction(storeName, 'readonly');
        const store = tx.objectStore(storeName);
        const getAllDataReq = store.getAll();

        getAllDataReq.onsuccess = () => {
          resolve(getAllDataReq.result);
        };

        getAllDataReq.onerror = () => {
          const error = getAllDataReq.error?.message;
          if (error) {
            console.error('Error fetching data: ', error);
            resolve(error);
          } else {
            resolve('Unknown error when fetching data');
          }
        };
      };

      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          console.error('Error opening database: ', error);
          resolve(error);
        } else {
          resolve('Unknown error when opening database');
        }
      };
    });
  }

  async removeData(storeName: LocalStores, key: IDBValidKey): Promise<boolean> {
    return new Promise((resolve) => {
      const request = indexedDB.open('ew-marketplace', this.version);

      request.onsuccess = () => {
        this.db = request.result;
        const tx = this.db.transaction(storeName, 'readwrite');
        const store = tx.objectStore(storeName);
        const removeDataReq = store.delete(key);

        removeDataReq.onsuccess = () => {
          resolve(true);
        };

        removeDataReq.onerror = () => {
          const error = removeDataReq.error?.message;
          if (error) {
            console.error('Error removing data: ', error);
            resolve(false);
          } else {
            resolve(false);
          }
        };
      };

      request.onerror = () => {
        const error = request.error?.message;
        if (error) {
          console.error('Error opening database: ', error);
          resolve(false);
        } else {
          resolve(false);
        }
      };
    });
  }
}

const indexedDBService = new IndexedDBService();

const initIndexedDBService = async () => {
  await indexedDBService.init();
};

export { indexedDBService, initIndexedDBService };

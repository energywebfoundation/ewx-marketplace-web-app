import { contextBridge, ipcRenderer } from 'electron';
import { IpcChannel } from '../main/helpers/ipc';

const validChannels: string[] = [...Object.values(IpcChannel)];
const workerAddressArg = process.argv.find((arg) => arg.startsWith('workerAddress='));
const deepLinkWorkerAddress = workerAddressArg ? workerAddressArg.split('=')[1] : '';

export const IpcApi = {
  /**
   * Use this function to send messages via IPC communication
   */
  send: (channel: string, data?: any) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    } else {
      const error = `Invalid channel: ${channel}`;
      throw new Error(error);
    }
  },

  /**
   * Use this function to get the number of listeners for a channel
   */
  listenersCount: (channel: string) => {
    if (validChannels.includes(channel)) {
      return ipcRenderer.listenerCount(channel);
    } else {
      const error = `Invalid channel: ${channel}`;
      throw new Error(error);
    }
  },

  /**
   * Use this function to remove all listeners for a channel
   */
  removeAllListeners: (channel: string) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.removeAllListeners(channel);
    } else {
      const error = `Invalid channel: ${channel}`;
      throw new Error(error);
    }
  },

  /**
   * Use this function to send multiple pieces of data via IPC communication
   */
  sendMultiple: (channel: string, ...data: any[]) => {
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, ...data);
    } else {
      const error = `Invalid channel: ${channel}`;
      throw new Error(error);
    }
  },

  /**
   * Use this function to invoke functions with return callback
   */
  invoke: async (channel: string, data?: any) => {
    if (validChannels.includes(channel)) {
      return await ipcRenderer.invoke(channel, data);
    } else {
      const error = `Invalid channel: ${channel}`;
      throw new Error(error);
    }
  },

  /**
   * Use this function as an easier way to listen to events
   */
  on: (channel: string, callback: (...args: any[]) => any) =>
    ipcRenderer.on(channel, (_, ...data) => callback(...data)),

  /**
   * Use this function to clean up event listeners
   */
  off: (channel: string) => ipcRenderer.removeAllListeners(channel),
  IpcChannel,
};

export type PreloadWindow = {
  Api: typeof IpcApi;
  deepLinkWorkerAddress: string;
};

declare global {
  interface Window extends PreloadWindow {}
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('Api', IpcApi);
    contextBridge.exposeInMainWorld('deepLinkWorkerAddress', deepLinkWorkerAddress);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.Api = IpcApi;
  // @ts-ignore (define in dts)
  window.deepLinkWorkerAddress = deepLinkWorkerAddress;
}

export enum INIT_STATUS {
  Completed = 'Completed',
  Error = 'Error',
  CheckAppUpdate = 'CheckAppUpdate',
  LoadDependencies = 'LoadDependencies',
  ValidateEWXDetails = 'ValidateEWXDetails',
  SyncApplicationData = 'SyncApplicationData',
  InitializeWorker = 'InitializeWorker',
  SyncAccountData = 'SyncAccountData',
  InitializeWorkerNotConnected = 'InitializeWorkerNotConnected',
  Worker = 'Worker',
  Reload = 'Reload',
}

export enum LoadingMessage {
  Completed = 'Completed',
  Error = 'A system error has occured.',
  CheckAppUpdate = 'Checking app updates',
  LoadDependencies = 'Loading dependencies',
  ValidateEWXDetails = 'Validating EWX details',
  SyncApplicationData = 'Syncing application data',
  InitializeWorker = 'Initializing solution group details',
  SyncAccountData = 'Initializing account data',
  InitializeWorkerNotConnected = 'Solution group account is not linked with EWX account',
  Worker = 'Found solutions to automatically run',
  Reload = 'Reloading',
}

export const handleInitResponse = (response: string | string[]) => {
  let retVal = '';
  const actualResponse = Array.isArray(response) ? response[0] : response;
  switch (actualResponse) {
    case INIT_STATUS.CheckAppUpdate:
      retVal = LoadingMessage.CheckAppUpdate;
      break;
    case INIT_STATUS.LoadDependencies:
      retVal = LoadingMessage.LoadDependencies;
      break;
    case INIT_STATUS.ValidateEWXDetails:
      retVal = LoadingMessage.ValidateEWXDetails;
      break;
    case INIT_STATUS.SyncApplicationData:
      retVal = LoadingMessage.SyncApplicationData;
      break;
    case INIT_STATUS.InitializeWorker:
      retVal = LoadingMessage.InitializeWorker;
      break;
    case INIT_STATUS.SyncAccountData:
      retVal = LoadingMessage.SyncAccountData;
      break;
    case INIT_STATUS.InitializeWorkerNotConnected:
      retVal = LoadingMessage.InitializeWorkerNotConnected;
      break;
    case INIT_STATUS.Worker:
      retVal = LoadingMessage.Worker;
      break;
    case INIT_STATUS.Reload:
      retVal = LoadingMessage.Reload;
      break;
    case INIT_STATUS.Error:
      retVal = LoadingMessage.Error;
      break;
    case INIT_STATUS.Completed:
      retVal = LoadingMessage.Completed;
      break;
  }
  return retVal;
};

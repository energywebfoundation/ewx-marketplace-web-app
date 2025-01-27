export enum DEVICE_TYPE {
  Ledger = 'ledger',
  Trezor = 'trezor',
}

export enum MARKETPLACE_CHAINS {
  EWC = 'EWC',
  EWX = 'EWX',
}

export enum EWX_LINK_STATUS {
  NotLinked = 'not-linked',
  LinkedToCurrentWorker = 'linked-to-current-worker',
  LinkedToOtherWorker = 'linked-to-other-worker',
}

export enum SOLUTION_GROUP_STATUS {
  Scheduled = 'scheduled',
  Running = 'running',
  Expired = 'expired',
}

export enum WORKER_STATUS {
  Downloading = 'Downloading',
  Downloaded = 'Downloaded',
  DownloadFailed = 'Download Failed',
  Installing = 'Installing',
  Installed = 'Installed',
  InstallFailed = 'Install Failed',
  Pausing = 'Pausing',
  Paused = 'Paused',
  Resuming = 'Resuming',
  Terminating = 'Terminating',
  Terminated = 'Terminated',
  Running = 'Running',
  Expired = 'Expired',
  Scheduled = 'Scheduled',
  NoSolution = 'No Active Solutions',
  NotRunning = 'Not Running',
}

export enum GENERIC_CHIP_COLOR {
  Gray = 'gray',
  Teal = 'teal',
  Red = 'red',
  Blue = 'blue',
  White = 'white',
  LightPink = 'lightPink',
}

export const GenericChipColorClass = {
  gray: { bg: 'bg-gray-80', text: '' },
  teal: { bg: 'bg-teal/10', text: 'text-teal' },
  red: { bg: 'bg-red/10', text: 'text-red' },
  blue: { bg: 'bg-blue/10', text: 'text-blue' },
  white: { bg: 'bg-white/20', text: 'text-white' },
  lightPink: { bg: 'bg-pink-light/20', text: 'text-pink-light' },
};

export enum WORKER_STATUS_COLOR {
  Downloading = GENERIC_CHIP_COLOR.Blue,
  Downloaded = GENERIC_CHIP_COLOR.Teal,
  'Download Failed' = GENERIC_CHIP_COLOR.Red,
  Installing = GENERIC_CHIP_COLOR.Blue,
  Installed = GENERIC_CHIP_COLOR.Teal,
  'Install Failed' = GENERIC_CHIP_COLOR.Red,
  Pausing = GENERIC_CHIP_COLOR.White,
  Paused = GENERIC_CHIP_COLOR.White,
  Resuming = GENERIC_CHIP_COLOR.Blue,
  Terminating = GENERIC_CHIP_COLOR.Red,
  Terminated = GENERIC_CHIP_COLOR.Gray,
  Running = GENERIC_CHIP_COLOR.Teal,
  Expired = GENERIC_CHIP_COLOR.Gray,
  Scheduled = GENERIC_CHIP_COLOR.LightPink,
  'No Active Solutions' = GENERIC_CHIP_COLOR.Gray,
  'Not Running' = GENERIC_CHIP_COLOR.Gray,
}

export enum SCHEDULE_ACTION_LABEL {
  ForDownload = 'Downloading',
  ForInstall = 'Installing',
  ForTerminate = 'Terminating',
  ForResume = 'Resuming',
  ForPaused = 'Pausing',
  NoAction = 'NoAction',
}

export enum MANAGE_WORKER_LABEL {
  Pause = 'Pause',
  Resume = 'Resume',
}

export enum NOTIFICATION_STATUS {
  Success = 'success',
  Info = 'info',
  Error = 'error',
}

export enum NOTIFICATION_TYPE {
  Download = 'download',
  Information = 'information',
  Action = 'action',
}

export enum MARKETPLACE_ENV {
  DEV = 'DEV',
  STG = 'STG',
  REX = 'REX',
  PROD = 'PROD',
}

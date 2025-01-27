import { KeyringPair } from '@polkadot/keyring/types';
import { DEVICE_TYPE, EWX_LINK_STATUS, MARKETPLACE_CHAINS, SOLUTION_GROUP_STATUS } from './enums';
import { Prisma } from '@prisma/client';
import { MARKETPLACE_ENV } from './enums';

export interface Api {
  getSolutionGroups(): Promise<WorkerApi.GetSolutionGroups>;
  getSubscriptions(): Promise<WorkerApi.GetSolutionGroupSubscriptions>;
  solarSystem(): Promise<WorkerApi.WorkerSubscription>;
  get(workerId: string): Promise<WorkerApi.GetSolutionGroup>;
  addressBookCreate(address: string): Promise<AddressBookApi.Create>;
  addressBookDelete(address: string): Promise<AddressBookApi.Delete>;
  addressBookList(): Promise<AddressBookApi.List>;
  addressBookBalance(addresses: string[]): Promise<AddressBookApi.Balance>;
  fetchWhitelistSolutionGroups(): Promise<WorkerApi.WhitelistedSolutionGroupIds>;
  getSolutionGroupStake(solutionGroupId: string): Promise<WorkerApi.GetStakeStatus>;
  getEarnedRewards(namespace: string): Promise<WorkerApi.GetEarnedRewards>;
  setPendingUnsubscription(groupId: string): Promise<WorkerApi.SetPendingUnsubscription>;
  notificationsCreate(
    payload: NotificationsApi.NotificationCreate,
  ): Promise<NotificationsApi.Create>;
  notificationsGetAll(): Promise<NotificationsApi.GetAll>;
  notificationsMarkAsRead(notificationId: number): Promise<NotificationsApi.MarkAsRead>;
  notificationsDismiss(notificationId: number): Promise<NotificationsApi.Dismiss>;

  workerStatus(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadWorker>;

  diagnostics(): Promise<NodeRedServerApi.Diagnostics>;

  install(workerId: string): Promise<WorkerApi.WorkerResponse>;

  terminate(workerId: string): Promise<WorkerApi.WorkerResponse>;

  pause(workerId: string): Promise<WorkerApi.WorkerResponse>;

  addFavourite(workerId: string): Promise<FavouritesApi.Create>;

  listFavourite(): Promise<FavouritesApi.List>;

  delFavourite(workerId: string): Promise<FavouritesApi.Delete>;

  clearCache(): Promise<WorkerApi.WorkerResponse>;

  getSubscription(workerId: string): Promise<WorkerApi.WorkerSubscription>;

  downloadFlow(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadFlowResponse>;

  isKYCDone(address: string): Promise<WorkerApi.IsKYCDone>;

  isStakingTo(solutionNamespace: string, address: string): Promise<WorkerApi.IsStakingTo>;

  isWorkerSubcribeReadyToVote(solutionNamespace: string): Promise<WorkerApi.IsWorkerReadyToVote>;

  walletCreate(
    password: string,
    confirmPassword: string,
    mnemonic?: string,
  ): Promise<WalletApi.Create>;

  walletDetails(): Promise<WalletApi.GetAccountDetails>; // TODO: validate

  walletInit(password: string): Promise<WalletApi.WalletInit>;

  walletIsAvailable(): Promise<WalletApi.IsWalletAvailable>;

  walletWorkerAddress(): Promise<WalletApi.WalletWorkerAddress>;

  walletCheckMnemonic(mnemonic: string): Promise<WalletApi.CheckMnemonic>;

  walletGetSeedPhrase(password: string): Promise<WalletApi.GetSeedPhrase>;

  listDashboard(): Promise<WorkerApi.DashboardList[]>;

  lifting(txnHash: string): Promise<string>; // TODO: unused??

  systemInfo(): Promise<any>;

  systemTheme(): Promise<Theme>;

  getWalletConst(env?: string): Promise<WalletApi.GetWalletConst>;

  sendEwxAddress(address: string, wcSessionId?: string): Promise<void>;

  getTimestampFromBlockNumber(blockNumber: number): Promise<any>;

  getSolutionGroupStatus(
    startBlockNumber: number,
    endBlockNumber: number,
  ): Promise<WorkerApi.SolutionGroupStatus>;

  workerEWXLinkStatus(workerAddress?: string): Promise<WorkerApi.EWXLinkedStatus>;

  getLinkedWorkerNode(): Promise<WorkerApi.GetLinkedWorkerNode>;

  isVotingEnabled(workerId: string): Promise<WorkerApi.IsVotingEnabled>;

  setVoting(workerId: string, enabled: boolean): Promise<WorkerApi.SetVoting>;

  shouldPromptWorkerLogin(): Promise<WorkerApi.ShouldPromptWorkerLogin>;

  setStaked(workerId: string, amount: number, staked: boolean): Promise<WorkerApi.SetStaked>;

  updateFloatingStaked(groupId: string): Promise<WorkerApi.UpdateFloatingStaked>;

  workerVote(
    votingRoundId: string,
    noderedId: string,
    rootHash: string,
  ): Promise<WorkerApi.AddWorkerVote>;

  resetAllSubscriptions(): Promise<WorkerApi.ResetAllSubscriptions>;

  getSubscriptionFlags(): Promise<WorkerApi.GetSubscriptionFlags>;

  getLastEWXAccount(): Promise<WorkerApi.GetLastEWXAccount>;

  resetEwxAccount(address: string): Promise<WorkerApi.ResetEwxAccount>;

  syncBaseData(): Promise<WorkerApi.SyncBaseData>;

  startBaseDataScheduler(): Promise<WorkerApi.StartBaseDataScheduler>;

  resetBaseDataAndSync(): Promise<WorkerApi.ResetBaseDataAndSync>;

  appInit(): Promise<ElectronAppApi.AppInit>;

  continueAppInit(): Promise<ElectronAppApi.ContinueAppInit>;

  resetAllSubscriptionsByEwx(address: string): Promise<WorkerApi.ResetAllSubscriptionsByEwx>;

  queryWorkerAddress(ewxAddress: string): Promise<WalletApi.QueryWorkerAddress>;

  queryEWXPreference(workerId: string): Promise<WorkerApi.QueryEWXPreference>;

  getEwtUsd(): Promise<WorkerApi.GetEwtUsd>;

  getFeeEWX(type: string): Promise<WorkerApi.GetFeeEWX>;

  getFeeEWC(): Promise<WorkerApi.GetFeeEWC>;

  setSubcriptionBlock(
    blockNumber: number,
    timestamp: string,
    groupId: string,
  ): Promise<WorkerApi.SetSubcriptionBlock>;

  queryBalance(): Promise<WorkerApi.QueryBalance>;

  getCurrentRewardPeriod(): Promise<WorkerApi.GetCurrentRewardPeriod>;

  getCurrentVoteAndRewardPeriod(
    solutionGroupId: string,
  ): Promise<WorkerApi.GetCurrentVoteAndRewardPeriod>;

  getVotingGraphData(solutionId: string): Promise<WorkerApi.GetVotingGraphData>;

  syncEarnedRewards(): Promise<WorkerApi.SyncEarnedRewards>;

  getTransactionsByPeriod(
    solutionId: string,
    rewardPeriod: number,
  ): Promise<WorkerApi.GetTransactionsByPeriod>;

  exportLogs(): Promise<string | undefined>;

  solutionNodeStatusBy(
    solutionGroupId: string,
    solutionFlowId?: string,
  ): Promise<WorkerApi.GetSolutionNodeStatus>;

  listRuleActiveInMinute(solutionGroupId: string): Promise<WorkerApi.ListRuleActiveInMinute>;

  updateRuleActiveInMinute(
    solutionId: string,
    ruleActiveInMinute: number,
  ): Promise<WorkerApi.UpdateRuleActiveInMinute>;

  workerEngineRestart(): Promise<WorkerApi.RestartWorkerEngine>;

  workerEngineStart(): Promise<WorkerApi.StartWorkerEngine>;

  validateWorkerAddressBy(mnemonic: string): Promise<WalletApi.ValidateWorkerAddress>;

  checkUnclaimedSolutionBy(groupId: string): Promise<WorkerApi.GetEarnedRewards>;
  sendNotification(title: string, message: string): Promise<ElectronAppApi.SendNotification>;
  isTestVersion(): Promise<boolean>;
  listUnclaimedRewards(): Promise<WalletApi.ListUnclaimedRewards>;

  deviceConnect(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    path?: string,
  ): Promise<WalletDeviceApi.Connect>;
  deviceSign(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    txMsg: string,
    path?: string,
  ): Promise<WalletDeviceApi.Sign>;

  isDevicePlugged(): Promise<WalletDeviceApi.IsDevicePlugged>;

  isDeviceLocked(): Promise<WalletDeviceApi.IsDeviceLocked>;

  deviceLowering(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lowering>;

  deviceLifting(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lifting>;
  getHeroBannerUrl(): Promise<ExternalUrlApi.HeroBanner>;

  getWorkerCardUrl(): Promise<ExternalUrlApi.WorkerCard>;

  getNotificationsUrl(): Promise<ExternalUrlApi.Notifications>;

  getBlacklistedSolutionGroupsUrl(): Promise<ExternalUrlApi.BlacklistedSolutionGroups>;

  deleteWorker(): Promise<WalletApi.DeleteWorker>;
  setRemoteWorker(address: string): Promise<WalletApi.SetRemoteWorker>;
  isRunLocal(): Promise<boolean>;
}

export namespace WorkerApi {
  export type DownloadFlow = Prisma.SolutionFlowGetPayload<true>;
  export type DownloadFlowResponse = string;
  export type InstallWorker = WorkerResponse;
  export type PauseWorker = WorkerResponse;
  export type PauseAllWorkers = WorkerResponse;
  export type TerminateWorker = WorkerResponse;

  export type ListSolutions = Solution[];
  export interface DashboardList {
    workerId: string;
    workerName?: string;
    status: SOLUTION_GROUP_STATUS | null;
    date: Date | null;
    isStaked: boolean;
    isInstall: boolean;
    isVoting: boolean;
    stakeAmount: string;
  }

  type EWXPreference = Prisma.EWXPreferenceGetPayload<true>;
  export type SolutionGroup = Prisma.SolutionGroupGetPayload<{
    include: {
      Solution: true;
      EWXPreference: {
        select: {
          isStaked: true;
          isFavourites: true;
        };
      };
    };
  }>;
  type Solution = Prisma.SolutionGetPayload<true>;
  export type SolutionGroupSubscription = Prisma.SolutionGroupSubscriptionGetPayload<{
    include: {
      group: true;
      solutions: {
        where: {
          isDeleted: false;
        };
      };
      EWXPreference: true;
    };
  }>;
  export type GetSolutionGroups = {
    id: string;
    namespace: string;
    name: string;
    description: string;
    publisherInfo: string;
    logoUrl: string;
    startBlock: string;
    maxOperatorWorkers: string;
    allowedOperators: string;
    stakingMin: string;
    stakingMax: string;
    subscriptionRewardPerBlock: string;
    votingRewardPerBlock: string;
    topPerformanceBonus: string;
    operationStartBlock: string;
    operationEndBlock: string;
    activeParticipationAmount: string;
    hasOperatorsAllowlist: boolean;
    withdrawalDelay: number;
    startBlockTimestamp: string;
    operationStartBlockTimestamp: string;
    operationEndBlockTimestamp: string;
    updatedDate: Date | null;
    creationDate: Date;
    solutions: any[];
    susbcriptions?: any[];
    earnedRewards?: any[];
    isDeleted: boolean;
    isExpired: boolean;
    isFavourites?: boolean;
    isStaked?: boolean;
  }[];
  export type GetSolutionGroupSubscriptions = (SolutionGroupSubscription & {
    isStartVoteNextPeriod?: boolean;
  })[];
  export type GetSolutionGroup = Prisma.SolutionGroupGetPayload<{
    include: {
      Solution: {
        where: {
          isDeleted: false;
        };
      };
    };
  }>;
  export interface WorkerSubscription {
    subscription: Prisma.SolutionGroupSubscriptionGetPayload<true> | null;
    actualSubscriptionStatus?: string | null;
    solutionsCount: number;
    isStartVoteNextPeriod?: boolean | undefined;
  }
  export type WhitelistedSolutionGroupIds = string[];
  export type GetStakeStatus =
    | {
        period: string;
        stakeAmount: string;
        floatingStakeAmount: string;
      }
    | undefined;
  export type GetEarnedRewards = string;
  export type SetPendingUnsubscription = void;
  export type DownloadWorker = void;
  export type IsKYCDone = boolean;
  export type IsStakingTo = boolean; // Check if the user is staking to a solution group
  export type IsWorkerReadyToVote = boolean; // Check if the user has staked and the worker is ready to vote
  export type AddWorkerStatus = void; // Download a solution group locally
  export type SolutionGroupStatus = SOLUTION_GROUP_STATUS | undefined; // Get the status of a solution group
  export type IsVotingEnabled = boolean; // Check if the worker is voting
  export type IsWorkerConnected = boolean; // Check if the worker is connected
  export type SetVoting = void; // Start worker node
  export type EWXLinkedStatus = EWX_LINK_STATUS; // Check if the worker is linked to the current worker
  export type GetLinkedWorkerNode = string;
  export type ShouldPromptWorkerLogin = boolean; // Check if worker account is not enabled
  export type SetStaked = void; // Set staked status for a solution group
  export type UpdateFloatingStaked = void; // Update floating staked amount for a solution group
  export type AddWorkerVote = void; // Attempt to add a vote for a worker
  export type ResetAllSubscriptions = void; // Reset all subscriptions
  export type GetSubscriptionFlags = SubscriptionFlags; // Get subscription flags
  export type GetLastEWXAccount = LastEWXAccount; // Get the last EWX account
  export type ResetEwxAccount = void; // Reset the EWX account
  export type SyncBaseData = void; // Refresh solution group data for the current block
  export type SyncEarnedRewards = void; // Schedule a refresh of earned rewards
  export type ResetBaseDataAndSync = void; // Reset solution group data and refresh
  export type StartBaseDataScheduler = void;
  export type ResetAllSubscriptionsByEwx = void;
  export type QueryEWXPreference = EWXPreference | undefined;
  export type GetEwtUsd = number;
  export type GetFeeEWX = number;
  export type GetFeeEWC = string;
  export type SetSubcriptionBlock = void;
  export type QueryBalance = string; // Get the balance of the current account
  export type GetCurrentRewardPeriod = number;
  export type GetCurrentVoteAndRewardPeriod = CurrentVoteAndReward;
  type VoteResult = Prisma.VoteResultGetPayload<true>;
  export type GetTransactionsByPeriod = VoteResult[];
  export type GetVotingGraphData = VotingGraphData;
  export type GetSolutionNodeStatus = SolutionNodeStatus[];
  export type ListRuleActiveInMinute = SolutionRule[];
  export type UpdateRuleActiveInMinute = SolutionRule | undefined;
  export type RestartWorkerEngine = boolean;
  export type StartWorkerEngine = boolean;
  export type StopWorkerEngine = boolean;

  export interface WorkerResponse {
    workerId: string;
    message: string;
    success: boolean;
  }

  export interface SolutionRule {
    groupId: string;
    solutionId: string;
    ruleActiveInMinute: number;
  }

  export interface SolutionNodeStatus {
    groupId: string;
    solutionName: string;
    solutionId: number;
    isActive: boolean;
    lastActive: Date | undefined;
    ruleActiveInMinute: number;
    noderedId: string;
  }

  export interface SubscriptionFlags {
    hasSubscription: boolean;
    hasVotingEnabled: boolean;
  }

  export interface LastEWXAccount {
    ewxAddress: string | undefined;
    wcSessionId?: string;
    env: string;
  }

  export interface StakeGroupAmount {
    groupId: string;
    amount: string;
    floatingAmount: string;
    isReadyToVote: boolean;
  }

  export interface CurrentVoteAndReward {
    votes: number;
    rewardPeriod: number;
  }

  export type VotingGraphData = VotingRewardPeriod[];
  export interface VotingRewardPeriod {
    rewardPeriod: number;
    successfulVotes: number;
    failedVotes: number;
  }

  export interface Version {
    changeLogs: string;
    createdBy: string;
    creationDate: string;
    flowSource: string;
    id: number;
    lastUpdatedBy: string;
    updatedDate: string;
    versionNo: string;
    worker: WorkerId;
  }

  export type WorkerId = string;

  export interface Worker {
    id: WorkerId;
    data: WorkerData;
    description: string;
    devices: Device[];
    isSubscription: boolean;
    isStaked?: boolean;
    name: string;
    namespace: string;
    staking?: Staking;
    status: Status;
    subscriptions: Subscription[];
    type: string;
    versions: Version[];
  }

  export interface Device {
    id: number;
    createdBy: string;
    creationDate: string;
    items: string;
    lastUpdateDate: string;
    lastUpdateBy: string;
    name: string;
    worker: WorkerId;
  }

  export interface Staking {
    id: number;
    createdBy: string;
    creationDate: string;
    lastUpdateDate: string;
    lastUpdatedBy: string;
    lockupDuration: number;
    lockupDurationType: string;
    minLockupBalance: number;
    region: string;
    workers: WorkerId;
  }

  export interface Status {
    createdDate: string | Date;
    downloadErrorStatus: string | null;
    downloadPath: string | null;
    downloadStatus: string | null;
    downloadVersion: string | null;
    downloadVersionDate: string | null | Date;
    installDate: string | null | Date;
    installErrorStatus: string | null;
    installStatus: string | null;
    installVersion: string | null;
    installVersionDate: string | null | Date;
    isFavourites: boolean;
    isInstall: boolean;
    isSubscription: boolean;
    namespace: string;
    noderedId: string | null;
    status: string | null;
    statusDate: string | null | Date;
    type: string | null;
    updatedDate: string | null | Date;
    workerId: string;
    workerName: string;
  }

  export interface Subscription {
    createdBy: string;
    creationDate: string;
    description: string | null;
    frequency: string;
    id: number;
    lastUpdateDate: string;
    lastUpdatedBy: string;
    workers: WorkerId;
  }

  export interface GroupSubscription {
    id: string;
    name: string;
    namespace: string;
    isActive: boolean;
    isExpired: boolean;
    isVotingEnabled: boolean;
    isStartVoteNextPeriod?: boolean;
    groupId: string;
    stakeAmount: string;
    floatingStakeAmount: string;
    status?: string;
    isDeleted: boolean;
    isPendingUnsubscription: boolean;
    actionStatus?: string;
    unsubscriptionDate?: Date;
    withdrawalDelay: number;
    solutions: any[];
  }

  export interface WorkerData {
    info: {
      description: string;
      logoUrl: string | null;
      name: string;
      publisherInfo: string;
    };
    namespace: string;
    operationEndBlock: string;
    operationStartBlock: string;
    operatorsConfig: {
      allowedOperators: string;
      maxOperatorWorkers: string;
      stakingAmounts: {
        max: string;
        min: string;
      };
      startBlock: string;
    };
    rewardsConfig: {
      activeParticipationAmount: string;
      minimumParticipationTime: string;
      subscriptionRewardAmount: string;
      topPerformanceBonus: string;
    };
  }
}

export namespace AddressBookApi {
  export interface Create {
    status: 'ok' | 'error';
    message?: string;
  }
  export type Delete = void;
  export type AddressBook = Prisma.AddressBookGetPayload<true>;
  export type List = AddressBook[];
  export type Balance = AddressBook[];
}

export namespace NotificationsApi {
  export type Create = Notification;
  export type GetAll = Notification[];
  export type MarkAsRead = Notification;
  export type Dismiss = Notification;

  export type NotificationType = 'download' | 'information' | 'action';
  export type NotificationStatus = 'success' | 'info' | 'error';

  export type Notification = {
    id: number;
    type: NotificationType;
    status: NotificationStatus;
    title: string;
    description: string;
    isRead: boolean;
    isVisible: boolean;
    createdDate: Date;
  };
  export type NotificationCreate = Pick<Notification, 'type' | 'status' | 'title' | 'description'>;
}

export namespace NodeRedServerApi {
  export interface Diagnostics {
    isRunning: boolean;
    runningFlows: number;
    pendingFlows: number;
    totalFlows: number;
    scheduledDeploymentTime: string | null;
    deployedFlows: {
      rev: string;
      flows: object[];
    };
  }
}

export namespace FavouritesApi {
  export type EWXPreference = Prisma.EWXPreferenceGetPayload<true>;
  export type List = { id: WorkerApi.WorkerId }[];
  export type Create = EWXPreference | undefined;
  export type Delete = EWXPreference | undefined;
}

export namespace WalletApi {
  export type WalletInit = string;
  export type IsWalletAvailable = boolean;
  export type WalletWorkerAddress = string;
  export type Create = Wallet;
  export type ValidateWorkerAddress = boolean;
  export type SetRemoteWorker = void;
  export type QueryLocalRunMode = IsLocalRunMode;
  export type GetSeedPhrase = string;
  export type GetWorkerAddress = string;
  export type GetWorkerAccount = KeyringPair | undefined;
  export type IsWallet = boolean;
  export type QueryWorkerAddress = string | undefined;
  export type CheckMnemonic = boolean;
  export type GetAccountDetails = AccountDetails;
  export type GetWalletConst = WalletConstant;
  export type ListUnclaimedRewards = UnclaimedRewards[];
  export type DeleteWorker = void;

  export interface Wallet {
    seed: string;
    publicKey: string;
    did: string;
  }
  export interface IsLocalRunMode {
    address: string;
    isRunLocal: boolean;
  }
  export interface AccountDetails {
    roles: string | null | [];
    balanceText: string;
    balance: string;
  }

  export interface UnclaimedRewards {
    isDeleted: boolean;
    isExpired: boolean;
    isSubscribed: boolean;
    groupId: string;
    ewxAddress: string;
    totalReward: string;
    groupNamespace: string;
    groupName: string;
    groupDescription: string;
    groupPublisherInfo: string;
  }
}

export namespace ElectronAppApi {
  export type AppInit = void;
  export type ContinueAppInit = void;
  export type SendNotification = void;
}

export namespace WalletDeviceApi {
  export type ListAccounts = DeviceAccount[];

  export interface Connect {
    address: string;
    balance: string;
    errorStatus?: string;
  }
  export interface Lifting {
    txnHash: string;
    errorStatus?: string;
  }
  export type Lowering = string;
  export type Sign = string;

  export interface DeviceAccount {
    address: string;
    publicKey: string;
    path: string;
  }

  export type IsDevicePlugged = boolean;
  export type IsDeviceLocked = boolean;
  export type CheckDevice = boolean;
}

export namespace ExternalUrlApi {
  export type HeroBanner = string;
  export type WorkerCard = string;
  export type Notifications = string;
  export type BlacklistedSolutionGroups = string;
}

// TODO: finish types
export interface WalletConstant {
  projectId: string;
  smartContract: any;
  ewcRpc: string;
  ewxRpc?: string;
  ewxPalletRpc?: string;
  avtContractAddress?: string;
  ewxChainId?: string;
  ewcChainId?: string;
  relayUrl?: string;
  CHAINS_NAMESPACES: any;
  metadata: any;
  abi: any;
  env?: MARKETPLACE_ENV;
  ewcExplorerUrl?: string;
  ewxExplorerUrl?: string;
  requestEwxSleep: any;
  isRunLocal: boolean;
  indexerUrl: string;
}

export type Theme = 'light' | 'dark';

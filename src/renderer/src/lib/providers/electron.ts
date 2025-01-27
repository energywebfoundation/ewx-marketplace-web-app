import {
  AddressBookApi,
  Api,
  ElectronAppApi,
  ExternalUrlApi,
  FavouritesApi,
  NodeRedServerApi,
  NotificationsApi,
  Theme,
  WalletApi,
  WalletDeviceApi,
  WorkerApi,
} from '@ewf/types/api';
import { DEVICE_TYPE, EWX_LINK_STATUS, MARKETPLACE_CHAINS } from '@ewf/types/enums';
import { IpcChannel } from '@main/helpers/ipc';

export class ElectronApi implements Api {
  queryBalance(): Promise<WorkerApi.QueryBalance> {
    return window.Api.invoke(IpcChannel.queryBalance);
  }

  setSubcriptionBlock(
    blockNumber: number,
    timestamp: string,
    groupId: string,
  ): Promise<WorkerApi.SetSubcriptionBlock> {
    return window.Api.invoke(IpcChannel.setSubcriptionBlock, { blockNumber, timestamp, groupId });
  }

  getSubscriptions(): Promise<WorkerApi.GetSolutionGroupSubscriptions> {
    return window.Api.invoke(IpcChannel.getSubscriptions);
  }

  getFeeEWX(type: string): Promise<WorkerApi.GetFeeEWX> {
    return window.Api.invoke(IpcChannel.getFeeEWX, { type });
  }

  getFeeEWC(): Promise<WorkerApi.GetFeeEWC> {
    return window.Api.invoke(IpcChannel.getFeeEWC);
  }

  notificationsCreate({
    type,
    status,
    title,
    description,
  }: NotificationsApi.NotificationCreate): Promise<NotificationsApi.Create> {
    return window.Api.invoke(IpcChannel.notificationsCreate, { type, status, title, description });
  }

  notificationsGetAll(): Promise<NotificationsApi.GetAll> {
    return window.Api.invoke(IpcChannel.notificationsGetAll);
  }

  notificationsMarkAsRead(notificationId: number): Promise<NotificationsApi.MarkAsRead> {
    return window.Api.invoke(IpcChannel.notificationsMarkAsRead, { notificationId });
  }

  notificationsDismiss(notificationId: number): Promise<NotificationsApi.Dismiss> {
    return window.Api.invoke(IpcChannel.notificationsDismiss, { notificationId });
  }

  queryEWXPreference(workerId: string): Promise<WorkerApi.QueryEWXPreference> {
    return window.Api.invoke(IpcChannel.queryEWXPreference, { workerId });
  }

  queryWorkerAddress(ewxAddress: string): Promise<WalletApi.QueryWorkerAddress> {
    return window.Api.invoke(IpcChannel.queryWorkerAddress, { ewxAddress });
  }

  continueAppInit(): Promise<ElectronAppApi.ContinueAppInit> {
    return window.Api.invoke(IpcChannel.continueAppInit);
  }

  resetAllSubscriptionsByEwx(address: string): Promise<WorkerApi.ResetAllSubscriptionsByEwx> {
    return window.Api.invoke(IpcChannel.resetAllSubscriptionsByEwx, { address });
  }

  appInit(): Promise<ElectronAppApi.AppInit> {
    return window.Api.invoke(IpcChannel.appInit);
  }

  resetBaseDataAndSync(): Promise<WorkerApi.ResetBaseDataAndSync> {
    return window.Api.invoke(IpcChannel.resetBaseDataAndSync);
  }

  startBaseDataScheduler(): Promise<WorkerApi.StartBaseDataScheduler> {
    return window.Api.invoke(IpcChannel.startBaseDataScheduler);
  }

  resetAllSubscriptions(): Promise<WorkerApi.ResetAllSubscriptions> {
    return window.Api.invoke(IpcChannel.resetAllSubscriptions);
  }

  getSubscriptionFlags(): Promise<WorkerApi.SubscriptionFlags> {
    return window.Api.invoke(IpcChannel.subscriptionFlags);
  }

  getLastEWXAccount(): Promise<WorkerApi.LastEWXAccount> {
    return window.Api.invoke(IpcChannel.lastEWXAccount);
  }

  resetEwxAccount(address: string): Promise<WorkerApi.ResetEwxAccount> {
    return window.Api.invoke(IpcChannel.resetEwxAccount, { address });
  }

  syncBaseData(): Promise<WorkerApi.SyncBaseData> {
    return window.Api.invoke(IpcChannel.syncBaseData);
  }

  workerEWXLinkStatus(workerAddress?: string): Promise<EWX_LINK_STATUS> {
    return window.Api.invoke(IpcChannel.workerWithEWXLinkedStatus, { workerAddress });
  }

  getLinkedWorkerNode(): Promise<WorkerApi.GetLinkedWorkerNode> {
    return window.Api.invoke(IpcChannel.getLinkedWorkerNode);
  }

  isVotingEnabled(workerId: string): Promise<WorkerApi.IsVotingEnabled> {
    return window.Api.invoke(IpcChannel.workerIsVotingEnabled, { workerId });
  }

  setVoting(workerId: string, enabled: boolean): Promise<WorkerApi.SetVoting> {
    return window.Api.invoke(IpcChannel.workerSetVoting, { workerId, enabled });
  }

  setStaked(workerId: string, amount: number, staked: boolean): Promise<WorkerApi.SetStaked> {
    return window.Api.invoke(IpcChannel.workerSetStaked, { workerId, amount, staked });
  }

  updateFloatingStaked(groupId: string): Promise<WorkerApi.UpdateFloatingStaked> {
    return window.Api.invoke(IpcChannel.workerUpdateFloatingStaked, { groupId });
  }

  workerStatus(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadWorker> {
    return window.Api.invoke(IpcChannel.workerStatusCreate, { workerId, isSubscription });
  }

  workerVote(
    votingRoundId: string,
    noderedId: string,
    rootHash: string,
  ): Promise<WorkerApi.AddWorkerVote> {
    return window.Api.invoke(IpcChannel.workerVote, { votingRoundId, noderedId, rootHash });
  }

  sendEwxAddress(address: string, wcSessionId: string): Promise<void> {
    return window.Api.invoke(IpcChannel.ewxAddressSet, { address, wcSessionId });
  }

  getWalletConst(env: string = 'PROD'): Promise<WalletApi.GetWalletConst> {
    return window.Api.invoke(IpcChannel.walletConstant, { env });
  }

  addressBookCreate(address: string): Promise<AddressBookApi.Create> {
    return window.Api.invoke(IpcChannel.addressCreate, { address });
  }

  addressBookDelete(address: string): Promise<AddressBookApi.Delete> {
    return window.Api.invoke(IpcChannel.addressDelete, { address });
  }

  addressBookList(): Promise<AddressBookApi.List> {
    return window.Api.invoke(IpcChannel.addressList);
  }

  addressBookBalance(addresses: string[]): Promise<AddressBookApi.Balance> {
    return window.Api.invoke(IpcChannel.addressBalanceQuery, { addresses });
  }

  lifting(txnHash: string): Promise<string> {
    return window.Api.invoke(IpcChannel.lifting, { txnHash });
  }

  diagnostics(): Promise<NodeRedServerApi.Diagnostics> {
    return window.Api.invoke(IpcChannel.workerDiagnostics);
  }

  install(workerId: string): Promise<WorkerApi.WorkerResponse> {
    return window.Api.invoke(IpcChannel.workerInstall, workerId);
  }

  terminate(workerId: string): Promise<WorkerApi.WorkerResponse> {
    return window.Api.invoke(IpcChannel.workerTerminate, workerId);
  }

  pause(workerId: string): Promise<WorkerApi.WorkerResponse> {
    return window.Api.invoke(IpcChannel.workerPause, workerId);
  }

  getSolutionGroups(): Promise<WorkerApi.GetSolutionGroups> {
    return window.Api.invoke(IpcChannel.workerList);
  }

  solarSystem(): Promise<WorkerApi.WorkerSubscription> {
    return window.Api.invoke(IpcChannel.solutionList);
  }

  addFavourite(workerId: string): Promise<FavouritesApi.Create> {
    return window.Api.invoke(IpcChannel.favouriteCreate, workerId);
  }

  listFavourite(): Promise<FavouritesApi.List> {
    return window.Api.invoke(IpcChannel.favouriteList);
  }

  delFavourite(workerId: string): Promise<FavouritesApi.Delete> {
    return window.Api.invoke(IpcChannel.favouriteDelete, workerId);
  }

  clearCache(): Promise<WorkerApi.WorkerResponse> {
    return window.Api.invoke(IpcChannel.workerClearCache);
  }

  get(workerId: string): Promise<WorkerApi.GetSolutionGroup> {
    return window.Api.invoke(IpcChannel.workerGet, { workerId });
  }

  getSubscription(workerId: string): Promise<WorkerApi.WorkerSubscription> {
    return window.Api.invoke(IpcChannel.workerGetSubscription, { workerId });
  }

  downloadFlow(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadFlowResponse> {
    window.Api.send(IpcChannel.workerFlow, { workerId, isSubscription });
    return Promise.resolve('Success');
  }

  isKYCDone(address: string): Promise<WorkerApi.IsKYCDone> {
    return window.Api.invoke(IpcChannel.workerIsKYCDone, { address });
  }

  isStakingTo(solutionNamespace: string, address: string): Promise<WorkerApi.IsStakingTo> {
    return window.Api.invoke(IpcChannel.workerIsStaking, { solutionNamespace, address });
  }

  isWorkerSubcribeReadyToVote(solutionNamespace: string): Promise<WorkerApi.IsWorkerReadyToVote> {
    return window.Api.invoke(IpcChannel.workerSubcribeReadyToVote, { solutionNamespace });
  }

  walletCreate(
    password: string,
    confirmPassword: string,
    mnemonic?: string,
  ): Promise<WalletApi.Create> {
    return window.Api.invoke(IpcChannel.walletCreate, {
      password,
      confirmPassword,
      mnemonic,
    });
  }

  walletDetails(): Promise<WalletApi.AccountDetails> {
    return window.Api.invoke(IpcChannel.walletDetails);
  }

  walletInit(password: string): Promise<WalletApi.WalletInit> {
    return window.Api.invoke(IpcChannel.walletInit, { password });
  }

  walletGetSeedPhrase(password: string): Promise<WalletApi.GetSeedPhrase> {
    return window.Api.invoke(IpcChannel.walletGetSeedPhrase, { password });
  }

  walletIsAvailable(): Promise<WalletApi.IsWalletAvailable> {
    return window.Api.invoke(IpcChannel.walletIsAvailable);
  }

  walletWorkerAddress(): Promise<WalletApi.WalletWorkerAddress> {
    return window.Api.invoke(IpcChannel.walletWorkerAddress);
  }

  walletCheckMnemonic(mnemonic: string): Promise<WalletApi.CheckMnemonic> {
    return window.Api.invoke(IpcChannel.walletCheckMnemonic, { mnemonic });
  }

  listDashboard(): Promise<WorkerApi.DashboardList[]> {
    return window.Api.invoke(IpcChannel.workerDashboardList);
  }

  systemInfo(): Promise<any> {
    return window.Api.invoke(IpcChannel.sysInfo);
  }

  systemTheme(): Promise<Theme> {
    return window.Api.invoke(IpcChannel.systemTheme);
  }

  getTimestampFromBlockNumber(blockNumber: number): Promise<unknown> {
    return window.Api.invoke(IpcChannel.getTimestampFromBlockNumber, { blockNumber });
  }

  getSolutionGroupStatus(
    startBlockNumber: number,
    endBlockNumber: number,
  ): Promise<WorkerApi.SolutionGroupStatus> {
    return window.Api.invoke(IpcChannel.getSolutionGroupStatus, {
      startBlockNumber,
      endBlockNumber,
    });
  }

  shouldPromptWorkerLogin(): Promise<WorkerApi.ShouldPromptWorkerLogin> {
    return window.Api.invoke(IpcChannel.shouldPromptWorkerLogin);
  }

  fetchWhitelistSolutionGroups(): Promise<WorkerApi.WhitelistedSolutionGroupIds> {
    return window.Api.invoke(IpcChannel.fetchWhitelistSolutionGroups);
  }

  getEwtUsd(): Promise<WorkerApi.GetEwtUsd> {
    return window.Api.invoke(IpcChannel.getEwxUsd);
  }

  getSolutionGroupStake(solutionGroupId: string): Promise<WorkerApi.GetStakeStatus> {
    return window.Api.invoke(IpcChannel.getSolutionGroupStake, { solutionGroupId });
  }

  getEarnedRewards(namespace: string): Promise<WorkerApi.GetEarnedRewards> {
    return window.Api.invoke(IpcChannel.getEarnedRewards, {
      namespace,
    });
  }

  setPendingUnsubscription(groupId: string): Promise<WorkerApi.SetPendingUnsubscription> {
    return window.Api.invoke(IpcChannel.setPendingUnsubscription, {
      groupId,
    });
  }

  getCurrentRewardPeriod(): Promise<WorkerApi.GetCurrentRewardPeriod> {
    return window.Api.invoke(IpcChannel.getCurrentRewardPeriod);
  }

  getCurrentVoteAndRewardPeriod(
    solutionGroupId: string,
  ): Promise<WorkerApi.GetCurrentVoteAndRewardPeriod> {
    return window.Api.invoke(IpcChannel.getCurrentVoteAndRewardPeriod, {
      solutionGroupId,
    });
  }

  getTransactionsByPeriod(
    solutionId: string,
    rewardPeriod: number,
  ): Promise<WorkerApi.GetTransactionsByPeriod> {
    return window.Api.invoke(IpcChannel.getTransactionsByPeriod, {
      solutionId,
      rewardPeriod,
    });
  }

  getVotingGraphData(solutionId: string): Promise<WorkerApi.GetVotingGraphData> {
    return window.Api.invoke(IpcChannel.getVotingGraphData, {
      solutionId,
    });
  }

  exportLogs(): Promise<string> {
    return window.Api.invoke(IpcChannel.exportLogs);
  }

  syncEarnedRewards(): Promise<WorkerApi.SyncEarnedRewards> {
    return window.Api.invoke(IpcChannel.syncEarnedRewards);
  }

  solutionNodeStatusBy(
    solutionGroupId: string,
    solutionFlowId?: string,
  ): Promise<WorkerApi.GetSolutionNodeStatus> {
    return window.Api.invoke(IpcChannel.solutionNodeStatus, {
      solutionGroupId,
      solutionFlowId,
    });
  }

  listRuleActiveInMinute(solutionGroupId: string): Promise<WorkerApi.ListRuleActiveInMinute> {
    return window.Api.invoke(IpcChannel.listRuleActiveInMinute, {
      solutionGroupId,
    });
  }

  updateRuleActiveInMinute(
    solutionId: string,
    ruleActiveInMinute: number,
  ): Promise<WorkerApi.UpdateRuleActiveInMinute> {
    return window.Api.invoke(IpcChannel.updateRuleActiveInMinute, {
      solutionId,
      ruleActiveInMinute,
    });
  }

  workerEngineRestart(): Promise<WorkerApi.RestartWorkerEngine> {
    return window.Api.invoke(IpcChannel.workerEngineRestart);
  }

  workerEngineStart(): Promise<WorkerApi.StartWorkerEngine> {
    return window.Api.invoke(IpcChannel.workerEngineStart);
  }

  validateWorkerAddressBy(mnemonic: string): Promise<WalletApi.ValidateWorkerAddress> {
    return window.Api.invoke(IpcChannel.validateWorkerAddress, { mnemonic });
  }

  checkUnclaimedSolutionBy(groupId: string): Promise<WorkerApi.GetEarnedRewards> {
    return window.Api.invoke(IpcChannel.checkUnClaimSolution, { groupId });
  }

  sendNotification(title: string, message: string): Promise<ElectronAppApi.SendNotification> {
    return window.Api.invoke(IpcChannel.sendNotification, { title, message });
  }

  isTestVersion(): Promise<boolean> {
    return window.Api.invoke(IpcChannel.isTestVersion);
  }

  listUnclaimedRewards(): Promise<WalletApi.ListUnclaimedRewards> {
    return window.Api.invoke(IpcChannel.listUnClaimRewards);
  }

  deviceConnect(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    path?: string,
  ): Promise<WalletDeviceApi.Connect> {
    return window.Api.invoke(IpcChannel.walletDeviceConnect, { type, chain, path });
  }

  deviceSign(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    txMsg: string,
    path?: string,
  ): Promise<WalletDeviceApi.Sign> {
    return window.Api.invoke(IpcChannel.walletDeviceSign, { type, chain, txMsg, path });
  }

  isDevicePlugged(): Promise<WalletDeviceApi.IsDevicePlugged> {
    return window.Api.invoke(IpcChannel.WalletDevicePlugged);
  }

  isDeviceLocked(): Promise<WalletDeviceApi.IsDeviceLocked> {
    return window.Api.invoke(IpcChannel.WalletDeviceLocked);
  }

  deviceLowering(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lowering> {
    return window.Api.invoke(IpcChannel.WalletDeviceLowering, { receiverAddress, amount });
  }

  deviceLifting(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lifting> {
    return window.Api.invoke(IpcChannel.WalletDeviceLifting, { receiverAddress, amount });
  }

  getHeroBannerUrl(): Promise<ExternalUrlApi.HeroBanner> {
    return window.Api.invoke(IpcChannel.heroBannerDataUrl);
  }

  getWorkerCardUrl(): Promise<ExternalUrlApi.WorkerCard> {
    return window.Api.invoke(IpcChannel.workerCardDataUrl);
  }

  getNotificationsUrl(): Promise<ExternalUrlApi.Notifications> {
    return window.Api.invoke(IpcChannel.notificationsDataUrl);
  }

  getBlacklistedSolutionGroupsUrl(): Promise<ExternalUrlApi.BlacklistedSolutionGroups> {
    return window.Api.invoke(IpcChannel.blacklistedSolutionGroupsDataUrl);
  }

  deleteWorker(): Promise<WalletApi.DeleteWorker> {
    return window.Api.invoke(IpcChannel.deleteWorker);
  }

  setRemoteWorker(address: string): Promise<WalletApi.SetRemoteWorker> {
    return window.Api.invoke(IpcChannel.setRemoteWorker, { address });
  }

  isRunLocal(): Promise<boolean> {
    return window.Api.invoke(IpcChannel.isRunLocal);
  }
}

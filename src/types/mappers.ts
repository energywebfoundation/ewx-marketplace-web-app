import { Prisma } from '@prisma/client';
import { NotificationsApi } from './api';
import { PalletSolutionGroup } from '@main/entities/solution-group';
import { WorkerApi } from '@ewf/types/api';
import { MARKETPLACE_ENV } from './enums';
export const mapNotificationDbToEntity = (
  notificationDb: Prisma.NotificationsGetPayload<true>,
) => ({
  id: notificationDb.id,
  type: notificationDb.type as NotificationsApi.NotificationType,
  status: notificationDb.status as NotificationsApi.NotificationStatus,
  title: notificationDb.title,
  description: notificationDb.description,
  isRead: notificationDb.isRead,
  isVisible: notificationDb.isVisible,
  createdDate: notificationDb.createdDate,
});

export const mapPalletSolutionGroupToEntity = (
  palletSolutionGroup: PalletSolutionGroup & { withdrawalDelay: number },
  environment: MARKETPLACE_ENV,
): WorkerApi.SolutionGroup & {
  isStaked: boolean;
  isFavourites: boolean;
  solutions: Prisma.SolutionGetPayload<true>[];
} => ({
  id: palletSolutionGroup.id,
  namespace: palletSolutionGroup.namespace,
  name: palletSolutionGroup.info.name,
  description: palletSolutionGroup.info.description,
  publisherInfo: palletSolutionGroup.info.publisherInfo,
  logoUrl: palletSolutionGroup.info.logoUrl,
  startBlock: palletSolutionGroup.operatorsConfig.startBlock,
  maxOperatorWorkers: palletSolutionGroup.operatorsConfig.maxOperatorWorkers,
  allowedOperators: palletSolutionGroup.operatorsConfig.allowedOperators,
  stakingMin: palletSolutionGroup.operatorsConfig.stakingAmounts.min,
  stakingMax: palletSolutionGroup.operatorsConfig.stakingAmounts.max,
  subscriptionRewardPerBlock: palletSolutionGroup.rewardsConfig.subscriptionRewardPerBlock,
  votingRewardPerBlock: palletSolutionGroup.rewardsConfig.votingRewardPerBlock,
  topPerformanceBonus: palletSolutionGroup.rewardsConfig.topPerformanceBonus,
  operationStartBlock: palletSolutionGroup.operationStartBlock,
  operationEndBlock: palletSolutionGroup.operationEndBlock,
  activeParticipationAmount: '',
  updatedDate: new Date(),
  creationDate: new Date(),
  isDeleted: false,
  isExpired: false,
  isStaked: false,
  isFavourites: false,
  solutions: [],
  hasOperatorsAllowlist: palletSolutionGroup.operatorsConfig.hasOperatorsAllowlist,
  withdrawalDelay: palletSolutionGroup.withdrawalDelay,
  startBlockTimestamp: '1702609740141',
  operationStartBlockTimestamp: '1702609740141',
  operationEndBlockTimestamp: '1702609740141',
  EWXPreference: null as unknown as never,
  Solution: [],
  subscriptionRewardAmount: palletSolutionGroup.rewardsConfig.subscriptionRewardPerBlock,
  environment,
});

export type Subscription = {
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
};

export type SubscriptionFlags = {
  hasSubscription: boolean;
  hasVotingEnabled: boolean;
};

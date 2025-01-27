import { TxStatus } from '@ewf/stores/tx';
import web3 from 'web3';

export const truncateAddress = (address: string, offset: number = 4): string => {
  if (!address) return '';
  if (address.length <= offset * 2) return address;

  const first = address.slice(0, offset);
  const last = address.slice(-offset);

  return `${first}...${last}`;
};

export const truncateBalance = (balance: number | string) => {
  if (!balance) return 0;

  if (Number(balance) < 0.0001) return Number(balance);

  if (typeof balance === 'number') {
    balance = balance.toString();
  }

  const maxDecimals = 4;
  const [number, decimals] = balance.split('.');

  if (!decimals) return parseFloat(balance);

  const formattedDecimals = decimals.slice(0, maxDecimals);
  const formattedBalance = `${number}.${formattedDecimals}`;
  return parseFloat(formattedBalance);
};

export const copyTextToClipboard = async (text: string) => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  }

  return '';
};

export const pasteTextFromClipboard = async () => {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.readText();
  }

  return '';
};

export const parseAmount = (amount: string | undefined) => {
  if (!amount) return;

  return web3.utils.fromWei(amount.replaceAll(',', ''));
};

export const timeFromNow = (reference: Date) => {
  const now = Date.now();
  const diff = now - reference.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds <= 1) return `${seconds} second ago`;
  if (seconds < 60) return `${seconds} seconds ago`;

  if (minutes <= 1) return `${minutes} minute ago`;
  if (minutes < 60) return `${minutes} minutes ago`;

  if (hours <= 1) return `${hours} hour ago`;
  if (hours < 24) return `${hours} hours ago`;

  if (days <= 1) return `${days} day ago`;
  if (days < 30) return `${days} days ago`;

  if (months <= 1) return `${months} month ago`;
  if (months < 12) return `${months} months ago`;

  if (years <= 1) return `${years} year ago`;
  if (years > 1) return `${years} years ago`;

  return '';
};

export const formatPalletErrorMessage = (error: string) => {
  const errorsDict = {
    ArgumentInvalid: 'The argument provided was either incorrect or has missing elements',

    ArgumentOutOfBounds: 'The argument provided was out of bounds',

    NotImplemented: 'This interface is not implemented',

    ExistingRegistrar: 'Registar has already been registered',

    PrerequisiteNotMet:
      'Request cannot be complete due to a prerequisite operation not yet being performed',

    DataNotFound: 'The data required to perform the requested operation was not found',

    InsufficientFunds: "Account doesn't have enough funds",

    ExistingWorkerNodeOperator: 'Operator has already been registered',

    WorkerNodeOperatorNotFound: 'Worker node operator not found',

    ExistingWorkerNode: 'Worker node is already connected to a worker node operator',

    WorkerAlreadyConnectedToOperator:
      'Worker node has been already connected to a worker node operator',

    OperatorAlreadyConnectedToWorker: 'Operator has already connected worker node',

    RegistrarNotFound: 'Registar has not been registered',

    ExistingNamespace: 'Solution namespace exists',

    OperatorNotFound: 'Origin is not worker node operator',

    ExistingSubscription: 'Worker node has already been subscribed to solution group',

    SolutionGroupSubscriptionNotFound: 'Solution group subscription does not exist',

    SolutionGroupNotFound: 'Solution group was not created yet',

    SolutionGroupExpired: 'Solution group is not active',

    SolutionStatusNotChanged: 'Solution already has the requested status',

    AlreadyAllowedAccount: 'Existing allowed account',

    NotAllowedRegistrar: 'Account is not allowed to register',

    OperatorNotAllowed: 'Operator is not allowed to subscribe to this group',

    SolutionAlreadyInGroup: 'Solution is in a group',

    StakeAmountIsOutOfBounds: 'Group subscription amount is above or below limits',

    InvalidPublicKey: 'Public key of transaction sender is not valid',

    SolutionResultOutOfBounds: 'Solution result exceeds maximum length',

    InvalidSolutionResult: 'Solution result is invalid',

    SolutionIsNotActive: 'Votes in solution are not accepted',

    SolutionResultSignatureNotVerified: 'Signature of the solution result is not verified',

    SolutionNotFound: 'The solution is not registered',

    SolutionIsPartOfGroup: 'Solution currently participating in group',

    SolutionIsNotPartOfGroup: 'Solution currently is not participating in any of the groups',

    SubscriptionFound: 'Subscription Exists',

    SubscriptionNotFound: 'Subscription does not exist',

    IsNotWorker: 'Account was not assigned as a worker',

    TooManyGroupNamespaces: 'Too many groups',

    ArchivedSolutionGroup: 'Solution Group is archived, certain operations are restricted',

    SolutionResultChanged: 'Worker submitted different solution result in the same voting round',

    SubmissionsQuotaExceeded: 'Number of submissions within the period is too high',

    SolutionGroupDoesntSupportOperatorAllowList:
      'Solution Group doesnt have an operator allow list',

    RewardPeriodLengthInvalid: 'Length of the reward period is too short or too long',

    RewardPeriodLengthNotChanged: 'Legth of the reward period set to the same value',

    SolutionGroupHasSubscribedWorkerNodes: 'Solution Group has subscribed worker nodes',

    MaxAllowedOperatorsExceeded: 'Max number of allowed operators exceeded',

    NoSubscriptionsAllowed: 'No subscriptions are allowed',

    SolutionIsExpired: 'Solution is expired',

    StakeRecordUpdatesExceeded: 'Limit of subscription record updates exceeded',

    InvalidRewardPeriod: 'Invalid reward period',

    SolutionGroupRewardsNotCalculated: 'Not all rewards for a solution group are calculated',

    SolutionGroupHasBeenDeregistered: 'Group deregistered',

    NotAllowedToAddSolution: 'Solution is not allowed to be added to solution group',

    RegistrarIsGroupOwner: 'Registrar, who is deregistered, ownes solutions',

    RegistrarIsSolutionOwner: 'Registrar, who is deregistered, ownes groups',

    SenderNotSolutionOwner: 'Account is not the owner of the solution',

    SenderNotGroupOwner: 'Account is not the owner of the group',

    SenderNotGroupOrSolutionOwner: 'Account is not the owner of the group or owner of the solution',

    InvalidExpirationBlock: 'Invalid expiration block number',

    GroupInactive: 'Group is inactive',

    RewardsDepositInsufficient: 'Reserved balance of the registrar is insufficient to pay reward',
  } as const;

  const errorKey = Object.keys(errorsDict).find((key) => {
    return error.toLowerCase().includes(key.toLowerCase());
  });

  const formattedError = errorsDict[errorKey as keyof typeof errorsDict];

  return formattedError || error;
};

export const getTransactionTitle = (txStatus?: TxStatus) => {
  if (!txStatus) return 'Preparing transaction';

  const titles: Partial<Record<TxStatus, string>> = {
    preparing: 'Preparing transaction',
    'pending-confirmation': 'Pending confirmation',
    executing: 'Executing transaction',
  };

  return txStatus ? titles[txStatus] : titles.preparing;
};

export const getTransactionDescription = (txStatus?: TxStatus) => {
  if (!txStatus) return 'Please review the transaction details in your wallet';

  const descriptions: Partial<Record<TxStatus, string>> = {
    preparing: 'Please wait while we prepare the transaction...',
    'pending-confirmation': 'Please confirm the transaction in your wallet',
    executing: 'Please wait while we execute the transaction...',
  };

  return txStatus ? descriptions[txStatus] : descriptions.preparing;
};

export type SolutionGroupId = string;

export type PalletSolutionGroup = {
  id: SolutionGroupId;
  namespace: string;
  info: {
    name: string;
    description: string;
    publisherInfo: string;
    logoUrl: string;
  };
  operatorsConfig: {
    startBlock: string;
    maxOperatorWorkers: string;
    allowedOperators: string;
    hasOperatorsAllowlist: boolean;
    stakingAmounts: {
      min: string;
      max: string;
    };
  };
  rewardsConfig: {
    id: string;
    subscriptionRewardPerBlock: string;
    votingRewardPerBlock: string;
    topPerformanceBonus: string;
  };
  operationStartBlock: string;
  operationEndBlock: string;
  withdrawalDelay?: number;
  solutions?: any[];
};

export type SolutionGroup = {
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
  updatedDate?: Date;
  creationDate: Date;
  solutions: any[];
  susbcriptions?: any[];
  earnedRewards?: any[];
  isDeleted: boolean;
  isExpired: boolean;
  isFavourites?: boolean;
  isStaked?: boolean;
};

export type Solution = {
  id: string;
  namespace: string;
  name: string;
  description: string;
  publisherInfo: string;
  logoUrl: string;
  status: string;
  workLogic: string;
  executionEnvironment: string;
  maxWaitingThreshold: string;
  voteThresholdPercent: string;
  expirationBlock: string;
  solutionGroup: PalletSolutionGroup;
};

export type SolutionGroupStatus = 'scheduled' | 'running' | 'expired';

export const mockPalletSolutionGroup: PalletSolutionGroup = {
  id: '0x0b181c3df35f3efcf9681bb216a60346f0edf275a73ac82e0f689fbcf039c8a3',
  namespace: 'Energy Web Foundation-4',
  info: {
    name: 'Energy Web Solutions - 4',
    description:
      'EWF offers a wide variety of solutions including operating envelopes partitioning',
    publisherInfo: 'Energy Web Foundation',
    logoUrl: 'https://ddhub-gateway-dev.energyweb.org/ew-main-logo.svg',
  },
  operatorsConfig: {
    startBlock: '2,000',
    maxOperatorWorkers: '10',
    allowedOperators: '5',
    hasOperatorsAllowlist: true,
    stakingAmounts: { min: '1,000,000,000,000,000,000', max: '10,000,000,000,000,000,000' },
  },
  rewardsConfig: {
    id: '1',
    votingRewardPerBlock: '1,000',
    subscriptionRewardPerBlock: '1,000',
    topPerformanceBonus: '0',
  },
  operationStartBlock: '20',
  operationEndBlock: '200',
  solutions: [],
};

export const mockDeviceRequirements = {
  Processor: '2-core CPU',
  Memory: '8 GB RAM',
  Storage: '100 GB free',
  Network: '20 Mbit/s download & 20 Mbit/s upload',
} as const;

export const mockDiscoverWorkers: SolutionGroup[] = [
  {
    id: 'smartflow.beta',
    namespace: 'smartflow.beta',
    name: 'Smartflow Beta',
    description:
      'Cupidatat laboris minim dolor in id labore amet nulla ut. Ea ex consequat sit pariatur do cupidatat nisi exercitation ullamco quis nulla. Elit amet fugiat irure deserunt sunt. Labore fugiat eiusmod consequat non minim nulla. Ipsum ea in anim amet id quis deserunt nisi. Amet sint eu aliqua occaecat ullamco irure velit ipsum mollit adipisicing dolor ad ullamco id.',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    updatedDate: undefined,
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'smartflow.gamma',
    namespace: 'smartflow.gamma',
    name: 'Smartflow Gamma',
    description:
      'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'safc',
    namespace: 'safc',
    name: 'SAFC',
    description:
      'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'maritime',
    namespace: 'maritime',
    name: 'Maritime',
    description:
      'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'gp4btc',
    namespace: 'gp4btc',
    name: 'GP42BTC',
    description:
      'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'gp4ev',
    namespace: 'gp4ev',
    name: 'GP4EV',
    description:
      'Cupidatat laboris minim dolor in id labore amet nulla ut. Ea ex consequat sit pariatur do cupidatat nisi exercitation ullamco quis nulla. Elit amet fugiat irure deserunt sunt. Labore fugiat eiusmod consequat non minim nulla. Ipsum ea in anim amet id quis deserunt nisi. Amet sint eu aliqua occaecat ullamco irure velit ipsum mollit adipisicing dolor ad ullamco id.',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
  {
    id: 'digitalspine',
    namespace: 'digitalspine',
    name: 'Digital Spine',
    description:
      'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system.',
    publisherInfo: 'EW',
    logoUrl: '',
    startBlock: '1,860',
    maxOperatorWorkers: '100',
    allowedOperators: '100',
    stakingMin: '1,000,000,000,000,000,000',
    stakingMax: '2,000,000,000,000,000,000',
    subscriptionRewardPerBlock: '0',
    votingRewardPerBlock: '0',
    topPerformanceBonus: '0',
    operationStartBlock: '1,850',
    operationEndBlock: '99,999',
    activeParticipationAmount: '',
    isDeleted: false,
    isExpired: false,
    creationDate: new Date(),
    hasOperatorsAllowlist: true,
    withdrawalDelay: 0,
    startBlockTimestamp: '1702609740141',
    operationStartBlockTimestamp: '1702609740141',
    operationEndBlockTimestamp: '1702609740141',
    solutions: [],
    susbcriptions: [],
    earnedRewards: [],
  },
];

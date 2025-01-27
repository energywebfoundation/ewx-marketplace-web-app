export type VotingGraphData = VotingRewardPeriod[];

export type VotingRewardPeriod = {
  rewardPeriod: number;
  successfulVotes: number;
  failedVotes: number;
};

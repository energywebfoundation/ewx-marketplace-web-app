import { Client, cacheExchange, fetchExchange } from '@urql/core';
import { PalletSolutionGroup } from '@main/entities/solution-group';
import { graphql } from './gql';
import { WorkerApi } from '@ewf/types/api';
import { Transaction, TransactionType } from '@main/entities/transaction';
import Web3 from 'web3';

export class Indexer {
  private client: Client;

  constructor(url: string) {
    this.client = new Client({
      url: url,
      exchanges: [cacheExchange, fetchExchange],
      requestPolicy: 'network-only',
    });
  }

  getTransactions = async ({
    operatorId,
    solutionId,
  }: {
    operatorId: string;
    solutionId: string;
  }) => {
    const query = graphql(`
      query SolutionResultSubmitted($solutionId: String!, $operatorId: String!) {
        solutionResultSubmitteds(
          where: { operator: { id_eq: $operatorId }, AND: { solution: { id_eq: $solutionId } } }
        ) {
          result
          extrinsicHash
          blockHash
          successful
          blockNumber
          rewardPeriodIndex {
            id
          }
        }
      }
    `);
    const result = await this.client.query(query, {
      operatorId,
      solutionId,
    });
    return (
      result.data?.solutionResultSubmitteds.map(({ result, rewardPeriodIndex, successful }) => ({
        result,
        rewardPeriodIndex: rewardPeriodIndex?.id,
        successful,
      })) ?? []
    );
  };

  getTransactionsByPeriod = async ({
    operatorId,
    solutionId,
    rewardPeriod,
  }: {
    operatorId: string;
    solutionId: string;
    rewardPeriod: number;
  }) => {
    const query = graphql(`
      query SolutionResultSubmittedByPeriod(
        $rewardPeriod: String!
        $solutionId: String!
        $operatorId: String!
      ) {
        solutionResultSubmitteds(
          where: {
            rewardPeriodIndex: { id_eq: $rewardPeriod }
            AND: { solution: { id_eq: $solutionId }, AND: { operator: { id_eq: $operatorId } } }
          }
        ) {
          result
          extrinsicHash
          blockHash
          successful
          blockNumber
          solutionGroup {
            id
          }
          rewardPeriodIndex {
            id
          }
        }
      }
    `);
    const result = await this.client.query(query, {
      operatorId,
      rewardPeriod: rewardPeriod.toString(),
      solutionId,
    });
    return (
      result.data?.solutionResultSubmitteds.map(
        ({
          blockNumber,
          result,
          rewardPeriodIndex,
          solutionGroup,
          blockHash,
          extrinsicHash,
          successful,
        }) => ({
          blockNumber,
          result,
          rewardPeriodIndex: rewardPeriodIndex?.id,
          solutionGroupId: solutionGroup?.id,
          blockHash,
          extrinsicHash,
          successful,
        }),
      ) ?? []
    );
  };

  getSubscriptionsByOperator = async (
    operatorId: string,
  ): Promise<
    {
      group: WorkerApi.GetSolutionGroupSubscriptions[number]['group'];
      solutions: (WorkerApi.GetSolutionGroupSubscriptions[number]['solutions'][number] & {
        expirationBlock: string;
      })[];
      stakes: {
        currentStake: string;
        nextStake: string;
        rewardPeriodIndex: number;
        namespace: string;
      }[];
      unsubscribeBlock: number;
    }[]
  > => {
    const query = graphql(`
      query SubscriptionsByOperator($id: String!) {
        operatorAccountById(id: $id) {
          subscribedStakes(orderBy: rewardPeriodIndex_DESC) {
            currentStake
            nextStake
            rewardPeriodIndex
            solutionGroup {
              namespace
            }
          }
          subscriptions {
            id
            namespace

            solutionGroup {
              id
              namespace
              operationStartBlock
              operationEndBlock
              withdrawalDelay
              operatorsConfig {
                startBlock
                allowedOperators
                maxOperatorWorkers
                startBlock
                stakingAmounts {
                  min
                  max
                }
                hasOperatorsAllowlist
              }
              rewardsConfig {
                subscriptionRewardPerBlock
                votingRewardPerBlock
                topPerformanceBonus
              }
              info {
                id
                name
                description
                publisherInfo
                logoUrl
              }
              solutions {
                id
                status
                namespace
                additionToExtraneousGroupsAllowed
                expirationBlock
                workload {
                  workLogic
                  executionEnvironment
                }
                expirationBlock
                info {
                  id
                  description
                }
              }
              scheduledUnsubscriptions(
                orderBy: unsubscribeBlock_DESC_NULLS_LAST
                where: { operator: { id_eq: $id } }
                limit: 1
              ) {
                unsubscribeBlock
              }
            }
          }
        }
      }
    `);
    const result = await this.client.query(query, { id: operatorId });
    const stakes = (result.data?.operatorAccountById?.subscribedStakes ?? []).map(
      ({ currentStake, nextStake, rewardPeriodIndex, solutionGroup: { namespace } }) => ({
        currentStake,
        nextStake,
        rewardPeriodIndex,
        namespace,
      }),
    );

    return (result.data?.operatorAccountById?.subscriptions ?? []).map((subscription) => {
      let unsubscribeBlock = 0;
      if (subscription.solutionGroup.scheduledUnsubscriptions.length) {
        unsubscribeBlock = subscription.solutionGroup.scheduledUnsubscriptions[0].unsubscribeBlock;
      }

      return {
        group: {
          id: subscription.solutionGroup.id,
          updatedDate: new Date(),
          creationDate: new Date(),
          activeParticipationAmount: subscription.solutionGroup.rewardsConfig.votingRewardPerBlock,
          allowedOperators: subscription.solutionGroup.operatorsConfig.allowedOperators.toString(),
          description: subscription.solutionGroup.info.description,
          environment: '',
          hasOperatorsAllowlist: subscription.solutionGroup.operatorsConfig.hasOperatorsAllowlist,
          isDeleted: false,
          isExpired: false,
          logoUrl: subscription.solutionGroup.info.logoUrl ?? '',
          maxOperatorWorkers:
            subscription.solutionGroup.operatorsConfig.maxOperatorWorkers.toString(),
          name: subscription.solutionGroup.info.name,
          namespace: subscription.solutionGroup.namespace,
          operationEndBlock: subscription.solutionGroup.operationEndBlock.toString(),
          operationEndBlockTimestamp: '',
          operationStartBlock: subscription.solutionGroup.operationStartBlock.toString(),
          operationStartBlockTimestamp: '',
          publisherInfo: subscription.solutionGroup.info.publisherInfo,
          stakingMax: subscription.solutionGroup.operatorsConfig.stakingAmounts.max,
          stakingMin: subscription.solutionGroup.operatorsConfig.stakingAmounts.min,
          startBlock: subscription.solutionGroup.operatorsConfig.startBlock.toString(),
          startBlockTimestamp: '',
          subscriptionRewardAmount:
            subscription.solutionGroup.rewardsConfig.subscriptionRewardPerBlock, // ??
          subscriptionRewardPerBlock:
            subscription.solutionGroup.rewardsConfig.subscriptionRewardPerBlock,
          topPerformanceBonus: subscription.solutionGroup.rewardsConfig.topPerformanceBonus,
          votingRewardPerBlock: subscription.solutionGroup.rewardsConfig.votingRewardPerBlock,
          withdrawalDelay: subscription.solutionGroup.withdrawalDelay ?? 0,
        },
        solutions: subscription.solutionGroup.solutions.map(
          ({ workload: { executionEnvironment, workLogic }, id, status, expirationBlock }) => ({
            flowSource: '',
            workLogic,
            // TODO: for some reason type requires this to be number but is a string
            id: id as unknown as number,
            creationDate: new Date(),
            environment: executionEnvironment,
            isDeleted: false,
            isExpired: false,
            actionStatus: 'NoAction',
            actionRetry: 0,
            isHadDeniedNode: false,
            downloadPath: null,
            updatedDate: null,
            status: status ?? null,
            statusDate: null,
            noderedId: null,
            ewxAddress: null,
            subcribeId: null,
            solutionId: null,
            actionErrorMsg: null,
            expirationBlock,
          }),
        ),
        stakes,
        unsubscribeBlock,
      };
    });
  };

  getEarnedRewards = async ({
    operatorId,
    groupNamespace,
  }: {
    operatorId: string;
    groupNamespace: string;
  }) => {
    const query = graphql(`
      query GetEarnedRewards($operatorId: String!, $groupNamespace: String!) {
        earnedRewards(
          where: {
            account: { operator: { id_eq: $operatorId } }
            AND: { solutionGroup: { namespace_eq: $groupNamespace } }
          }
        ) {
          id
          subscriptionReward
          participationReward
        }
      }
    `);
    const result = await this.client.query(query, { operatorId, groupNamespace });

    return result.data?.earnedRewards ?? [];
  };

  getResultsSubmitted = async ({
    groupNamespace,
    operatorId,
    rewardPeriod,
  }: {
    rewardPeriod: number;
    operatorId: string;
    groupNamespace: string;
  }) => {
    const query = graphql(`
      query ResultsSubmitted($rewardPeriod: Int!, $operatorId: String!, $groupNamespace: String!) {
        solutionResultSubmitteds(
          where: {
            rewardPeriodIndex: { index_eq: $rewardPeriod }
            AND: {
              operator: { id_eq: $operatorId }
              AND: { solution: { solutionGroup: { namespace_eq: $groupNamespace } } }
            }
          }
        ) {
          id
        }
      }
    `);
    return (
      (await this.client.query(query, { groupNamespace, operatorId, rewardPeriod })).data
        ?.solutionResultSubmitteds.length ?? 0
    );
  };

  getLowersBySender = async (senderAddress: string): Promise<Transaction[]> => {
    const query = graphql(`
      query Lowers($sender: String) {
        avnLowers(where: { sender: { id_eq: $sender } }) {
          id
          when
          amount
          blockNumber
          sender {
            id
          }
          receiver
          isPending
          isFinalized
        }
      }
    `);
    const result = await this.client.query(query, { sender: senderAddress });
    return (result.data?.avnLowers ?? []).map((lower) => ({
      txHash: '',
      amount: Number(Web3.utils.fromWei(lower.amount!, 'ether')),
      id: lower.id,
      addressEWX: lower.sender.id!,
      addressEWC: lower.receiver!,
      block: lower.blockNumber,
      type: TransactionType.LOWERING,
      when: lower.when,
      isPending: lower.isPending ?? null,
      isFinalized: lower.isFinalized ?? null,
    }));
  };

  getLiftsByReceiver = async (receiverAddress: string): Promise<Transaction[]> => {
    const query = graphql(`
      query Lifts($receiver: String) {
        avnLifts(where: { receiver: { id_eq: $receiver } }) {
          id
          when
          amount
          blockNumber
          ewcTxHash
          sender
          receiver {
            id
          }
        }
      }
    `);
    const result = await this.client.query(query, { receiver: receiverAddress });
    return (result.data?.avnLifts ?? []).map((lift) => ({
      txHash: lift.ewcTxHash!,
      amount: Number(Web3.utils.fromWei(lift.amount!, 'ether')),
      id: lift.id,
      addressEWX: lift.receiver!.id,
      addressEWC: lift.sender!,
      block: lift.blockNumber,
      type: TransactionType.LIFTING,
      when: lift.when,
      isPending: null,
      isFinalized: null,
    }));
  };

  getSolutionsGroups = async (): Promise<PalletSolutionGroup[]> => {
    const query = graphql(`
      query MyQuery {
        solutionGroups {
          id
          withdrawalDelay
          operationStartBlock
          operationEndBlock
          namespace
          info {
            description
            id
            logoUrl
            name
            publisherInfo
          }
          operatorsConfig {
            allowedOperators
            hasOperatorsAllowlist
            id
            maxOperatorWorkers
            stakingAmounts {
              id
              max
              min
            }
            startBlock
          }
          registrar {
            friendlyName
            id
            isAllowed
            legalLocation
          }
          rewardsConfig {
            id
            subscriptionRewardPerBlock
            topPerformanceBonus
            votingRewardPerBlock
          }
        }
      }
    `);

    const result = await this.client.query(query, {});

    if (!result.data) {
      throw new Error('Failed to fetch solution groups');
    }

    const solutionGroups = result.data.solutionGroups.map((group) => ({
      id: group.id,
      namespace: group.namespace,
      info: {
        name: group.info.name,
        description: group.info.description,
        publisherInfo: group.info.publisherInfo,
        logoUrl: group.info.logoUrl || '',
      },
      operatorsConfig: {
        startBlock: group.operatorsConfig.startBlock.toString(),
        maxOperatorWorkers: group.operatorsConfig.maxOperatorWorkers.toString(),
        allowedOperators: group.operatorsConfig.allowedOperators.toString(),
        hasOperatorsAllowlist: group.operatorsConfig.hasOperatorsAllowlist,
        stakingAmounts: {
          min: group.operatorsConfig.stakingAmounts.min,
          max: group.operatorsConfig.stakingAmounts.max,
        },
      },
      rewardsConfig: {
        id: group.rewardsConfig.id,
        subscriptionRewardPerBlock: group.rewardsConfig.subscriptionRewardPerBlock,
        votingRewardPerBlock: group.rewardsConfig.votingRewardPerBlock,
        topPerformanceBonus: group.rewardsConfig.topPerformanceBonus,
      },
      operationStartBlock: group.operationStartBlock.toString(),
      operationEndBlock: group.operationEndBlock.toString(),
    }));

    return solutionGroups ?? [];
  };

  getSolutionGroup = async (
    id: string,
  ): Promise<PalletSolutionGroup & { withdrawalDelay: number }> => {
    const query = graphql(`
      query GetSolutionGroup($id: String!) {
        solutionGroupById(id: $id) {
          id
          withdrawalDelay
          operationStartBlock
          operationEndBlock
          namespace
          info {
            description
            id
            logoUrl
            name
            publisherInfo
          }
          operatorsConfig {
            allowedOperators
            hasOperatorsAllowlist
            id
            maxOperatorWorkers
            stakingAmounts {
              id
              max
              min
            }
            startBlock
          }
          registrar {
            friendlyName
            id
            isAllowed
            legalLocation
          }
          rewardsConfig {
            id
            subscriptionRewardPerBlock
            topPerformanceBonus
            votingRewardPerBlock
          }
          solutions {
            id
            status
            namespace
            additionToExtraneousGroupsAllowed
            expirationBlock
            workload {
              workLogic
              executionEnvironment
            }
            expirationBlock
            info {
              id
              description
              name
            }
          }
        }
      }
    `);

    const result = await this.client.query(query, { id });
    if (!result.data || !result.data.solutionGroupById) {
      throw new Error('Failed to fetch solution groups');
    }

    const group = result.data.solutionGroupById;
    const solutions = group.solutions.map(
      ({
        workload: { executionEnvironment, workLogic },
        id,
        status,
        expirationBlock,
        info: { name },
      }) => ({
        name,
        flowSource: '',
        workLogic,
        id,
        creationDate: new Date(),
        environment: executionEnvironment,
        isDeleted: false,
        isExpired: false,
        actionStatus: 'NoAction',
        actionRetry: 0,
        isHadDeniedNode: false,
        downloadPath: null,
        updatedDate: null,
        status: status ?? null,
        statusDate: null,
        noderedId: null,
        ewxAddress: null,
        subcribeId: null,
        solutionId: null,
        actionErrorMsg: null,
        expirationBlock,
      }),
    );

    const solutionGroup = {
      id: group.id,
      namespace: group.namespace,
      info: {
        name: group.info.name,
        description: group.info.description,
        publisherInfo: group.info.publisherInfo,
        logoUrl: group.info.logoUrl || '',
      },
      operatorsConfig: {
        startBlock: group.operatorsConfig.startBlock.toString(),
        maxOperatorWorkers: group.operatorsConfig.maxOperatorWorkers.toString(),
        allowedOperators: group.operatorsConfig.allowedOperators.toString(),
        hasOperatorsAllowlist: group.operatorsConfig.hasOperatorsAllowlist,
        stakingAmounts: {
          min: group.operatorsConfig.stakingAmounts.min,
          max: group.operatorsConfig.stakingAmounts.max,
        },
      },
      rewardsConfig: {
        id: group.rewardsConfig.id,
        subscriptionRewardPerBlock: group.rewardsConfig.subscriptionRewardPerBlock,
        votingRewardPerBlock: group.rewardsConfig.votingRewardPerBlock,
        topPerformanceBonus: group.rewardsConfig.topPerformanceBonus,
      },
      operationStartBlock: group.operationStartBlock.toString(),
      operationEndBlock: group.operationEndBlock.toString(),
      withdrawalDelay: group.withdrawalDelay ?? 0,
      solutions,
    };
    return solutionGroup;
  };

  checkIsStaked = async (solutionNamespace: string, address: string): Promise<boolean> => {
    const query = graphql(`
      query GetSubscriptionById($solutionNamespace: String!, $address: String!) {
        operatorAccounts(where: { id_eq: $address }) {
          id
          subscriptions(where: { namespace_eq: $solutionNamespace }) {
            namespace
          }
        }
      }
    `);

    const result = await this.client.query(query, { solutionNamespace, address });

    if (!result.data || !result.data.operatorAccounts) {
      throw new Error('Failed to fetch operator account');
    }

    if (
      result.data.operatorAccounts.length === 0 ||
      result.data.operatorAccounts[0].subscriptions.length === 0
    ) {
      return false;
    }

    return true;
  };

  getLinkedWorkerNode = async (operatorId: string) => {
    const query = graphql(`
      query GetLinkedWorkerNode($operatorId: String!) {
        workerAccounts(where: { mapping: { operator: { id_eq: $operatorId } } }) {
          address
        }
      }
    `);
    return (
      (await this.client.query(query, { operatorId })).data?.workerAccounts.at(0)?.address ?? null
    );
  };
  getUnclaimedRewards = async (operatorId: string) => {
    const query = graphql(`
      query GetUnclaimedRewards($operatorId: String!) {
        unclaimedRewards(address: $operatorId) {
          subscriptionReward
          participationReward
          solutionGroupId
          address
        }
      }
    `);
    return (await this.client.query(query, { operatorId })).data?.unclaimedRewards ?? [];
  };

  checkIsNodeReadyToVote = async (operatorId: string, solutionNamespace: string) => {
    const query = graphql(`
      query GetCanOperatorWorkerVote($operatorId: String!, $solutionNamespace: String!) {
        canOperatorWorkerVote(address: $operatorId, solutionGroupId: $solutionNamespace) {
          canVote
        }
      }
    `);

    const result = await this.client.query(query, { operatorId, solutionNamespace });

    if (result.data?.canOperatorWorkerVote?.length) {
      return result.data.canOperatorWorkerVote[0].canVote;
    }
    return false;
  };

  checkIsOperatorNodesReadyToVote = async (operatorId: string) => {
    const query = graphql(`
      query GetCanOperatorWorkersVote($operatorId: String!) {
        canOperatorWorkerVote(address: $operatorId) {
          solutionGroupId
          canVote
        }
      }
    `);

    return (await this.client.query(query, { operatorId })).data?.canOperatorWorkerVote ?? [];
  };

  getEwtUsd = async () => {
    const currency = 'EWT-USD';

    const query = graphql(`
      query GetEwtUsd($currency: String!) {
        ewtPriceById(id: $currency) {
          price
        }
      }
    `);

    return (await this.client.query(query, { currency })).data?.ewtPriceById?.price;
  };
}

let _indexer: Indexer | null = null;

export const createIndexer = (url: string) => {
  _indexer = new Indexer(url);
};

export const getIndexer = () => {
  if (!_indexer) {
    throw new Error('Indexer is not initialized.');
  }

  return _indexer;
};

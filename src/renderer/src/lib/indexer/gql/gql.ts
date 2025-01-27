/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n      query SolutionResultSubmitted($solutionId: String!, $operatorId: String!) {\n        solutionResultSubmitteds(\n          where: { operator: { id_eq: $operatorId }, AND: { solution: { id_eq: $solutionId } } }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    ':
    types.SolutionResultSubmittedDocument,
  '\n      query SolutionResultSubmittedByPeriod(\n        $rewardPeriod: String!\n        $solutionId: String!\n        $operatorId: String!\n      ) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { id_eq: $rewardPeriod }\n            AND: { solution: { id_eq: $solutionId }, AND: { operator: { id_eq: $operatorId } } }\n          }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          solutionGroup {\n            id\n          }\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    ':
    types.SolutionResultSubmittedByPeriodDocument,
  '\n      query SubscriptionsByOperator($id: String!) {\n        operatorAccountById(id: $id) {\n          subscribedStakes(orderBy: rewardPeriodIndex_DESC) {\n            currentStake\n            nextStake\n            rewardPeriodIndex\n            solutionGroup {\n              namespace\n            }\n          }\n          subscriptions {\n            id\n            namespace\n\n            solutionGroup {\n              id\n              namespace\n              operationStartBlock\n              operationEndBlock\n              withdrawalDelay\n              operatorsConfig {\n                startBlock\n                allowedOperators\n                maxOperatorWorkers\n                startBlock\n                stakingAmounts {\n                  min\n                  max\n                }\n                hasOperatorsAllowlist\n              }\n              rewardsConfig {\n                subscriptionRewardPerBlock\n                votingRewardPerBlock\n                topPerformanceBonus\n              }\n              info {\n                id\n                name\n                description\n                publisherInfo\n                logoUrl\n              }\n              solutions {\n                id\n                status\n                namespace\n                additionToExtraneousGroupsAllowed\n                expirationBlock\n                workload {\n                  workLogic\n                  executionEnvironment\n                }\n                expirationBlock\n                info {\n                  id\n                  description\n                }\n              }\n              scheduledUnsubscriptions(\n                orderBy: unsubscribeBlock_DESC_NULLS_LAST\n                where: { operator: { id_eq: $id } }\n                limit: 1\n              ) {\n                unsubscribeBlock\n              }\n            }\n          }\n        }\n      }\n    ':
    types.SubscriptionsByOperatorDocument,
  '\n      query GetEarnedRewards($operatorId: String!, $groupNamespace: String!) {\n        earnedRewards(\n          where: {\n            account: { operator: { id_eq: $operatorId } }\n            AND: { solutionGroup: { namespace_eq: $groupNamespace } }\n          }\n        ) {\n          id\n          subscriptionReward\n          participationReward\n        }\n      }\n    ':
    types.GetEarnedRewardsDocument,
  '\n      query ResultsSubmitted($rewardPeriod: Int!, $operatorId: String!, $groupNamespace: String!) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { index_eq: $rewardPeriod }\n            AND: {\n              operator: { id_eq: $operatorId }\n              AND: { solution: { solutionGroup: { namespace_eq: $groupNamespace } } }\n            }\n          }\n        ) {\n          id\n        }\n      }\n    ':
    types.ResultsSubmittedDocument,
  '\n      query Lowers($sender: String) {\n        avnLowers(where: { sender: { id_eq: $sender } }) {\n          id\n          when\n          amount\n          blockNumber\n          sender {\n            id\n          }\n          receiver\n          isPending\n          isFinalized\n        }\n      }\n    ':
    types.LowersDocument,
  '\n      query Lifts($receiver: String) {\n        avnLifts(where: { receiver: { id_eq: $receiver } }) {\n          id\n          when\n          amount\n          blockNumber\n          ewcTxHash\n          sender\n          receiver {\n            id\n          }\n        }\n      }\n    ':
    types.LiftsDocument,
  '\n      query MyQuery {\n        solutionGroups {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n        }\n      }\n    ':
    types.MyQueryDocument,
  '\n      query GetSolutionGroup($id: String!) {\n        solutionGroupById(id: $id) {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n          solutions {\n            id\n            status\n            namespace\n            additionToExtraneousGroupsAllowed\n            expirationBlock\n            workload {\n              workLogic\n              executionEnvironment\n            }\n            expirationBlock\n            info {\n              id\n              description\n              name\n            }\n          }\n        }\n      }\n    ':
    types.GetSolutionGroupDocument,
  '\n      query GetSubscriptionById($solutionNamespace: String!, $address: String!) {\n        operatorAccounts(where: { id_eq: $address }) {\n          id\n          subscriptions(where: { namespace_eq: $solutionNamespace }) {\n            namespace\n          }\n        }\n      }\n    ':
    types.GetSubscriptionByIdDocument,
  '\n      query GetLinkedWorkerNode($operatorId: String!) {\n        workerAccounts(where: { mapping: { operator: { id_eq: $operatorId } } }) {\n          address\n        }\n      }\n    ':
    types.GetLinkedWorkerNodeDocument,
  '\n      query GetUnclaimedRewards($operatorId: String!) {\n        unclaimedRewards(address: $operatorId) {\n          subscriptionReward\n          participationReward\n          solutionGroupId\n          address\n        }\n      }\n    ':
    types.GetUnclaimedRewardsDocument,
  '\n      query GetCanOperatorWorkerVote($operatorId: String!, $solutionNamespace: String!) {\n        canOperatorWorkerVote(address: $operatorId, solutionGroupId: $solutionNamespace) {\n          canVote\n        }\n      }\n    ':
    types.GetCanOperatorWorkerVoteDocument,
  '\n      query GetCanOperatorWorkersVote($operatorId: String!) {\n        canOperatorWorkerVote(address: $operatorId) {\n          solutionGroupId\n          canVote\n        }\n      }\n    ':
    types.GetCanOperatorWorkersVoteDocument,
  '\n      query GetEwtUsd($currency: String!) {\n        ewtPriceById(id: $currency) {\n          price\n        }\n      }\n    ':
    types.GetEwtUsdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query SolutionResultSubmitted($solutionId: String!, $operatorId: String!) {\n        solutionResultSubmitteds(\n          where: { operator: { id_eq: $operatorId }, AND: { solution: { id_eq: $solutionId } } }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query SolutionResultSubmitted($solutionId: String!, $operatorId: String!) {\n        solutionResultSubmitteds(\n          where: { operator: { id_eq: $operatorId }, AND: { solution: { id_eq: $solutionId } } }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query SolutionResultSubmittedByPeriod(\n        $rewardPeriod: String!\n        $solutionId: String!\n        $operatorId: String!\n      ) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { id_eq: $rewardPeriod }\n            AND: { solution: { id_eq: $solutionId }, AND: { operator: { id_eq: $operatorId } } }\n          }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          solutionGroup {\n            id\n          }\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query SolutionResultSubmittedByPeriod(\n        $rewardPeriod: String!\n        $solutionId: String!\n        $operatorId: String!\n      ) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { id_eq: $rewardPeriod }\n            AND: { solution: { id_eq: $solutionId }, AND: { operator: { id_eq: $operatorId } } }\n          }\n        ) {\n          result\n          extrinsicHash\n          blockHash\n          successful\n          blockNumber\n          solutionGroup {\n            id\n          }\n          rewardPeriodIndex {\n            id\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query SubscriptionsByOperator($id: String!) {\n        operatorAccountById(id: $id) {\n          subscribedStakes(orderBy: rewardPeriodIndex_DESC) {\n            currentStake\n            nextStake\n            rewardPeriodIndex\n            solutionGroup {\n              namespace\n            }\n          }\n          subscriptions {\n            id\n            namespace\n\n            solutionGroup {\n              id\n              namespace\n              operationStartBlock\n              operationEndBlock\n              withdrawalDelay\n              operatorsConfig {\n                startBlock\n                allowedOperators\n                maxOperatorWorkers\n                startBlock\n                stakingAmounts {\n                  min\n                  max\n                }\n                hasOperatorsAllowlist\n              }\n              rewardsConfig {\n                subscriptionRewardPerBlock\n                votingRewardPerBlock\n                topPerformanceBonus\n              }\n              info {\n                id\n                name\n                description\n                publisherInfo\n                logoUrl\n              }\n              solutions {\n                id\n                status\n                namespace\n                additionToExtraneousGroupsAllowed\n                expirationBlock\n                workload {\n                  workLogic\n                  executionEnvironment\n                }\n                expirationBlock\n                info {\n                  id\n                  description\n                }\n              }\n              scheduledUnsubscriptions(\n                orderBy: unsubscribeBlock_DESC_NULLS_LAST\n                where: { operator: { id_eq: $id } }\n                limit: 1\n              ) {\n                unsubscribeBlock\n              }\n            }\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query SubscriptionsByOperator($id: String!) {\n        operatorAccountById(id: $id) {\n          subscribedStakes(orderBy: rewardPeriodIndex_DESC) {\n            currentStake\n            nextStake\n            rewardPeriodIndex\n            solutionGroup {\n              namespace\n            }\n          }\n          subscriptions {\n            id\n            namespace\n\n            solutionGroup {\n              id\n              namespace\n              operationStartBlock\n              operationEndBlock\n              withdrawalDelay\n              operatorsConfig {\n                startBlock\n                allowedOperators\n                maxOperatorWorkers\n                startBlock\n                stakingAmounts {\n                  min\n                  max\n                }\n                hasOperatorsAllowlist\n              }\n              rewardsConfig {\n                subscriptionRewardPerBlock\n                votingRewardPerBlock\n                topPerformanceBonus\n              }\n              info {\n                id\n                name\n                description\n                publisherInfo\n                logoUrl\n              }\n              solutions {\n                id\n                status\n                namespace\n                additionToExtraneousGroupsAllowed\n                expirationBlock\n                workload {\n                  workLogic\n                  executionEnvironment\n                }\n                expirationBlock\n                info {\n                  id\n                  description\n                }\n              }\n              scheduledUnsubscriptions(\n                orderBy: unsubscribeBlock_DESC_NULLS_LAST\n                where: { operator: { id_eq: $id } }\n                limit: 1\n              ) {\n                unsubscribeBlock\n              }\n            }\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetEarnedRewards($operatorId: String!, $groupNamespace: String!) {\n        earnedRewards(\n          where: {\n            account: { operator: { id_eq: $operatorId } }\n            AND: { solutionGroup: { namespace_eq: $groupNamespace } }\n          }\n        ) {\n          id\n          subscriptionReward\n          participationReward\n        }\n      }\n    ',
): (typeof documents)['\n      query GetEarnedRewards($operatorId: String!, $groupNamespace: String!) {\n        earnedRewards(\n          where: {\n            account: { operator: { id_eq: $operatorId } }\n            AND: { solutionGroup: { namespace_eq: $groupNamespace } }\n          }\n        ) {\n          id\n          subscriptionReward\n          participationReward\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query ResultsSubmitted($rewardPeriod: Int!, $operatorId: String!, $groupNamespace: String!) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { index_eq: $rewardPeriod }\n            AND: {\n              operator: { id_eq: $operatorId }\n              AND: { solution: { solutionGroup: { namespace_eq: $groupNamespace } } }\n            }\n          }\n        ) {\n          id\n        }\n      }\n    ',
): (typeof documents)['\n      query ResultsSubmitted($rewardPeriod: Int!, $operatorId: String!, $groupNamespace: String!) {\n        solutionResultSubmitteds(\n          where: {\n            rewardPeriodIndex: { index_eq: $rewardPeriod }\n            AND: {\n              operator: { id_eq: $operatorId }\n              AND: { solution: { solutionGroup: { namespace_eq: $groupNamespace } } }\n            }\n          }\n        ) {\n          id\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Lowers($sender: String) {\n        avnLowers(where: { sender: { id_eq: $sender } }) {\n          id\n          when\n          amount\n          blockNumber\n          sender {\n            id\n          }\n          receiver\n          isPending\n          isFinalized\n        }\n      }\n    ',
): (typeof documents)['\n      query Lowers($sender: String) {\n        avnLowers(where: { sender: { id_eq: $sender } }) {\n          id\n          when\n          amount\n          blockNumber\n          sender {\n            id\n          }\n          receiver\n          isPending\n          isFinalized\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query Lifts($receiver: String) {\n        avnLifts(where: { receiver: { id_eq: $receiver } }) {\n          id\n          when\n          amount\n          blockNumber\n          ewcTxHash\n          sender\n          receiver {\n            id\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query Lifts($receiver: String) {\n        avnLifts(where: { receiver: { id_eq: $receiver } }) {\n          id\n          when\n          amount\n          blockNumber\n          ewcTxHash\n          sender\n          receiver {\n            id\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query MyQuery {\n        solutionGroups {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query MyQuery {\n        solutionGroups {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetSolutionGroup($id: String!) {\n        solutionGroupById(id: $id) {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n          solutions {\n            id\n            status\n            namespace\n            additionToExtraneousGroupsAllowed\n            expirationBlock\n            workload {\n              workLogic\n              executionEnvironment\n            }\n            expirationBlock\n            info {\n              id\n              description\n              name\n            }\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query GetSolutionGroup($id: String!) {\n        solutionGroupById(id: $id) {\n          id\n          withdrawalDelay\n          operationStartBlock\n          operationEndBlock\n          namespace\n          info {\n            description\n            id\n            logoUrl\n            name\n            publisherInfo\n          }\n          operatorsConfig {\n            allowedOperators\n            hasOperatorsAllowlist\n            id\n            maxOperatorWorkers\n            stakingAmounts {\n              id\n              max\n              min\n            }\n            startBlock\n          }\n          registrar {\n            friendlyName\n            id\n            isAllowed\n            legalLocation\n          }\n          rewardsConfig {\n            id\n            subscriptionRewardPerBlock\n            topPerformanceBonus\n            votingRewardPerBlock\n          }\n          solutions {\n            id\n            status\n            namespace\n            additionToExtraneousGroupsAllowed\n            expirationBlock\n            workload {\n              workLogic\n              executionEnvironment\n            }\n            expirationBlock\n            info {\n              id\n              description\n              name\n            }\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetSubscriptionById($solutionNamespace: String!, $address: String!) {\n        operatorAccounts(where: { id_eq: $address }) {\n          id\n          subscriptions(where: { namespace_eq: $solutionNamespace }) {\n            namespace\n          }\n        }\n      }\n    ',
): (typeof documents)['\n      query GetSubscriptionById($solutionNamespace: String!, $address: String!) {\n        operatorAccounts(where: { id_eq: $address }) {\n          id\n          subscriptions(where: { namespace_eq: $solutionNamespace }) {\n            namespace\n          }\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetLinkedWorkerNode($operatorId: String!) {\n        workerAccounts(where: { mapping: { operator: { id_eq: $operatorId } } }) {\n          address\n        }\n      }\n    ',
): (typeof documents)['\n      query GetLinkedWorkerNode($operatorId: String!) {\n        workerAccounts(where: { mapping: { operator: { id_eq: $operatorId } } }) {\n          address\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetUnclaimedRewards($operatorId: String!) {\n        unclaimedRewards(address: $operatorId) {\n          subscriptionReward\n          participationReward\n          solutionGroupId\n          address\n        }\n      }\n    ',
): (typeof documents)['\n      query GetUnclaimedRewards($operatorId: String!) {\n        unclaimedRewards(address: $operatorId) {\n          subscriptionReward\n          participationReward\n          solutionGroupId\n          address\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetCanOperatorWorkerVote($operatorId: String!, $solutionNamespace: String!) {\n        canOperatorWorkerVote(address: $operatorId, solutionGroupId: $solutionNamespace) {\n          canVote\n        }\n      }\n    ',
): (typeof documents)['\n      query GetCanOperatorWorkerVote($operatorId: String!, $solutionNamespace: String!) {\n        canOperatorWorkerVote(address: $operatorId, solutionGroupId: $solutionNamespace) {\n          canVote\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetCanOperatorWorkersVote($operatorId: String!) {\n        canOperatorWorkerVote(address: $operatorId) {\n          solutionGroupId\n          canVote\n        }\n      }\n    ',
): (typeof documents)['\n      query GetCanOperatorWorkersVote($operatorId: String!) {\n        canOperatorWorkerVote(address: $operatorId) {\n          solutionGroupId\n          canVote\n        }\n      }\n    '];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n      query GetEwtUsd($currency: String!) {\n        ewtPriceById(id: $currency) {\n          price\n        }\n      }\n    ',
): (typeof documents)['\n      query GetEwtUsd($currency: String!) {\n        ewtPriceById(id: $currency) {\n          price\n        }\n      }\n    '];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;

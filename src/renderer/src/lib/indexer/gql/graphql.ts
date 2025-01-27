/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Big number integer */
  BigInt: { input: any; output: any };
  /** A date-time string in simplified extended ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) */
  DateTime: { input: any; output: any };
};

export enum AccountOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  RegistrarFriendlyNameAsc = 'registrar_friendlyName_ASC',
  RegistrarFriendlyNameAscNullsFirst = 'registrar_friendlyName_ASC_NULLS_FIRST',
  RegistrarFriendlyNameAscNullsLast = 'registrar_friendlyName_ASC_NULLS_LAST',
  RegistrarFriendlyNameDesc = 'registrar_friendlyName_DESC',
  RegistrarFriendlyNameDescNullsFirst = 'registrar_friendlyName_DESC_NULLS_FIRST',
  RegistrarFriendlyNameDescNullsLast = 'registrar_friendlyName_DESC_NULLS_LAST',
  RegistrarIdAsc = 'registrar_id_ASC',
  RegistrarIdAscNullsFirst = 'registrar_id_ASC_NULLS_FIRST',
  RegistrarIdAscNullsLast = 'registrar_id_ASC_NULLS_LAST',
  RegistrarIdDesc = 'registrar_id_DESC',
  RegistrarIdDescNullsFirst = 'registrar_id_DESC_NULLS_FIRST',
  RegistrarIdDescNullsLast = 'registrar_id_DESC_NULLS_LAST',
  RegistrarIsAllowedAsc = 'registrar_isAllowed_ASC',
  RegistrarIsAllowedAscNullsFirst = 'registrar_isAllowed_ASC_NULLS_FIRST',
  RegistrarIsAllowedAscNullsLast = 'registrar_isAllowed_ASC_NULLS_LAST',
  RegistrarIsAllowedDesc = 'registrar_isAllowed_DESC',
  RegistrarIsAllowedDescNullsFirst = 'registrar_isAllowed_DESC_NULLS_FIRST',
  RegistrarIsAllowedDescNullsLast = 'registrar_isAllowed_DESC_NULLS_LAST',
  RegistrarLegalLocationAsc = 'registrar_legalLocation_ASC',
  RegistrarLegalLocationAscNullsFirst = 'registrar_legalLocation_ASC_NULLS_FIRST',
  RegistrarLegalLocationAscNullsLast = 'registrar_legalLocation_ASC_NULLS_LAST',
  RegistrarLegalLocationDesc = 'registrar_legalLocation_DESC',
  RegistrarLegalLocationDescNullsFirst = 'registrar_legalLocation_DESC_NULLS_FIRST',
  RegistrarLegalLocationDescNullsLast = 'registrar_legalLocation_DESC_NULLS_LAST',
  WorkerAddressAsc = 'worker_address_ASC',
  WorkerAddressAscNullsFirst = 'worker_address_ASC_NULLS_FIRST',
  WorkerAddressAscNullsLast = 'worker_address_ASC_NULLS_LAST',
  WorkerAddressDesc = 'worker_address_DESC',
  WorkerAddressDescNullsFirst = 'worker_address_DESC_NULLS_FIRST',
  WorkerAddressDescNullsLast = 'worker_address_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
}

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  avnLifts_every?: InputMaybe<AvnLiftWhereInput>;
  avnLifts_none?: InputMaybe<AvnLiftWhereInput>;
  avnLifts_some?: InputMaybe<AvnLiftWhereInput>;
  avnLowers_every?: InputMaybe<AvnLowerWhereInput>;
  avnLowers_none?: InputMaybe<AvnLowerWhereInput>;
  avnLowers_some?: InputMaybe<AvnLowerWhereInput>;
  earnedRewards_every?: InputMaybe<EarnedRewardsWhereInput>;
  earnedRewards_none?: InputMaybe<EarnedRewardsWhereInput>;
  earnedRewards_some?: InputMaybe<EarnedRewardsWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  registrar?: InputMaybe<RegistrarAccountWhereInput>;
  registrar_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  worker?: InputMaybe<WorkerAccountWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ActiveRewardPeriodInfoOrderByInput {
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  FirstBlockAsc = 'firstBlock_ASC',
  FirstBlockAscNullsFirst = 'firstBlock_ASC_NULLS_FIRST',
  FirstBlockAscNullsLast = 'firstBlock_ASC_NULLS_LAST',
  FirstBlockDesc = 'firstBlock_DESC',
  FirstBlockDescNullsFirst = 'firstBlock_DESC_NULLS_FIRST',
  FirstBlockDescNullsLast = 'firstBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IndexAsc = 'index_ASC',
  IndexAscNullsFirst = 'index_ASC_NULLS_FIRST',
  IndexAscNullsLast = 'index_ASC_NULLS_LAST',
  IndexDesc = 'index_DESC',
  IndexDescNullsFirst = 'index_DESC_NULLS_FIRST',
  IndexDescNullsLast = 'index_DESC_NULLS_LAST',
  LengthAsc = 'length_ASC',
  LengthAscNullsFirst = 'length_ASC_NULLS_FIRST',
  LengthAscNullsLast = 'length_ASC_NULLS_LAST',
  LengthDesc = 'length_DESC',
  LengthDescNullsFirst = 'length_DESC_NULLS_FIRST',
  LengthDescNullsLast = 'length_DESC_NULLS_LAST',
}

export type ActiveRewardPeriodInfoWhereInput = {
  AND?: InputMaybe<Array<ActiveRewardPeriodInfoWhereInput>>;
  OR?: InputMaybe<Array<ActiveRewardPeriodInfoWhereInput>>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  firstBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  firstBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  firstBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  firstBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  index_eq?: InputMaybe<Scalars['Int']['input']>;
  index_gt?: InputMaybe<Scalars['Int']['input']>;
  index_gte?: InputMaybe<Scalars['Int']['input']>;
  index_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  index_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  index_lt?: InputMaybe<Scalars['Int']['input']>;
  index_lte?: InputMaybe<Scalars['Int']['input']>;
  index_not_eq?: InputMaybe<Scalars['Int']['input']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  length_eq?: InputMaybe<Scalars['Int']['input']>;
  length_gt?: InputMaybe<Scalars['Int']['input']>;
  length_gte?: InputMaybe<Scalars['Int']['input']>;
  length_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  length_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  length_lt?: InputMaybe<Scalars['Int']['input']>;
  length_lte?: InputMaybe<Scalars['Int']['input']>;
  length_not_eq?: InputMaybe<Scalars['Int']['input']>;
  length_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  submittedVotes_every?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedVotes_none?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedVotes_some?: InputMaybe<SolutionResultSubmittedWhereInput>;
};

export enum AvnLiftOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  EwcTxHashAsc = 'ewcTxHash_ASC',
  EwcTxHashAscNullsFirst = 'ewcTxHash_ASC_NULLS_FIRST',
  EwcTxHashAscNullsLast = 'ewcTxHash_ASC_NULLS_LAST',
  EwcTxHashDesc = 'ewcTxHash_DESC',
  EwcTxHashDescNullsFirst = 'ewcTxHash_DESC_NULLS_FIRST',
  EwcTxHashDescNullsLast = 'ewcTxHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ReceiverIdAsc = 'receiver_id_ASC',
  ReceiverIdAscNullsFirst = 'receiver_id_ASC_NULLS_FIRST',
  ReceiverIdAscNullsLast = 'receiver_id_ASC_NULLS_LAST',
  ReceiverIdDesc = 'receiver_id_DESC',
  ReceiverIdDescNullsFirst = 'receiver_id_DESC_NULLS_FIRST',
  ReceiverIdDescNullsLast = 'receiver_id_DESC_NULLS_LAST',
  SenderAsc = 'sender_ASC',
  SenderAscNullsFirst = 'sender_ASC_NULLS_FIRST',
  SenderAscNullsLast = 'sender_ASC_NULLS_LAST',
  SenderDesc = 'sender_DESC',
  SenderDescNullsFirst = 'sender_DESC_NULLS_FIRST',
  SenderDescNullsLast = 'sender_DESC_NULLS_LAST',
  WhenAsc = 'when_ASC',
  WhenAscNullsFirst = 'when_ASC_NULLS_FIRST',
  WhenAscNullsLast = 'when_ASC_NULLS_LAST',
  WhenDesc = 'when_DESC',
  WhenDescNullsFirst = 'when_DESC_NULLS_FIRST',
  WhenDescNullsLast = 'when_DESC_NULLS_LAST',
}

export type AvnLiftWhereInput = {
  AND?: InputMaybe<Array<AvnLiftWhereInput>>;
  OR?: InputMaybe<Array<AvnLiftWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  ewcTxHash_contains?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_eq?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_gt?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_gte?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ewcTxHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ewcTxHash_lt?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_lte?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  ewcTxHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  ewcTxHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  receiver?: InputMaybe<AccountWhereInput>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_contains?: InputMaybe<Scalars['String']['input']>;
  sender_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_eq?: InputMaybe<Scalars['String']['input']>;
  sender_gt?: InputMaybe<Scalars['String']['input']>;
  sender_gte?: InputMaybe<Scalars['String']['input']>;
  sender_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  sender_lt?: InputMaybe<Scalars['String']['input']>;
  sender_lte?: InputMaybe<Scalars['String']['input']>;
  sender_not_contains?: InputMaybe<Scalars['String']['input']>;
  sender_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  sender_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  sender_not_eq?: InputMaybe<Scalars['String']['input']>;
  sender_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  sender_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender_startsWith?: InputMaybe<Scalars['String']['input']>;
  when_eq?: InputMaybe<Scalars['BigInt']['input']>;
  when_gt?: InputMaybe<Scalars['BigInt']['input']>;
  when_gte?: InputMaybe<Scalars['BigInt']['input']>;
  when_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  when_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  when_lt?: InputMaybe<Scalars['BigInt']['input']>;
  when_lte?: InputMaybe<Scalars['BigInt']['input']>;
  when_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  when_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum AvnLowerOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsFinalizedAsc = 'isFinalized_ASC',
  IsFinalizedAscNullsFirst = 'isFinalized_ASC_NULLS_FIRST',
  IsFinalizedAscNullsLast = 'isFinalized_ASC_NULLS_LAST',
  IsFinalizedDesc = 'isFinalized_DESC',
  IsFinalizedDescNullsFirst = 'isFinalized_DESC_NULLS_FIRST',
  IsFinalizedDescNullsLast = 'isFinalized_DESC_NULLS_LAST',
  IsPendingAsc = 'isPending_ASC',
  IsPendingAscNullsFirst = 'isPending_ASC_NULLS_FIRST',
  IsPendingAscNullsLast = 'isPending_ASC_NULLS_LAST',
  IsPendingDesc = 'isPending_DESC',
  IsPendingDescNullsFirst = 'isPending_DESC_NULLS_FIRST',
  IsPendingDescNullsLast = 'isPending_DESC_NULLS_LAST',
  LowerIdAsc = 'lowerId_ASC',
  LowerIdAscNullsFirst = 'lowerId_ASC_NULLS_FIRST',
  LowerIdAscNullsLast = 'lowerId_ASC_NULLS_LAST',
  LowerIdDesc = 'lowerId_DESC',
  LowerIdDescNullsFirst = 'lowerId_DESC_NULLS_FIRST',
  LowerIdDescNullsLast = 'lowerId_DESC_NULLS_LAST',
  LowerPendingProofAsc = 'lowerPendingProof_ASC',
  LowerPendingProofAscNullsFirst = 'lowerPendingProof_ASC_NULLS_FIRST',
  LowerPendingProofAscNullsLast = 'lowerPendingProof_ASC_NULLS_LAST',
  LowerPendingProofDesc = 'lowerPendingProof_DESC',
  LowerPendingProofDescNullsFirst = 'lowerPendingProof_DESC_NULLS_FIRST',
  LowerPendingProofDescNullsLast = 'lowerPendingProof_DESC_NULLS_LAST',
  ReceiverAsc = 'receiver_ASC',
  ReceiverAscNullsFirst = 'receiver_ASC_NULLS_FIRST',
  ReceiverAscNullsLast = 'receiver_ASC_NULLS_LAST',
  ReceiverDesc = 'receiver_DESC',
  ReceiverDescNullsFirst = 'receiver_DESC_NULLS_FIRST',
  ReceiverDescNullsLast = 'receiver_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientAscNullsLast = 'recipient_ASC_NULLS_LAST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsFirst = 'recipient_DESC_NULLS_FIRST',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST',
  SenderIdAsc = 'sender_id_ASC',
  SenderIdAscNullsFirst = 'sender_id_ASC_NULLS_FIRST',
  SenderIdAscNullsLast = 'sender_id_ASC_NULLS_LAST',
  SenderIdDesc = 'sender_id_DESC',
  SenderIdDescNullsFirst = 'sender_id_DESC_NULLS_FIRST',
  SenderIdDescNullsLast = 'sender_id_DESC_NULLS_LAST',
  WhenAsc = 'when_ASC',
  WhenAscNullsFirst = 'when_ASC_NULLS_FIRST',
  WhenAscNullsLast = 'when_ASC_NULLS_LAST',
  WhenDesc = 'when_DESC',
  WhenDescNullsFirst = 'when_DESC_NULLS_FIRST',
  WhenDescNullsLast = 'when_DESC_NULLS_LAST',
}

export type AvnLowerWhereInput = {
  AND?: InputMaybe<Array<AvnLowerWhereInput>>;
  OR?: InputMaybe<Array<AvnLowerWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isFinalized_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isFinalized_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPending_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPending_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isPending_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  lowerId_eq?: InputMaybe<Scalars['Int']['input']>;
  lowerId_gt?: InputMaybe<Scalars['Int']['input']>;
  lowerId_gte?: InputMaybe<Scalars['Int']['input']>;
  lowerId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lowerId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lowerId_lt?: InputMaybe<Scalars['Int']['input']>;
  lowerId_lte?: InputMaybe<Scalars['Int']['input']>;
  lowerId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  lowerId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  lowerPendingProof_contains?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_endsWith?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_eq?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_gt?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_gte?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lowerPendingProof_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  lowerPendingProof_lt?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_lte?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_not_contains?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_not_eq?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  lowerPendingProof_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  lowerPendingProof_startsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  receiver_endsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_eq?: InputMaybe<Scalars['String']['input']>;
  receiver_gt?: InputMaybe<Scalars['String']['input']>;
  receiver_gte?: InputMaybe<Scalars['String']['input']>;
  receiver_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  receiver_lt?: InputMaybe<Scalars['String']['input']>;
  receiver_lte?: InputMaybe<Scalars['String']['input']>;
  receiver_not_contains?: InputMaybe<Scalars['String']['input']>;
  receiver_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  receiver_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_not_eq?: InputMaybe<Scalars['String']['input']>;
  receiver_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  receiver_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  receiver_startsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_not_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_startsWith?: InputMaybe<Scalars['String']['input']>;
  sender?: InputMaybe<AccountWhereInput>;
  sender_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  when_eq?: InputMaybe<Scalars['BigInt']['input']>;
  when_gt?: InputMaybe<Scalars['BigInt']['input']>;
  when_gte?: InputMaybe<Scalars['BigInt']['input']>;
  when_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  when_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  when_lt?: InputMaybe<Scalars['BigInt']['input']>;
  when_lte?: InputMaybe<Scalars['BigInt']['input']>;
  when_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  when_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum EarnedRewardsOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ParticipationRewardAsc = 'participationReward_ASC',
  ParticipationRewardAscNullsFirst = 'participationReward_ASC_NULLS_FIRST',
  ParticipationRewardAscNullsLast = 'participationReward_ASC_NULLS_LAST',
  ParticipationRewardDesc = 'participationReward_DESC',
  ParticipationRewardDescNullsFirst = 'participationReward_DESC_NULLS_FIRST',
  ParticipationRewardDescNullsLast = 'participationReward_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
  SubscriptionRewardAsc = 'subscriptionReward_ASC',
  SubscriptionRewardAscNullsFirst = 'subscriptionReward_ASC_NULLS_FIRST',
  SubscriptionRewardAscNullsLast = 'subscriptionReward_ASC_NULLS_LAST',
  SubscriptionRewardDesc = 'subscriptionReward_DESC',
  SubscriptionRewardDescNullsFirst = 'subscriptionReward_DESC_NULLS_FIRST',
  SubscriptionRewardDescNullsLast = 'subscriptionReward_DESC_NULLS_LAST',
}

export type EarnedRewardsWhereInput = {
  AND?: InputMaybe<Array<EarnedRewardsWhereInput>>;
  OR?: InputMaybe<Array<EarnedRewardsWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  participationReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  participationReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  participationReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  participationReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subscriptionReward_eq?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subscriptionReward_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subscriptionReward_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionReward_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum EventsOrderByInput {
  BlockHashAsc = 'blockHash_ASC',
  BlockHashAscNullsFirst = 'blockHash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'blockHash_ASC_NULLS_LAST',
  BlockHashDesc = 'blockHash_DESC',
  BlockHashDescNullsFirst = 'blockHash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'blockHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SpecVersionAsc = 'specVersion_ASC',
  SpecVersionAscNullsFirst = 'specVersion_ASC_NULLS_FIRST',
  SpecVersionAscNullsLast = 'specVersion_ASC_NULLS_LAST',
  SpecVersionDesc = 'specVersion_DESC',
  SpecVersionDescNullsFirst = 'specVersion_DESC_NULLS_FIRST',
  SpecVersionDescNullsLast = 'specVersion_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
}

export type EventsWhereInput = {
  AND?: InputMaybe<Array<EventsWhereInput>>;
  OR?: InputMaybe<Array<EventsWhereInput>>;
  blockHash_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_gt?: InputMaybe<Scalars['String']['input']>;
  blockHash_gte?: InputMaybe<Scalars['String']['input']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockHash_lt?: InputMaybe<Scalars['String']['input']>;
  blockHash_lte?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  specVersion_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_gte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  specVersion_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  specVersion_lt?: InputMaybe<Scalars['Int']['input']>;
  specVersion_lte?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_eq?: InputMaybe<Scalars['Int']['input']>;
  specVersion_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_gte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['DateTime']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export enum EwtPriceOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceAscNullsLast = 'price_ASC_NULLS_LAST',
  PriceDesc = 'price_DESC',
  PriceDescNullsFirst = 'price_DESC_NULLS_FIRST',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  RefreshedOnBlockAsc = 'refreshedOnBlock_ASC',
  RefreshedOnBlockAscNullsFirst = 'refreshedOnBlock_ASC_NULLS_FIRST',
  RefreshedOnBlockAscNullsLast = 'refreshedOnBlock_ASC_NULLS_LAST',
  RefreshedOnBlockDesc = 'refreshedOnBlock_DESC',
  RefreshedOnBlockDescNullsFirst = 'refreshedOnBlock_DESC_NULLS_FIRST',
  RefreshedOnBlockDescNullsLast = 'refreshedOnBlock_DESC_NULLS_LAST',
}

export type EwtPriceWhereInput = {
  AND?: InputMaybe<Array<EwtPriceWhereInput>>;
  OR?: InputMaybe<Array<EwtPriceWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  price_eq?: InputMaybe<Scalars['Float']['input']>;
  price_gt?: InputMaybe<Scalars['Float']['input']>;
  price_gte?: InputMaybe<Scalars['Float']['input']>;
  price_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  price_lt?: InputMaybe<Scalars['Float']['input']>;
  price_lte?: InputMaybe<Scalars['Float']['input']>;
  price_not_eq?: InputMaybe<Scalars['Float']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  refreshedOnBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  refreshedOnBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  refreshedOnBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  refreshedOnBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum ExtrinsicFailedOrderByInput {
  BlockHashAsc = 'blockHash_ASC',
  BlockHashAscNullsFirst = 'blockHash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'blockHash_ASC_NULLS_LAST',
  BlockHashDesc = 'blockHash_DESC',
  BlockHashDescNullsFirst = 'blockHash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'blockHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ErrorNameAsc = 'errorName_ASC',
  ErrorNameAscNullsFirst = 'errorName_ASC_NULLS_FIRST',
  ErrorNameAscNullsLast = 'errorName_ASC_NULLS_LAST',
  ErrorNameDesc = 'errorName_DESC',
  ErrorNameDescNullsFirst = 'errorName_DESC_NULLS_FIRST',
  ErrorNameDescNullsLast = 'errorName_DESC_NULLS_LAST',
  EventIdAsc = 'eventId_ASC',
  EventIdAscNullsFirst = 'eventId_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'eventId_ASC_NULLS_LAST',
  EventIdDesc = 'eventId_DESC',
  EventIdDescNullsFirst = 'eventId_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'eventId_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PalletAsc = 'pallet_ASC',
  PalletAscNullsFirst = 'pallet_ASC_NULLS_FIRST',
  PalletAscNullsLast = 'pallet_ASC_NULLS_LAST',
  PalletDesc = 'pallet_DESC',
  PalletDescNullsFirst = 'pallet_DESC_NULLS_FIRST',
  PalletDescNullsLast = 'pallet_DESC_NULLS_LAST',
}

export type ExtrinsicFailedWhereInput = {
  AND?: InputMaybe<Array<ExtrinsicFailedWhereInput>>;
  OR?: InputMaybe<Array<ExtrinsicFailedWhereInput>>;
  blockHash_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_gt?: InputMaybe<Scalars['String']['input']>;
  blockHash_gte?: InputMaybe<Scalars['String']['input']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockHash_lt?: InputMaybe<Scalars['String']['input']>;
  blockHash_lte?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  docs_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  docs_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  docs_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  docs_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorName_contains?: InputMaybe<Scalars['String']['input']>;
  errorName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorName_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_eq?: InputMaybe<Scalars['String']['input']>;
  errorName_gt?: InputMaybe<Scalars['String']['input']>;
  errorName_gte?: InputMaybe<Scalars['String']['input']>;
  errorName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  errorName_lt?: InputMaybe<Scalars['String']['input']>;
  errorName_lte?: InputMaybe<Scalars['String']['input']>;
  errorName_not_contains?: InputMaybe<Scalars['String']['input']>;
  errorName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  errorName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_not_eq?: InputMaybe<Scalars['String']['input']>;
  errorName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  errorName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  errorName_startsWith?: InputMaybe<Scalars['String']['input']>;
  eventId_contains?: InputMaybe<Scalars['String']['input']>;
  eventId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  eventId_endsWith?: InputMaybe<Scalars['String']['input']>;
  eventId_eq?: InputMaybe<Scalars['String']['input']>;
  eventId_gt?: InputMaybe<Scalars['String']['input']>;
  eventId_gte?: InputMaybe<Scalars['String']['input']>;
  eventId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventId_lt?: InputMaybe<Scalars['String']['input']>;
  eventId_lte?: InputMaybe<Scalars['String']['input']>;
  eventId_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  eventId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  eventId_not_eq?: InputMaybe<Scalars['String']['input']>;
  eventId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  eventId_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_gt?: InputMaybe<Scalars['String']['input']>;
  pallet_gte?: InputMaybe<Scalars['String']['input']>;
  pallet_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  pallet_lt?: InputMaybe<Scalars['String']['input']>;
  pallet_lte?: InputMaybe<Scalars['String']['input']>;
  pallet_not_contains?: InputMaybe<Scalars['String']['input']>;
  pallet_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  pallet_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_not_eq?: InputMaybe<Scalars['String']['input']>;
  pallet_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  pallet_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  pallet_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum InitRunOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
}

export type InitRunWhereInput = {
  AND?: InputMaybe<Array<InitRunWhereInput>>;
  OR?: InputMaybe<Array<InitRunWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum NominatedWorkersMappingOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SolutionAdditionToExtraneousGroupsAllowedAsc = 'solution_additionToExtraneousGroupsAllowed_ASC',
  SolutionAdditionToExtraneousGroupsAllowedAscNullsFirst = 'solution_additionToExtraneousGroupsAllowed_ASC_NULLS_FIRST',
  SolutionAdditionToExtraneousGroupsAllowedAscNullsLast = 'solution_additionToExtraneousGroupsAllowed_ASC_NULLS_LAST',
  SolutionAdditionToExtraneousGroupsAllowedDesc = 'solution_additionToExtraneousGroupsAllowed_DESC',
  SolutionAdditionToExtraneousGroupsAllowedDescNullsFirst = 'solution_additionToExtraneousGroupsAllowed_DESC_NULLS_FIRST',
  SolutionAdditionToExtraneousGroupsAllowedDescNullsLast = 'solution_additionToExtraneousGroupsAllowed_DESC_NULLS_LAST',
  SolutionExpirationBlockAsc = 'solution_expirationBlock_ASC',
  SolutionExpirationBlockAscNullsFirst = 'solution_expirationBlock_ASC_NULLS_FIRST',
  SolutionExpirationBlockAscNullsLast = 'solution_expirationBlock_ASC_NULLS_LAST',
  SolutionExpirationBlockDesc = 'solution_expirationBlock_DESC',
  SolutionExpirationBlockDescNullsFirst = 'solution_expirationBlock_DESC_NULLS_FIRST',
  SolutionExpirationBlockDescNullsLast = 'solution_expirationBlock_DESC_NULLS_LAST',
  SolutionIdAsc = 'solution_id_ASC',
  SolutionIdAscNullsFirst = 'solution_id_ASC_NULLS_FIRST',
  SolutionIdAscNullsLast = 'solution_id_ASC_NULLS_LAST',
  SolutionIdDesc = 'solution_id_DESC',
  SolutionIdDescNullsFirst = 'solution_id_DESC_NULLS_FIRST',
  SolutionIdDescNullsLast = 'solution_id_DESC_NULLS_LAST',
  SolutionNamespaceAsc = 'solution_namespace_ASC',
  SolutionNamespaceAscNullsFirst = 'solution_namespace_ASC_NULLS_FIRST',
  SolutionNamespaceAscNullsLast = 'solution_namespace_ASC_NULLS_LAST',
  SolutionNamespaceDesc = 'solution_namespace_DESC',
  SolutionNamespaceDescNullsFirst = 'solution_namespace_DESC_NULLS_FIRST',
  SolutionNamespaceDescNullsLast = 'solution_namespace_DESC_NULLS_LAST',
  SolutionNominationsEnabledAsc = 'solution_nominationsEnabled_ASC',
  SolutionNominationsEnabledAscNullsFirst = 'solution_nominationsEnabled_ASC_NULLS_FIRST',
  SolutionNominationsEnabledAscNullsLast = 'solution_nominationsEnabled_ASC_NULLS_LAST',
  SolutionNominationsEnabledDesc = 'solution_nominationsEnabled_DESC',
  SolutionNominationsEnabledDescNullsFirst = 'solution_nominationsEnabled_DESC_NULLS_FIRST',
  SolutionNominationsEnabledDescNullsLast = 'solution_nominationsEnabled_DESC_NULLS_LAST',
  SolutionStatusAsc = 'solution_status_ASC',
  SolutionStatusAscNullsFirst = 'solution_status_ASC_NULLS_FIRST',
  SolutionStatusAscNullsLast = 'solution_status_ASC_NULLS_LAST',
  SolutionStatusDesc = 'solution_status_DESC',
  SolutionStatusDescNullsFirst = 'solution_status_DESC_NULLS_FIRST',
  SolutionStatusDescNullsLast = 'solution_status_DESC_NULLS_LAST',
  WorkerAddressAsc = 'worker_address_ASC',
  WorkerAddressAscNullsFirst = 'worker_address_ASC_NULLS_FIRST',
  WorkerAddressAscNullsLast = 'worker_address_ASC_NULLS_LAST',
  WorkerAddressDesc = 'worker_address_DESC',
  WorkerAddressDescNullsFirst = 'worker_address_DESC_NULLS_FIRST',
  WorkerAddressDescNullsLast = 'worker_address_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
}

export type NominatedWorkersMappingWhereInput = {
  AND?: InputMaybe<Array<NominatedWorkersMappingWhereInput>>;
  OR?: InputMaybe<Array<NominatedWorkersMappingWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  solution?: InputMaybe<SolutionWhereInput>;
  solution_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  worker?: InputMaybe<WorkerAccountWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum OperatorAccountOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  FriendlyNameAsc = 'friendlyName_ASC',
  FriendlyNameAscNullsFirst = 'friendlyName_ASC_NULLS_FIRST',
  FriendlyNameAscNullsLast = 'friendlyName_ASC_NULLS_LAST',
  FriendlyNameDesc = 'friendlyName_DESC',
  FriendlyNameDescNullsFirst = 'friendlyName_DESC_NULLS_FIRST',
  FriendlyNameDescNullsLast = 'friendlyName_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LegalLocationAsc = 'legalLocation_ASC',
  LegalLocationAscNullsFirst = 'legalLocation_ASC_NULLS_FIRST',
  LegalLocationAscNullsLast = 'legalLocation_ASC_NULLS_LAST',
  LegalLocationDesc = 'legalLocation_DESC',
  LegalLocationDescNullsFirst = 'legalLocation_DESC_NULLS_FIRST',
  LegalLocationDescNullsLast = 'legalLocation_DESC_NULLS_LAST',
}

export type OperatorAccountWhereInput = {
  AND?: InputMaybe<Array<OperatorAccountWhereInput>>;
  OR?: InputMaybe<Array<OperatorAccountWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  allowedSolutionGroups_every?: InputMaybe<OperatorAllowedSolutionGroupsWhereInput>;
  allowedSolutionGroups_none?: InputMaybe<OperatorAllowedSolutionGroupsWhereInput>;
  allowedSolutionGroups_some?: InputMaybe<OperatorAllowedSolutionGroupsWhereInput>;
  friendlyName_contains?: InputMaybe<Scalars['String']['input']>;
  friendlyName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  friendlyName_endsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_eq?: InputMaybe<Scalars['String']['input']>;
  friendlyName_gt?: InputMaybe<Scalars['String']['input']>;
  friendlyName_gte?: InputMaybe<Scalars['String']['input']>;
  friendlyName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  friendlyName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  friendlyName_lt?: InputMaybe<Scalars['String']['input']>;
  friendlyName_lte?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_eq?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  friendlyName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_contains?: InputMaybe<Scalars['String']['input']>;
  legalLocation_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  legalLocation_endsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_eq?: InputMaybe<Scalars['String']['input']>;
  legalLocation_gt?: InputMaybe<Scalars['String']['input']>;
  legalLocation_gte?: InputMaybe<Scalars['String']['input']>;
  legalLocation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legalLocation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  legalLocation_lt?: InputMaybe<Scalars['String']['input']>;
  legalLocation_lte?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_eq?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legalLocation_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_startsWith?: InputMaybe<Scalars['String']['input']>;
  mappings_every?: InputMaybe<OperatorMappingWhereInput>;
  mappings_none?: InputMaybe<OperatorMappingWhereInput>;
  mappings_some?: InputMaybe<OperatorMappingWhereInput>;
  scheduledUnsubscriptions_every?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  scheduledUnsubscriptions_none?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  scheduledUnsubscriptions_some?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  submittedResults_every?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_none?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_some?: InputMaybe<SolutionResultSubmittedWhereInput>;
  subscribedStakes_every?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  subscribedStakes_none?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  subscribedStakes_some?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  subscriptions_every?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
  subscriptions_none?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
  subscriptions_some?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
};

export enum OperatorAllowedSolutionGroupsOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
}

export type OperatorAllowedSolutionGroupsWhereInput = {
  AND?: InputMaybe<Array<OperatorAllowedSolutionGroupsWhereInput>>;
  OR?: InputMaybe<Array<OperatorAllowedSolutionGroupsWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum OperatorMappingOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  WorkerAddressAsc = 'worker_address_ASC',
  WorkerAddressAscNullsFirst = 'worker_address_ASC_NULLS_FIRST',
  WorkerAddressAscNullsLast = 'worker_address_ASC_NULLS_LAST',
  WorkerAddressDesc = 'worker_address_DESC',
  WorkerAddressDescNullsFirst = 'worker_address_DESC_NULLS_FIRST',
  WorkerAddressDescNullsLast = 'worker_address_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
}

export type OperatorMappingWhereInput = {
  AND?: InputMaybe<Array<OperatorMappingWhereInput>>;
  OR?: InputMaybe<Array<OperatorMappingWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  worker?: InputMaybe<WorkerAccountWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum OperatorSubscribedSolutionGroupsOrderByInput {
  BlockHashAsc = 'blockHash_ASC',
  BlockHashAscNullsFirst = 'blockHash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'blockHash_ASC_NULLS_LAST',
  BlockHashDesc = 'blockHash_DESC',
  BlockHashDescNullsFirst = 'blockHash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'blockHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NamespaceAsc = 'namespace_ASC',
  NamespaceAscNullsFirst = 'namespace_ASC_NULLS_FIRST',
  NamespaceAscNullsLast = 'namespace_ASC_NULLS_LAST',
  NamespaceDesc = 'namespace_DESC',
  NamespaceDescNullsFirst = 'namespace_DESC_NULLS_FIRST',
  NamespaceDescNullsLast = 'namespace_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  RewardPeriodIndexBlockNumberAsc = 'rewardPeriodIndex_blockNumber_ASC',
  RewardPeriodIndexBlockNumberAscNullsFirst = 'rewardPeriodIndex_blockNumber_ASC_NULLS_FIRST',
  RewardPeriodIndexBlockNumberAscNullsLast = 'rewardPeriodIndex_blockNumber_ASC_NULLS_LAST',
  RewardPeriodIndexBlockNumberDesc = 'rewardPeriodIndex_blockNumber_DESC',
  RewardPeriodIndexBlockNumberDescNullsFirst = 'rewardPeriodIndex_blockNumber_DESC_NULLS_FIRST',
  RewardPeriodIndexBlockNumberDescNullsLast = 'rewardPeriodIndex_blockNumber_DESC_NULLS_LAST',
  RewardPeriodIndexFirstBlockAsc = 'rewardPeriodIndex_firstBlock_ASC',
  RewardPeriodIndexFirstBlockAscNullsFirst = 'rewardPeriodIndex_firstBlock_ASC_NULLS_FIRST',
  RewardPeriodIndexFirstBlockAscNullsLast = 'rewardPeriodIndex_firstBlock_ASC_NULLS_LAST',
  RewardPeriodIndexFirstBlockDesc = 'rewardPeriodIndex_firstBlock_DESC',
  RewardPeriodIndexFirstBlockDescNullsFirst = 'rewardPeriodIndex_firstBlock_DESC_NULLS_FIRST',
  RewardPeriodIndexFirstBlockDescNullsLast = 'rewardPeriodIndex_firstBlock_DESC_NULLS_LAST',
  RewardPeriodIndexIdAsc = 'rewardPeriodIndex_id_ASC',
  RewardPeriodIndexIdAscNullsFirst = 'rewardPeriodIndex_id_ASC_NULLS_FIRST',
  RewardPeriodIndexIdAscNullsLast = 'rewardPeriodIndex_id_ASC_NULLS_LAST',
  RewardPeriodIndexIdDesc = 'rewardPeriodIndex_id_DESC',
  RewardPeriodIndexIdDescNullsFirst = 'rewardPeriodIndex_id_DESC_NULLS_FIRST',
  RewardPeriodIndexIdDescNullsLast = 'rewardPeriodIndex_id_DESC_NULLS_LAST',
  RewardPeriodIndexIndexAsc = 'rewardPeriodIndex_index_ASC',
  RewardPeriodIndexIndexAscNullsFirst = 'rewardPeriodIndex_index_ASC_NULLS_FIRST',
  RewardPeriodIndexIndexAscNullsLast = 'rewardPeriodIndex_index_ASC_NULLS_LAST',
  RewardPeriodIndexIndexDesc = 'rewardPeriodIndex_index_DESC',
  RewardPeriodIndexIndexDescNullsFirst = 'rewardPeriodIndex_index_DESC_NULLS_FIRST',
  RewardPeriodIndexIndexDescNullsLast = 'rewardPeriodIndex_index_DESC_NULLS_LAST',
  RewardPeriodIndexLengthAsc = 'rewardPeriodIndex_length_ASC',
  RewardPeriodIndexLengthAscNullsFirst = 'rewardPeriodIndex_length_ASC_NULLS_FIRST',
  RewardPeriodIndexLengthAscNullsLast = 'rewardPeriodIndex_length_ASC_NULLS_LAST',
  RewardPeriodIndexLengthDesc = 'rewardPeriodIndex_length_DESC',
  RewardPeriodIndexLengthDescNullsFirst = 'rewardPeriodIndex_length_DESC_NULLS_FIRST',
  RewardPeriodIndexLengthDescNullsLast = 'rewardPeriodIndex_length_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
}

export type OperatorSubscribedSolutionGroupsWhereInput = {
  AND?: InputMaybe<Array<OperatorSubscribedSolutionGroupsWhereInput>>;
  OR?: InputMaybe<Array<OperatorSubscribedSolutionGroupsWhereInput>>;
  blockHash_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_gt?: InputMaybe<Scalars['String']['input']>;
  blockHash_gte?: InputMaybe<Scalars['String']['input']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockHash_lt?: InputMaybe<Scalars['String']['input']>;
  blockHash_lte?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_gt?: InputMaybe<Scalars['String']['input']>;
  namespace_gte?: InputMaybe<Scalars['String']['input']>;
  namespace_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  namespace_lt?: InputMaybe<Scalars['String']['input']>;
  namespace_lte?: InputMaybe<Scalars['String']['input']>;
  namespace_not_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_not_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardPeriodIndex?: InputMaybe<ActiveRewardPeriodInfoWhereInput>;
  rewardPeriodIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum OperatorSubscribedStakeOrderByInput {
  CurrentStakeAsc = 'currentStake_ASC',
  CurrentStakeAscNullsFirst = 'currentStake_ASC_NULLS_FIRST',
  CurrentStakeAscNullsLast = 'currentStake_ASC_NULLS_LAST',
  CurrentStakeDesc = 'currentStake_DESC',
  CurrentStakeDescNullsFirst = 'currentStake_DESC_NULLS_FIRST',
  CurrentStakeDescNullsLast = 'currentStake_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NextStakeAsc = 'nextStake_ASC',
  NextStakeAscNullsFirst = 'nextStake_ASC_NULLS_FIRST',
  NextStakeAscNullsLast = 'nextStake_ASC_NULLS_LAST',
  NextStakeDesc = 'nextStake_DESC',
  NextStakeDescNullsFirst = 'nextStake_DESC_NULLS_FIRST',
  NextStakeDescNullsLast = 'nextStake_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  RewardPeriodBlockNumberAsc = 'rewardPeriod_blockNumber_ASC',
  RewardPeriodBlockNumberAscNullsFirst = 'rewardPeriod_blockNumber_ASC_NULLS_FIRST',
  RewardPeriodBlockNumberAscNullsLast = 'rewardPeriod_blockNumber_ASC_NULLS_LAST',
  RewardPeriodBlockNumberDesc = 'rewardPeriod_blockNumber_DESC',
  RewardPeriodBlockNumberDescNullsFirst = 'rewardPeriod_blockNumber_DESC_NULLS_FIRST',
  RewardPeriodBlockNumberDescNullsLast = 'rewardPeriod_blockNumber_DESC_NULLS_LAST',
  RewardPeriodFirstBlockAsc = 'rewardPeriod_firstBlock_ASC',
  RewardPeriodFirstBlockAscNullsFirst = 'rewardPeriod_firstBlock_ASC_NULLS_FIRST',
  RewardPeriodFirstBlockAscNullsLast = 'rewardPeriod_firstBlock_ASC_NULLS_LAST',
  RewardPeriodFirstBlockDesc = 'rewardPeriod_firstBlock_DESC',
  RewardPeriodFirstBlockDescNullsFirst = 'rewardPeriod_firstBlock_DESC_NULLS_FIRST',
  RewardPeriodFirstBlockDescNullsLast = 'rewardPeriod_firstBlock_DESC_NULLS_LAST',
  RewardPeriodIdAsc = 'rewardPeriod_id_ASC',
  RewardPeriodIdAscNullsFirst = 'rewardPeriod_id_ASC_NULLS_FIRST',
  RewardPeriodIdAscNullsLast = 'rewardPeriod_id_ASC_NULLS_LAST',
  RewardPeriodIdDesc = 'rewardPeriod_id_DESC',
  RewardPeriodIdDescNullsFirst = 'rewardPeriod_id_DESC_NULLS_FIRST',
  RewardPeriodIdDescNullsLast = 'rewardPeriod_id_DESC_NULLS_LAST',
  RewardPeriodIndexAsc = 'rewardPeriod_index_ASC',
  RewardPeriodIndexAscNullsFirst = 'rewardPeriod_index_ASC_NULLS_FIRST',
  RewardPeriodIndexAscNullsLast = 'rewardPeriod_index_ASC_NULLS_LAST',
  RewardPeriodIndexDesc = 'rewardPeriod_index_DESC',
  RewardPeriodIndexDescNullsFirst = 'rewardPeriod_index_DESC_NULLS_FIRST',
  RewardPeriodIndexDescNullsLast = 'rewardPeriod_index_DESC_NULLS_LAST',
  RewardPeriodLengthAsc = 'rewardPeriod_length_ASC',
  RewardPeriodLengthAscNullsFirst = 'rewardPeriod_length_ASC_NULLS_FIRST',
  RewardPeriodLengthAscNullsLast = 'rewardPeriod_length_ASC_NULLS_LAST',
  RewardPeriodLengthDesc = 'rewardPeriod_length_DESC',
  RewardPeriodLengthDescNullsFirst = 'rewardPeriod_length_DESC_NULLS_FIRST',
  RewardPeriodLengthDescNullsLast = 'rewardPeriod_length_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
}

export type OperatorSubscribedStakeWhereInput = {
  AND?: InputMaybe<Array<OperatorSubscribedStakeWhereInput>>;
  OR?: InputMaybe<Array<OperatorSubscribedStakeWhereInput>>;
  currentStake_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  currentStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  currentStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  currentStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  nextStake_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_gt?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_gte?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  nextStake_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nextStake_lt?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_lte?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  nextStake_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardPeriod?: InputMaybe<ActiveRewardPeriodInfoWhereInput>;
  rewardPeriodIndex_eq?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_gt?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_gte?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rewardPeriodIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardPeriodIndex_lt?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_lte?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_not_eq?: InputMaybe<Scalars['Int']['input']>;
  rewardPeriodIndex_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  rewardPeriod_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum RegistrarAccountOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  FriendlyNameAsc = 'friendlyName_ASC',
  FriendlyNameAscNullsFirst = 'friendlyName_ASC_NULLS_FIRST',
  FriendlyNameAscNullsLast = 'friendlyName_ASC_NULLS_LAST',
  FriendlyNameDesc = 'friendlyName_DESC',
  FriendlyNameDescNullsFirst = 'friendlyName_DESC_NULLS_FIRST',
  FriendlyNameDescNullsLast = 'friendlyName_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsAllowedAsc = 'isAllowed_ASC',
  IsAllowedAscNullsFirst = 'isAllowed_ASC_NULLS_FIRST',
  IsAllowedAscNullsLast = 'isAllowed_ASC_NULLS_LAST',
  IsAllowedDesc = 'isAllowed_DESC',
  IsAllowedDescNullsFirst = 'isAllowed_DESC_NULLS_FIRST',
  IsAllowedDescNullsLast = 'isAllowed_DESC_NULLS_LAST',
  LegalLocationAsc = 'legalLocation_ASC',
  LegalLocationAscNullsFirst = 'legalLocation_ASC_NULLS_FIRST',
  LegalLocationAscNullsLast = 'legalLocation_ASC_NULLS_LAST',
  LegalLocationDesc = 'legalLocation_DESC',
  LegalLocationDescNullsFirst = 'legalLocation_DESC_NULLS_FIRST',
  LegalLocationDescNullsLast = 'legalLocation_DESC_NULLS_LAST',
}

export type RegistrarAccountWhereInput = {
  AND?: InputMaybe<Array<RegistrarAccountWhereInput>>;
  OR?: InputMaybe<Array<RegistrarAccountWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  friendlyName_contains?: InputMaybe<Scalars['String']['input']>;
  friendlyName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  friendlyName_endsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_eq?: InputMaybe<Scalars['String']['input']>;
  friendlyName_gt?: InputMaybe<Scalars['String']['input']>;
  friendlyName_gte?: InputMaybe<Scalars['String']['input']>;
  friendlyName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  friendlyName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  friendlyName_lt?: InputMaybe<Scalars['String']['input']>;
  friendlyName_lte?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_contains?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_eq?: InputMaybe<Scalars['String']['input']>;
  friendlyName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  friendlyName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  friendlyName_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isAllowed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isAllowed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  legalLocation_contains?: InputMaybe<Scalars['String']['input']>;
  legalLocation_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  legalLocation_endsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_eq?: InputMaybe<Scalars['String']['input']>;
  legalLocation_gt?: InputMaybe<Scalars['String']['input']>;
  legalLocation_gte?: InputMaybe<Scalars['String']['input']>;
  legalLocation_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legalLocation_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  legalLocation_lt?: InputMaybe<Scalars['String']['input']>;
  legalLocation_lte?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_contains?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_eq?: InputMaybe<Scalars['String']['input']>;
  legalLocation_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  legalLocation_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  legalLocation_startsWith?: InputMaybe<Scalars['String']['input']>;
  solutionsGroups_every?: InputMaybe<SolutionGroupWhereInput>;
  solutionsGroups_none?: InputMaybe<SolutionGroupWhereInput>;
  solutionsGroups_some?: InputMaybe<SolutionGroupWhereInput>;
  solutions_every?: InputMaybe<SolutionWhereInput>;
  solutions_none?: InputMaybe<SolutionWhereInput>;
  solutions_some?: InputMaybe<SolutionWhereInput>;
};

export enum RewardsCalculatedForPeriodOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RewardPeriodInfoBlockNumberAsc = 'rewardPeriodInfo_blockNumber_ASC',
  RewardPeriodInfoBlockNumberAscNullsFirst = 'rewardPeriodInfo_blockNumber_ASC_NULLS_FIRST',
  RewardPeriodInfoBlockNumberAscNullsLast = 'rewardPeriodInfo_blockNumber_ASC_NULLS_LAST',
  RewardPeriodInfoBlockNumberDesc = 'rewardPeriodInfo_blockNumber_DESC',
  RewardPeriodInfoBlockNumberDescNullsFirst = 'rewardPeriodInfo_blockNumber_DESC_NULLS_FIRST',
  RewardPeriodInfoBlockNumberDescNullsLast = 'rewardPeriodInfo_blockNumber_DESC_NULLS_LAST',
  RewardPeriodInfoFirstBlockAsc = 'rewardPeriodInfo_firstBlock_ASC',
  RewardPeriodInfoFirstBlockAscNullsFirst = 'rewardPeriodInfo_firstBlock_ASC_NULLS_FIRST',
  RewardPeriodInfoFirstBlockAscNullsLast = 'rewardPeriodInfo_firstBlock_ASC_NULLS_LAST',
  RewardPeriodInfoFirstBlockDesc = 'rewardPeriodInfo_firstBlock_DESC',
  RewardPeriodInfoFirstBlockDescNullsFirst = 'rewardPeriodInfo_firstBlock_DESC_NULLS_FIRST',
  RewardPeriodInfoFirstBlockDescNullsLast = 'rewardPeriodInfo_firstBlock_DESC_NULLS_LAST',
  RewardPeriodInfoIdAsc = 'rewardPeriodInfo_id_ASC',
  RewardPeriodInfoIdAscNullsFirst = 'rewardPeriodInfo_id_ASC_NULLS_FIRST',
  RewardPeriodInfoIdAscNullsLast = 'rewardPeriodInfo_id_ASC_NULLS_LAST',
  RewardPeriodInfoIdDesc = 'rewardPeriodInfo_id_DESC',
  RewardPeriodInfoIdDescNullsFirst = 'rewardPeriodInfo_id_DESC_NULLS_FIRST',
  RewardPeriodInfoIdDescNullsLast = 'rewardPeriodInfo_id_DESC_NULLS_LAST',
  RewardPeriodInfoIndexAsc = 'rewardPeriodInfo_index_ASC',
  RewardPeriodInfoIndexAscNullsFirst = 'rewardPeriodInfo_index_ASC_NULLS_FIRST',
  RewardPeriodInfoIndexAscNullsLast = 'rewardPeriodInfo_index_ASC_NULLS_LAST',
  RewardPeriodInfoIndexDesc = 'rewardPeriodInfo_index_DESC',
  RewardPeriodInfoIndexDescNullsFirst = 'rewardPeriodInfo_index_DESC_NULLS_FIRST',
  RewardPeriodInfoIndexDescNullsLast = 'rewardPeriodInfo_index_DESC_NULLS_LAST',
  RewardPeriodInfoLengthAsc = 'rewardPeriodInfo_length_ASC',
  RewardPeriodInfoLengthAscNullsFirst = 'rewardPeriodInfo_length_ASC_NULLS_FIRST',
  RewardPeriodInfoLengthAscNullsLast = 'rewardPeriodInfo_length_ASC_NULLS_LAST',
  RewardPeriodInfoLengthDesc = 'rewardPeriodInfo_length_DESC',
  RewardPeriodInfoLengthDescNullsFirst = 'rewardPeriodInfo_length_DESC_NULLS_FIRST',
  RewardPeriodInfoLengthDescNullsLast = 'rewardPeriodInfo_length_DESC_NULLS_LAST',
}

export type RewardsCalculatedForPeriodWhereInput = {
  AND?: InputMaybe<Array<RewardsCalculatedForPeriodWhereInput>>;
  OR?: InputMaybe<Array<RewardsCalculatedForPeriodWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPeriodInfo?: InputMaybe<ActiveRewardPeriodInfoWhereInput>;
  rewardPeriodInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum RewardsClaimedOrderByInput {
  AddressIdAsc = 'address_id_ASC',
  AddressIdAscNullsFirst = 'address_id_ASC_NULLS_FIRST',
  AddressIdAscNullsLast = 'address_id_ASC_NULLS_LAST',
  AddressIdDesc = 'address_id_DESC',
  AddressIdDescNullsFirst = 'address_id_DESC_NULLS_FIRST',
  AddressIdDescNullsLast = 'address_id_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RewardPeriodBlockNumberAsc = 'rewardPeriod_blockNumber_ASC',
  RewardPeriodBlockNumberAscNullsFirst = 'rewardPeriod_blockNumber_ASC_NULLS_FIRST',
  RewardPeriodBlockNumberAscNullsLast = 'rewardPeriod_blockNumber_ASC_NULLS_LAST',
  RewardPeriodBlockNumberDesc = 'rewardPeriod_blockNumber_DESC',
  RewardPeriodBlockNumberDescNullsFirst = 'rewardPeriod_blockNumber_DESC_NULLS_FIRST',
  RewardPeriodBlockNumberDescNullsLast = 'rewardPeriod_blockNumber_DESC_NULLS_LAST',
  RewardPeriodFirstBlockAsc = 'rewardPeriod_firstBlock_ASC',
  RewardPeriodFirstBlockAscNullsFirst = 'rewardPeriod_firstBlock_ASC_NULLS_FIRST',
  RewardPeriodFirstBlockAscNullsLast = 'rewardPeriod_firstBlock_ASC_NULLS_LAST',
  RewardPeriodFirstBlockDesc = 'rewardPeriod_firstBlock_DESC',
  RewardPeriodFirstBlockDescNullsFirst = 'rewardPeriod_firstBlock_DESC_NULLS_FIRST',
  RewardPeriodFirstBlockDescNullsLast = 'rewardPeriod_firstBlock_DESC_NULLS_LAST',
  RewardPeriodIdAsc = 'rewardPeriod_id_ASC',
  RewardPeriodIdAscNullsFirst = 'rewardPeriod_id_ASC_NULLS_FIRST',
  RewardPeriodIdAscNullsLast = 'rewardPeriod_id_ASC_NULLS_LAST',
  RewardPeriodIdDesc = 'rewardPeriod_id_DESC',
  RewardPeriodIdDescNullsFirst = 'rewardPeriod_id_DESC_NULLS_FIRST',
  RewardPeriodIdDescNullsLast = 'rewardPeriod_id_DESC_NULLS_LAST',
  RewardPeriodIndexAsc = 'rewardPeriod_index_ASC',
  RewardPeriodIndexAscNullsFirst = 'rewardPeriod_index_ASC_NULLS_FIRST',
  RewardPeriodIndexAscNullsLast = 'rewardPeriod_index_ASC_NULLS_LAST',
  RewardPeriodIndexDesc = 'rewardPeriod_index_DESC',
  RewardPeriodIndexDescNullsFirst = 'rewardPeriod_index_DESC_NULLS_FIRST',
  RewardPeriodIndexDescNullsLast = 'rewardPeriod_index_DESC_NULLS_LAST',
  RewardPeriodLengthAsc = 'rewardPeriod_length_ASC',
  RewardPeriodLengthAscNullsFirst = 'rewardPeriod_length_ASC_NULLS_FIRST',
  RewardPeriodLengthAscNullsLast = 'rewardPeriod_length_ASC_NULLS_LAST',
  RewardPeriodLengthDesc = 'rewardPeriod_length_DESC',
  RewardPeriodLengthDescNullsFirst = 'rewardPeriod_length_DESC_NULLS_FIRST',
  RewardPeriodLengthDescNullsLast = 'rewardPeriod_length_DESC_NULLS_LAST',
}

export type RewardsClaimedWhereInput = {
  AND?: InputMaybe<Array<RewardsClaimedWhereInput>>;
  OR?: InputMaybe<Array<RewardsClaimedWhereInput>>;
  address?: InputMaybe<AccountWhereInput>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['Int']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPeriod?: InputMaybe<ActiveRewardPeriodInfoWhereInput>;
  rewardPeriod_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SolutionConsensusOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MaxWaitingThresholdAsc = 'maxWaitingThreshold_ASC',
  MaxWaitingThresholdAscNullsFirst = 'maxWaitingThreshold_ASC_NULLS_FIRST',
  MaxWaitingThresholdAscNullsLast = 'maxWaitingThreshold_ASC_NULLS_LAST',
  MaxWaitingThresholdDesc = 'maxWaitingThreshold_DESC',
  MaxWaitingThresholdDescNullsFirst = 'maxWaitingThreshold_DESC_NULLS_FIRST',
  MaxWaitingThresholdDescNullsLast = 'maxWaitingThreshold_DESC_NULLS_LAST',
  VoteThresholdPercentAsc = 'voteThresholdPercent_ASC',
  VoteThresholdPercentAscNullsFirst = 'voteThresholdPercent_ASC_NULLS_FIRST',
  VoteThresholdPercentAscNullsLast = 'voteThresholdPercent_ASC_NULLS_LAST',
  VoteThresholdPercentDesc = 'voteThresholdPercent_DESC',
  VoteThresholdPercentDescNullsFirst = 'voteThresholdPercent_DESC_NULLS_FIRST',
  VoteThresholdPercentDescNullsLast = 'voteThresholdPercent_DESC_NULLS_LAST',
}

export type SolutionConsensusWhereInput = {
  AND?: InputMaybe<Array<SolutionConsensusWhereInput>>;
  OR?: InputMaybe<Array<SolutionConsensusWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  maxWaitingThreshold_eq?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_gt?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_gte?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxWaitingThreshold_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  maxWaitingThreshold_lt?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_lte?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_not_eq?: InputMaybe<Scalars['Int']['input']>;
  maxWaitingThreshold_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  voteThresholdPercent_eq?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_gt?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_gte?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  voteThresholdPercent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  voteThresholdPercent_lt?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_lte?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_not_eq?: InputMaybe<Scalars['Int']['input']>;
  voteThresholdPercent_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum SolutionGroupAllowedCidOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
  WorklogicCidAsc = 'worklogicCid_ASC',
  WorklogicCidAscNullsFirst = 'worklogicCid_ASC_NULLS_FIRST',
  WorklogicCidAscNullsLast = 'worklogicCid_ASC_NULLS_LAST',
  WorklogicCidDesc = 'worklogicCid_DESC',
  WorklogicCidDescNullsFirst = 'worklogicCid_DESC_NULLS_FIRST',
  WorklogicCidDescNullsLast = 'worklogicCid_DESC_NULLS_LAST',
}

export type SolutionGroupAllowedCidWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupAllowedCidWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupAllowedCidWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  worklogicCid_contains?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_endsWith?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_eq?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_gt?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_gte?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_in?: InputMaybe<Array<Scalars['String']['input']>>;
  worklogicCid_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  worklogicCid_lt?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_lte?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_not_contains?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_not_eq?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  worklogicCid_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  worklogicCid_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum SolutionGroupInfoOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LogoUrlAsc = 'logoUrl_ASC',
  LogoUrlAscNullsFirst = 'logoUrl_ASC_NULLS_FIRST',
  LogoUrlAscNullsLast = 'logoUrl_ASC_NULLS_LAST',
  LogoUrlDesc = 'logoUrl_DESC',
  LogoUrlDescNullsFirst = 'logoUrl_DESC_NULLS_FIRST',
  LogoUrlDescNullsLast = 'logoUrl_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PublisherInfoAsc = 'publisherInfo_ASC',
  PublisherInfoAscNullsFirst = 'publisherInfo_ASC_NULLS_FIRST',
  PublisherInfoAscNullsLast = 'publisherInfo_ASC_NULLS_LAST',
  PublisherInfoDesc = 'publisherInfo_DESC',
  PublisherInfoDescNullsFirst = 'publisherInfo_DESC_NULLS_FIRST',
  PublisherInfoDescNullsLast = 'publisherInfo_DESC_NULLS_LAST',
}

export type SolutionGroupInfoWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupInfoWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupInfoWhereInput>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  logoUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_eq?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  logoUrl_lt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_lte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_contains?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_endsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_eq?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_gt?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_gte?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  publisherInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  publisherInfo_lt?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_lte?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_contains?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_eq?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  publisherInfo_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum SolutionGroupOperatorsConfigOrderByInput {
  AllowedOperatorsAsc = 'allowedOperators_ASC',
  AllowedOperatorsAscNullsFirst = 'allowedOperators_ASC_NULLS_FIRST',
  AllowedOperatorsAscNullsLast = 'allowedOperators_ASC_NULLS_LAST',
  AllowedOperatorsDesc = 'allowedOperators_DESC',
  AllowedOperatorsDescNullsFirst = 'allowedOperators_DESC_NULLS_FIRST',
  AllowedOperatorsDescNullsLast = 'allowedOperators_DESC_NULLS_LAST',
  HasOperatorsAllowlistAsc = 'hasOperatorsAllowlist_ASC',
  HasOperatorsAllowlistAscNullsFirst = 'hasOperatorsAllowlist_ASC_NULLS_FIRST',
  HasOperatorsAllowlistAscNullsLast = 'hasOperatorsAllowlist_ASC_NULLS_LAST',
  HasOperatorsAllowlistDesc = 'hasOperatorsAllowlist_DESC',
  HasOperatorsAllowlistDescNullsFirst = 'hasOperatorsAllowlist_DESC_NULLS_FIRST',
  HasOperatorsAllowlistDescNullsLast = 'hasOperatorsAllowlist_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MaxOperatorWorkersAsc = 'maxOperatorWorkers_ASC',
  MaxOperatorWorkersAscNullsFirst = 'maxOperatorWorkers_ASC_NULLS_FIRST',
  MaxOperatorWorkersAscNullsLast = 'maxOperatorWorkers_ASC_NULLS_LAST',
  MaxOperatorWorkersDesc = 'maxOperatorWorkers_DESC',
  MaxOperatorWorkersDescNullsFirst = 'maxOperatorWorkers_DESC_NULLS_FIRST',
  MaxOperatorWorkersDescNullsLast = 'maxOperatorWorkers_DESC_NULLS_LAST',
  StakingAmountsIdAsc = 'stakingAmounts_id_ASC',
  StakingAmountsIdAscNullsFirst = 'stakingAmounts_id_ASC_NULLS_FIRST',
  StakingAmountsIdAscNullsLast = 'stakingAmounts_id_ASC_NULLS_LAST',
  StakingAmountsIdDesc = 'stakingAmounts_id_DESC',
  StakingAmountsIdDescNullsFirst = 'stakingAmounts_id_DESC_NULLS_FIRST',
  StakingAmountsIdDescNullsLast = 'stakingAmounts_id_DESC_NULLS_LAST',
  StakingAmountsMaxAsc = 'stakingAmounts_max_ASC',
  StakingAmountsMaxAscNullsFirst = 'stakingAmounts_max_ASC_NULLS_FIRST',
  StakingAmountsMaxAscNullsLast = 'stakingAmounts_max_ASC_NULLS_LAST',
  StakingAmountsMaxDesc = 'stakingAmounts_max_DESC',
  StakingAmountsMaxDescNullsFirst = 'stakingAmounts_max_DESC_NULLS_FIRST',
  StakingAmountsMaxDescNullsLast = 'stakingAmounts_max_DESC_NULLS_LAST',
  StakingAmountsMinAsc = 'stakingAmounts_min_ASC',
  StakingAmountsMinAscNullsFirst = 'stakingAmounts_min_ASC_NULLS_FIRST',
  StakingAmountsMinAscNullsLast = 'stakingAmounts_min_ASC_NULLS_LAST',
  StakingAmountsMinDesc = 'stakingAmounts_min_DESC',
  StakingAmountsMinDescNullsFirst = 'stakingAmounts_min_DESC_NULLS_FIRST',
  StakingAmountsMinDescNullsLast = 'stakingAmounts_min_DESC_NULLS_LAST',
  StartBlockAsc = 'startBlock_ASC',
  StartBlockAscNullsFirst = 'startBlock_ASC_NULLS_FIRST',
  StartBlockAscNullsLast = 'startBlock_ASC_NULLS_LAST',
  StartBlockDesc = 'startBlock_DESC',
  StartBlockDescNullsFirst = 'startBlock_DESC_NULLS_FIRST',
  StartBlockDescNullsLast = 'startBlock_DESC_NULLS_LAST',
}

export type SolutionGroupOperatorsConfigWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupOperatorsConfigWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupOperatorsConfigWhereInput>>;
  allowedOperators_eq?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_gt?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_gte?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  allowedOperators_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  allowedOperators_lt?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_lte?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_not_eq?: InputMaybe<Scalars['Int']['input']>;
  allowedOperators_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  hasOperatorsAllowlist_eq?: InputMaybe<Scalars['Boolean']['input']>;
  hasOperatorsAllowlist_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  hasOperatorsAllowlist_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  maxOperatorWorkers_eq?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_gt?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_gte?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  maxOperatorWorkers_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  maxOperatorWorkers_lt?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_lte?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_not_eq?: InputMaybe<Scalars['Int']['input']>;
  maxOperatorWorkers_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  stakingAmounts?: InputMaybe<SolutionGroupStakingAmountsWhereInput>;
  stakingAmounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  startBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  startBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  startBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  startBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum SolutionGroupOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InfoDescriptionAsc = 'info_description_ASC',
  InfoDescriptionAscNullsFirst = 'info_description_ASC_NULLS_FIRST',
  InfoDescriptionAscNullsLast = 'info_description_ASC_NULLS_LAST',
  InfoDescriptionDesc = 'info_description_DESC',
  InfoDescriptionDescNullsFirst = 'info_description_DESC_NULLS_FIRST',
  InfoDescriptionDescNullsLast = 'info_description_DESC_NULLS_LAST',
  InfoIdAsc = 'info_id_ASC',
  InfoIdAscNullsFirst = 'info_id_ASC_NULLS_FIRST',
  InfoIdAscNullsLast = 'info_id_ASC_NULLS_LAST',
  InfoIdDesc = 'info_id_DESC',
  InfoIdDescNullsFirst = 'info_id_DESC_NULLS_FIRST',
  InfoIdDescNullsLast = 'info_id_DESC_NULLS_LAST',
  InfoLogoUrlAsc = 'info_logoUrl_ASC',
  InfoLogoUrlAscNullsFirst = 'info_logoUrl_ASC_NULLS_FIRST',
  InfoLogoUrlAscNullsLast = 'info_logoUrl_ASC_NULLS_LAST',
  InfoLogoUrlDesc = 'info_logoUrl_DESC',
  InfoLogoUrlDescNullsFirst = 'info_logoUrl_DESC_NULLS_FIRST',
  InfoLogoUrlDescNullsLast = 'info_logoUrl_DESC_NULLS_LAST',
  InfoNameAsc = 'info_name_ASC',
  InfoNameAscNullsFirst = 'info_name_ASC_NULLS_FIRST',
  InfoNameAscNullsLast = 'info_name_ASC_NULLS_LAST',
  InfoNameDesc = 'info_name_DESC',
  InfoNameDescNullsFirst = 'info_name_DESC_NULLS_FIRST',
  InfoNameDescNullsLast = 'info_name_DESC_NULLS_LAST',
  InfoPublisherInfoAsc = 'info_publisherInfo_ASC',
  InfoPublisherInfoAscNullsFirst = 'info_publisherInfo_ASC_NULLS_FIRST',
  InfoPublisherInfoAscNullsLast = 'info_publisherInfo_ASC_NULLS_LAST',
  InfoPublisherInfoDesc = 'info_publisherInfo_DESC',
  InfoPublisherInfoDescNullsFirst = 'info_publisherInfo_DESC_NULLS_FIRST',
  InfoPublisherInfoDescNullsLast = 'info_publisherInfo_DESC_NULLS_LAST',
  NamespaceAsc = 'namespace_ASC',
  NamespaceAscNullsFirst = 'namespace_ASC_NULLS_FIRST',
  NamespaceAscNullsLast = 'namespace_ASC_NULLS_LAST',
  NamespaceDesc = 'namespace_DESC',
  NamespaceDescNullsFirst = 'namespace_DESC_NULLS_FIRST',
  NamespaceDescNullsLast = 'namespace_DESC_NULLS_LAST',
  OperationEndBlockAsc = 'operationEndBlock_ASC',
  OperationEndBlockAscNullsFirst = 'operationEndBlock_ASC_NULLS_FIRST',
  OperationEndBlockAscNullsLast = 'operationEndBlock_ASC_NULLS_LAST',
  OperationEndBlockDesc = 'operationEndBlock_DESC',
  OperationEndBlockDescNullsFirst = 'operationEndBlock_DESC_NULLS_FIRST',
  OperationEndBlockDescNullsLast = 'operationEndBlock_DESC_NULLS_LAST',
  OperationStartBlockAsc = 'operationStartBlock_ASC',
  OperationStartBlockAscNullsFirst = 'operationStartBlock_ASC_NULLS_FIRST',
  OperationStartBlockAscNullsLast = 'operationStartBlock_ASC_NULLS_LAST',
  OperationStartBlockDesc = 'operationStartBlock_DESC',
  OperationStartBlockDescNullsFirst = 'operationStartBlock_DESC_NULLS_FIRST',
  OperationStartBlockDescNullsLast = 'operationStartBlock_DESC_NULLS_LAST',
  OperatorsConfigAllowedOperatorsAsc = 'operatorsConfig_allowedOperators_ASC',
  OperatorsConfigAllowedOperatorsAscNullsFirst = 'operatorsConfig_allowedOperators_ASC_NULLS_FIRST',
  OperatorsConfigAllowedOperatorsAscNullsLast = 'operatorsConfig_allowedOperators_ASC_NULLS_LAST',
  OperatorsConfigAllowedOperatorsDesc = 'operatorsConfig_allowedOperators_DESC',
  OperatorsConfigAllowedOperatorsDescNullsFirst = 'operatorsConfig_allowedOperators_DESC_NULLS_FIRST',
  OperatorsConfigAllowedOperatorsDescNullsLast = 'operatorsConfig_allowedOperators_DESC_NULLS_LAST',
  OperatorsConfigHasOperatorsAllowlistAsc = 'operatorsConfig_hasOperatorsAllowlist_ASC',
  OperatorsConfigHasOperatorsAllowlistAscNullsFirst = 'operatorsConfig_hasOperatorsAllowlist_ASC_NULLS_FIRST',
  OperatorsConfigHasOperatorsAllowlistAscNullsLast = 'operatorsConfig_hasOperatorsAllowlist_ASC_NULLS_LAST',
  OperatorsConfigHasOperatorsAllowlistDesc = 'operatorsConfig_hasOperatorsAllowlist_DESC',
  OperatorsConfigHasOperatorsAllowlistDescNullsFirst = 'operatorsConfig_hasOperatorsAllowlist_DESC_NULLS_FIRST',
  OperatorsConfigHasOperatorsAllowlistDescNullsLast = 'operatorsConfig_hasOperatorsAllowlist_DESC_NULLS_LAST',
  OperatorsConfigIdAsc = 'operatorsConfig_id_ASC',
  OperatorsConfigIdAscNullsFirst = 'operatorsConfig_id_ASC_NULLS_FIRST',
  OperatorsConfigIdAscNullsLast = 'operatorsConfig_id_ASC_NULLS_LAST',
  OperatorsConfigIdDesc = 'operatorsConfig_id_DESC',
  OperatorsConfigIdDescNullsFirst = 'operatorsConfig_id_DESC_NULLS_FIRST',
  OperatorsConfigIdDescNullsLast = 'operatorsConfig_id_DESC_NULLS_LAST',
  OperatorsConfigMaxOperatorWorkersAsc = 'operatorsConfig_maxOperatorWorkers_ASC',
  OperatorsConfigMaxOperatorWorkersAscNullsFirst = 'operatorsConfig_maxOperatorWorkers_ASC_NULLS_FIRST',
  OperatorsConfigMaxOperatorWorkersAscNullsLast = 'operatorsConfig_maxOperatorWorkers_ASC_NULLS_LAST',
  OperatorsConfigMaxOperatorWorkersDesc = 'operatorsConfig_maxOperatorWorkers_DESC',
  OperatorsConfigMaxOperatorWorkersDescNullsFirst = 'operatorsConfig_maxOperatorWorkers_DESC_NULLS_FIRST',
  OperatorsConfigMaxOperatorWorkersDescNullsLast = 'operatorsConfig_maxOperatorWorkers_DESC_NULLS_LAST',
  OperatorsConfigStartBlockAsc = 'operatorsConfig_startBlock_ASC',
  OperatorsConfigStartBlockAscNullsFirst = 'operatorsConfig_startBlock_ASC_NULLS_FIRST',
  OperatorsConfigStartBlockAscNullsLast = 'operatorsConfig_startBlock_ASC_NULLS_LAST',
  OperatorsConfigStartBlockDesc = 'operatorsConfig_startBlock_DESC',
  OperatorsConfigStartBlockDescNullsFirst = 'operatorsConfig_startBlock_DESC_NULLS_FIRST',
  OperatorsConfigStartBlockDescNullsLast = 'operatorsConfig_startBlock_DESC_NULLS_LAST',
  RegistrarFriendlyNameAsc = 'registrar_friendlyName_ASC',
  RegistrarFriendlyNameAscNullsFirst = 'registrar_friendlyName_ASC_NULLS_FIRST',
  RegistrarFriendlyNameAscNullsLast = 'registrar_friendlyName_ASC_NULLS_LAST',
  RegistrarFriendlyNameDesc = 'registrar_friendlyName_DESC',
  RegistrarFriendlyNameDescNullsFirst = 'registrar_friendlyName_DESC_NULLS_FIRST',
  RegistrarFriendlyNameDescNullsLast = 'registrar_friendlyName_DESC_NULLS_LAST',
  RegistrarIdAsc = 'registrar_id_ASC',
  RegistrarIdAscNullsFirst = 'registrar_id_ASC_NULLS_FIRST',
  RegistrarIdAscNullsLast = 'registrar_id_ASC_NULLS_LAST',
  RegistrarIdDesc = 'registrar_id_DESC',
  RegistrarIdDescNullsFirst = 'registrar_id_DESC_NULLS_FIRST',
  RegistrarIdDescNullsLast = 'registrar_id_DESC_NULLS_LAST',
  RegistrarIsAllowedAsc = 'registrar_isAllowed_ASC',
  RegistrarIsAllowedAscNullsFirst = 'registrar_isAllowed_ASC_NULLS_FIRST',
  RegistrarIsAllowedAscNullsLast = 'registrar_isAllowed_ASC_NULLS_LAST',
  RegistrarIsAllowedDesc = 'registrar_isAllowed_DESC',
  RegistrarIsAllowedDescNullsFirst = 'registrar_isAllowed_DESC_NULLS_FIRST',
  RegistrarIsAllowedDescNullsLast = 'registrar_isAllowed_DESC_NULLS_LAST',
  RegistrarLegalLocationAsc = 'registrar_legalLocation_ASC',
  RegistrarLegalLocationAscNullsFirst = 'registrar_legalLocation_ASC_NULLS_FIRST',
  RegistrarLegalLocationAscNullsLast = 'registrar_legalLocation_ASC_NULLS_LAST',
  RegistrarLegalLocationDesc = 'registrar_legalLocation_DESC',
  RegistrarLegalLocationDescNullsFirst = 'registrar_legalLocation_DESC_NULLS_FIRST',
  RegistrarLegalLocationDescNullsLast = 'registrar_legalLocation_DESC_NULLS_LAST',
  RewardsConfigIdAsc = 'rewardsConfig_id_ASC',
  RewardsConfigIdAscNullsFirst = 'rewardsConfig_id_ASC_NULLS_FIRST',
  RewardsConfigIdAscNullsLast = 'rewardsConfig_id_ASC_NULLS_LAST',
  RewardsConfigIdDesc = 'rewardsConfig_id_DESC',
  RewardsConfigIdDescNullsFirst = 'rewardsConfig_id_DESC_NULLS_FIRST',
  RewardsConfigIdDescNullsLast = 'rewardsConfig_id_DESC_NULLS_LAST',
  RewardsConfigSubscriptionRewardPerBlockAsc = 'rewardsConfig_subscriptionRewardPerBlock_ASC',
  RewardsConfigSubscriptionRewardPerBlockAscNullsFirst = 'rewardsConfig_subscriptionRewardPerBlock_ASC_NULLS_FIRST',
  RewardsConfigSubscriptionRewardPerBlockAscNullsLast = 'rewardsConfig_subscriptionRewardPerBlock_ASC_NULLS_LAST',
  RewardsConfigSubscriptionRewardPerBlockDesc = 'rewardsConfig_subscriptionRewardPerBlock_DESC',
  RewardsConfigSubscriptionRewardPerBlockDescNullsFirst = 'rewardsConfig_subscriptionRewardPerBlock_DESC_NULLS_FIRST',
  RewardsConfigSubscriptionRewardPerBlockDescNullsLast = 'rewardsConfig_subscriptionRewardPerBlock_DESC_NULLS_LAST',
  RewardsConfigTopPerformanceBonusAsc = 'rewardsConfig_topPerformanceBonus_ASC',
  RewardsConfigTopPerformanceBonusAscNullsFirst = 'rewardsConfig_topPerformanceBonus_ASC_NULLS_FIRST',
  RewardsConfigTopPerformanceBonusAscNullsLast = 'rewardsConfig_topPerformanceBonus_ASC_NULLS_LAST',
  RewardsConfigTopPerformanceBonusDesc = 'rewardsConfig_topPerformanceBonus_DESC',
  RewardsConfigTopPerformanceBonusDescNullsFirst = 'rewardsConfig_topPerformanceBonus_DESC_NULLS_FIRST',
  RewardsConfigTopPerformanceBonusDescNullsLast = 'rewardsConfig_topPerformanceBonus_DESC_NULLS_LAST',
  RewardsConfigVotingRewardPerBlockAsc = 'rewardsConfig_votingRewardPerBlock_ASC',
  RewardsConfigVotingRewardPerBlockAscNullsFirst = 'rewardsConfig_votingRewardPerBlock_ASC_NULLS_FIRST',
  RewardsConfigVotingRewardPerBlockAscNullsLast = 'rewardsConfig_votingRewardPerBlock_ASC_NULLS_LAST',
  RewardsConfigVotingRewardPerBlockDesc = 'rewardsConfig_votingRewardPerBlock_DESC',
  RewardsConfigVotingRewardPerBlockDescNullsFirst = 'rewardsConfig_votingRewardPerBlock_DESC_NULLS_FIRST',
  RewardsConfigVotingRewardPerBlockDescNullsLast = 'rewardsConfig_votingRewardPerBlock_DESC_NULLS_LAST',
  StakingAmountsIdAsc = 'stakingAmounts_id_ASC',
  StakingAmountsIdAscNullsFirst = 'stakingAmounts_id_ASC_NULLS_FIRST',
  StakingAmountsIdAscNullsLast = 'stakingAmounts_id_ASC_NULLS_LAST',
  StakingAmountsIdDesc = 'stakingAmounts_id_DESC',
  StakingAmountsIdDescNullsFirst = 'stakingAmounts_id_DESC_NULLS_FIRST',
  StakingAmountsIdDescNullsLast = 'stakingAmounts_id_DESC_NULLS_LAST',
  StakingAmountsMaxAsc = 'stakingAmounts_max_ASC',
  StakingAmountsMaxAscNullsFirst = 'stakingAmounts_max_ASC_NULLS_FIRST',
  StakingAmountsMaxAscNullsLast = 'stakingAmounts_max_ASC_NULLS_LAST',
  StakingAmountsMaxDesc = 'stakingAmounts_max_DESC',
  StakingAmountsMaxDescNullsFirst = 'stakingAmounts_max_DESC_NULLS_FIRST',
  StakingAmountsMaxDescNullsLast = 'stakingAmounts_max_DESC_NULLS_LAST',
  StakingAmountsMinAsc = 'stakingAmounts_min_ASC',
  StakingAmountsMinAscNullsFirst = 'stakingAmounts_min_ASC_NULLS_FIRST',
  StakingAmountsMinAscNullsLast = 'stakingAmounts_min_ASC_NULLS_LAST',
  StakingAmountsMinDesc = 'stakingAmounts_min_DESC',
  StakingAmountsMinDescNullsFirst = 'stakingAmounts_min_DESC_NULLS_FIRST',
  StakingAmountsMinDescNullsLast = 'stakingAmounts_min_DESC_NULLS_LAST',
  WithdrawalDelayAsc = 'withdrawalDelay_ASC',
  WithdrawalDelayAscNullsFirst = 'withdrawalDelay_ASC_NULLS_FIRST',
  WithdrawalDelayAscNullsLast = 'withdrawalDelay_ASC_NULLS_LAST',
  WithdrawalDelayDesc = 'withdrawalDelay_DESC',
  WithdrawalDelayDescNullsFirst = 'withdrawalDelay_DESC_NULLS_FIRST',
  WithdrawalDelayDescNullsLast = 'withdrawalDelay_DESC_NULLS_LAST',
}

export enum SolutionGroupRewardsConfigOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  SubscriptionRewardPerBlockAsc = 'subscriptionRewardPerBlock_ASC',
  SubscriptionRewardPerBlockAscNullsFirst = 'subscriptionRewardPerBlock_ASC_NULLS_FIRST',
  SubscriptionRewardPerBlockAscNullsLast = 'subscriptionRewardPerBlock_ASC_NULLS_LAST',
  SubscriptionRewardPerBlockDesc = 'subscriptionRewardPerBlock_DESC',
  SubscriptionRewardPerBlockDescNullsFirst = 'subscriptionRewardPerBlock_DESC_NULLS_FIRST',
  SubscriptionRewardPerBlockDescNullsLast = 'subscriptionRewardPerBlock_DESC_NULLS_LAST',
  TopPerformanceBonusAsc = 'topPerformanceBonus_ASC',
  TopPerformanceBonusAscNullsFirst = 'topPerformanceBonus_ASC_NULLS_FIRST',
  TopPerformanceBonusAscNullsLast = 'topPerformanceBonus_ASC_NULLS_LAST',
  TopPerformanceBonusDesc = 'topPerformanceBonus_DESC',
  TopPerformanceBonusDescNullsFirst = 'topPerformanceBonus_DESC_NULLS_FIRST',
  TopPerformanceBonusDescNullsLast = 'topPerformanceBonus_DESC_NULLS_LAST',
  VotingRewardPerBlockAsc = 'votingRewardPerBlock_ASC',
  VotingRewardPerBlockAscNullsFirst = 'votingRewardPerBlock_ASC_NULLS_FIRST',
  VotingRewardPerBlockAscNullsLast = 'votingRewardPerBlock_ASC_NULLS_LAST',
  VotingRewardPerBlockDesc = 'votingRewardPerBlock_DESC',
  VotingRewardPerBlockDescNullsFirst = 'votingRewardPerBlock_DESC_NULLS_FIRST',
  VotingRewardPerBlockDescNullsLast = 'votingRewardPerBlock_DESC_NULLS_LAST',
}

export type SolutionGroupRewardsConfigWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupRewardsConfigWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupRewardsConfigWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  subscriptionRewardPerBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  subscriptionRewardPerBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subscriptionRewardPerBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  subscriptionRewardPerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  topPerformanceBonus_eq?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_gt?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_gte?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  topPerformanceBonus_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  topPerformanceBonus_lt?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_lte?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  topPerformanceBonus_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingRewardPerBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  votingRewardPerBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  votingRewardPerBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  votingRewardPerBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export enum SolutionGroupStakingAmountsOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MaxAsc = 'max_ASC',
  MaxAscNullsFirst = 'max_ASC_NULLS_FIRST',
  MaxAscNullsLast = 'max_ASC_NULLS_LAST',
  MaxDesc = 'max_DESC',
  MaxDescNullsFirst = 'max_DESC_NULLS_FIRST',
  MaxDescNullsLast = 'max_DESC_NULLS_LAST',
  MinAsc = 'min_ASC',
  MinAscNullsFirst = 'min_ASC_NULLS_FIRST',
  MinAscNullsLast = 'min_ASC_NULLS_LAST',
  MinDesc = 'min_DESC',
  MinDescNullsFirst = 'min_DESC_NULLS_FIRST',
  MinDescNullsLast = 'min_DESC_NULLS_LAST',
}

export type SolutionGroupStakingAmountsWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupStakingAmountsWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupStakingAmountsWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  max_eq?: InputMaybe<Scalars['BigInt']['input']>;
  max_gt?: InputMaybe<Scalars['BigInt']['input']>;
  max_gte?: InputMaybe<Scalars['BigInt']['input']>;
  max_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  max_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  max_lt?: InputMaybe<Scalars['BigInt']['input']>;
  max_lte?: InputMaybe<Scalars['BigInt']['input']>;
  max_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  max_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  min_eq?: InputMaybe<Scalars['BigInt']['input']>;
  min_gt?: InputMaybe<Scalars['BigInt']['input']>;
  min_gte?: InputMaybe<Scalars['BigInt']['input']>;
  min_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  min_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  min_lt?: InputMaybe<Scalars['BigInt']['input']>;
  min_lte?: InputMaybe<Scalars['BigInt']['input']>;
  min_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  min_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type SolutionGroupWhereInput = {
  AND?: InputMaybe<Array<SolutionGroupWhereInput>>;
  OR?: InputMaybe<Array<SolutionGroupWhereInput>>;
  allowedCids_every?: InputMaybe<SolutionGroupAllowedCidWhereInput>;
  allowedCids_none?: InputMaybe<SolutionGroupAllowedCidWhereInput>;
  allowedCids_some?: InputMaybe<SolutionGroupAllowedCidWhereInput>;
  earnedRewards_every?: InputMaybe<EarnedRewardsWhereInput>;
  earnedRewards_none?: InputMaybe<EarnedRewardsWhereInput>;
  earnedRewards_some?: InputMaybe<EarnedRewardsWhereInput>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  info?: InputMaybe<SolutionGroupInfoWhereInput>;
  info_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  namespace_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_gt?: InputMaybe<Scalars['String']['input']>;
  namespace_gte?: InputMaybe<Scalars['String']['input']>;
  namespace_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  namespace_lt?: InputMaybe<Scalars['String']['input']>;
  namespace_lte?: InputMaybe<Scalars['String']['input']>;
  namespace_not_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_not_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_startsWith?: InputMaybe<Scalars['String']['input']>;
  operationEndBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  operationEndBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationEndBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  operationEndBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  operationStartBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  operationStartBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  operationStartBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  operationStartBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  operatorsConfig?: InputMaybe<SolutionGroupOperatorsConfigWhereInput>;
  operatorsConfig_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  registrar?: InputMaybe<RegistrarAccountWhereInput>;
  registrar_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  rewardsConfig?: InputMaybe<SolutionGroupRewardsConfigWhereInput>;
  rewardsConfig_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scheduledUnsubscriptions_every?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  scheduledUnsubscriptions_none?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  scheduledUnsubscriptions_some?: InputMaybe<UnsubscriptionScheduleWhereInput>;
  solutions_every?: InputMaybe<SolutionWhereInput>;
  solutions_none?: InputMaybe<SolutionWhereInput>;
  solutions_some?: InputMaybe<SolutionWhereInput>;
  stakes_every?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  stakes_none?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  stakes_some?: InputMaybe<OperatorSubscribedStakeWhereInput>;
  stakingAmounts?: InputMaybe<SolutionGroupStakingAmountsWhereInput>;
  stakingAmounts_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  subscribedOperators_every?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
  subscribedOperators_none?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
  subscribedOperators_some?: InputMaybe<OperatorSubscribedSolutionGroupsWhereInput>;
  withdrawalDelay_eq?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_gt?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_gte?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  withdrawalDelay_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawalDelay_lt?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_lte?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_not_eq?: InputMaybe<Scalars['Int']['input']>;
  withdrawalDelay_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum SolutionInfoOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LogoUrlAsc = 'logoUrl_ASC',
  LogoUrlAscNullsFirst = 'logoUrl_ASC_NULLS_FIRST',
  LogoUrlAscNullsLast = 'logoUrl_ASC_NULLS_LAST',
  LogoUrlDesc = 'logoUrl_DESC',
  LogoUrlDescNullsFirst = 'logoUrl_DESC_NULLS_FIRST',
  LogoUrlDescNullsLast = 'logoUrl_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PublisherInfoAsc = 'publisherInfo_ASC',
  PublisherInfoAscNullsFirst = 'publisherInfo_ASC_NULLS_FIRST',
  PublisherInfoAscNullsLast = 'publisherInfo_ASC_NULLS_LAST',
  PublisherInfoDesc = 'publisherInfo_DESC',
  PublisherInfoDescNullsFirst = 'publisherInfo_DESC_NULLS_FIRST',
  PublisherInfoDescNullsLast = 'publisherInfo_DESC_NULLS_LAST',
}

export type SolutionInfoWhereInput = {
  AND?: InputMaybe<Array<SolutionInfoWhereInput>>;
  OR?: InputMaybe<Array<SolutionInfoWhereInput>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  logoUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_eq?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_gte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  logoUrl_lt?: InputMaybe<Scalars['String']['input']>;
  logoUrl_lte?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  logoUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  logoUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  logoUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_contains?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_endsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_eq?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_gt?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_gte?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_in?: InputMaybe<Array<Scalars['String']['input']>>;
  publisherInfo_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  publisherInfo_lt?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_lte?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_contains?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_eq?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  publisherInfo_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  publisherInfo_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum SolutionOrderByInput {
  AdditionToExtraneousGroupsAllowedAsc = 'additionToExtraneousGroupsAllowed_ASC',
  AdditionToExtraneousGroupsAllowedAscNullsFirst = 'additionToExtraneousGroupsAllowed_ASC_NULLS_FIRST',
  AdditionToExtraneousGroupsAllowedAscNullsLast = 'additionToExtraneousGroupsAllowed_ASC_NULLS_LAST',
  AdditionToExtraneousGroupsAllowedDesc = 'additionToExtraneousGroupsAllowed_DESC',
  AdditionToExtraneousGroupsAllowedDescNullsFirst = 'additionToExtraneousGroupsAllowed_DESC_NULLS_FIRST',
  AdditionToExtraneousGroupsAllowedDescNullsLast = 'additionToExtraneousGroupsAllowed_DESC_NULLS_LAST',
  ConsensusIdAsc = 'consensus_id_ASC',
  ConsensusIdAscNullsFirst = 'consensus_id_ASC_NULLS_FIRST',
  ConsensusIdAscNullsLast = 'consensus_id_ASC_NULLS_LAST',
  ConsensusIdDesc = 'consensus_id_DESC',
  ConsensusIdDescNullsFirst = 'consensus_id_DESC_NULLS_FIRST',
  ConsensusIdDescNullsLast = 'consensus_id_DESC_NULLS_LAST',
  ConsensusMaxWaitingThresholdAsc = 'consensus_maxWaitingThreshold_ASC',
  ConsensusMaxWaitingThresholdAscNullsFirst = 'consensus_maxWaitingThreshold_ASC_NULLS_FIRST',
  ConsensusMaxWaitingThresholdAscNullsLast = 'consensus_maxWaitingThreshold_ASC_NULLS_LAST',
  ConsensusMaxWaitingThresholdDesc = 'consensus_maxWaitingThreshold_DESC',
  ConsensusMaxWaitingThresholdDescNullsFirst = 'consensus_maxWaitingThreshold_DESC_NULLS_FIRST',
  ConsensusMaxWaitingThresholdDescNullsLast = 'consensus_maxWaitingThreshold_DESC_NULLS_LAST',
  ConsensusVoteThresholdPercentAsc = 'consensus_voteThresholdPercent_ASC',
  ConsensusVoteThresholdPercentAscNullsFirst = 'consensus_voteThresholdPercent_ASC_NULLS_FIRST',
  ConsensusVoteThresholdPercentAscNullsLast = 'consensus_voteThresholdPercent_ASC_NULLS_LAST',
  ConsensusVoteThresholdPercentDesc = 'consensus_voteThresholdPercent_DESC',
  ConsensusVoteThresholdPercentDescNullsFirst = 'consensus_voteThresholdPercent_DESC_NULLS_FIRST',
  ConsensusVoteThresholdPercentDescNullsLast = 'consensus_voteThresholdPercent_DESC_NULLS_LAST',
  ExpirationBlockAsc = 'expirationBlock_ASC',
  ExpirationBlockAscNullsFirst = 'expirationBlock_ASC_NULLS_FIRST',
  ExpirationBlockAscNullsLast = 'expirationBlock_ASC_NULLS_LAST',
  ExpirationBlockDesc = 'expirationBlock_DESC',
  ExpirationBlockDescNullsFirst = 'expirationBlock_DESC_NULLS_FIRST',
  ExpirationBlockDescNullsLast = 'expirationBlock_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  InfoDescriptionAsc = 'info_description_ASC',
  InfoDescriptionAscNullsFirst = 'info_description_ASC_NULLS_FIRST',
  InfoDescriptionAscNullsLast = 'info_description_ASC_NULLS_LAST',
  InfoDescriptionDesc = 'info_description_DESC',
  InfoDescriptionDescNullsFirst = 'info_description_DESC_NULLS_FIRST',
  InfoDescriptionDescNullsLast = 'info_description_DESC_NULLS_LAST',
  InfoIdAsc = 'info_id_ASC',
  InfoIdAscNullsFirst = 'info_id_ASC_NULLS_FIRST',
  InfoIdAscNullsLast = 'info_id_ASC_NULLS_LAST',
  InfoIdDesc = 'info_id_DESC',
  InfoIdDescNullsFirst = 'info_id_DESC_NULLS_FIRST',
  InfoIdDescNullsLast = 'info_id_DESC_NULLS_LAST',
  InfoLogoUrlAsc = 'info_logoUrl_ASC',
  InfoLogoUrlAscNullsFirst = 'info_logoUrl_ASC_NULLS_FIRST',
  InfoLogoUrlAscNullsLast = 'info_logoUrl_ASC_NULLS_LAST',
  InfoLogoUrlDesc = 'info_logoUrl_DESC',
  InfoLogoUrlDescNullsFirst = 'info_logoUrl_DESC_NULLS_FIRST',
  InfoLogoUrlDescNullsLast = 'info_logoUrl_DESC_NULLS_LAST',
  InfoNameAsc = 'info_name_ASC',
  InfoNameAscNullsFirst = 'info_name_ASC_NULLS_FIRST',
  InfoNameAscNullsLast = 'info_name_ASC_NULLS_LAST',
  InfoNameDesc = 'info_name_DESC',
  InfoNameDescNullsFirst = 'info_name_DESC_NULLS_FIRST',
  InfoNameDescNullsLast = 'info_name_DESC_NULLS_LAST',
  InfoPublisherInfoAsc = 'info_publisherInfo_ASC',
  InfoPublisherInfoAscNullsFirst = 'info_publisherInfo_ASC_NULLS_FIRST',
  InfoPublisherInfoAscNullsLast = 'info_publisherInfo_ASC_NULLS_LAST',
  InfoPublisherInfoDesc = 'info_publisherInfo_DESC',
  InfoPublisherInfoDescNullsFirst = 'info_publisherInfo_DESC_NULLS_FIRST',
  InfoPublisherInfoDescNullsLast = 'info_publisherInfo_DESC_NULLS_LAST',
  NamespaceAsc = 'namespace_ASC',
  NamespaceAscNullsFirst = 'namespace_ASC_NULLS_FIRST',
  NamespaceAscNullsLast = 'namespace_ASC_NULLS_LAST',
  NamespaceDesc = 'namespace_DESC',
  NamespaceDescNullsFirst = 'namespace_DESC_NULLS_FIRST',
  NamespaceDescNullsLast = 'namespace_DESC_NULLS_LAST',
  NominationsEnabledAsc = 'nominationsEnabled_ASC',
  NominationsEnabledAscNullsFirst = 'nominationsEnabled_ASC_NULLS_FIRST',
  NominationsEnabledAscNullsLast = 'nominationsEnabled_ASC_NULLS_LAST',
  NominationsEnabledDesc = 'nominationsEnabled_DESC',
  NominationsEnabledDescNullsFirst = 'nominationsEnabled_DESC_NULLS_FIRST',
  NominationsEnabledDescNullsLast = 'nominationsEnabled_DESC_NULLS_LAST',
  RegistrarFriendlyNameAsc = 'registrar_friendlyName_ASC',
  RegistrarFriendlyNameAscNullsFirst = 'registrar_friendlyName_ASC_NULLS_FIRST',
  RegistrarFriendlyNameAscNullsLast = 'registrar_friendlyName_ASC_NULLS_LAST',
  RegistrarFriendlyNameDesc = 'registrar_friendlyName_DESC',
  RegistrarFriendlyNameDescNullsFirst = 'registrar_friendlyName_DESC_NULLS_FIRST',
  RegistrarFriendlyNameDescNullsLast = 'registrar_friendlyName_DESC_NULLS_LAST',
  RegistrarIdAsc = 'registrar_id_ASC',
  RegistrarIdAscNullsFirst = 'registrar_id_ASC_NULLS_FIRST',
  RegistrarIdAscNullsLast = 'registrar_id_ASC_NULLS_LAST',
  RegistrarIdDesc = 'registrar_id_DESC',
  RegistrarIdDescNullsFirst = 'registrar_id_DESC_NULLS_FIRST',
  RegistrarIdDescNullsLast = 'registrar_id_DESC_NULLS_LAST',
  RegistrarIsAllowedAsc = 'registrar_isAllowed_ASC',
  RegistrarIsAllowedAscNullsFirst = 'registrar_isAllowed_ASC_NULLS_FIRST',
  RegistrarIsAllowedAscNullsLast = 'registrar_isAllowed_ASC_NULLS_LAST',
  RegistrarIsAllowedDesc = 'registrar_isAllowed_DESC',
  RegistrarIsAllowedDescNullsFirst = 'registrar_isAllowed_DESC_NULLS_FIRST',
  RegistrarIsAllowedDescNullsLast = 'registrar_isAllowed_DESC_NULLS_LAST',
  RegistrarLegalLocationAsc = 'registrar_legalLocation_ASC',
  RegistrarLegalLocationAscNullsFirst = 'registrar_legalLocation_ASC_NULLS_FIRST',
  RegistrarLegalLocationAscNullsLast = 'registrar_legalLocation_ASC_NULLS_LAST',
  RegistrarLegalLocationDesc = 'registrar_legalLocation_DESC',
  RegistrarLegalLocationDescNullsFirst = 'registrar_legalLocation_DESC_NULLS_FIRST',
  RegistrarLegalLocationDescNullsLast = 'registrar_legalLocation_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  WorkloadExecutionEnvironmentAsc = 'workload_executionEnvironment_ASC',
  WorkloadExecutionEnvironmentAscNullsFirst = 'workload_executionEnvironment_ASC_NULLS_FIRST',
  WorkloadExecutionEnvironmentAscNullsLast = 'workload_executionEnvironment_ASC_NULLS_LAST',
  WorkloadExecutionEnvironmentDesc = 'workload_executionEnvironment_DESC',
  WorkloadExecutionEnvironmentDescNullsFirst = 'workload_executionEnvironment_DESC_NULLS_FIRST',
  WorkloadExecutionEnvironmentDescNullsLast = 'workload_executionEnvironment_DESC_NULLS_LAST',
  WorkloadIdAsc = 'workload_id_ASC',
  WorkloadIdAscNullsFirst = 'workload_id_ASC_NULLS_FIRST',
  WorkloadIdAscNullsLast = 'workload_id_ASC_NULLS_LAST',
  WorkloadIdDesc = 'workload_id_DESC',
  WorkloadIdDescNullsFirst = 'workload_id_DESC_NULLS_FIRST',
  WorkloadIdDescNullsLast = 'workload_id_DESC_NULLS_LAST',
  WorkloadWorkLogicAsc = 'workload_workLogic_ASC',
  WorkloadWorkLogicAscNullsFirst = 'workload_workLogic_ASC_NULLS_FIRST',
  WorkloadWorkLogicAscNullsLast = 'workload_workLogic_ASC_NULLS_LAST',
  WorkloadWorkLogicDesc = 'workload_workLogic_DESC',
  WorkloadWorkLogicDescNullsFirst = 'workload_workLogic_DESC_NULLS_FIRST',
  WorkloadWorkLogicDescNullsLast = 'workload_workLogic_DESC_NULLS_LAST',
}

export enum SolutionResultSubmittedOrderByInput {
  BlockHashAsc = 'blockHash_ASC',
  BlockHashAscNullsFirst = 'blockHash_ASC_NULLS_FIRST',
  BlockHashAscNullsLast = 'blockHash_ASC_NULLS_LAST',
  BlockHashDesc = 'blockHash_DESC',
  BlockHashDescNullsFirst = 'blockHash_DESC_NULLS_FIRST',
  BlockHashDescNullsLast = 'blockHash_DESC_NULLS_LAST',
  BlockNumberAsc = 'blockNumber_ASC',
  BlockNumberAscNullsFirst = 'blockNumber_ASC_NULLS_FIRST',
  BlockNumberAscNullsLast = 'blockNumber_ASC_NULLS_LAST',
  BlockNumberDesc = 'blockNumber_DESC',
  BlockNumberDescNullsFirst = 'blockNumber_DESC_NULLS_FIRST',
  BlockNumberDescNullsLast = 'blockNumber_DESC_NULLS_LAST',
  ExtrinsicHashAsc = 'extrinsicHash_ASC',
  ExtrinsicHashAscNullsFirst = 'extrinsicHash_ASC_NULLS_FIRST',
  ExtrinsicHashAscNullsLast = 'extrinsicHash_ASC_NULLS_LAST',
  ExtrinsicHashDesc = 'extrinsicHash_DESC',
  ExtrinsicHashDescNullsFirst = 'extrinsicHash_DESC_NULLS_FIRST',
  ExtrinsicHashDescNullsLast = 'extrinsicHash_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  ResultAsc = 'result_ASC',
  ResultAscNullsFirst = 'result_ASC_NULLS_FIRST',
  ResultAscNullsLast = 'result_ASC_NULLS_LAST',
  ResultDesc = 'result_DESC',
  ResultDescNullsFirst = 'result_DESC_NULLS_FIRST',
  ResultDescNullsLast = 'result_DESC_NULLS_LAST',
  RewardPeriodIndexBlockNumberAsc = 'rewardPeriodIndex_blockNumber_ASC',
  RewardPeriodIndexBlockNumberAscNullsFirst = 'rewardPeriodIndex_blockNumber_ASC_NULLS_FIRST',
  RewardPeriodIndexBlockNumberAscNullsLast = 'rewardPeriodIndex_blockNumber_ASC_NULLS_LAST',
  RewardPeriodIndexBlockNumberDesc = 'rewardPeriodIndex_blockNumber_DESC',
  RewardPeriodIndexBlockNumberDescNullsFirst = 'rewardPeriodIndex_blockNumber_DESC_NULLS_FIRST',
  RewardPeriodIndexBlockNumberDescNullsLast = 'rewardPeriodIndex_blockNumber_DESC_NULLS_LAST',
  RewardPeriodIndexFirstBlockAsc = 'rewardPeriodIndex_firstBlock_ASC',
  RewardPeriodIndexFirstBlockAscNullsFirst = 'rewardPeriodIndex_firstBlock_ASC_NULLS_FIRST',
  RewardPeriodIndexFirstBlockAscNullsLast = 'rewardPeriodIndex_firstBlock_ASC_NULLS_LAST',
  RewardPeriodIndexFirstBlockDesc = 'rewardPeriodIndex_firstBlock_DESC',
  RewardPeriodIndexFirstBlockDescNullsFirst = 'rewardPeriodIndex_firstBlock_DESC_NULLS_FIRST',
  RewardPeriodIndexFirstBlockDescNullsLast = 'rewardPeriodIndex_firstBlock_DESC_NULLS_LAST',
  RewardPeriodIndexIdAsc = 'rewardPeriodIndex_id_ASC',
  RewardPeriodIndexIdAscNullsFirst = 'rewardPeriodIndex_id_ASC_NULLS_FIRST',
  RewardPeriodIndexIdAscNullsLast = 'rewardPeriodIndex_id_ASC_NULLS_LAST',
  RewardPeriodIndexIdDesc = 'rewardPeriodIndex_id_DESC',
  RewardPeriodIndexIdDescNullsFirst = 'rewardPeriodIndex_id_DESC_NULLS_FIRST',
  RewardPeriodIndexIdDescNullsLast = 'rewardPeriodIndex_id_DESC_NULLS_LAST',
  RewardPeriodIndexIndexAsc = 'rewardPeriodIndex_index_ASC',
  RewardPeriodIndexIndexAscNullsFirst = 'rewardPeriodIndex_index_ASC_NULLS_FIRST',
  RewardPeriodIndexIndexAscNullsLast = 'rewardPeriodIndex_index_ASC_NULLS_LAST',
  RewardPeriodIndexIndexDesc = 'rewardPeriodIndex_index_DESC',
  RewardPeriodIndexIndexDescNullsFirst = 'rewardPeriodIndex_index_DESC_NULLS_FIRST',
  RewardPeriodIndexIndexDescNullsLast = 'rewardPeriodIndex_index_DESC_NULLS_LAST',
  RewardPeriodIndexLengthAsc = 'rewardPeriodIndex_length_ASC',
  RewardPeriodIndexLengthAscNullsFirst = 'rewardPeriodIndex_length_ASC_NULLS_FIRST',
  RewardPeriodIndexLengthAscNullsLast = 'rewardPeriodIndex_length_ASC_NULLS_LAST',
  RewardPeriodIndexLengthDesc = 'rewardPeriodIndex_length_DESC',
  RewardPeriodIndexLengthDescNullsFirst = 'rewardPeriodIndex_length_DESC_NULLS_FIRST',
  RewardPeriodIndexLengthDescNullsLast = 'rewardPeriodIndex_length_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
  SolutionAdditionToExtraneousGroupsAllowedAsc = 'solution_additionToExtraneousGroupsAllowed_ASC',
  SolutionAdditionToExtraneousGroupsAllowedAscNullsFirst = 'solution_additionToExtraneousGroupsAllowed_ASC_NULLS_FIRST',
  SolutionAdditionToExtraneousGroupsAllowedAscNullsLast = 'solution_additionToExtraneousGroupsAllowed_ASC_NULLS_LAST',
  SolutionAdditionToExtraneousGroupsAllowedDesc = 'solution_additionToExtraneousGroupsAllowed_DESC',
  SolutionAdditionToExtraneousGroupsAllowedDescNullsFirst = 'solution_additionToExtraneousGroupsAllowed_DESC_NULLS_FIRST',
  SolutionAdditionToExtraneousGroupsAllowedDescNullsLast = 'solution_additionToExtraneousGroupsAllowed_DESC_NULLS_LAST',
  SolutionExpirationBlockAsc = 'solution_expirationBlock_ASC',
  SolutionExpirationBlockAscNullsFirst = 'solution_expirationBlock_ASC_NULLS_FIRST',
  SolutionExpirationBlockAscNullsLast = 'solution_expirationBlock_ASC_NULLS_LAST',
  SolutionExpirationBlockDesc = 'solution_expirationBlock_DESC',
  SolutionExpirationBlockDescNullsFirst = 'solution_expirationBlock_DESC_NULLS_FIRST',
  SolutionExpirationBlockDescNullsLast = 'solution_expirationBlock_DESC_NULLS_LAST',
  SolutionIdAsc = 'solution_id_ASC',
  SolutionIdAscNullsFirst = 'solution_id_ASC_NULLS_FIRST',
  SolutionIdAscNullsLast = 'solution_id_ASC_NULLS_LAST',
  SolutionIdDesc = 'solution_id_DESC',
  SolutionIdDescNullsFirst = 'solution_id_DESC_NULLS_FIRST',
  SolutionIdDescNullsLast = 'solution_id_DESC_NULLS_LAST',
  SolutionNamespaceAsc = 'solution_namespace_ASC',
  SolutionNamespaceAscNullsFirst = 'solution_namespace_ASC_NULLS_FIRST',
  SolutionNamespaceAscNullsLast = 'solution_namespace_ASC_NULLS_LAST',
  SolutionNamespaceDesc = 'solution_namespace_DESC',
  SolutionNamespaceDescNullsFirst = 'solution_namespace_DESC_NULLS_FIRST',
  SolutionNamespaceDescNullsLast = 'solution_namespace_DESC_NULLS_LAST',
  SolutionNominationsEnabledAsc = 'solution_nominationsEnabled_ASC',
  SolutionNominationsEnabledAscNullsFirst = 'solution_nominationsEnabled_ASC_NULLS_FIRST',
  SolutionNominationsEnabledAscNullsLast = 'solution_nominationsEnabled_ASC_NULLS_LAST',
  SolutionNominationsEnabledDesc = 'solution_nominationsEnabled_DESC',
  SolutionNominationsEnabledDescNullsFirst = 'solution_nominationsEnabled_DESC_NULLS_FIRST',
  SolutionNominationsEnabledDescNullsLast = 'solution_nominationsEnabled_DESC_NULLS_LAST',
  SolutionStatusAsc = 'solution_status_ASC',
  SolutionStatusAscNullsFirst = 'solution_status_ASC_NULLS_FIRST',
  SolutionStatusAscNullsLast = 'solution_status_ASC_NULLS_LAST',
  SolutionStatusDesc = 'solution_status_DESC',
  SolutionStatusDescNullsFirst = 'solution_status_DESC_NULLS_FIRST',
  SolutionStatusDescNullsLast = 'solution_status_DESC_NULLS_LAST',
  SuccessfulAsc = 'successful_ASC',
  SuccessfulAscNullsFirst = 'successful_ASC_NULLS_FIRST',
  SuccessfulAscNullsLast = 'successful_ASC_NULLS_LAST',
  SuccessfulDesc = 'successful_DESC',
  SuccessfulDescNullsFirst = 'successful_DESC_NULLS_FIRST',
  SuccessfulDescNullsLast = 'successful_DESC_NULLS_LAST',
  VotingRoundIdAsc = 'votingRoundId_ASC',
  VotingRoundIdAscNullsFirst = 'votingRoundId_ASC_NULLS_FIRST',
  VotingRoundIdAscNullsLast = 'votingRoundId_ASC_NULLS_LAST',
  VotingRoundIdDesc = 'votingRoundId_DESC',
  VotingRoundIdDescNullsFirst = 'votingRoundId_DESC_NULLS_FIRST',
  VotingRoundIdDescNullsLast = 'votingRoundId_DESC_NULLS_LAST',
  WorkerAddressAsc = 'worker_address_ASC',
  WorkerAddressAscNullsFirst = 'worker_address_ASC_NULLS_FIRST',
  WorkerAddressAscNullsLast = 'worker_address_ASC_NULLS_LAST',
  WorkerAddressDesc = 'worker_address_DESC',
  WorkerAddressDescNullsFirst = 'worker_address_DESC_NULLS_FIRST',
  WorkerAddressDescNullsLast = 'worker_address_DESC_NULLS_LAST',
  WorkerIdAsc = 'worker_id_ASC',
  WorkerIdAscNullsFirst = 'worker_id_ASC_NULLS_FIRST',
  WorkerIdAscNullsLast = 'worker_id_ASC_NULLS_LAST',
  WorkerIdDesc = 'worker_id_DESC',
  WorkerIdDescNullsFirst = 'worker_id_DESC_NULLS_FIRST',
  WorkerIdDescNullsLast = 'worker_id_DESC_NULLS_LAST',
}

export type SolutionResultSubmittedWhereInput = {
  AND?: InputMaybe<Array<SolutionResultSubmittedWhereInput>>;
  OR?: InputMaybe<Array<SolutionResultSubmittedWhereInput>>;
  blockHash_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_gt?: InputMaybe<Scalars['String']['input']>;
  blockHash_gte?: InputMaybe<Scalars['String']['input']>;
  blockHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockHash_lt?: InputMaybe<Scalars['String']['input']>;
  blockHash_lte?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  blockHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  blockNumber_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_gte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  blockNumber_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  blockNumber_lt?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_lte?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  blockNumber_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  extrinsicHash_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_gte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  extrinsicHash_lt?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_lte?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  extrinsicHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  extrinsicHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  result_contains?: InputMaybe<Scalars['String']['input']>;
  result_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  result_endsWith?: InputMaybe<Scalars['String']['input']>;
  result_eq?: InputMaybe<Scalars['String']['input']>;
  result_gt?: InputMaybe<Scalars['String']['input']>;
  result_gte?: InputMaybe<Scalars['String']['input']>;
  result_in?: InputMaybe<Array<Scalars['String']['input']>>;
  result_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  result_lt?: InputMaybe<Scalars['String']['input']>;
  result_lte?: InputMaybe<Scalars['String']['input']>;
  result_not_contains?: InputMaybe<Scalars['String']['input']>;
  result_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  result_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  result_not_eq?: InputMaybe<Scalars['String']['input']>;
  result_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  result_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  result_startsWith?: InputMaybe<Scalars['String']['input']>;
  rewardPeriodIndex?: InputMaybe<ActiveRewardPeriodInfoWhereInput>;
  rewardPeriodIndex_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solution?: InputMaybe<SolutionWhereInput>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solution_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  successful_eq?: InputMaybe<Scalars['Boolean']['input']>;
  successful_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  successful_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  votingRoundId_contains?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_endsWith?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_eq?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_gt?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_gte?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  votingRoundId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  votingRoundId_lt?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_lte?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_not_contains?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_not_eq?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  votingRoundId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  votingRoundId_startsWith?: InputMaybe<Scalars['String']['input']>;
  worker?: InputMaybe<WorkerAccountWhereInput>;
  worker_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SolutionWhereInput = {
  AND?: InputMaybe<Array<SolutionWhereInput>>;
  OR?: InputMaybe<Array<SolutionWhereInput>>;
  additionToExtraneousGroupsAllowed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  additionToExtraneousGroupsAllowed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  additionToExtraneousGroupsAllowed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  consensus?: InputMaybe<SolutionConsensusWhereInput>;
  consensus_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expirationBlock_eq?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_gt?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_gte?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  expirationBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expirationBlock_lt?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_lte?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  expirationBlock_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  info?: InputMaybe<SolutionInfoWhereInput>;
  info_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  namespace_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_gt?: InputMaybe<Scalars['String']['input']>;
  namespace_gte?: InputMaybe<Scalars['String']['input']>;
  namespace_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  namespace_lt?: InputMaybe<Scalars['String']['input']>;
  namespace_lte?: InputMaybe<Scalars['String']['input']>;
  namespace_not_contains?: InputMaybe<Scalars['String']['input']>;
  namespace_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  namespace_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_not_eq?: InputMaybe<Scalars['String']['input']>;
  namespace_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  namespace_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  namespace_startsWith?: InputMaybe<Scalars['String']['input']>;
  nominationsEnabled_eq?: InputMaybe<Scalars['Boolean']['input']>;
  nominationsEnabled_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominationsEnabled_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  registrar?: InputMaybe<RegistrarAccountWhereInput>;
  registrar_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_contains?: InputMaybe<Scalars['String']['input']>;
  status_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_eq?: InputMaybe<Scalars['String']['input']>;
  status_gt?: InputMaybe<Scalars['String']['input']>;
  status_gte?: InputMaybe<Scalars['String']['input']>;
  status_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_lt?: InputMaybe<Scalars['String']['input']>;
  status_lte?: InputMaybe<Scalars['String']['input']>;
  status_not_contains?: InputMaybe<Scalars['String']['input']>;
  status_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  status_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  status_not_eq?: InputMaybe<Scalars['String']['input']>;
  status_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  status_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  status_startsWith?: InputMaybe<Scalars['String']['input']>;
  submittedResults_every?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_none?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_some?: InputMaybe<SolutionResultSubmittedWhereInput>;
  workload?: InputMaybe<SolutionWorkloadWhereInput>;
  workload_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SolutionWorkloadOrderByInput {
  ExecutionEnvironmentAsc = 'executionEnvironment_ASC',
  ExecutionEnvironmentAscNullsFirst = 'executionEnvironment_ASC_NULLS_FIRST',
  ExecutionEnvironmentAscNullsLast = 'executionEnvironment_ASC_NULLS_LAST',
  ExecutionEnvironmentDesc = 'executionEnvironment_DESC',
  ExecutionEnvironmentDescNullsFirst = 'executionEnvironment_DESC_NULLS_FIRST',
  ExecutionEnvironmentDescNullsLast = 'executionEnvironment_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  WorkLogicAsc = 'workLogic_ASC',
  WorkLogicAscNullsFirst = 'workLogic_ASC_NULLS_FIRST',
  WorkLogicAscNullsLast = 'workLogic_ASC_NULLS_LAST',
  WorkLogicDesc = 'workLogic_DESC',
  WorkLogicDescNullsFirst = 'workLogic_DESC_NULLS_FIRST',
  WorkLogicDescNullsLast = 'workLogic_DESC_NULLS_LAST',
}

export type SolutionWorkloadWhereInput = {
  AND?: InputMaybe<Array<SolutionWorkloadWhereInput>>;
  OR?: InputMaybe<Array<SolutionWorkloadWhereInput>>;
  executionEnvironment_contains?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_endsWith?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_eq?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_gt?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_gte?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executionEnvironment_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  executionEnvironment_lt?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_lte?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_not_contains?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_not_eq?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  executionEnvironment_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  executionEnvironment_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  workLogic_contains?: InputMaybe<Scalars['String']['input']>;
  workLogic_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  workLogic_endsWith?: InputMaybe<Scalars['String']['input']>;
  workLogic_eq?: InputMaybe<Scalars['String']['input']>;
  workLogic_gt?: InputMaybe<Scalars['String']['input']>;
  workLogic_gte?: InputMaybe<Scalars['String']['input']>;
  workLogic_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workLogic_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  workLogic_lt?: InputMaybe<Scalars['String']['input']>;
  workLogic_lte?: InputMaybe<Scalars['String']['input']>;
  workLogic_not_contains?: InputMaybe<Scalars['String']['input']>;
  workLogic_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  workLogic_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  workLogic_not_eq?: InputMaybe<Scalars['String']['input']>;
  workLogic_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  workLogic_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  workLogic_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum UnsubscriptionScheduleOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  OperatorFriendlyNameAsc = 'operator_friendlyName_ASC',
  OperatorFriendlyNameAscNullsFirst = 'operator_friendlyName_ASC_NULLS_FIRST',
  OperatorFriendlyNameAscNullsLast = 'operator_friendlyName_ASC_NULLS_LAST',
  OperatorFriendlyNameDesc = 'operator_friendlyName_DESC',
  OperatorFriendlyNameDescNullsFirst = 'operator_friendlyName_DESC_NULLS_FIRST',
  OperatorFriendlyNameDescNullsLast = 'operator_friendlyName_DESC_NULLS_LAST',
  OperatorIdAsc = 'operator_id_ASC',
  OperatorIdAscNullsFirst = 'operator_id_ASC_NULLS_FIRST',
  OperatorIdAscNullsLast = 'operator_id_ASC_NULLS_LAST',
  OperatorIdDesc = 'operator_id_DESC',
  OperatorIdDescNullsFirst = 'operator_id_DESC_NULLS_FIRST',
  OperatorIdDescNullsLast = 'operator_id_DESC_NULLS_LAST',
  OperatorLegalLocationAsc = 'operator_legalLocation_ASC',
  OperatorLegalLocationAscNullsFirst = 'operator_legalLocation_ASC_NULLS_FIRST',
  OperatorLegalLocationAscNullsLast = 'operator_legalLocation_ASC_NULLS_LAST',
  OperatorLegalLocationDesc = 'operator_legalLocation_DESC',
  OperatorLegalLocationDescNullsFirst = 'operator_legalLocation_DESC_NULLS_FIRST',
  OperatorLegalLocationDescNullsLast = 'operator_legalLocation_DESC_NULLS_LAST',
  ScheduleNameAsc = 'scheduleName_ASC',
  ScheduleNameAscNullsFirst = 'scheduleName_ASC_NULLS_FIRST',
  ScheduleNameAscNullsLast = 'scheduleName_ASC_NULLS_LAST',
  ScheduleNameDesc = 'scheduleName_DESC',
  ScheduleNameDescNullsFirst = 'scheduleName_DESC_NULLS_FIRST',
  ScheduleNameDescNullsLast = 'scheduleName_DESC_NULLS_LAST',
  SolutionGroupIdAsc = 'solutionGroup_id_ASC',
  SolutionGroupIdAscNullsFirst = 'solutionGroup_id_ASC_NULLS_FIRST',
  SolutionGroupIdAscNullsLast = 'solutionGroup_id_ASC_NULLS_LAST',
  SolutionGroupIdDesc = 'solutionGroup_id_DESC',
  SolutionGroupIdDescNullsFirst = 'solutionGroup_id_DESC_NULLS_FIRST',
  SolutionGroupIdDescNullsLast = 'solutionGroup_id_DESC_NULLS_LAST',
  SolutionGroupNamespaceAsc = 'solutionGroup_namespace_ASC',
  SolutionGroupNamespaceAscNullsFirst = 'solutionGroup_namespace_ASC_NULLS_FIRST',
  SolutionGroupNamespaceAscNullsLast = 'solutionGroup_namespace_ASC_NULLS_LAST',
  SolutionGroupNamespaceDesc = 'solutionGroup_namespace_DESC',
  SolutionGroupNamespaceDescNullsFirst = 'solutionGroup_namespace_DESC_NULLS_FIRST',
  SolutionGroupNamespaceDescNullsLast = 'solutionGroup_namespace_DESC_NULLS_LAST',
  SolutionGroupOperationEndBlockAsc = 'solutionGroup_operationEndBlock_ASC',
  SolutionGroupOperationEndBlockAscNullsFirst = 'solutionGroup_operationEndBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationEndBlockAscNullsLast = 'solutionGroup_operationEndBlock_ASC_NULLS_LAST',
  SolutionGroupOperationEndBlockDesc = 'solutionGroup_operationEndBlock_DESC',
  SolutionGroupOperationEndBlockDescNullsFirst = 'solutionGroup_operationEndBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationEndBlockDescNullsLast = 'solutionGroup_operationEndBlock_DESC_NULLS_LAST',
  SolutionGroupOperationStartBlockAsc = 'solutionGroup_operationStartBlock_ASC',
  SolutionGroupOperationStartBlockAscNullsFirst = 'solutionGroup_operationStartBlock_ASC_NULLS_FIRST',
  SolutionGroupOperationStartBlockAscNullsLast = 'solutionGroup_operationStartBlock_ASC_NULLS_LAST',
  SolutionGroupOperationStartBlockDesc = 'solutionGroup_operationStartBlock_DESC',
  SolutionGroupOperationStartBlockDescNullsFirst = 'solutionGroup_operationStartBlock_DESC_NULLS_FIRST',
  SolutionGroupOperationStartBlockDescNullsLast = 'solutionGroup_operationStartBlock_DESC_NULLS_LAST',
  SolutionGroupWithdrawalDelayAsc = 'solutionGroup_withdrawalDelay_ASC',
  SolutionGroupWithdrawalDelayAscNullsFirst = 'solutionGroup_withdrawalDelay_ASC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayAscNullsLast = 'solutionGroup_withdrawalDelay_ASC_NULLS_LAST',
  SolutionGroupWithdrawalDelayDesc = 'solutionGroup_withdrawalDelay_DESC',
  SolutionGroupWithdrawalDelayDescNullsFirst = 'solutionGroup_withdrawalDelay_DESC_NULLS_FIRST',
  SolutionGroupWithdrawalDelayDescNullsLast = 'solutionGroup_withdrawalDelay_DESC_NULLS_LAST',
  UnsubscribeBlockAsc = 'unsubscribeBlock_ASC',
  UnsubscribeBlockAscNullsFirst = 'unsubscribeBlock_ASC_NULLS_FIRST',
  UnsubscribeBlockAscNullsLast = 'unsubscribeBlock_ASC_NULLS_LAST',
  UnsubscribeBlockDesc = 'unsubscribeBlock_DESC',
  UnsubscribeBlockDescNullsFirst = 'unsubscribeBlock_DESC_NULLS_FIRST',
  UnsubscribeBlockDescNullsLast = 'unsubscribeBlock_DESC_NULLS_LAST',
}

export type UnsubscriptionScheduleWhereInput = {
  AND?: InputMaybe<Array<UnsubscriptionScheduleWhereInput>>;
  OR?: InputMaybe<Array<UnsubscriptionScheduleWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  operator?: InputMaybe<OperatorAccountWhereInput>;
  operator_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scheduleName_contains?: InputMaybe<Scalars['String']['input']>;
  scheduleName_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  scheduleName_endsWith?: InputMaybe<Scalars['String']['input']>;
  scheduleName_eq?: InputMaybe<Scalars['String']['input']>;
  scheduleName_gt?: InputMaybe<Scalars['String']['input']>;
  scheduleName_gte?: InputMaybe<Scalars['String']['input']>;
  scheduleName_in?: InputMaybe<Array<Scalars['String']['input']>>;
  scheduleName_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  scheduleName_lt?: InputMaybe<Scalars['String']['input']>;
  scheduleName_lte?: InputMaybe<Scalars['String']['input']>;
  scheduleName_not_contains?: InputMaybe<Scalars['String']['input']>;
  scheduleName_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  scheduleName_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  scheduleName_not_eq?: InputMaybe<Scalars['String']['input']>;
  scheduleName_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  scheduleName_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  scheduleName_startsWith?: InputMaybe<Scalars['String']['input']>;
  solutionGroup?: InputMaybe<SolutionGroupWhereInput>;
  solutionGroup_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  unsubscribeBlock_eq?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_gt?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_gte?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  unsubscribeBlock_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  unsubscribeBlock_lt?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_lte?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_not_eq?: InputMaybe<Scalars['Int']['input']>;
  unsubscribeBlock_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum WorkerAccountOrderByInput {
  AccountIdAsc = 'account_id_ASC',
  AccountIdAscNullsFirst = 'account_id_ASC_NULLS_FIRST',
  AccountIdAscNullsLast = 'account_id_ASC_NULLS_LAST',
  AccountIdDesc = 'account_id_DESC',
  AccountIdDescNullsFirst = 'account_id_DESC_NULLS_FIRST',
  AccountIdDescNullsLast = 'account_id_DESC_NULLS_LAST',
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  MappingIdAsc = 'mapping_id_ASC',
  MappingIdAscNullsFirst = 'mapping_id_ASC_NULLS_FIRST',
  MappingIdAscNullsLast = 'mapping_id_ASC_NULLS_LAST',
  MappingIdDesc = 'mapping_id_DESC',
  MappingIdDescNullsFirst = 'mapping_id_DESC_NULLS_FIRST',
  MappingIdDescNullsLast = 'mapping_id_DESC_NULLS_LAST',
}

export type WorkerAccountWhereInput = {
  AND?: InputMaybe<Array<WorkerAccountWhereInput>>;
  OR?: InputMaybe<Array<WorkerAccountWhereInput>>;
  account?: InputMaybe<AccountWhereInput>;
  account_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  mapping?: InputMaybe<OperatorMappingWhereInput>;
  mapping_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  nominations_every?: InputMaybe<NominatedWorkersMappingWhereInput>;
  nominations_none?: InputMaybe<NominatedWorkersMappingWhereInput>;
  nominations_some?: InputMaybe<NominatedWorkersMappingWhereInput>;
  submittedResults_every?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_none?: InputMaybe<SolutionResultSubmittedWhereInput>;
  submittedResults_some?: InputMaybe<SolutionResultSubmittedWhereInput>;
};

export type SolutionResultSubmittedQueryVariables = Exact<{
  solutionId: Scalars['String']['input'];
  operatorId: Scalars['String']['input'];
}>;

export type SolutionResultSubmittedQuery = {
  __typename?: 'Query';
  solutionResultSubmitteds: Array<{
    __typename?: 'SolutionResultSubmitted';
    result: string;
    extrinsicHash?: string | null;
    blockHash?: string | null;
    successful?: boolean | null;
    blockNumber: any;
    rewardPeriodIndex?: { __typename?: 'ActiveRewardPeriodInfo'; id: string } | null;
  }>;
};

export type SolutionResultSubmittedByPeriodQueryVariables = Exact<{
  rewardPeriod: Scalars['String']['input'];
  solutionId: Scalars['String']['input'];
  operatorId: Scalars['String']['input'];
}>;

export type SolutionResultSubmittedByPeriodQuery = {
  __typename?: 'Query';
  solutionResultSubmitteds: Array<{
    __typename?: 'SolutionResultSubmitted';
    result: string;
    extrinsicHash?: string | null;
    blockHash?: string | null;
    successful?: boolean | null;
    blockNumber: any;
    solutionGroup?: { __typename?: 'SolutionGroup'; id: string } | null;
    rewardPeriodIndex?: { __typename?: 'ActiveRewardPeriodInfo'; id: string } | null;
  }>;
};

export type SubscriptionsByOperatorQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type SubscriptionsByOperatorQuery = {
  __typename?: 'Query';
  operatorAccountById?: {
    __typename?: 'OperatorAccount';
    subscribedStakes: Array<{
      __typename?: 'OperatorSubscribedStake';
      currentStake: any;
      nextStake: any;
      rewardPeriodIndex: number;
      solutionGroup: { __typename?: 'SolutionGroup'; namespace: string };
    }>;
    subscriptions: Array<{
      __typename?: 'OperatorSubscribedSolutionGroups';
      id: string;
      namespace: string;
      solutionGroup: {
        __typename?: 'SolutionGroup';
        id: string;
        namespace: string;
        operationStartBlock: number;
        operationEndBlock: number;
        withdrawalDelay?: number | null;
        operatorsConfig: {
          __typename?: 'SolutionGroupOperatorsConfig';
          startBlock: number;
          allowedOperators: number;
          maxOperatorWorkers: number;
          hasOperatorsAllowlist: boolean;
          stakingAmounts: { __typename?: 'SolutionGroupStakingAmounts'; min: any; max: any };
        };
        rewardsConfig: {
          __typename?: 'SolutionGroupRewardsConfig';
          subscriptionRewardPerBlock: any;
          votingRewardPerBlock: any;
          topPerformanceBonus: any;
        };
        info: {
          __typename?: 'SolutionGroupInfo';
          id: string;
          name: string;
          description: string;
          publisherInfo: string;
          logoUrl?: string | null;
        };
        solutions: Array<{
          __typename?: 'Solution';
          id: string;
          status?: string | null;
          namespace: string;
          additionToExtraneousGroupsAllowed?: boolean | null;
          expirationBlock: any;
          workload: {
            __typename?: 'SolutionWorkload';
            workLogic: string;
            executionEnvironment: string;
          };
          info: { __typename?: 'SolutionInfo'; id: string; description: string };
        }>;
        scheduledUnsubscriptions: Array<{
          __typename?: 'UnsubscriptionSchedule';
          unsubscribeBlock: number;
        }>;
      };
    }>;
  } | null;
};

export type GetEarnedRewardsQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
  groupNamespace: Scalars['String']['input'];
}>;

export type GetEarnedRewardsQuery = {
  __typename?: 'Query';
  earnedRewards: Array<{
    __typename?: 'EarnedRewards';
    id: string;
    subscriptionReward: any;
    participationReward: any;
  }>;
};

export type ResultsSubmittedQueryVariables = Exact<{
  rewardPeriod: Scalars['Int']['input'];
  operatorId: Scalars['String']['input'];
  groupNamespace: Scalars['String']['input'];
}>;

export type ResultsSubmittedQuery = {
  __typename?: 'Query';
  solutionResultSubmitteds: Array<{ __typename?: 'SolutionResultSubmitted'; id: string }>;
};

export type LowersQueryVariables = Exact<{
  sender?: InputMaybe<Scalars['String']['input']>;
}>;

export type LowersQuery = {
  __typename?: 'Query';
  avnLowers: Array<{
    __typename?: 'AvnLower';
    id: string;
    when: any;
    amount: any;
    blockNumber: any;
    receiver: string;
    isPending?: boolean | null;
    isFinalized?: boolean | null;
    sender: { __typename?: 'Account'; id: string };
  }>;
};

export type LiftsQueryVariables = Exact<{
  receiver?: InputMaybe<Scalars['String']['input']>;
}>;

export type LiftsQuery = {
  __typename?: 'Query';
  avnLifts: Array<{
    __typename?: 'AvnLift';
    id: string;
    when: any;
    amount: any;
    blockNumber: any;
    ewcTxHash?: string | null;
    sender?: string | null;
    receiver?: { __typename?: 'Account'; id: string } | null;
  }>;
};

export type MyQueryQueryVariables = Exact<{ [key: string]: never }>;

export type MyQueryQuery = {
  __typename?: 'Query';
  solutionGroups: Array<{
    __typename?: 'SolutionGroup';
    id: string;
    withdrawalDelay?: number | null;
    operationStartBlock: number;
    operationEndBlock: number;
    namespace: string;
    info: {
      __typename?: 'SolutionGroupInfo';
      description: string;
      id: string;
      logoUrl?: string | null;
      name: string;
      publisherInfo: string;
    };
    operatorsConfig: {
      __typename?: 'SolutionGroupOperatorsConfig';
      allowedOperators: number;
      hasOperatorsAllowlist: boolean;
      id: string;
      maxOperatorWorkers: number;
      startBlock: number;
      stakingAmounts: {
        __typename?: 'SolutionGroupStakingAmounts';
        id: string;
        max: any;
        min: any;
      };
    };
    registrar: {
      __typename?: 'RegistrarAccount';
      friendlyName?: string | null;
      id: string;
      isAllowed?: boolean | null;
      legalLocation?: string | null;
    };
    rewardsConfig: {
      __typename?: 'SolutionGroupRewardsConfig';
      id: string;
      subscriptionRewardPerBlock: any;
      topPerformanceBonus: any;
      votingRewardPerBlock: any;
    };
  }>;
};

export type GetSolutionGroupQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;

export type GetSolutionGroupQuery = {
  __typename?: 'Query';
  solutionGroupById?: {
    __typename?: 'SolutionGroup';
    id: string;
    withdrawalDelay?: number | null;
    operationStartBlock: number;
    operationEndBlock: number;
    namespace: string;
    info: {
      __typename?: 'SolutionGroupInfo';
      description: string;
      id: string;
      logoUrl?: string | null;
      name: string;
      publisherInfo: string;
    };
    operatorsConfig: {
      __typename?: 'SolutionGroupOperatorsConfig';
      allowedOperators: number;
      hasOperatorsAllowlist: boolean;
      id: string;
      maxOperatorWorkers: number;
      startBlock: number;
      stakingAmounts: {
        __typename?: 'SolutionGroupStakingAmounts';
        id: string;
        max: any;
        min: any;
      };
    };
    registrar: {
      __typename?: 'RegistrarAccount';
      friendlyName?: string | null;
      id: string;
      isAllowed?: boolean | null;
      legalLocation?: string | null;
    };
    rewardsConfig: {
      __typename?: 'SolutionGroupRewardsConfig';
      id: string;
      subscriptionRewardPerBlock: any;
      topPerformanceBonus: any;
      votingRewardPerBlock: any;
    };
    solutions: Array<{
      __typename?: 'Solution';
      id: string;
      status?: string | null;
      namespace: string;
      additionToExtraneousGroupsAllowed?: boolean | null;
      expirationBlock: any;
      workload: {
        __typename?: 'SolutionWorkload';
        workLogic: string;
        executionEnvironment: string;
      };
      info: { __typename?: 'SolutionInfo'; id: string; description: string; name: string };
    }>;
  } | null;
};

export type GetSubscriptionByIdQueryVariables = Exact<{
  solutionNamespace: Scalars['String']['input'];
  address: Scalars['String']['input'];
}>;

export type GetSubscriptionByIdQuery = {
  __typename?: 'Query';
  operatorAccounts: Array<{
    __typename?: 'OperatorAccount';
    id: string;
    subscriptions: Array<{ __typename?: 'OperatorSubscribedSolutionGroups'; namespace: string }>;
  }>;
};

export type GetLinkedWorkerNodeQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
}>;

export type GetLinkedWorkerNodeQuery = {
  __typename?: 'Query';
  workerAccounts: Array<{ __typename?: 'WorkerAccount'; address: string }>;
};

export type GetUnclaimedRewardsQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
}>;

export type GetUnclaimedRewardsQuery = {
  __typename?: 'Query';
  unclaimedRewards: Array<{
    __typename?: 'UnclaimedRewards';
    subscriptionReward: any;
    participationReward: any;
    solutionGroupId: string;
    address: string;
  }>;
};

export type GetCanOperatorWorkerVoteQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
  solutionNamespace: Scalars['String']['input'];
}>;

export type GetCanOperatorWorkerVoteQuery = {
  __typename?: 'Query';
  canOperatorWorkerVote: Array<{ __typename?: 'CanOperatorWorkerVote'; canVote: boolean }>;
};

export type GetCanOperatorWorkersVoteQueryVariables = Exact<{
  operatorId: Scalars['String']['input'];
}>;

export type GetCanOperatorWorkersVoteQuery = {
  __typename?: 'Query';
  canOperatorWorkerVote: Array<{
    __typename?: 'CanOperatorWorkerVote';
    solutionGroupId: string;
    canVote: boolean;
  }>;
};

export type GetEwtUsdQueryVariables = Exact<{
  currency: Scalars['String']['input'];
}>;

export type GetEwtUsdQuery = {
  __typename?: 'Query';
  ewtPriceById?: { __typename?: 'EwtPrice'; price: number } | null;
};

export const SolutionResultSubmittedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SolutionResultSubmitted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'solutionId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solutionResultSubmitteds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'operator' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'operatorId' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'solution' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'solutionId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'extrinsicHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'successful' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rewardPeriodIndex' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SolutionResultSubmittedQuery, SolutionResultSubmittedQueryVariables>;
export const SolutionResultSubmittedByPeriodDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SolutionResultSubmittedByPeriod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rewardPeriod' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'solutionId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solutionResultSubmitteds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rewardPeriodIndex' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'rewardPeriod' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'solution' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'solutionId' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'AND' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'operator' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'id_eq' },
                                        value: {
                                          kind: 'Variable',
                                          name: { kind: 'Name', value: 'operatorId' },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'result' } },
                { kind: 'Field', name: { kind: 'Name', value: 'extrinsicHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'successful' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'solutionGroup' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rewardPeriodIndex' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SolutionResultSubmittedByPeriodQuery,
  SolutionResultSubmittedByPeriodQueryVariables
>;
export const SubscriptionsByOperatorDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SubscriptionsByOperator' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operatorAccountById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subscribedStakes' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'orderBy' },
                      value: { kind: 'EnumValue', value: 'rewardPeriodIndex_DESC' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'currentStake' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'nextStake' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'rewardPeriodIndex' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'solutionGroup' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subscriptions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'solutionGroup' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'operationStartBlock' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'operationEndBlock' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'withdrawalDelay' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'operatorsConfig' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'startBlock' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'allowedOperators' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'maxOperatorWorkers' },
                                  },
                                  { kind: 'Field', name: { kind: 'Name', value: 'startBlock' } },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'stakingAmounts' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                                        { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'hasOperatorsAllowlist' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'rewardsConfig' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'subscriptionRewardPerBlock' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'votingRewardPerBlock' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'topPerformanceBonus' },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'info' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'publisherInfo' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'solutions' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                  { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'additionToExtraneousGroupsAllowed',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'expirationBlock' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'workload' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'workLogic' },
                                        },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'executionEnvironment' },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'expirationBlock' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'info' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                        {
                                          kind: 'Field',
                                          name: { kind: 'Name', value: 'description' },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'scheduledUnsubscriptions' },
                              arguments: [
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'orderBy' },
                                  value: {
                                    kind: 'EnumValue',
                                    value: 'unsubscribeBlock_DESC_NULLS_LAST',
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'where' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'operator' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'id_eq' },
                                              value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'id' },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  kind: 'Argument',
                                  name: { kind: 'Name', value: 'limit' },
                                  value: { kind: 'IntValue', value: '1' },
                                },
                              ],
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'unsubscribeBlock' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SubscriptionsByOperatorQuery, SubscriptionsByOperatorQueryVariables>;
export const GetEarnedRewardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEarnedRewards' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupNamespace' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'earnedRewards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'account' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'operator' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'operatorId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'solutionGroup' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'namespace_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'groupNamespace' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'subscriptionReward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'participationReward' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEarnedRewardsQuery, GetEarnedRewardsQueryVariables>;
export const ResultsSubmittedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ResultsSubmitted' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'rewardPeriod' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'groupNamespace' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solutionResultSubmitteds' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'rewardPeriodIndex' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'index_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'rewardPeriod' },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'AND' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'operator' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'operatorId' },
                                  },
                                },
                              ],
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'AND' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'solution' },
                                  value: {
                                    kind: 'ObjectValue',
                                    fields: [
                                      {
                                        kind: 'ObjectField',
                                        name: { kind: 'Name', value: 'solutionGroup' },
                                        value: {
                                          kind: 'ObjectValue',
                                          fields: [
                                            {
                                              kind: 'ObjectField',
                                              name: { kind: 'Name', value: 'namespace_eq' },
                                              value: {
                                                kind: 'Variable',
                                                name: { kind: 'Name', value: 'groupNamespace' },
                                              },
                                            },
                                          ],
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ResultsSubmittedQuery, ResultsSubmittedQueryVariables>;
export const LowersDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Lowers' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'sender' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avnLowers' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'sender' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'sender' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'when' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'sender' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'receiver' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isPending' } },
                { kind: 'Field', name: { kind: 'Name', value: 'isFinalized' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LowersQuery, LowersQueryVariables>;
export const LiftsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Lifts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'receiver' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'avnLifts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'receiver' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'id_eq' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'receiver' } },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'when' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'blockNumber' } },
                { kind: 'Field', name: { kind: 'Name', value: 'ewcTxHash' } },
                { kind: 'Field', name: { kind: 'Name', value: 'sender' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'receiver' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LiftsQuery, LiftsQueryVariables>;
export const MyQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'MyQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solutionGroups' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'withdrawalDelay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operationStartBlock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operationEndBlock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publisherInfo' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'operatorsConfig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'allowedOperators' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasOperatorsAllowlist' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxOperatorWorkers' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stakingAmounts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'startBlock' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'registrar' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'friendlyName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isAllowed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalLocation' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rewardsConfig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subscriptionRewardPerBlock' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'topPerformanceBonus' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'votingRewardPerBlock' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>;
export const GetSolutionGroupDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSolutionGroup' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'solutionGroupById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'withdrawalDelay' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operationStartBlock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'operationEndBlock' } },
                { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'info' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'logoUrl' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'publisherInfo' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'operatorsConfig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'allowedOperators' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'hasOperatorsAllowlist' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'maxOperatorWorkers' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'stakingAmounts' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'max' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'min' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'startBlock' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'registrar' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'friendlyName' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'isAllowed' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'legalLocation' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'rewardsConfig' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'subscriptionRewardPerBlock' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'topPerformanceBonus' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'votingRewardPerBlock' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'solutions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'namespace' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'additionToExtraneousGroupsAllowed' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'expirationBlock' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'workload' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'workLogic' } },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'executionEnvironment' },
                            },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'expirationBlock' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'info' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSolutionGroupQuery, GetSolutionGroupQueryVariables>;
export const GetSubscriptionByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetSubscriptionById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'solutionNamespace' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'operatorAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_eq' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'address' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'subscriptions' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'where' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'namespace_eq' },
                            value: {
                              kind: 'Variable',
                              name: { kind: 'Name', value: 'solutionNamespace' },
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [{ kind: 'Field', name: { kind: 'Name', value: 'namespace' } }],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetSubscriptionByIdQuery, GetSubscriptionByIdQueryVariables>;
export const GetLinkedWorkerNodeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetLinkedWorkerNode' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'workerAccounts' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'mapping' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'operator' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'id_eq' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'operatorId' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'address' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetLinkedWorkerNodeQuery, GetLinkedWorkerNodeQueryVariables>;
export const GetUnclaimedRewardsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUnclaimedRewards' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unclaimedRewards' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'subscriptionReward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'participationReward' } },
                { kind: 'Field', name: { kind: 'Name', value: 'solutionGroupId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUnclaimedRewardsQuery, GetUnclaimedRewardsQueryVariables>;
export const GetCanOperatorWorkerVoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCanOperatorWorkerVote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'solutionNamespace' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canOperatorWorkerVote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'solutionGroupId' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'solutionNamespace' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'canVote' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCanOperatorWorkerVoteQuery, GetCanOperatorWorkerVoteQueryVariables>;
export const GetCanOperatorWorkersVoteDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCanOperatorWorkersVote' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'canOperatorWorkerVote' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'address' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'operatorId' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'solutionGroupId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'canVote' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCanOperatorWorkersVoteQuery,
  GetCanOperatorWorkersVoteQueryVariables
>;
export const GetEwtUsdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetEwtUsd' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'currency' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'ewtPriceById' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'currency' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [{ kind: 'Field', name: { kind: 'Name', value: 'price' } }],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetEwtUsdQuery, GetEwtUsdQueryVariables>;

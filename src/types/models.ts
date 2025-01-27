import { Prisma } from '@prisma/client';
import { PrismaModels } from 'prisma-models';

export type Models = PrismaModels<Prisma.ModelName, Prisma.TypeMap>;
export type AddressBook = Models['AddressBook'];
export type CurrentPeriod = Models['CurrentPeriod'];
export type EarnedRewards = Models['EarnedRewards'];
export type EWXPreference = Models['EWXPreference'];
export type KeyPair = Models['KeyPair'];
export type LastEWXAccount = Models['LastEWXAccount'];
export type Notifications = Models['Notifications'];
export type ReleaseVersion = Models['ReleaseVersion'];
export type Solution = Models['Solution'];
export type SolutionFlow = Models['SolutionFlow'];
export type SolutionGroup = Models['SolutionGroup'];
export type SolutionGroupSubscription = Models['SolutionGroupSubscription'];
export type VoteHash = Models['VoteHash'];
export type VoteResult = Models['VoteResult'];

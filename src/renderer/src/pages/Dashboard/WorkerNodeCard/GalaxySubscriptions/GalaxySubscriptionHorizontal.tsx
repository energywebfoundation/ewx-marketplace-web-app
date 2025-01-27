import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import * as Collapsible from '@radix-ui/react-collapsible';
import { PiCaretUpBold } from 'react-icons/pi';
import clsx from 'clsx';
import { SolutionGroupId, type SolutionGroupStatus } from '@main/entities/solution-group';
import { truncateBalance } from '@ewf/lib/utils';
import { parseAmount } from '@ewf/lib/utils';
import { ClaimReward } from '@ewf/components/ClaimReward';
import { GenericChip } from '@ewf/components/Chips/GenericChip';
import { CircularChartSingular } from '@ewf/components/Charts/Circular/CircularChartSingular';
import { Tooltip } from '@ewf/components/Tooltip';
import solutionGroupIcon from '@ewf/assets/icons/solution-group.svg';
import claimRewardsIcon from '@ewf/assets/icons/claim-rewards.svg';
import topupIcon from '@ewf/assets/icons/top-up.svg';
import manageSubscriptionIcon from '@ewf/assets/icons/gear-gradient.svg';
import CalendarGradient from '@ewf/assets/icons/calendar-gradient.svg';
import NextVotingIcon from '@ewf/assets/icons/next-voting.svg';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { ManageWorkerPrompt } from './ManageWorker/ManageWorkerPrompt';
import { ManageVoting } from './ManageVoting';
import {
  EnableWorkerButton,
  PauseWorkerButton,
  ResumeWorkerButton,
  NoWorkerButton,
} from './WorkerButton';
import { ScheduledUnsubscriptionChip } from '@ewf/components/Chips/ScheduledUnsubscriptionChip';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import { useApiServiceStore } from '@ewf/stores/api';
import {
  GENERIC_CHIP_COLOR,
  MANAGE_WORKER_LABEL,
  WORKER_STATUS,
  WORKER_STATUS_COLOR,
} from '@ewf/types/enums';
import { isElectron } from '@main/helpers/is-electron';

export const GalaxySubscriptionHorizontal = (
  solutionGroup: GalaxySubscriptionHorizontalProps,
): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const {
    id,
    name,
    stakeAmount,
    floatingStakeAmount,
    namespace,
    isVotingEnabled,
    workerAddress,
    onManageVotingClosed,
    fetchWorkerAddress,
    parentData,
    isStartVoteNextPeriod,
    isExpired,
    onOpenTopupStaking,
    isPendingUnsubscribe,
    unsubscriptionDate,
    withdrawalDelay,
  } = solutionGroup;
  const { workerLinkedToEwx, ewtusd = 0 } = parentData;
  const [isClaimRewardOpen, setIsClaimRewardOpen] = useState(false);
  const [isManageVotingOpen, setIsManageVotingOpen] = useState(false);
  const [isManageWorkerOpen, setIsManageWorkerOpen] = useState(false);
  const [pendingRewards, setPendingRewards] = useState('0');
  const [currentRewardPeriod, setCurrentRewardPeriod] = useState<number | null>(null);
  const [currentVotesCasted, setCurrentVotesCasted] = useState<number | null>(null);
  const [isRewardDataLoading, setIsRewardDataLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const workerExecution = useWorkerExecutionStore((state) => state.status);
  const truncatedPendingRewards = truncateBalance(pendingRewards);
  const usdBalance = truncateBalance(parseFloat(pendingRewards) * ewtusd);

  const chipStatus: SolutionGroupStatus = isExpired ? 'expired' : 'running';
  const chips: Record<SolutionGroupStatus, JSX.Element | null> = {
    scheduled: <GenericChip label="Scheduled" color={GENERIC_CHIP_COLOR.LightPink} />,
    running:
      workerExecution === 'local' ? (
        <GenericChip
          label={solutionGroup.actualStatus || WORKER_STATUS.NotRunning}
          color={WORKER_STATUS_COLOR[solutionGroup.actualStatus || WORKER_STATUS.NotRunning]}
        />
      ) : null,
    expired: <GenericChip label="Expired" />,
  };

  const openManageVoting = () => {
    setIsManageVotingOpen(true);
  };

  const openManageWorker = () => {
    setIsManageWorkerOpen(true);
  };

  const acceptManageWorker = () => {
    setIsManageWorkerOpen(false);
    onManageVotingClosed();
  };

  const updateVotingInfo = useCallback(async () => {
    const { rewardPeriod, votes } = await workerApi.getCurrentVoteAndRewardPeriod(id);
    setCurrentRewardPeriod(rewardPeriod);
    setCurrentVotesCasted(votes);
  }, [id]);

  const updatePendingRewards = useCallback(async () => {
    const earnedRewardsWei = await workerApi.getEarnedRewards(id);
    const earnedRewards = parseAmount(earnedRewardsWei);

    setPendingRewards(earnedRewards || '0');
  }, [id]);

  useEffect(() => {
    try {
      setIsRewardDataLoading(true);
      updatePendingRewards();
      updateVotingInfo();
    } catch (e) {
      console.error(e);
    } finally {
      setIsRewardDataLoading(false);
    }

    const interval = setInterval(() => {
      updatePendingRewards();
      updateVotingInfo();
    }, 1000 * 30); // Every 30 seconds

    return () => clearInterval(interval);
  }, [updatePendingRewards, updateVotingInfo]);

  return (
    <div className="w-full max-w-[832px]">
      <ClaimReward
        namespace={namespace}
        isOpen={isClaimRewardOpen}
        setIsOpen={setIsClaimRewardOpen}
        onSuccess={updatePendingRewards}
      />
      <Collapsible.Root open={isExpanded} onOpenChange={setIsExpanded}>
        {/* Header */}
        <div className="mb-1 flex w-full gap-1">
          <div className="flex flex-grow flex-row items-center gap-4 rounded-sm rounded-tl-lg bg-gray-90 p-4 shadow-sm">
            <div className="flex h-auto w-fit flex-shrink-0 items-center rounded-full bg-brand/10 p-3">
              <img src={solutionGroupIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
            </div>
            <div className="mr-4 flex items-center gap-4">
              <p className="flex-shrink-0 whitespace-nowrap text-lg">{name}</p>
              <div className="flex flex-wrap gap-4">
                {chips[chipStatus]}
                {solutionGroup &&
                solutionGroup?.actionStatus !== 'NoAction' &&
                solutionGroup.actualStatus !== solutionGroup?.actionStatus ? (
                  <GenericChip
                    label={solutionGroup.actionStatus || WORKER_STATUS.NotRunning}
                    color={
                      WORKER_STATUS_COLOR[solutionGroup.actionStatus || WORKER_STATUS.NotRunning]
                    }
                  />
                ) : null}

                {isPendingUnsubscribe && unsubscriptionDate && (
                  <ScheduledUnsubscriptionChip
                    unsubscriptionDate={unsubscriptionDate}
                    withdrawalDelay={withdrawalDelay}
                  />
                )}
              </div>
            </div>
          </div>
          <Collapsible.Trigger className="flex items-center justify-center rounded-sm rounded-tr-lg bg-gray-90 p-4 shadow-sm">
            <PiCaretUpBold
              className={clsx({
                'rotate-180 transform': !isExpanded,
                'transition-transform duration-300': true,
              })}
            />
          </Collapsible.Trigger>
        </div>
        {/* Body */}
        <Collapsible.Content>
          <div className="space-y-4 rounded-b-lg rounded-t-sm bg-gray-90 p-4 shadow-sm">
            <div className="grid grid-cols-5 gap-4 ">
              {/* Stake amount */}
              <div className="col-span-4 flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
                <p className="mb-2 text-sm text-font-subtler">EWT Subscription Amount</p>
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
                  <h2 className="mb-1 max-w-[200px] truncate font-primary-bold text-xl text-gradient">
                    {truncateBalance(stakeAmount)}
                    {floatingStakeAmount && floatingStakeAmount !== '0' ? (
                      <>
                        <span className="text-base"> + {floatingStakeAmount}</span>
                        <Tooltip
                          side="bottom"
                          // className="border-none"
                          content={
                            <div className="max-w-[300px] p-2">
                              This amount will be added to the total subscription in the next reward
                              period.
                            </div>
                          }
                        >
                          <div className="ml-2 flex h-[16px] w-[16px] items-center justify-center rounded-full bg-gray-100">
                            <img src={questionMarkIcon} width={11} height={11} alt="more info" />
                          </div>
                        </Tooltip>
                      </>
                    ) : (
                      ''
                    )}
                  </h2>
                  <p className="text-font-subtler">{truncateBalance(+stakeAmount * ewtusd)} USD</p>
                </div>
              </div>
              {/* Top-up stake */}
              <button
                onClick={onOpenTopupStaking}
                title="Top-up subscription"
                className="group col-span-1 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60"
              >
                <p className="my-1 text-sm text-font-subtler">Top-up</p>
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
                  <div className="group-after:bg-button-gray-gradient absolute flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
                    <img src={topupIcon} width={24} height={24} alt="topupIcon" />
                  </div>
                </div>
              </button>
              {/* Pending rewards */}
              <div className="col-span-4 flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
                <p className="mb-2 text-sm text-font-subtler">Pending Rewards</p>
                <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
                  <h2 className="mb-1 max-w-[200px] truncate font-primary-bold text-xl text-gradient">
                    {truncatedPendingRewards < 0.0001 && truncatedPendingRewards != 0
                      ? '< 0.0001'
                      : truncatedPendingRewards}
                  </h2>
                  <p className="text-font-subtler">
                    {usdBalance < 0.0001 && usdBalance != 0 ? ' < 0.0001' : usdBalance} USD
                  </p>
                </div>
              </div>
              {/* Claim rewards */}
              <button
                onClick={() => setIsClaimRewardOpen(true)}
                disabled={pendingRewards === '0'}
                title={pendingRewards === '0' ? 'No rewards to claim' : 'Claim Rewards'}
                className={clsx({
                  'group col-span-1 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60':
                    true,
                  'opacity-40': pendingRewards === '0',
                })}
              >
                <p className="my-1 text-sm text-font-subtler">Claim Rewards</p>
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
                  <div className="group-after:bg-button-gray-gradient absolute flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
                    <img src={claimRewardsIcon} width={32} height={32} alt="claimRewardsIcon" />
                  </div>
                </div>
              </button>
            </div>
            <div className="grid grid-cols-10 gap-4 rounded-b-lg rounded-t-sm bg-gray-90">
              {/* Current reward period */}
              <div
                className={clsx({
                  'flex flex-col items-center justify-center rounded-md border-2 border-transparent bg-gray-90 p-2 shadow-sm gradient-border-dark-with-gray-85':
                    true,
                  'col-span-3': workerExecution === 'local',
                  'col-span-4': workerExecution === 'remote',
                })}
              >
                <p className="my-1 text-sm text-font-subtler">Current Reward Period</p>
                <div className="relative mt-3 flex h-[64px] w-[64px] items-center justify-center rounded-full text-center bg-dark-gradient">
                  <img src={CalendarGradient} width={35} alt="CalendarGradient" />
                  <div className="absolute bottom-2 right-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-gray-70 text-base bg-dark-gradient">
                    {isRewardDataLoading ? '-' : currentRewardPeriod}
                  </div>
                </div>
              </div>
              {/* Votes casted */}
              <div
                className={clsx({
                  'col-span-3': workerExecution === 'local',
                  'col-span-4': workerExecution === 'remote',
                })}
              >
                {/* Votes casted graph */}
                <div
                  className={clsx({
                    'flex h-full flex-col items-center justify-center rounded-md border-2 border-transparent bg-gray-90 p-3 shadow-sm gradient-border-dark-with-gray-85':
                      true,
                    hidden: isStartVoteNextPeriod,
                  })}
                >
                  <p
                    className={clsx({
                      'my-1 animate-pulse text-sm text-font-subtler': true,
                      hidden: isStartVoteNextPeriod !== undefined,
                    })}
                  >
                    Loading...
                  </p>
                  <div
                    className={clsx({
                      'flex flex-col items-center justify-center': true,
                      hidden: isStartVoteNextPeriod !== false,
                    })}
                  >
                    <p className="my-1 text-sm text-font-subtler">Votes cast in this period</p>
                    <div className="mt-3 flex h-[64px] w-[64px] items-center justify-center rounded-full text-center bg-dark-gradient">
                      <CircularChartSingular
                        value={isRewardDataLoading || !currentVotesCasted ? 0 : currentVotesCasted}
                      />
                    </div>
                  </div>
                </div>
                {/* Start to vote on next period */}
                <div
                  className={clsx({
                    'flex flex-col gap-1': true,
                    hidden: !isStartVoteNextPeriod,
                  })}
                >
                  <div
                    style={{
                      borderTopWidth: '1px',
                    }}
                    className="flex h-full flex-col items-center justify-center rounded-b-sm rounded-t-md border-transparent bg-gray-90 p-3 shadow-sm gradient-border-primary-with-gray-85"
                  >
                    <p className="text-center text-sm text-font-subtler">
                      Node will start voting in the next reward period
                    </p>
                  </div>
                  <div
                    style={{
                      borderBottomRightRadius: '8px',
                      borderBottomLeftRadius: '8px',
                    }}
                    className="flex flex-col items-center justify-center rounded-t-sm border-2 border-transparent bg-gray-90 p-3 shadow-sm gradient-border-dark-with-gray-85"
                  >
                    <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full text-center bg-dark-gradient">
                      <img src={NextVotingIcon} width={35} alt="NextVotingIcon" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Worker button */}
              <div
                className={clsx({
                  'col-span-2': true,
                  hidden: workerExecution === 'remote',
                })}
              >
                <WorkerButton
                  solutionGroup={solutionGroup}
                  openManageVoting={openManageVoting}
                  openManageWorker={openManageWorker}
                  isVotingEnabled={isVotingEnabled}
                  workerAddress={workerAddress}
                  workerLinkedToEwx={workerLinkedToEwx}
                />
                {/* Manage Subscription */}
              </div>
              <Link
                to={`/dashboard/${id}`}
                title="Manage Subscription"
                className="group col-span-2 flex flex-col items-center justify-center gap-3 rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60"
              >
                <p className="my-1 text-center text-sm text-font-subtler">Manage Subscription</p>
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
                  <div className="group-after:bg-button-gray-gradient absolute flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
                    <img
                      src={manageSubscriptionIcon}
                      width={24}
                      height={24}
                      alt="claimRewardsIcon"
                    />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      <ManageVoting
        workerId={id}
        workerName={name}
        isOpen={isManageVotingOpen}
        setIsOpen={setIsManageVotingOpen}
        onManageVotingClosed={onManageVotingClosed}
        fetchWorkerAddress={fetchWorkerAddress}
      />
      <ManageWorkerPrompt
        workerId={id}
        onAccept={acceptManageWorker}
        type={
          solutionGroup.status === WORKER_STATUS.Running
            ? MANAGE_WORKER_LABEL.Pause
            : MANAGE_WORKER_LABEL.Resume
        }
        isOpen={isManageWorkerOpen}
        setIsOpen={setIsManageWorkerOpen}
      />
    </div>
  );
};

export interface GalaxySubscriptionHorizontalProps {
  id: SolutionGroupId;
  name: string;
  namespace: string;
  isActive: boolean;
  isExpired: boolean;
  isVotingEnabled: boolean;
  isStartVoteNextPeriod: boolean | undefined;
  status?: string;
  actionStatus?: string | null;
  actualStatus?: string | null;
  stakeAmount: string;
  floatingStakeAmount: string;
  workerAddress: string;
  solutionsCount: number;
  parentData: ParentData;
  onManageVotingClosed: () => void;
  fetchWorkerAddress: () => void;
  onOpenTopupStaking: () => void;
  isPendingUnsubscribe: boolean;
  unsubscriptionDate?: Date;
  withdrawalDelay: number;
}

export const WorkerButton = ({
  solutionGroup,
  openManageVoting,
  isVotingEnabled,
  workerAddress,
  workerLinkedToEwx,
  openManageWorker,
}: WorkerButtonProps): JSX.Element => {
  if (!isVotingEnabled || !workerAddress || !workerLinkedToEwx || !solutionGroup.status) {
    if (
      solutionGroup.solutionsCount &&
      (!solutionGroup.actionStatus ||
        solutionGroup.actionStatus === 'NoAction' ||
        solutionGroup.actionStatus === WORKER_STATUS.DownloadFailed)
    ) {
      return isElectron() ? <EnableWorkerButton onClick={openManageVoting} /> : <NoWorkerButton />;
    } else {
      return <NoWorkerButton />;
    }
  }

  if (isVotingEnabled && workerAddress && workerLinkedToEwx) {
    if (solutionGroup.status === WORKER_STATUS.Paused) {
      return <ResumeWorkerButton onClick={openManageWorker} />;
    }
    if (solutionGroup.status === WORKER_STATUS.Running) {
      return <PauseWorkerButton onClick={openManageWorker} />;
    }
  }

  return <NoWorkerButton />;
};

interface WorkerButtonProps {
  solutionGroup: any;
  openManageVoting: () => void;
  isVotingEnabled: boolean;
  workerAddress: string;
  workerLinkedToEwx: boolean;
  openManageWorker: () => void;
}

export interface ParentData {
  ewtusd?: number;
  workerLinkedToEwx: boolean;
}

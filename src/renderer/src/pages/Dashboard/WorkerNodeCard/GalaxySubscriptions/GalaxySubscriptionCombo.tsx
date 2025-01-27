import { useEffect, useState, useCallback } from 'react';
import clsx from 'clsx';
import SolutionGroupIcon from '@ewf/assets/icons/solution-group.svg';
import { ProgressBarVertical } from '@ewf/components/ProgressBarVertical';
import { SolutionGroupStatus } from '@main/entities/solution-group';
import { Button } from '@ewf/components/Button';
import { Unstaking } from '@ewf/components/Unstaking';
import { ClaimReward } from '@ewf/components/ClaimReward';
import { IpcChannel } from '@main/helpers/ipc';
import { GenericChip } from '@ewf/components/Chips/GenericChip';
import { ScheduledUnsubscriptionChip } from '@ewf/components/Chips/ScheduledUnsubscriptionChip';
import { Tooltip } from '@ewf/components/Tooltip';
import { truncateBalance, parseAmount } from '@ewf/lib/utils';
import { ParentData } from './GalaxySubscriptionHorizontal';
import { ManageVoting } from './ManageVoting';
import { ManageWorkerPrompt } from './ManageWorker/ManageWorkerPrompt';
import { TopupStaking } from '@ewf/components/TopupStaking';
import { ClaimRewardsCard } from '../ClaimRewardsCard';
import CalendarGradient from '@ewf/assets/icons/calendar-gradient.svg';
import { CircularChartSingular } from '@ewf/components/Charts/Circular/CircularChartSingular';
import { WorkerButton } from './GalaxySubscriptionHorizontal';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import NextVotingIcon from '@ewf/assets/icons/next-voting.svg';
import topupIcon from '@ewf/assets/icons/top-up.svg';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { useApiServiceStore } from '@ewf/stores/api';
import {
  GENERIC_CHIP_COLOR,
  MANAGE_WORKER_LABEL,
  WORKER_STATUS,
  WORKER_STATUS_COLOR,
} from '@ewf/types/enums';
import { WorkerApi } from '@ewf/types/api';
import { isElectron } from '@main/helpers/is-electron';

export const GalaxySubscriptionCombo = (props: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const {
    workerId,
    name,
    actualStatus,
    isVotingEnabled,
    isStartVoteNextPeriod,
    stakeAmount,
    floatingStakeAmount,
    workerAddress,
    parentData,
    isPendingUnsubscribe,
    withdrawalDelay,
    onManageVotingClosed,
    fetchWorkerAddress,
    refreshSubscriptionData,
  } = props;
  const { workerLinkedToEwx } = parentData || { workerLinkedToEwx: false };
  const [isUnstakingOpen, setIsUnstakingOpen] = useState(false);
  const [isClaimRewardOpen, setIsClaimRewardOpen] = useState(false);
  const [isManageVotingOpen, setIsManageVotingOpen] = useState(false);
  const [isManageWorkerOpen, setIsManageWorkerOpen] = useState(false);
  const [isTopupStakingOpen, setIsTopupStakingOpen] = useState(false);
  const [ewtusd, setEwtusd] = useState<number>(0);
  const [pendingRewards, setPendingRewards] = useState('0');
  const [currentRewardPeriod, setCurrentRewardPeriod] = useState<number | null>(null);
  const [currentVotesCasted, setCurrentVotesCasted] = useState<number | null>(null);
  const [isRewardDataLoading, setIsRewardDataLoading] = useState(false);
  const workerExecution = useWorkerExecutionStore((state) => state.status);
  const truncatedPendingRewards = truncateBalance(pendingRewards);
  const usdBalance = truncateBalance(parseFloat(pendingRewards) * ewtusd);

  const initEwtUsdValue = async () => {
    setEwtusd(await workerApi.getEwtUsd());
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

  const updatePendingRewards = useCallback(async () => {
    const earnedRewardsWei = await workerApi.getEarnedRewards(workerId);
    const earnedRewards = parseAmount(earnedRewardsWei);

    setPendingRewards(earnedRewards || '0');
  }, [workerId]);

  const updateVotingInfo = useCallback(async () => {
    const { rewardPeriod, votes } = await workerApi.getCurrentVoteAndRewardPeriod(workerId);
    setCurrentRewardPeriod(rewardPeriod);
    setCurrentVotesCasted(votes);
  }, [workerId]);

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

  useEffect(() => {
    initEwtUsdValue();

    if (isElectron()) {
      window.Api.on(IpcChannel.ewtusdUpdated, (data: number) => {
        setEwtusd(data);
      });
    }

    // Clean all listeners when component unmounts
    return () => {
      if (isElectron()) {
        window.Api.removeAllListeners(IpcChannel.ewtusdUpdated);
      }
    };
  }, []);

  const DatesBarSection = () => (
    <div className="flex h-full flex-row rounded-md border-2 border-transparent p-4 py-4 shadow-darker gradient-border-dark-with-gray-85">
      <div className="h-full w-[16px] rounded p-1 bg-dark-gradient">
        <ProgressBarVertical
          progress={100}
          hasSubscriptionDate={props?.subscriptionDate && props?.subscriptionDate?.length > 0}
        />
      </div>
      <div className="mb-2 flex h-full min-w-[200px] flex-col justify-between py-2">
        <div className="flex w-full flex-col items-center rounded-md">
          <p className="mb-2 text-sm text-font-subtler">Start Date</p>
          <div className="relative flex flex-row items-center">
            <p>{props?.stakingStartDate[0]}</p>
          </div>
          <div className="relative flex flex-row items-center">
            <p>{props?.stakingStartDate[1]}</p>
          </div>
        </div>
        {props?.subscriptionDate && props?.subscriptionDate?.length > 0 && (
          <div className="flex w-full flex-col items-center rounded-md">
            <p className="mb-2 text-sm text-font-subtler">Subscription Date</p>
            <div className="relative flex flex-row items-center">
              <p>{props?.subscriptionDate[0]}</p>
            </div>
            <div className="relative flex flex-row items-center">
              <p>{props?.subscriptionDate[1]}</p>
            </div>
          </div>
        )}
        <div className="flex w-full flex-col items-center rounded-md">
          <p className="mb-2 text-sm text-font-subtler">End Date</p>
          <div className="relative flex flex-row items-center">
            <p>{props?.stakingEndDate[0]}</p>
          </div>
          <div className="relative flex flex-row items-center">
            <p>{props?.stakingEndDate[1]}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const StakedAmountSection = () => (
    <div className="flex w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
      <div className="mb-3 flex w-full items-center">
        <p className="flex-grow text-sm text-font-subtler">EWT Subscription Amount</p>
        <Tooltip
          side="bottom"
          visible={withdrawalDelay > 0 && !isPendingUnsubscribe}
          content={
            <div className="max-w-[300px] p-2">{`Unsubscribing from this item will take effect after ${
              (withdrawalDelay || 0) as number
            } block(s).`}</div>
          }
        >
          <div className="mr-2 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-100">
            <img src={questionMarkIcon} width={11} height={11} alt="more info" />
          </div>
        </Tooltip>
        {!isPendingUnsubscribe && (
          <Button
            onClick={() => setIsUnstakingOpen(true)}
            size="small"
            className="py-1"
            title="Unsubscribe"
          >
            Unsubscribe
          </Button>
        )}
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
        <h2 className="mb-1 font-primary-bold text-xl text-gradient">
          {truncateBalance(stakeAmount)}
          {floatingStakeAmount && floatingStakeAmount !== '0' ? (
            <>
              <span className="text-base"> + {floatingStakeAmount}</span>
              <Tooltip
                side="bottom"
                content={
                  <div className="max-w-[300px] p-2">
                    This amount will be added to the total subscription in the next reward period.
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
  );

  const PendingRewardsSection = () => (
    <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
      <p className="mb-2 text-sm text-font-subtler">Pending Rewards</p>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
        <h2 className="mb-1 font-primary-bold text-xl text-gradient">
          {truncatedPendingRewards < 0.0001 && truncatedPendingRewards != 0
            ? '< 0.0001'
            : truncatedPendingRewards}
        </h2>
        <p className="text-font-subtler">
          {usdBalance < 0.0001 && usdBalance != 0 ? ' < 0.0001' : usdBalance} USD
        </p>
      </div>
    </div>
  );

  const RewardPeriodSection = () => (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-center rounded-md border-2 border-transparent bg-gray-90 p-4 shadow-sm gradient-border-dark-with-gray-85">
      <p className="my-1 text-sm text-font-subtler">Current Reward Period</p>
      <div className="relative mt-3 flex h-[64px] w-[64px] items-center justify-center rounded-full text-center bg-dark-gradient">
        <img src={CalendarGradient} width={35} alt="CalendarGradient" />
        <div className="absolute bottom-2 right-2 flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-gray-70 text-base bg-dark-gradient">
          {isRewardDataLoading ? '-' : currentRewardPeriod}
        </div>
      </div>
    </div>
  );

  const VotesCastedSection = () =>
    !isStartVoteNextPeriod ? (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent bg-gray-90 p-4 shadow-sm gradient-border-dark-with-gray-85">
        {isStartVoteNextPeriod === undefined && (
          <p className="my-1 animate-pulse text-sm text-font-subtler">Loading...</p>
        )}
        {isStartVoteNextPeriod === false && (
          <>
            <p className="my-1 text-center text-sm text-font-subtler">Votes cast in this period</p>
            <div className="mt-3 flex h-[64px] w-[64px] items-center justify-center rounded-full text-center bg-dark-gradient">
              <CircularChartSingular
                value={isRewardDataLoading || !currentVotesCasted ? 0 : currentVotesCasted}
              />
            </div>
          </>
        )}
      </div>
    ) : (
      <div className="flex flex-col gap-1">
        <div
          style={{
            borderTopWidth: '1px',
          }}
          className="flex flex-col items-center justify-center rounded-b-sm rounded-t-md border-transparent bg-gray-90 p-3 shadow-sm gradient-border-primary-with-gray-85"
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
    );

  const TopupSection = () => (
    <button
      onClick={() => setIsTopupStakingOpen(true)}
      title="Top-up subscription"
      className="group flex h-full w-full flex-col items-center justify-center gap-3 rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60"
    >
      <p className="my-1 text-sm text-font-subtler">Top-up</p>
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
        <div className="group-after:bg-button-gray-gradient absolute flex h-[45px] w-[45px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
          <img src={topupIcon} width={24} height={24} alt="topupIcon" />
        </div>
      </div>
    </button>
  );

  const ClaimRewardsSection = () => (
    <div className="h-full w-full">
      <ClaimRewardsCard
        disabled={pendingRewards === '0'}
        onClick={() => setIsClaimRewardOpen(true)}
      />
    </div>
  );

  const WorkerButtonSection = () => (
    <div className="h-full w-full">
      <WorkerButton
        solutionGroup={{ ...props }}
        openManageVoting={openManageVoting}
        openManageWorker={openManageWorker}
        isVotingEnabled={isVotingEnabled}
        workerAddress={workerAddress}
        workerLinkedToEwx={workerLinkedToEwx}
      />
    </div>
  );

  return (
    <div className="w-full max-w-[832px]">
      <GalaxySubscriptionHeader {...props} />
      <div className="grid grid-cols-[225px_repeat(2,_1fr)_160px] grid-rows-3 gap-4 rounded-b-lg rounded-t-sm bg-gray-90 px-4 py-4 shadow-sm">
        <div className="row-span-3">
          <DatesBarSection />
        </div>
        <div className="col-span-2">
          <StakedAmountSection />
        </div>
        <div className="col-span-2">
          <PendingRewardsSection />
        </div>
        <div
          className={clsx({
            'col-start-2': true,
            'col-span-2': workerExecution === 'remote',
          })}
        >
          <RewardPeriodSection />
        </div>
        <VotesCastedSection />
        <div className="col-span-1 col-start-4 row-start-1">
          <TopupSection />
        </div>
        <div className="col-span-1 col-start-4 row-start-2">
          <ClaimRewardsSection />
        </div>
        <div
          className={clsx({
            'col-span-1 col-start-4 row-start-3': true,
            hidden: workerExecution === 'remote',
          })}
        >
          <WorkerButtonSection />
        </div>
      </div>
      <Unstaking
        workerId={props.workerId}
        namespace={props.namespace}
        withdrawalDelay={withdrawalDelay}
        isOpen={isUnstakingOpen}
        setIsOpen={setIsUnstakingOpen}
        onFinishUnsubscriptionDelay={refreshSubscriptionData}
      />
      <ClaimReward
        namespace={props.namespace}
        isOpen={isClaimRewardOpen}
        setIsOpen={setIsClaimRewardOpen}
        onSuccess={updatePendingRewards}
      />
      <ManageVoting
        workerId={workerId}
        workerName={name}
        isOpen={isManageVotingOpen}
        setIsOpen={setIsManageVotingOpen}
        onManageVotingClosed={onManageVotingClosed}
        fetchWorkerAddress={fetchWorkerAddress}
      />
      <ManageWorkerPrompt
        workerId={workerId}
        onAccept={acceptManageWorker}
        type={
          actualStatus === WORKER_STATUS.Running
            ? MANAGE_WORKER_LABEL.Pause
            : MANAGE_WORKER_LABEL.Resume
        }
        isOpen={isManageWorkerOpen}
        setIsOpen={setIsManageWorkerOpen}
      />
      <TopupStaking
        isOpen={isTopupStakingOpen}
        setIsOpen={setIsTopupStakingOpen}
        workerId={workerId}
        workerName={name}
        stakedAmount={truncateBalance(
          parseFloat(props.stakeAmount) + parseFloat(props.floatingStakeAmount),
        ).toString()}
        amounts={{}}
        onClose={() => setIsTopupStakingOpen(false)}
        onFinish={refreshSubscriptionData}
      />
    </div>
  );
};

interface Props {
  workerId: WorkerApi.WorkerId;
  name: string;
  namespace: string;
  stakeAmount: string;
  floatingStakeAmount: string;
  isExpired: boolean;
  isVotingEnabled: boolean;
  isStartVoteNextPeriod: boolean | undefined;
  workerAddress: string;
  status: string | null;
  stakingStartDate: string[];
  stakingEndDate: string[];
  subscriptionDate: string[];
  actualStatus?: string | null;
  actionStatus?: string | null;
  parentData: ParentData;
  solutionsCount: number;
  isPendingUnsubscribe: boolean;
  withdrawalDelay: number;
  onManageVotingClosed: () => void;
  refreshSubscriptionData: () => void;
  fetchWorkerAddress: () => void;
  unsubscriptionDate: Date;
}

export const GalaxySubscriptionHeader = ({
  name,
  actualStatus,
  actionStatus,
  isExpired,
  isPendingUnsubscribe,
  unsubscriptionDate,
  withdrawalDelay,
}: Props): JSX.Element => {
  const workerExecution = useWorkerExecutionStore((state) => state.status);
  const chipStatus: SolutionGroupStatus = isExpired ? 'expired' : 'running';
  const chips: Record<SolutionGroupStatus, JSX.Element | null> = {
    scheduled: <GenericChip label="Scheduled" color={GENERIC_CHIP_COLOR.LightPink} />,
    running:
      workerExecution === 'local' ? (
        <GenericChip
          label={actualStatus || WORKER_STATUS.NotRunning}
          color={WORKER_STATUS_COLOR[actualStatus || WORKER_STATUS.NotRunning]}
        />
      ) : null,
    expired: <GenericChip label="Expired" />,
  };

  return (
    <div className="mb-1 flex justify-between rounded-b-sm rounded-t-lg border-l-4 border-teal bg-gray-90 p-4 shadow-sm">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
          <img src={SolutionGroupIcon} width={16} height={16} alt="SolutionGroupIcon" />
        </div>
        <div className="flex items-center gap-4">
          <p className="flex-shrink-0 whitespace-nowrap text-lg">{name}</p>

          <div className="flex flex-wrap gap-4">
            {chips[chipStatus]}
            {actionStatus !== 'NoAction' && actualStatus !== actionStatus ? (
              <GenericChip
                label={actionStatus || WORKER_STATUS.NotRunning}
                color={WORKER_STATUS_COLOR[actionStatus || WORKER_STATUS.NotRunning]}
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
    </div>
  );
};

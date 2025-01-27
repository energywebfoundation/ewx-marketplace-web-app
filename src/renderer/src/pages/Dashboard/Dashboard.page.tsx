import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerConst } from '@ewf/lib/router';
import * as Tabs from '@radix-ui/react-tabs';
import { Tooltip } from '@ewf/components/Tooltip';
import { IpcChannel } from '@main/helpers/ipc';
import { Header } from '@ewf/components/Header';
import { Balance } from '@ewf/pages/Discover/Balance';
import { Layout } from '@ewf/components/Layout';
import { twix } from 'tailwindcss-radix-ui';
import { WorkerNodeAccount } from './WorkerNodeAccount';
import { WorkerEngineStatus } from '@ewf/components/WorkerEngineStatus';
import { TopupStaking } from '@ewf/components/TopupStaking';
import {
  GalaxySubscriptionHorizontal,
  GalaxySubscriptionHorizontalProps,
} from './WorkerNodeCard/GalaxySubscriptions/GalaxySubscriptionHorizontal';
import { useConnectionStore } from '@ewf/stores/connection';
import solutionGroupsIcon from '@ewf/assets/icons/solution-groups.svg';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { UnclaimedRewardList } from './WorkerNodeCard/GalaxySubscriptions/UnclaimedRewardList';
import { truncateBalance } from '@ewf/lib/utils';
import { useApiServiceStore } from '@ewf/stores/api';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import { isElectron } from '@main/helpers/is-electron';
import { EWX_LINK_STATUS, SCHEDULE_ACTION_LABEL, SOLUTION_GROUP_STATUS } from '@ewf/types/enums';
import { WalletApi, WorkerApi } from '@ewf/types/api';

export const fetchActionStatusLabel = (solutionGroup: WorkerApi.WorkerSubscription): string => {
  if (!solutionGroup.solutionsCount) {
    return 'No Active Solutions';
  }
  if (solutionGroup.subscription && solutionGroup.subscription.actionStatus) {
    return SCHEDULE_ACTION_LABEL[solutionGroup.subscription.actionStatus];
  }
  return 'NoAction';
};

export const fetchActualSolutionGroupStatus = (
  solutionGroup: WorkerApi.WorkerSubscription,
): string | null => {
  if (solutionGroup.subscription) {
    // Check if expired
    // Check if scheduled
    return solutionGroup.subscription.status;
  }
  return null;
};

export const DashboardPage = (): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [subscriptions, setSubscriptions] = useState<WorkerApi.GetSolutionGroupSubscriptions>([]);
  const [unclaimedRewards, setUnclaimedRewards] = useState<WalletApi.UnclaimedRewards[]>([]);
  const [workerAddress, setWorkerAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [topupStakingData, setTopupStakingData] = useState<{
    isOpen: boolean;
    data:
      | {
          workerId: WorkerApi.WorkerId;
          workerName: string;
          stakedAmount: string;
        }
      | undefined;
  }>({
    isOpen: false,
    data: undefined,
  });
  const [workerLinkedToEwx, setWorkerLinkedToEwx] = useState(false);
  const [ewtusd, setEwtusd] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const fetchWorkerExecution = useWorkerExecutionStore((state) => state.fetchWorkerExecutionStatus);

  const fetchSubscriptions = useCallback(async () => {
    const subscriptions = await workerApi.getSubscriptions();
    setSubscriptions(subscriptions);
  }, [workerApi]);

  const fetchUnclaimedRewards = useCallback(async () => {
    const unclaimedRewards = await workerApi.listUnclaimedRewards();
    setUnclaimedRewards(unclaimedRewards);
  }, [workerApi]);

  const fetchWorkerAddress = useCallback(async () => {
    const lastEWXaccount = await workerApi.getLastEWXAccount();
    const address =
      !isConnected && lastEWXaccount.ewxAddress ? lastEWXaccount.ewxAddress : addressEWX;

    const workerAddress = await workerApi.queryWorkerAddress(address);
    setWorkerAddress(workerAddress || '');
  }, [isConnected, addressEWX, workerApi]);

  const initEwtUsdValue = async () => {
    setEwtusd(await workerApi.getEwtUsd());
  };

  const initWorkerLinkedToEwx = async () => {
    try {
      if (!workerAddress) return;

      const linkStatus = await workerApi.workerEWXLinkStatus(workerAddress);
      setWorkerLinkedToEwx(linkStatus === EWX_LINK_STATUS.LinkedToCurrentWorker);
    } catch (e) {
      console.error('[GalaxySubscriptionHorizontal] Fetching workerEWXLinkStatus failed', e);
    }
  };

  const reloadSolutionGroups = useCallback(async () => {
    try {
      await fetchSubscriptions();
    } catch (e) {
      console.error(e);
      setErrorMsg("Couldn't reload solution groups");
    }
  }, [fetchSubscriptions]);

  const reloadUnclaimedRewards = useCallback(async () => {
    try {
      await fetchUnclaimedRewards();
    } catch (e) {
      console.error(e);
      setErrorMsg("Couldn't reload unclaimed rewards");
    }
  }, [fetchUnclaimedRewards]);

  const isAnyStakedActiveSolution = isElectron()
    ? subscriptions.some(
        (subscription) =>
          subscription.solutions.some((solution) => solution.status === 'Active') &&
          subscription.status === SOLUTION_GROUP_STATUS.Running,
      )
    : false;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await Promise.all([fetchSubscriptions(), fetchUnclaimedRewards()]);
      } catch (e) {
        console.error(e);
        setErrorMsg("Couldn't fetch data");
      } finally {
        setIsLoading(false);
        setIsLoaded(true);
      }
    };

    fetchData();

    // Execute the reloadSolutionGroups function every 2 minutes
    const intervalId = setInterval(
      async () => {
        await reloadSolutionGroups();
        await fetchWorkerAddress();
        await fetchWorkerExecution();
        await fetchUnclaimedRewards();
      },
      2 * 60 * 1000,
    ); // 2 minutes in milliseconds

    return () => {
      clearInterval(intervalId);
    };
  }, [
    reloadSolutionGroups,
    fetchSubscriptions,
    fetchUnclaimedRewards,
    fetchWorkerAddress,
    fetchWorkerExecution,
  ]);

  useEffect(() => {
    initEwtUsdValue();
    initWorkerLinkedToEwx();

    if (isElectron()) {
      window.Api.on(IpcChannel.ewtusdUpdated, (data: number) => {
        setEwtusd(data);
      });

      window.Api.on(IpcChannel.solutionGroupStatusUpdated, async () => {
        await reloadSolutionGroups();
      });

      // Clean all listeners when component unmounts
      return () => {
        window.Api.removeAllListeners(IpcChannel.ewtusdUpdated);
        window.Api.removeAllListeners(IpcChannel.solutionGroupStatusUpdated);
      };
    }
  }, [reloadSolutionGroups, workerAddress]);

  const processConnectedFlag = async () => {
    const lastEWXAccount = (await workerApi.getLastEWXAccount()).ewxAddress;
    const subscriptionFlags = await workerApi.getSubscriptionFlags();
    fetchWorkerAddress();
    fetchWorkerExecution();
    if (!(isConnected || (lastEWXAccount && subscriptionFlags?.hasSubscription)))
      navigate(routerConst.Discover);
  };

  const onManageVotingClosed = () => {
    initWorkerLinkedToEwx();
    reloadSolutionGroups();
  };

  useEffect(() => {
    processConnectedFlag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const ActiveSubscriptions = () => {
    if (!subscriptions.length) {
      return (
        <div className="grid place-items-center rounded-lg bg-gray-90 px-4 py-3 shadow-sm">
          <div className="grid w-full place-items-center rounded-md bg-gray-80 p-8">
            <p className="text-subtle text-lg">No solution groups found</p>
          </div>
        </div>
      );
    }

    return (
      <>
        {isElectron() && (
          <WorkerEngineStatus
            shouldBeVisible={subscriptions.length > 0}
            shouldPromptStartButton={isAnyStakedActiveSolution}
          />
        )}

        {subscriptions.map((subscription) => {
          const stakeAmount = subscription.EWXPreference?.stakeAmount || '0';
          const floatingStakeAmount = subscription.EWXPreference?.floatingStakeAmount || '0';
          const props: GalaxySubscriptionHorizontalProps = {
            id: subscription.groupId,
            name: subscription.group?.name || '',
            namespace: subscription.group?.namespace || '',
            isActive: subscription.EWXPreference?.isActive || false,
            isExpired: subscription.isExpired,
            isVotingEnabled: subscription.EWXPreference?.isVotingEnabled || false,
            isStartVoteNextPeriod: subscription.isStartVoteNextPeriod,
            status: subscription.status || undefined,
            actionStatus: subscription.actionStatus,
            actualStatus: subscription.status || undefined,
            stakeAmount,
            floatingStakeAmount,
            solutionsCount: subscription.solutions.length,
            isPendingUnsubscribe: subscription.isPendingUnsubscription || false,
            unsubscriptionDate: subscription.unsubscriptionDate || undefined,
            withdrawalDelay: subscription.group?.withdrawalDelay || 0,
            workerAddress: workerAddress,
            parentData: { ewtusd: ewtusd, workerLinkedToEwx: workerLinkedToEwx },
            onManageVotingClosed: onManageVotingClosed,
            fetchWorkerAddress: fetchWorkerAddress,
            onOpenTopupStaking: () =>
              setTopupStakingData({
                isOpen: true,
                data: {
                  workerId: subscription.groupId,
                  workerName: subscription.group?.name || '',
                  stakedAmount: truncateBalance(
                    parseFloat(stakeAmount) + parseFloat(floatingStakeAmount),
                  ).toString(),
                },
              }),
          };
          return <GalaxySubscriptionHorizontal key={subscription.groupId} {...props} />;
        })}
      </>
    );
  };

  return (
    <main className="min-h-[100vh] py-4 bg-radial-gradient">
      <Layout>
        <Header />
        <div className="mt-8 flex gap-8">
          {/* TOP MARGIN: page top padding (4*4px) + header height (64px) + body top margin (8*4px) = 112px */}
          <section className="sticky top-[112px] -mb-4 -mr-1 flex h-[calc(100vh-112px)] min-w-[264px] flex-col gap-8 overflow-y-auto pb-4 pr-1">
            <Balance />
            <WorkerNodeAccount
              onUpdated={() => {
                fetchWorkerAddress();
                fetchWorkerExecution();
                initWorkerLinkedToEwx();
              }}
              workerAddress={workerAddress}
              workerLinkedToEwx={workerLinkedToEwx}
              isLoaded={isLoaded}
            />
          </section>
          <section className="flex flex-grow flex-col gap-8">
            {isLoading ? (
              <p>Loading...</p>
            ) : errorMsg ? (
              <p>{errorMsg}</p>
            ) : (
              <div className="flex flex-col">
                <div className="flex items-center rounded-t-lg bg-gray-90 p-4 shadow-sm">
                  <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
                    <img src={solutionGroupsIcon} width={16} height={16} alt="SolutionGroupIcon" />
                  </div>
                  <p className="ml-4">Solution Groups</p>
                </div>

                <Tabs.Root defaultValue="subscribed">
                  <Tabs.List className="flex w-full">
                    <TabTrigger
                      value="subscribed"
                      className="text-md block w-[50%] rounded-bl-[16px] p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
                    >
                      Subscribed
                    </TabTrigger>
                    <TabTrigger
                      value="unsubscribed"
                      className="text-md block w-[50%] rounded-br-[16px] p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
                    >
                      Unsubscribed
                      <Tooltip
                        side="bottom"
                        asChildTrigger
                        content={
                          <div className="max-w-[300px] p-2">
                            This list only shows unsubscribed solutions with Unclaimed Rewards.
                          </div>
                        }
                      >
                        <div className="ml-4 inline-flex h-[16px] w-[16px] items-center justify-center rounded-full bg-gray-100">
                          <img src={questionMarkIcon} width={11} height={11} alt="more info" />
                        </div>
                      </Tooltip>
                    </TabTrigger>
                  </Tabs.List>
                  <Tabs.Content value="subscribed">
                    <div className="mt-6 flex flex-grow flex-col gap-6">
                      <ActiveSubscriptions />
                    </div>
                  </Tabs.Content>
                  <Tabs.Content value="unsubscribed">
                    <div className="mt-6 flex flex-grow flex-col gap-6">
                      {unclaimedRewards.map((unclaimedReward) => (
                        <UnclaimedRewardList
                          key={unclaimedReward.groupId}
                          unclaimedReward={unclaimedReward}
                          ewtusd={ewtusd}
                          isExpired={unclaimedReward.isExpired}
                          reloadUnclaimedRewards={reloadUnclaimedRewards}
                        />
                      ))}

                      {!unclaimedRewards.length && (
                        <div className="grid place-items-center rounded-lg bg-gray-90 px-4 py-3 shadow-sm">
                          <div className="grid w-full place-items-center rounded-md bg-gray-80 p-8">
                            <p className="text-subtle text-lg">No solution groups found</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tabs.Content>
                </Tabs.Root>
              </div>
            )}
          </section>
          {topupStakingData.data ? (
            <TopupStaking
              isOpen={topupStakingData.isOpen}
              setIsOpen={(isOpen: boolean) =>
                setTopupStakingData((previousValue) => ({ ...previousValue, isOpen }))
              }
              workerId={topupStakingData.data.workerId}
              workerName={topupStakingData.data.workerName || ''}
              stakedAmount={topupStakingData.data.stakedAmount.toString()}
              amounts={{}}
              onClose={() => setTopupStakingData({ isOpen: false, data: undefined })}
              onFinish={reloadSolutionGroups}
            />
          ) : null}
        </div>
      </Layout>
    </main>
  );
};

const TabTrigger = twix(
  Tabs.Trigger,
  'border-b-4 border-transparent bg-gray-80 p-5 pb-[15px] text-center text-[15px] font-light uppercase text-font-subtler data-[state=active]:border-teal data-[state=active]:bg-gray-95 data-[state=active]:text-teal data-[state=inactive]:hover:bg-gray-70',
);

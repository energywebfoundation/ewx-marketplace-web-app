import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PiArrowLeftBold } from 'react-icons/pi';
import { routerConst } from '@ewf/lib/router';
import { IpcChannel } from '@main/helpers/ipc';
import { Header } from '@ewf/components/Header';
import { Balance } from '@ewf/pages/Discover/Balance';
import { Layout } from '@ewf/components/Layout';
import { WorkerEngineStatus } from '@ewf/components/WorkerEngineStatus';
import {
  SolutionsChart,
  type SolutionsStats,
} from '../Dashboard/WorkerNodeCard/GalaxySubscriptions/SolutionsChart';
import { GalaxySubscriptionCombo } from '../Dashboard/WorkerNodeCard/GalaxySubscriptions/GalaxySubscriptionCombo';
import { WorkerNodeCard } from '../Dashboard/WorkerNodeCard/WorkerNodes/WorkerNodeWidget';
import { EWXPreference } from '@prisma/client';
import { fetchActionStatusLabel, fetchActualSolutionGroupStatus } from '../Dashboard';
import { DateTime } from 'luxon';
import { useConnectionStore } from '@ewf/stores/connection';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';
import { WorkerApi } from '@ewf/types/api';
import { EWX_LINK_STATUS } from '@ewf/types/enums';

export const DashboardDetails = (): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [solutionGroup, setSolutionGroup] = useState<any>();
  const [stakedSolutionGroups, setStakedSolutionGroups] = useState<any[]>([]);
  const [activeSolutions, setActiveSolutions] = useState<any>([]);
  const [expiredSolutions, setExpiredSolutions] = useState<any>([]);
  const [inactiveSolutions, setInactiveSolutions] = useState<any>([]);
  const [endedSolutions, setEndedSolutions] = useState<any>([]);
  const [otherSolutions, setOtherSolutions] = useState<any>([]);
  const [ewxPreference, setEWXPreference] = useState<EWXPreference>();
  const [workerAddress, setWorkerAddress] = useState<string>('');
  const [workerLinkedToEwx, setWorkerLinkedToEwx] = useState(false);
  const [isSolutionGroupLoading, setIsSolutionGroupLoading] = useState(false);
  const [stakingStartDate, setStakingStartDate] = useState<string[]>([]);
  const [stakingEndDate, setStakingEndDate] = useState<string[]>([]);
  const [subscriptionDate, setSubscriptionDate] = useState<string[]>([]);
  const [solutionsHealth, setSolutionsHealth] = useState<WorkerApi.SolutionNodeStatus[]>([]);
  const [isStartVoteNextPeriod, setIsStartVoteNextPeriod] = useState<boolean | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const params = useParams();
  const workerId = params.workerId as WorkerApi.WorkerId;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);

  const isAnyStakedActiveSolution = stakedSolutionGroups.some((solutionGroup) => {
    // @ts-ignore
    if (solutionGroup.Solution) {
      return (
        solutionGroup.Solution.some((solution) => solution.status === 'Active') &&
        solutionGroup.actualSubscriptionStatus === 'Running'
      );
    }
    return false;
  });

  const getSolutionStats = (): SolutionsStats => {
    return {
      active: activeSolutions.length,
      inactive: inactiveSolutions.length,
      expired: expiredSolutions.length,
      ended: endedSolutions.length,
      others: otherSolutions.length,
    };
  };

  const [solutionStats, setSolutionStats] = useState<SolutionsStats>(getSolutionStats());

  const initWorkerLinkedToEwx = async () => {
    if (isElectron()) {
      try {
        const linkStatus = await workerApi.workerEWXLinkStatus();
        if (linkStatus === EWX_LINK_STATUS.LinkedToCurrentWorker) {
          setWorkerLinkedToEwx(true);
        }
      } catch (e) {
        console.error('[GalaxySubscriptionHorizontal] Fetching workerEWXLinkStatus failed', e);
      }
    }
  };

  const sortSolutionsByNameAsc = (solutions: any[]) => {
    return solutions.sort((a, b) => {
      // Sort Ascending by Name
      const aFill = a.name.toLowerCase();
      const bFill = b.name.toLowerCase();
      if (aFill < bFill) return -1;
      if (aFill > bFill) return 1;
      return 0;
    });
  };

  const segregateSolutionsByStatus = useCallback((solutions: any[]) => {
    if (solutions && solutions.length) {
      const activeList: any[] = [];
      const expiredList: any[] = [];
      const endedList: any[] = [];
      const inactiveList: any[] = [];
      const otherList: any[] = [];

      solutions.forEach((solution) => {
        solution.isExpired
          ? expiredList.push(solution)
          : solution.status.toLowerCase() === 'active'
          ? activeList.push(solution)
          : solution.status.toLowerCase() === 'paused'
          ? inactiveList.push(solution)
          : solution.status.toLowerCase() === 'ended'
          ? endedList.push(solution)
          : otherList.push(solution);
      });

      setActiveSolutions(sortSolutionsByNameAsc(activeList));
      setExpiredSolutions(sortSolutionsByNameAsc(expiredList));
      setEndedSolutions(sortSolutionsByNameAsc(endedList));
      setInactiveSolutions(sortSolutionsByNameAsc(inactiveList));
      setOtherSolutions(sortSolutionsByNameAsc(otherList));
    }
  }, []);

  const constructDates = (solutionGroup, subscription) => {
    if (solutionGroup?.startBlockTimestamp) {
      // TODO: electron has issues getting system locale, need to figure out a way to get it
      setStakingStartDate(
        DateTime.fromMillis(parseInt(solutionGroup.startBlockTimestamp))
          .toFormat('dd/MM/yyyy HH:mm:ss')
          .split(' '),
      );
    }
    if (solutionGroup?.operationEndBlockTimestamp) {
      setStakingEndDate(
        DateTime.fromMillis(parseInt(solutionGroup.operationEndBlockTimestamp))
          .toFormat('dd/MM/yyyy HH:mm:ss')
          .split(' '),
      );
    }
    if (subscription?.blockTimestamp) {
      setSubscriptionDate(
        DateTime.fromMillis(parseInt(subscription.blockTimestamp))
          .toFormat('dd/MM/yyyy HH:mm:ss')
          .split(' '),
      );
    }
  };

  const fetchHealthStatus = useCallback(async () => {
    if (isElectron()) {
      try {
        const solutionsHealth = await workerApi.solutionNodeStatusBy(workerId);
        setSolutionsHealth(solutionsHealth);
      } catch (e) {
        console.error(e);
      }
    }
  }, [workerId]);

  const fetchIsWorkerReadyToVote = async (solutionNamespace: string) => {
    const isReadyToVote = await workerApi.isWorkerSubcribeReadyToVote(solutionNamespace);
    return isReadyToVote;
  };

  const fetchData = useCallback(
    async (hideLoading?: boolean) => {
      try {
        if (!hideLoading) setIsSolutionGroupLoading(true);

        // load group and segregate solutions
        const [solGroups, solGroup, subs] = await Promise.all([
          workerApi.getSolutionGroups(),
          workerApi.get(workerId),
          workerApi.getSubscription(workerId),
          fetchHealthStatus(),
        ]);

        const stakedSolutionGroups = solGroups.filter((sg) => sg.isStaked);
        setStakedSolutionGroups(stakedSolutionGroups);
        if (subs) {
          solGroup['actualStatus'] = fetchActualSolutionGroupStatus(subs);
          solGroup['actionStatus'] = fetchActionStatusLabel(subs);
          setSolutionGroup({ ...solGroup, ...subs });
        }

        segregateSolutionsByStatus(solGroup.Solution);

        // Construct Dates
        constructDates(solGroup, subs);

        // fetch ewx preferences
        setEWXPreference(await workerApi.queryEWXPreference(workerId));

        // check if node is ready to vote
        fetchIsWorkerReadyToVote(solGroup.namespace).then((isReadyToVote) => {
          setIsStartVoteNextPeriod(!isReadyToVote);
        });
      } catch (e) {
        console.error(e);
      } finally {
        if (!hideLoading) setIsSolutionGroupLoading(false);
      }
    },
    [workerId, fetchHealthStatus, segregateSolutionsByStatus],
  );

  const onManageVotingClosed = () => {
    initWorkerLinkedToEwx();
    fetchData(true);
  };

  const fetchWorkerAddress = async () => {
    let address = '';
    const lastEWXaccount = await workerApi.getLastEWXAccount();
    if (!isConnected && lastEWXaccount.ewxAddress) {
      address = lastEWXaccount.ewxAddress;
    } else if (isConnected) {
      address = addressEWX;
    }

    const workerAddress = await workerApi.queryWorkerAddress(address);
    setWorkerAddress(workerAddress || '');
  };

  const getSolutionHealth = (solutionName: string) => {
    const solutionHealth = solutionsHealth.find(
      (solution) => solution.solutionName === solutionName,
    );
    return solutionHealth;
  };

  const processConnectedFlag = async () => {
    const lastEWXAccount = (await workerApi.getLastEWXAccount()).ewxAddress;
    const subscriptionFlags = await workerApi.getSubscriptionFlags();
    if (!(isConnected || (lastEWXAccount && subscriptionFlags?.hasSubscription)))
      navigate(routerConst.Discover);
  };

  useEffect(() => {
    fetchWorkerAddress();
    initWorkerLinkedToEwx();
    fetchData();

    if (isElectron()) {
      window.Api.on(IpcChannel.solutionGroupStatusUpdated, async () => {
        await fetchData(true);
      });

      // Clean all listeners when component unmounts
      return () => {
        window.Api.removeAllListeners(IpcChannel.solutionGroupStatusUpdated);
      };
    }
  }, [workerId]);

  useEffect(() => {
    processConnectedFlag();
  }, [isConnected]);

  useEffect(() => {
    setSolutionStats(getSolutionStats());
  }, [activeSolutions, inactiveSolutions, expiredSolutions, endedSolutions, otherSolutions]);

  useEffect(() => {
    const FETCH_DATA_INTERVAL_IN_MINUTES = 1;
    const id = setInterval(() => fetchData(true), 1000 * 60 * FETCH_DATA_INTERVAL_IN_MINUTES);

    return () => clearInterval(id);
  }, [fetchData]);

  return (
    <main className="min-h-[100vh] py-4 bg-radial-gradient">
      <Layout>
        <Header />
        <div className="relative mt-8 flex gap-8">
          <div>
            <Link
              to={routerConst.Dashboard}
              className="sticky left-0 top-[112px] grid h-[32px] w-[32px] place-items-center rounded-full bg-gray-90 shadow-sm hover:bg-gray-80 xl:top-[112px] xl:-ml-[64px]"
            >
              <PiArrowLeftBold fill="white" size={18} />
            </Link>
            {/* TOP MARGIN: page top padding (4*4px) + header height (64px) + body top margin (8*4px) = 112px */}
            {/* TOP MARGIN ON SMALL SCREENS: Standard top margin (112px) + back button height (32px) + bottom margin (16px) */}
            <section className="sticky top-[calc(112px+32px+16px)] -mb-4 -mr-1 flex h-[calc(100vh-112px-32px-16px)] min-w-[254px] flex-col gap-8 overflow-y-auto pb-4 pr-1 xl:top-[112px] xl:-mt-[32px] xl:h-[calc(100vh-112px)]">
              <Balance />
              <SolutionsChart stats={solutionStats} />
            </section>
          </div>
          <section className="flex flex-grow flex-col gap-8">
            {isSolutionGroupLoading ? (
              <p>Loading...</p>
            ) : !solutionGroup ? (
              <p>No solution group found</p>
            ) : (
              <>
                <WorkerEngineStatus
                  shouldBeVisible={stakedSolutionGroups.length > 0}
                  shouldPromptStartButton={isAnyStakedActiveSolution}
                />
                <GalaxySubscriptionCombo
                  workerId={solutionGroup.id}
                  namespace={solutionGroup.namespace}
                  name={solutionGroup.name}
                  isExpired={solutionGroup.isExpired}
                  status={solutionGroup?.subscription?.status}
                  actualStatus={solutionGroup.actualStatus}
                  actionStatus={solutionGroup.actionStatus}
                  stakeAmount={ewxPreference?.stakeAmount as string}
                  floatingStakeAmount={ewxPreference?.floatingStakeAmount as string}
                  isVotingEnabled={solutionGroup?.isVotingEnabled}
                  workerAddress={workerAddress}
                  parentData={{ workerLinkedToEwx: workerLinkedToEwx }}
                  isPendingUnsubscribe={solutionGroup?.subscription?.isPendingUnsubscription}
                  unsubscriptionDate={solutionGroup?.subscription?.unsubscriptionDate}
                  withdrawalDelay={solutionGroup.withdrawalDelay}
                  onManageVotingClosed={onManageVotingClosed}
                  refreshSubscriptionData={() => fetchData(true)}
                  fetchWorkerAddress={fetchWorkerAddress}
                  stakingStartDate={stakingStartDate}
                  stakingEndDate={stakingEndDate}
                  solutionsCount={solutionGroup.solutionsCount}
                  subscriptionDate={subscriptionDate}
                  isStartVoteNextPeriod={isStartVoteNextPeriod}
                />
                <div className="grid grid-cols-2 gap-4">
                  {activeSolutions.map((solution, index) => (
                    <WorkerNodeCard
                      key={index}
                      workerId={solution.id}
                      name={solution.name}
                      status={solution.status}
                      health={getSolutionHealth(solution.namespace)}
                    />
                  ))}
                  {inactiveSolutions.map((solution, index) => (
                    <WorkerNodeCard
                      key={index}
                      workerId={solution.id}
                      name={solution.name}
                      status={solution.status}
                    />
                  ))}
                  {expiredSolutions.map((solution, index) => (
                    <WorkerNodeCard
                      key={index}
                      workerId={solution.id}
                      name={solution.name}
                      status={'Expired'}
                    />
                  ))}
                  {endedSolutions.map((solution, index) => (
                    <WorkerNodeCard
                      key={index}
                      workerId={solution.id}
                      name={solution.name}
                      status={solution.status}
                    />
                  ))}
                  {otherSolutions.map((solution, index) => (
                    <WorkerNodeCard
                      key={index}
                      workerId={solution.id}
                      name={solution.name}
                      status={solution.status}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      </Layout>
    </main>
  );
};

import { useEffect, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockDeviceRequirements } from '@main/entities/solution-group';
import { parseAmount } from '@ewf/lib/utils';
import { Header } from '@ewf/components/Header';
import { Layout } from '@ewf/components/Layout';
import { WorkerCardLarge, type Props } from './WorkerCardLarge';
import {
  WorkerRequirements,
  workerToWorkerRequirements,
  type WorkerRequirementsProps,
} from './WorkerRequirements';
import { DateTime } from 'luxon';
import { useConnectionStore } from '@ewf/stores/connection';
import { useApiServiceStore } from '@ewf/stores/api';
import { SolutionGroup } from '@main/entities/solution-group';
import { WorkerApi } from '@ewf/types/api';

type Data = {
  card: Props;
  requirements: WorkerRequirementsProps;
};

export const WorkerDetailsLitePage = (): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Data | undefined>();
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const params = useParams();
  const workerId = params.workerId as WorkerApi.WorkerId;

  const fetchWorker = useCallback(async () => {
    setIsLoading(true);

    try {
      const workerDb = await workerApi.get(workerId);
      const worker: SolutionGroup = {
        ...workerDb,
        updatedDate: undefined,
        solutions: workerDb.Solution || [],
        susbcriptions: [],
        earnedRewards: [],
      };
      const [isAlreadyStaked, subscriptionStatus] = await Promise.all([
        addressEWX ? workerApi.isStakingTo(worker.namespace, addressEWX) : false,
        workerApi.getSolutionGroupStatus(
          parseInt(worker.operationStartBlock.replaceAll(',', '')),
          parseInt(worker.operationEndBlock.replaceAll(',', '')),
        ),
      ]);

      let stakingStartDate = 'Not defined';
      if (worker.startBlockTimestamp) {
        // TODO: electron has issues getting system locale, need to figure out a way to get it
        stakingStartDate = DateTime.fromMillis(parseInt(worker.startBlockTimestamp)).toFormat(
          'dd/MM/yyyy HH:mm:ss',
        );
      }

      setData({
        card: {
          workerId: worker.id,
          workerName: worker.name,
          namespace: worker.namespace,
          category: worker.publisherInfo,
          name: worker.name,
          description: worker.description,
          subTitle: 'Subscribe with your tokens and get rewards',
          subDescription:
            'By installing and running worker nodes you will be able to earn rewards and help the decentralized energy community.',
          progress: 0.3,
          isInstalled: false,
          isStaked: isAlreadyStaked,
          minStakingAmount: parseAmount(worker.stakingMin),
          maxStakingAmount: parseAmount(worker.stakingMax),
          hasOperatorsAllowlist: worker.hasOperatorsAllowlist,
          status: subscriptionStatus,
          withdrawalDelay: worker.withdrawalDelay,
        },
        requirements: {
          worker: workerToWorkerRequirements({
            ...worker,
            stakingStartDate,
          }),
          device: mockDeviceRequirements,
          solutions: worker.solutions
            ?.filter((solution) => solution.status === 'Active')
            .map((solution) => ({ name: solution.name })),
        },
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [workerId, addressEWX]);

  const renderContent = (): React.ReactNode => {
    if (isLoading) {
      return (
        <div className="mt-8 grid h-full grid-cols-2 gap-8">
          <section className="h-[500px] animate-pulse rounded-lg bg-gray-80" />
          <section className="h-[400px] animate-pulse rounded-lg bg-gray-80" />
        </div>
      );
    }

    if (!data) {
      return <p className="text-center text-xl text-font-subtle">Solution group not found</p>;
    }

    return (
      <div className="mt-8 grid grid-cols-2 gap-8">
        <WorkerCardLarge {...data.card} />
        <WorkerRequirements {...data.requirements} />
      </div>
    );
  };

  useEffect(() => {
    fetchWorker();
  }, [fetchWorker]);

  return (
    <main className="h-full min-h-[100vh] py-4 bg-radial-gradient">
      <Layout>
        <Header />
        {renderContent()}
      </Layout>
    </main>
  );
};

import { useEffect, useState, useCallback } from 'react';
import { SolutionGroup } from '@prisma/client';
import { routerConst } from '@ewf/lib/router';
import { Link } from 'react-router-dom';
import { SortBy, type Criteria, type Order } from './SortBy';
import { WorkerCard, Props as WorkerCardProps } from './WorkerCard';

export const WorkerList = ({ isLoading, workers }: Props): JSX.Element => {
  const [sortBy, setSortBy] = useState<{ criteria: Criteria; order: Order }>({
    criteria: 'name',
    order: 'ascending',
  });

  const sortWorkers = useCallback(
    (workers: SolutionGroup[]): SolutionGroup[] => {
      const { criteria, order } = sortBy;
      if (criteria === 'name') {
        return workers.sort((a, b) => {
          const aFill = a.name.toLowerCase();
          const bFill = b.name.toLowerCase();
          if (order === 'ascending') {
            if (aFill < bFill) return -1;
            if (aFill > bFill) return 1;
            return 0;
          } else {
            if (aFill > bFill) return -1;
            if (aFill < bFill) return 1;
            return 0;
          }
        });
      }
      if (criteria === 'date') {
        return workers.sort((a, b) => {
          const aDate = parseInt(a.id);
          const bDate = parseInt(b.id);
          if (order === 'ascending') {
            return aDate - bDate;
          }
          return bDate - aDate;
        });
      }
      if (criteria === 'time-remaining') {
        return workers.sort((a, b) => {
          const aTimeRemaining = parseInt(a.id);
          const bTimeRemaining = parseInt(b.id);
          if (order === 'ascending') {
            return aTimeRemaining - bTimeRemaining;
          }
          return bTimeRemaining - aTimeRemaining;
        });
      }
      if (criteria === 'min-staking-amount') {
        return workers.sort((a, b) => {
          const aMinStakeAmount = parseInt(a.id);
          const bMinStakeAmount = parseInt(b.id);
          if (order === 'ascending') {
            return aMinStakeAmount - bMinStakeAmount;
          }
          return bMinStakeAmount - aMinStakeAmount;
        });
      }
      return workers;
    },
    [sortBy],
  );

  const [workerList, setWorkerList] = useState<SolutionGroup[]>(() => sortWorkers(workers));
  const Workers = (): React.ReactNode => (
    <div className="grid grid-cols-2 gap-4">
      {workerList.map(workerToWorkerCard).map((workerCard) => (
        <Link
          key={workerCard.id}
          to={`${routerConst.SolutionDetail}/${workerCard.id}`}
          className="min-h-[280px]"
        >
          <WorkerCard {...workerCard} />
        </Link>
      ))}
    </div>
  );

  const LoadingWorkers = (): React.ReactNode => {
    const skeletonWorkers = Array.from({ length: 2 });
    return (
      <div className="grid grid-cols-2 gap-4">
        {skeletonWorkers.map((_, i) => (
          <div key={i} className="h-[280px] animate-pulse rounded-lg bg-gray-80" />
        ))}
      </div>
    );
  };

  const EmptyWorkers = (): React.ReactNode => (
    <div className="grid place-items-center rounded-lg bg-gray-80 p-8">
      <p className="text-subtle text-lg">No solution group found</p>
    </div>
  );

  const renderContent = (): React.ReactNode => {
    if (isLoading) return <LoadingWorkers />;
    if (workerList.length === 0) return <EmptyWorkers />;
    return <Workers />;
  };

  useEffect(() => {
    setWorkerList([...sortWorkers(workers)]);
  }, [sortBy, workers, sortWorkers]);

  return (
    <div className="rounded-lg bg-gray-90 p-6 shadow">
      <div className="mb-4 flex gap-4">
        <SortBy onValueChanged={setSortBy} />
      </div>
      {renderContent()}
    </div>
  );
};

const workerToWorkerCard = (worker: any): WorkerCardProps => ({
  id: worker.id,
  category: worker.publisherInfo,
  name: worker.name,
  description: worker.description,
  hasOperatorsAllowlist: !!worker.hasOperatorsAllowlist,
  status: {
    isFavourites: worker.isFavourites,
  },
});

interface Props {
  isLoading: boolean;
  workers: any[];
}

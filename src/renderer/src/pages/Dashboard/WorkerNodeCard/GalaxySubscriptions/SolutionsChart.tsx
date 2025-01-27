import { type SolutionStatus } from '@main/entities/solution';
import solutionsIcon from '@ewf/assets/icons/solutions.svg';
import { CircularChart, CirularChartData } from '@ewf/components/Charts/Circular/CircularChart';
import { useEffect, useState } from 'react';

export const GalaxySubscriptionHeader = (): JSX.Element => {
  return (
    <div className="mb-1 flex justify-between rounded-b-sm rounded-t-lg border-l-4 border-teal bg-gray-90 p-4 shadow-sm">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
          <img src={solutionsIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
        </div>
        <div className="flex flex-row gap-4">
          <p className="text-lg">Solutions</p>
        </div>
      </div>
    </div>
  );
};

export const SolutionsChart = ({ stats }: Props): JSX.Element => {
  const getCircularChartData = (): CirularChartData[] => {
    return Object.entries(stats).map(([status, value]) => ({
      name: status,
      value: value,
    }));
  };
  const [circularChartData, setCircularChartData] = useState<CirularChartData[]>(
    getCircularChartData(),
  );

  useEffect(() => {
    setCircularChartData(getCircularChartData());
  }, [stats]);

  return (
    <div className="w-full">
      <GalaxySubscriptionHeader />
      <div className="rounded-b-lg rounded-t-sm bg-gray-90 px-4 py-4 shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-transparent px-1 py-1 shadow-darker gradient-border-dark-with-gray-85">
            <div className="mt-3 flex h-[140px] w-[140px] items-center justify-center rounded-full p-3 text-center bg-dark-gradient">
              <CircularChart data={circularChartData} />
            </div>
            <div className="flex h-full w-full items-center justify-center rounded-sm p-4 text-center bg-dark-gradient">
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full flex-row justify-between rounded-md border-l-8 border-teal bg-teal/10 px-3 py-[2.5px]">
                  <p className="text-sm">Active</p>
                  <div className="text-sm">{stats.active}</div>
                </div>
                <div className="flex w-full flex-row justify-between rounded-md border-l-8 border-gray-60 bg-gray-60/20 px-3 py-[2.5px]">
                  <p className="text-sm">Inactive</p>
                  <div className="text-sm">{stats.inactive}</div>
                </div>
                <div className="flex w-full flex-row justify-between rounded-md border-l-8 border-red bg-red/10 px-3 py-[2.5px]">
                  <p className="text-sm">Expired</p>
                  <div className="text-sm">{stats.expired}</div>
                </div>
                <div className="flex w-full flex-row justify-between rounded-md border-l-8 border-pink-light bg-pink-light/20 px-3 py-[2.5px]">
                  <p className="text-sm">Ended</p>
                  <div className="text-sm">{stats.ended}</div>
                </div>
                {stats.others > 0 && (
                  <div className="flex w-full flex-row justify-between rounded-md border-l-8 border-white bg-white/20 px-3 py-[2.5px]">
                    <p className="text-sm">Others</p>
                    <div className="text-sm">{stats.others}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  stats: SolutionsStats;
}

export type SolutionsStats = Record<SolutionStatus, number>;

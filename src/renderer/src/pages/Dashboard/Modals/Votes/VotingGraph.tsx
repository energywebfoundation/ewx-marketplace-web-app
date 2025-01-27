import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { VotingGraphData, VotingRewardPeriod } from '@main/entities/voting-graph-data';

export const VotingGraph = ({ votingGraphData }: Props) => {
  const DOMAIN_STEP = 100;
  const Y_AXIS_WIDTH = 36;
  const CHART_BAR_WIDTH = 8; // 8px bar per record
  const CHART_BAR_SPACE = 32; // 32px space between bars
  const MIN_CHART_VALUES = 5;
  const [domainSliceValue, setDomainSliceValue] = useState<number>(DOMAIN_STEP);
  const [tooltipData, setTooltipData] = useState<{
    rewardPeriod: number;
    totalVotes: number;
    successfulVotes: number;
    failedVotes: number;
  } | null>(null);
  const graphContainerRef = useRef<null | HTMLDivElement>(null);
  const filteredChartValues = fillEmptyRecords(votingGraphData.slice(-domainSliceValue));
  const chartWidth =
    CHART_BAR_WIDTH * (CHART_BAR_SPACE / CHART_BAR_WIDTH) * filteredChartValues.length;

  if (filteredChartValues.length < MIN_CHART_VALUES && votingGraphData.length > 0) {
    const lastRewardPeriod = votingGraphData[0].rewardPeriod;

    Array.from({ length: MIN_CHART_VALUES - filteredChartValues.length }, (_, i) => {
      filteredChartValues.unshift({
        rewardPeriod: lastRewardPeriod - i - 1,
        successfulVotes: 0,
        failedVotes: 0,
      });
    });
  }

  const scrollToRight = () => {
    if (!graphContainerRef.current) return;
    graphContainerRef.current.scrollLeft = graphContainerRef.current.scrollWidth;
  };

  const onScrollLeft = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    // This function is called when the user scrolls to the left end of the graph.
    const isScrollLeftEnded = e.currentTarget.scrollLeft === 0;
    const isAllDataLoaded = votingGraphData.length === filteredChartValues.length;

    if (isScrollLeftEnded && !isAllDataLoaded && graphContainerRef.current) {
      const scrollWidth = e.currentTarget.scrollWidth;
      graphContainerRef.current.style.opacity = '0.2';
      setDomainSliceValue((prev) => prev + DOMAIN_STEP);
      setTimeout(() => {
        // Wait for the new data to be rendered before scrolling to the previous position.
        if (!graphContainerRef.current) return;

        const previousScrollPosition = graphContainerRef.current.scrollWidth - scrollWidth;
        graphContainerRef.current.scrollLeft = previousScrollPosition;
        graphContainerRef.current.style.opacity = '1';
      }, 1000);
    }
  };

  const drawYAxis = () => {
    // This function copies the Y axis from the recharts graph and draws it on a custom SVG element.
    // This way the Y axis is visible when the graph is scrolled to the right.
    const rechartsYAxis = document.querySelector('.recharts-yAxis') as HTMLElement;
    const yAxisContainer = document.getElementById('chart-y-axis-container');
    const yAxisBackground = document.getElementById('chart-y-axis-background');
    const yAxis = document.getElementById('chart-y-axis');

    if (
      !rechartsYAxis ||
      !yAxisContainer ||
      !yAxisBackground ||
      !yAxis ||
      !graphContainerRef.current
    )
      return;

    const chartWidth = graphContainerRef.current.scrollWidth;
    const chartHeight = Math.round(rechartsYAxis.getBoundingClientRect().height);

    yAxis.setAttribute('width', `${chartWidth}`);
    yAxis.setAttribute('height', `${chartHeight}`);
    yAxis.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
    yAxis.innerHTML = rechartsYAxis?.innerHTML ?? '';

    yAxisContainer.style.width = `${graphContainerRef.current.scrollWidth}px`;
    yAxisBackground.style.height = `${chartHeight}px`;

    rechartsYAxis.style.display = 'none';
  };

  useEffect(() => {
    scrollToRight();
  }, []);

  useEffect(() => {
    window.addEventListener('resize', drawYAxis);
    () => window.removeEventListener('resize', drawYAxis);
  }, []);

  if (filteredChartValues.length === 0) {
    return (
      <div
        style={{ background: 'linear-gradient(138deg, #090909 18.54%, #3d3d3d 100%)' }}
        className="w-full rounded-b-md p-6 font-primary-light"
      >
        There are no locally logged records in this machine to show.
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="flex h-[min(60vh,800px)] flex-col gap-4 rounded-lg rounded-tl-none p-4 bg-dark-gradient">
        <div className="grid w-full grid-cols-4 gap-4">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <p className="mb-2 text-sm text-font-subtler">Reward period</p>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-2 py-1 text-center bg-dark-gradient">
              <p className="max-w-[200px] truncate font-primary-bold">
                {tooltipData?.rewardPeriod ?? '-'}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <p className="mb-2 text-sm text-font-subtler">Submitted votes</p>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-2 py-1 text-center bg-dark-gradient">
              <p className="max-w-[200px] truncate font-primary-bold">
                {tooltipData?.totalVotes ?? '-'}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <p className="mb-2 text-sm text-green">Successful</p>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-2 py-1 text-center bg-dark-gradient">
              <p className="max-w-[200px] truncate font-primary-bold">
                {tooltipData?.successfulVotes ?? '-'}
              </p>
            </div>
          </div>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <p className="mb-2 text-sm text-red">Unsuccessful</p>
            <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-2 py-1 text-center bg-dark-gradient">
              <p className="max-w-[200px] truncate font-primary-bold">
                {tooltipData?.failedVotes ?? '-'}
              </p>
            </div>
          </div>
        </div>
        <div className="relative h-full w-full rounded-md border-[16px] border-gray-80 bg-gray-100 pb-8 pl-4 pr-8 pt-4 shadow-md">
          <p className="absolute right-0 top-[calc(50%-24px)] -mb-8 -translate-y-1/2 -rotate-90 uppercase ">
            Votes
          </p>
          <p className="absolute bottom-2 left-1/2 -translate-x-1/2 uppercase">Reward period</p>
          <div
            id="chart-y-axis-container"
            className="pointer-events-none absolute right-8 top-4 z-40"
          >
            <div
              id="chart-y-axis-background"
              className="absolute right-0 top-0"
              style={{ width: `${Y_AXIS_WIDTH}px` }}
            ></div>
            <svg id="chart-y-axis" className="relative block h-full w-full" />
          </div>
          <div
            id="outter"
            ref={graphContainerRef}
            className="relative h-full w-full overflow-x-auto transition-opacity duration-300 ease-in-out"
            onScroll={onScrollLeft}
          >
            <div id="inner" style={{ width: chartWidth }} className="h-full min-w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={filteredChartValues}
                  margin={{
                    top: 5,
                    right: 0,
                    left: 20,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
                  <XAxis
                    dataKey="rewardPeriod"
                    type="number"
                    domain={['auto', 'auto']}
                    scale="time"
                    padding={{ left: 10, right: 10 }}
                    tickFormatter={(value) =>
                      value % 5 === 0 || filteredChartValues.length <= 5 ? value.toString() : ''
                    }
                  />
                  <YAxis orientation="right" width={Y_AXIS_WIDTH} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.2)' }}
                    content={({ payload }) => {
                      const isPayloadEmpty = !payload || payload.length === 0;

                      if (isPayloadEmpty && !tooltipData) return null;
                      if (isPayloadEmpty) {
                        setTooltipData(null);
                        return null;
                      }

                      const { rewardPeriod, successfulVotes, failedVotes } = payload[0].payload;

                      if (rewardPeriod === tooltipData?.rewardPeriod) return;

                      setTooltipData({
                        rewardPeriod,
                        successfulVotes,
                        failedVotes,
                        totalVotes: successfulVotes + failedVotes,
                      });

                      return null;
                    }}
                  />
                  <defs>
                    <linearGradient
                      gradientTransform="rotate(90)"
                      id="colorUv"
                      x1="1"
                      y1="1"
                      x2="0"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#333333" />
                      <stop offset="100%" stopColor="#272727" />
                    </linearGradient>
                  </defs>
                  <Bar
                    onAnimationEnd={drawYAxis}
                    dataKey="successfulVotes"
                    fill="#64FFE3"
                    stackId="voting"
                    barSize={CHART_BAR_WIDTH}
                    background={{ fill: 'url(#colorUv)' }}
                  >
                    {filteredChartValues.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        // @ts-expect-error
                        radius={entry.failedVotes === 0 ? [2, 2, 0, 0] : 0}
                      />
                    ))}
                  </Bar>
                  <Bar
                    dataKey="failedVotes"
                    barSize={CHART_BAR_WIDTH}
                    fill="#F9436F"
                    stackId="voting"
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  votingGraphData: VotingGraphData;
}

const fillEmptyRecords = (records: VotingGraphData): VotingGraphData => {
  // Find the minimum and maximum reward periods
  const minPeriod = Math.min(...records.map((item) => item.rewardPeriod));
  const maxPeriod = Math.max(...records.map((item) => item.rewardPeriod));

  // Create a new array with all reward periods
  const allPeriods = Array.from({ length: maxPeriod - minPeriod + 1 }, (_, i) => i + minPeriod);

  // Map over the new array to create a new object for each reward period
  const filledRecords = allPeriods.map((period) => {
    // Find the object from the original array that matches the reward period
    const originalItem = records.find((item) => item.rewardPeriod === period);

    // If an original item was found, return it; otherwise, return a new object with 0 votes
    if (originalItem) return originalItem;

    const emptyRecord: VotingRewardPeriod = {
      rewardPeriod: period,
      successfulVotes: 0,
      failedVotes: 0,
    };
    return emptyRecord;
  });

  return filledRecords;
};

export const generateMockChartValues = () => {
  const randomVotingGraphData: VotingGraphData = Array.from({ length: 365 }, (_, i) => {
    const totalVotes = Math.floor(Math.random() * 100);
    const successfulVotes = Math.floor(Math.random() * totalVotes);
    const failedVotes = i % 5 === 0 ? 0 : totalVotes - successfulVotes;

    return {
      successfulVotes,
      failedVotes,
      rewardPeriod: i,
    };
  });

  const mockChartValues: VotingGraphData = randomVotingGraphData.map((record) => {
    return {
      rewardPeriod: record.rewardPeriod,
      successfulVotes: record.successfulVotes,
      failedVotes: record.failedVotes,
    };
  });

  return mockChartValues;
};

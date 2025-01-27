import { useState, useEffect, useCallback } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';
import { twix } from 'tailwindcss-radix-ui';
import transactionsIcon from '@ewf/assets/icons/transaction-small.svg';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { VotingGraphData } from '@main/entities/voting-graph-data';
import { VotingGraph } from './VotingGraph';
import { Record, RecordsTable } from '../RecordTable';
import { Pagination } from '../Pagination';
import { useApiServiceStore } from '@ewf/stores/api';

export const Votes = ({ solutionId, onClose }: Props) => {
  const workerApi = useApiServiceStore.getState().api;
  const [tab, setTab] = useState<'table' | 'graph'>('table');
  const [tableData, setTableData] = useState<Record[]>([]);
  const [graphData, setVotingGraphData] = useState<VotingGraphData>([]);
  const [currentRewardPeriod, setCurrentRewardPeriod] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchTableData = useCallback(
    async (rewardPeriod: number) => {
      if (!solutionId) return;

      const votes = await workerApi.getTransactionsByPeriod(solutionId, rewardPeriod);

      if (!votes) {
        throw new Error('No logs found');
      }

      const formattedRecords: Record[] = votes.map((vote) => {
        const datetime = new Date(vote.createdDate);
        const date = datetime.toLocaleDateString();
        const time = datetime.toLocaleTimeString();
        const level = vote.voteStatus ? 'success' : 'error';
        const message = `
        Transaction hash: ${vote.transactionHash}\n
        Finalized block hash: ${vote.finalizedBlockHash}
      `;

        return {
          level,
          message,
          date,
          time,
          trxHash: vote.transactionHash || '',
        };
      });

      setTableData(formattedRecords);
    },
    [solutionId],
  );

  const fetchGraphData = useCallback(async () => {
    if (!solutionId) return;

    const votingGraphData = await workerApi.getVotingGraphData(solutionId);

    setVotingGraphData(votingGraphData);
  }, [solutionId]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const currentRewardPeriod = await workerApi.getCurrentRewardPeriod();
      await Promise.allSettled([fetchTableData(currentRewardPeriod), fetchGraphData()]);
      setCurrentRewardPeriod(currentRewardPeriod);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [fetchTableData, fetchGraphData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mx-auto w-[min(1200px,80vw)] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-6 flex justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
            <img src={transactionsIcon} width={16} height={16} alt="logIcon" />
          </div>
          <div className="flex flex-shrink-0 flex-row items-center gap-4">
            <p className="max-w-[240px] break-words text-lg">Transactions</p>
          </div>
        </div>
        <div>
          <CloseButton onClick={onClose} />
        </div>
      </section>
      <section className="h-full">
        <Tabs.Root value={tab}>
          <Tabs.List>
            <TabTrigger
              value="table"
              onClick={() => setTab('table')}
              className="text-md rounded-bl-sm rounded-tl-lg p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
            >
              Table
            </TabTrigger>
            <TabTrigger
              value="graph"
              onClick={() => setTab('graph')}
              className="text-md rounded-br-sm rounded-tr-lg p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
            >
              Graph
            </TabTrigger>
          </Tabs.List>
          <Tabs.Content value="table">
            <RecordsTable records={tableData} isLoading={isLoading} isError={isError} />
          </Tabs.Content>
          <Tabs.Content value="graph">
            <VotingGraph votingGraphData={graphData} />
          </Tabs.Content>
        </Tabs.Root>
        <div
          // Compensate the modal bottom padding to equal the vertical spacing of the pagination
          style={{ marginBottom: '-16px' }}
          className={clsx({
            hidden: tab === 'graph',
          })}
        >
          <Pagination currentRewardPeriod={currentRewardPeriod} triggerFetchData={fetchTableData} />
        </div>
      </section>
    </div>
  );
};

interface Props {
  solutionId: string;
  onClose: () => void;
}

const TabTrigger = twix(
  Tabs.Trigger,
  'border-b-4 border-transparent bg-gray-80 p-5 pb-[15px] text-center text-[15px] font-light uppercase text-font-subtler data-[state=active]:border-teal data-[state=active]:bg-gray-95 data-[state=active]:text-teal data-[state=inactive]:hover:bg-gray-70',
);

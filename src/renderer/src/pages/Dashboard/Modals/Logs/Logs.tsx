import { useState, useEffect } from 'react';
import logIcon from '@ewf/assets/icons/logs.svg';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { type Record as TableRecord, RecordsTable } from '../RecordTable';
import { Pagination } from '../Pagination';
import { useApiServiceStore } from '@ewf/stores/api';

export const Logs = ({ solutionId, onClose }: Props) => {
  const workerApi = useApiServiceStore.getState().api;
  const [currentRewardPeriod, setCurrentRewardPeriod] = useState<number>(0);
  const [tableData, setTableData] = useState<TableRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchLogs = async (rewardPeriod: number) => {
    try {
      setIsLoading(true);
      const logsUrl = `http://localhost:3002/workers/${solutionId}/logs?rewardPeriod=${rewardPeriod}`;
      const response = await fetch(logsUrl);

      if (Boolean(!response.ok || !response.body)) {
        throw new Error('No logs file found');
      }

      const data = await response.text();
      const parsedLogs = parseLogsData(data);
      setTableData(parsedLogs || []);
      setIsError(false);
    } catch (e) {
      console.error(e);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    const currentRewardPeriod = await workerApi.getCurrentRewardPeriod();
    setCurrentRewardPeriod(currentRewardPeriod);
    fetchLogs(currentRewardPeriod);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto w-[min(1200px,80vw)] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-20 flex justify-between">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
            <img src={logIcon} width={16} height={16} alt="logIcon" />
          </div>
          <div className="flex flex-shrink-0 flex-row items-center gap-4">
            <p className="max-w-[240px] break-words text-lg">Logs</p>
          </div>
        </div>
        <div>
          <CloseButton onClick={onClose} />
        </div>
      </section>
      <section className="h-full">
        <div>
          <RecordsTable records={tableData} isLoading={isLoading} isError={isError} />
        </div>
      </section>
      {/* Compensate the modal bottom padding to equal the vertical spacing of the pagination  */}
      <div style={{ marginBottom: '-16px' }}>
        <Pagination currentRewardPeriod={currentRewardPeriod} triggerFetchData={fetchLogs} />
      </div>
    </div>
  );
};

interface Props {
  solutionId: string;
  onClose: () => void;
}

const RPC_ERR_MSG = {
  '10': 'Unable to retrieve worker account', // ERROR_CODE_UNABLE_TO_RETRIEVE_WORKER_ACCOUNT
  '20': 'Account not registered as worker', // ERROR_CODE_ACCOUNT_IS_NOT_WORKER
  '30': 'Solution not found', // ERROR_CODE_INVALID_ARGUMENT
  '40': 'Solution not registered to a group', // ERROR_CODE_GROUP_NOT_FOUND
  '50': "Vote submission not allowed. If you just susbcribed to this solution, you'll need to wait until the next reward period", // ERROR_CODE_SUBSCRIPTION_NOT_FOUND
  '60': 'Vote submission quota exceeded in the current reward period', // ERROR_CODE_SUBMISSION_QUOTA_EXCEEDED
};

type InputRecord = {
  level: string;
  message: string | Record<string, unknown>;
  trxHash: string | Record<string, unknown>;
  timestamp: string;
};

const parseRpcError = (rpcError: string): string => {
  const strArr = rpcError.split(':');
  const errorCode = strArr[strArr.length - 1].trim();

  if (errorCode && RPC_ERR_MSG[errorCode]) {
    return `EWX Error ${errorCode}: ${RPC_ERR_MSG[errorCode]}`;
  }

  return rpcError;
};

const parseLogsData = (rawLogs: string): TableRecord[] => {
  const lines = rawLogs.split('\n');
  return (
    lines
      .map((line) => {
        try {
          const { level, message, trxHash, timestamp } = JSON.parse(line) as InputRecord;
          let parsedMessage =
            typeof message === 'string' ? message : JSON.stringify(message, null, 2);
          const parsedTrxHash =
            typeof trxHash === 'string' ? trxHash : JSON.stringify(trxHash, null, 2);
          const datetime = new Date(timestamp);
          const date = datetime.toLocaleDateString();
          const time = datetime.toLocaleTimeString();

          if (parsedMessage.indexOf('RpcError') != -1) {
            parsedMessage = parseRpcError(parsedMessage);
          } else if (parsedMessage.indexOf('send vote') != -1) {
            parsedMessage = 'Submitting vote';
          }

          return {
            level,
            message: parsedMessage,
            date,
            time,
            trxHash: parsedTrxHash,
          } as TableRecord;
        } catch (e) {
          console.error(e);
          return null;
        }
      })
      // Use type predicate to narrow down the type of the array
      .filter((log: TableRecord | null): log is TableRecord => log !== null) satisfies TableRecord[]
  );
};

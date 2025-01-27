import clsx from 'clsx';
import workerEngineIcon from '@ewf/assets/icons/worker-engine.svg';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { useNodeRedStore, NodeRedStatus } from '@ewf/stores/node-red';
import { StartingChip } from '@ewf/components/Chips/Starting';
import { ClosingChip } from '@ewf/components/Chips/Closing';
import { OnlineChip } from '@ewf/components/Chips/Online';
import { OfflineChip } from '@ewf/components/Chips/Offline';
import { Button } from '@ewf/components/Button';
import { Tooltip } from '@ewf/components/Tooltip';
import { useApiServiceStore } from '@ewf/stores/api';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';

export const WorkerEngineStatus = ({ shouldBeVisible, shouldPromptStartButton }: Props) => {
  const workerApi = useApiServiceStore.getState().api;
  const nodeRedStatus = useNodeRedStore((state) => state.nodeRedStatus);
  const workerExecution = useWorkerExecutionStore((state) => state.status);

  const isStartButtonVisible = nodeRedStatus === 'offline' && shouldPromptStartButton;

  const chipsDict: Record<NodeRedStatus, JSX.Element> = {
    starting: <StartingChip />,
    closing: <ClosingChip />,
    online: <OnlineChip />,
    offline: <OfflineChip />,
  };

  const Chip = () => chipsDict[nodeRedStatus] || <OfflineChip />;

  return (
    <div
      className={clsx({
        hidden: !shouldBeVisible,
        'flex items-center rounded-lg bg-gray-90 p-4 shadow-sm': true,
      })}
    >
      <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
        <img src={workerEngineIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
      </div>
      <p className="ml-4">Worker Engine</p>
      <Tooltip
        side="bottom"
        content={
          <div className="max-w-[300px] p-2">
            {workerExecution === 'local'
              ? `"Online" or "Offline" only describes how the worker engine functions, and it's not related to whether a solution involves voting or not.`
              : `The worker engine is running on a remote server. The status of the worker engine is not available.`}
          </div>
        }
      >
        <div className="ml-4 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-100">
          <img src={questionMarkIcon} width={11} height={11} alt="more info" />
        </div>
      </Tooltip>
      <div
        className={clsx({
          'ml-3': true,
          hidden: workerExecution === 'remote',
        })}
      >
        <Chip />
      </div>
      <Button
        onClick={() => workerApi.workerEngineStart()}
        size="small"
        className={clsx({
          'ml-auto w-[90px]': true,
          hidden: !isStartButtonVisible || workerExecution === 'remote',
        })}
      >
        Start
      </Button>
    </div>
  );
};

interface Props {
  shouldBeVisible: boolean;
  shouldPromptStartButton: boolean;
}

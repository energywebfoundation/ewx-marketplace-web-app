import { useState } from 'react';
import clsx from 'clsx';
import * as Dialog from '@ewf/components/Dialog';
import { ActiveChip } from '@ewf/components/Chips/ActiveChip';
import { InactiveChip } from '@ewf/components/Chips/InactiveChip';
import { EndedChip } from '@ewf/components/Chips/EndedChip';
import { ExpiredChip } from '@ewf/components/Chips/ExpiredChip';
import { Tooltip } from '@ewf/components/Tooltip';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import cubeIcon from '@ewf/assets/icons/cube.svg';
import healthyIcon from '@ewf/assets/icons/worker-health.svg';
import unhealthyIcon from '@ewf/assets/icons/worker-unhealth.svg';
import logsIcon from '@ewf/assets/icons/logs.svg';
import transactionsIcon from '@ewf/assets/icons/transactions.svg';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { timeFromNow } from '@ewf/lib/utils';
import { Votes } from '../../Modals/Votes';
import { Logs } from '../../Modals/Logs';
import { WorkerApi } from '@ewf/types/api';
import { isElectron } from '@main/helpers/is-electron';

export const WorkerNodesHeader = ({ name, status }: Props): JSX.Element => {
  const chips = {
    Active: <ActiveChip />,
    Paused: <InactiveChip />,
    Ended: <EndedChip />,
    Expired: <ExpiredChip />,
  };

  return (
    <div
      className={clsx({
        'mb-1 flex items-center rounded-b-sm rounded-t-lg border-l-4 bg-gray-90 p-4 shadow-sm':
          true,
        'border-teal': status === 'Active',
        'border-red': status === 'Expired',
        'border-pink-light': status === 'Ended',
        'border-gray-60': status === 'Paused',
      })}
    >
      <div className="mr-4 grid h-[40px] w-[40px] flex-shrink-0 place-items-center rounded-full bg-brand/10">
        <img src={cubeIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
      </div>
      <p className="text-md truncate" title={name}>
        {name}
      </p>
      <span className="ml-auto">{chips[status] || 'Undefined'}</span>
    </div>
  );
};

export const WorkerNodeCard = (props: Props): JSX.Element => {
  const { workerId, status, health } = props;
  const [isTxnLogsOpen, setIsTxnLogsOpen] = useState(false);
  const [isGenericLogsOpen, setIsGenericLogsOpen] = useState(false);
  const workerExecution = useWorkerExecutionStore((state) => state.status);

  const isHealthy = health?.isActive;
  const healthIcon = isHealthy ? healthyIcon : unhealthyIcon;
  const timeFromLastVote =
    health?.lastActive && health.lastActive ? timeFromNow(health?.lastActive) : null;

  const tooltipText =
    isHealthy === true
      ? timeFromLastVote
        ? `The last vote was ${timeFromLastVote}`
        : null
      : `The solution has not cast a vote in the last ${health?.ruleActiveInMinute || 60} minutes`;

  return (
    <div className="flex w-full max-w-[400px] flex-col">
      <WorkerNodesHeader {...props} />
      <div className="flex space-x-3 rounded-b-lg rounded-t-sm bg-gray-90 p-4">
        {/* <DisableOverlay> */}
        <Dialog.Root open={isTxnLogsOpen}>
          <Dialog.Trigger
            onClick={() => setIsTxnLogsOpen(true)}
            className="group flex h-full w-full flex-col items-center justify-between rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent"
            disabled={isElectron() && workerExecution === 'remote'}
          >
            <p className="py-2 text-sm text-font-subtler">Transactions</p>
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
              <div className="group-after:bg-button-gray-gradient absolute flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
                <img src={transactionsIcon} width={28} height={28} alt="transactionsIcon" />
              </div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content forceMount onPointerDownOutside={(e) => e.preventDefault()}>
                <Votes solutionId={workerId} onClose={() => setIsTxnLogsOpen(false)} />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
        {/* </DisableOverlay> */}
        <Dialog.Root open={isGenericLogsOpen}>
          <Dialog.Trigger
            onClick={() => setIsGenericLogsOpen(true)}
            className="group flex h-full w-full flex-col items-center justify-between rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-transparent"
            disabled={workerExecution === 'remote'}
          >
            <p className="py-2 text-sm text-font-subtler">Logs</p>
            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
              <div className="group-after:bg-button-gray-gradient absolute flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
                <img src={logsIcon} width={28} height={28} alt="logsIcon" />
              </div>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay>
              <Dialog.Content forceMount onPointerDownOutside={(e) => e.preventDefault()}>
                <Logs solutionId={props.workerId} onClose={() => setIsGenericLogsOpen(false)} />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
        <div
          className={clsx({
            'group flex h-full w-full flex-col items-center justify-between rounded-md bg-gray-85 p-3 shadow-darker':
              true,
            'cursor-not-allowed opacity-50': workerExecution === 'remote',
          })}
        >
          <div className="relative py-2 text-center text-sm text-font-subtler">
            <p>Health Status</p>
            <div className="absolute -bottom-6 -right-2">
              <Tooltip
                visible={status === 'Active' && workerExecution === 'local'}
                content={
                  <HealthTooltipContent
                    status={isHealthy ? 'healthy' : 'unhealthy'}
                    subtitle={tooltipText}
                  />
                }
              >
                <div className="flex h-[16px] w-[16px] justify-center rounded-full bg-gray-95">
                  <img src={questionMarkIcon} width={11} height={11} alt="more info" />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full bg-graylight-gradient">
            <HealthStatus />
            <div className="absolute flex h-[36px] w-[36px] items-center justify-center rounded-full p-2 shadow-inset bg-darker-gradient">
              <img src={healthIcon} width={20} height={20} alt="healthIcon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthTooltipContent = ({ status, subtitle }: HealthTooltipContentProps) => {
  const title = status === 'healthy' ? 'Good' : 'Bad';

  return (
    <div className="w-fit max-w-[300px] p-4 text-left text-font">
      <p className="inline-flex gap-1 font-primary-bold text-lg font-bold">
        Health:{' '}
        <span
          className={clsx({
            'block font-bold': true,
            'text-green': status === 'healthy',
            'text-red': status === 'unhealthy',
          })}
        >
          {title}
        </span>
      </p>
      <p
        className={clsx({
          'mt-2 text-sm': true,
          hidden: !subtitle,
        })}
      >
        {subtitle}
      </p>
    </div>
  );
};

interface HealthTooltipContentProps {
  status: 'healthy' | 'unhealthy';
  subtitle: string | null;
}

const HealthStatus = (): JSX.Element => {
  return (
    <svg width="64px" height="64px">
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="18.54%" stopColor="#A566FF" />
          <stop offset="100%" stopColor="#15E8FF" />
        </linearGradient>
      </defs>
      <circle
        fill="none"
        stroke="url(#GradientColor)"
        strokeWidth="0px"
        strokeDasharray="165"
        strokeDashoffset="130"
        cx="32"
        cy="32"
        r="26"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface Props {
  workerId: string;
  name: string;
  status: string;
  health?: WorkerApi.SolutionNodeStatus;
}

const DisableOverlay = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const workerExecution = useWorkerExecutionStore((state) => state.status);

  return (
    <div
      className={clsx({
        'h-full w-full bg-black opacity-25': true,
        hidden: workerExecution === 'local',
      })}
    >
      {children}
    </div>
  );
};

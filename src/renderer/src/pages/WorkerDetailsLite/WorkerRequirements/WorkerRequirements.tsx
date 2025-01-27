import * as Tabs from '@radix-ui/react-tabs';
import { twix } from 'tailwindcss-radix-ui';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { SolutionGroupId } from '@main/entities/solution-group';
import { parseAmount } from '@ewf/lib/utils';
import { SolutionGroup } from '@main/entities/solution-group';

export const WorkerRequirements = ({
  worker,
  device,
  solutions,
}: WorkerRequirementsProps): JSX.Element => {
  const parsePosiblyUndefinedAmount = (amount?: string): string => {
    if (amount) return `${amount} EWT`;
    return 'N/A';
  };

  const secondsToDhms = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d > 0 ? d + ' d' : '';
    const hDisplay = h > 0 ? h + ' h' : '';
    const mDisplay = m > 0 ? m + ' m' : '';
    const sDisplay = s > 0 ? s + ' sec' : '';
    return dDisplay + hDisplay + mDisplay + sDisplay;
  };

  const workerRequirementsList: Requirements = [
    {
      label: 'Subscription start date',
      // This props does not exists so far in Solution Group data
      value: worker.stakingStartDate || 'N/A',
    },
    {
      label: 'Max operators',
      value: worker.allowedOperators,
    },
    {
      label: 'Max worker per operator',
      value: worker.maxOperatorWorkers,
    },
    {
      label: 'Min subscription amount',
      value: parsePosiblyUndefinedAmount(worker.minStakingAmount),
    },
    {
      label: 'Max subscription amount',
      value: parsePosiblyUndefinedAmount(worker.maxStakingAmount),
    },
    {
      label: 'Base reward',
      value: parsePosiblyUndefinedAmount(worker.baseReward),
    },
    {
      label: 'Active solution group reward',
      value: parsePosiblyUndefinedAmount(worker.activeWorkerReward),
    },
    {
      label: 'Top performance reward',
      value: 'N/A',
    },
  ];

  if (worker.withdrawalDelay > 0) {
    const delayInSeconds = worker.withdrawalDelay * 12; // Approx 12 seconds per block
    const formattedDelay = secondsToDhms(delayInSeconds);

    workerRequirementsList.unshift({
      label: 'Unsubscription Delay (approximate)',
      value: formattedDelay,
    });
  }

  const deviceRequirementsList: Requirements = Object.entries(device).map(([key, value]) => ({
    label: key,
    value,
  }));

  let activeList: ActiveSolutions = [];
  if (solutions) {
    activeList = solutions.map((solution, i) => {
      const retVal: ActiveSolution = {
        solutionName: solution.name,
        order: i + 1,
      };
      return retVal;
    });
  }

  return (
    <Tabs.Root defaultValue="worker">
      <Tabs.List className="mb-2 grid grid-cols-3 rounded-b-sm rounded-t-lg bg-gray-90">
        <TabTrigger
          value="device"
          className="text-md rounded-bl-sm rounded-tl-lg p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
        >
          Device Requirements
        </TabTrigger>
        <TabTrigger
          value="worker"
          className="text-md p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
        >
          Solution Group Requirements
        </TabTrigger>
        <TabTrigger
          value="activeSolutions"
          className="text-md rounded-br-sm rounded-tr-lg font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
        >
          Active Solution Group Nodes
        </TabTrigger>
      </Tabs.List>
      <Tabs.Content value="worker">
        <RequirementsList requirements={workerRequirementsList} />
      </Tabs.Content>
      <Tabs.Content value="device">
        <RequirementsList requirements={deviceRequirementsList} isValuesList />
      </Tabs.Content>
      <Tabs.Content value="activeSolutions">
        <ActiveSolutionList activeSolutions={activeList} />
      </Tabs.Content>
    </Tabs.Root>
  );
};

// The twix() function returns the very same Tabs.Trigger component but with the
// styles applied to it. This way is easier to reuse the Radix UI primitive.
const TabTrigger = twix(
  Tabs.Trigger,
  'border-b-4 border-transparent bg-gray-80 p-5 pb-[15px] text-center text-[15px] font-light uppercase text-font-subtler data-[state=active]:border-teal data-[state=active]:bg-gray-95 data-[state=active]:text-teal data-[state=inactive]:hover:bg-gray-70',
);

const RequirementsList = ({ requirements, isValuesList }: RequirementsList): JSX.Element => {
  return (
    <div className="w-full table-fixed rounded-b-lg rounded-t-sm bg-gray-90 p-4 pb-6">
      {requirements.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-2 items-center border-b border-gray-70 px-2 py-3"
        >
          <p className="text-sm text-font-subtler">{label}</p>
          <ul
            className={twMerge(
              clsx({
                'text-right font-primary text-lg': true,
                'list-none text-left': isValuesList,
              }),
            )}
          >
            {value?.split('|').map((item) => <li key={item}>{item.trim()}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

const ActiveSolutionList = ({ activeSolutions }: ActiveSolutionList): JSX.Element => {
  return (
    <div className="w-full table-fixed rounded-b-lg rounded-t-sm bg-gray-90 p-4 pb-6">
      <div className="flex flex-row items-center gap-24 border-b border-gray-70 px-2 py-3">
        <p className="text-sm text-font-subtler">#</p>
        <p className="text-sm text-font-subtler">Name</p>
      </div>
      {activeSolutions.map(({ solutionName, order }) => (
        <div
          key={solutionName}
          className="flex flex-row items-center gap-24 border-b border-gray-70 px-2 py-3"
        >
          <p className="text-sm text-font-subtle">{order}</p>
          <ul
            className={twMerge(
              clsx({
                'text-right font-primary text-lg': true,
              }),
            )}
          >
            {solutionName?.split('|').map((item) => <li key={item}>{item.trim()}</li>)}
          </ul>
        </div>
      ))}
      {!activeSolutions.length && (
        <div
          key={'solution-list-empty'}
          className="flex flex-row items-center gap-24 border-b border-gray-70 px-2 py-3"
        >
          <p className="text-sm text-font-subtle"></p>
          <ul
            className={twMerge(
              clsx({
                'text-right font-primary text-lg': true,
              }),
            )}
          >
            No items available.
          </ul>
        </div>
      )}
    </div>
  );
};

export interface WorkerRequirementsProps {
  worker: WorkerDetails;
  device: Record<string, string>;
  solutions: { name: string }[];
}

interface WorkerDetails {
  id: SolutionGroupId;
  allowedOperators: string;
  maxOperatorWorkers: string;
  minStakingAmount?: string;
  maxStakingAmount?: string;
  baseReward?: string;
  activeWorkerReward?: string;
  topPerformanceReward?: string;
  isInstalled?: boolean;
  stakingStartDate?: string;
  withdrawalDelay: number;
}

interface RequirementsList {
  requirements: Requirements;
  isValuesList?: boolean;
}

interface ActiveSolutionList {
  activeSolutions: ActiveSolutions;
}

type Requirements = { label: string; value: string }[];
type ActiveSolution = { order: number; solutionName: string };
type ActiveSolutions = ActiveSolution[];

export const workerToWorkerRequirements = (
  worker: SolutionGroup & { stakingStartDate: string },
): WorkerDetails => ({
  id: worker.id,
  allowedOperators: worker.allowedOperators,
  maxOperatorWorkers: worker.maxOperatorWorkers,
  minStakingAmount: parseAmount(worker.stakingMin),
  maxStakingAmount: parseAmount(worker.stakingMax),
  baseReward: parseAmount(worker.subscriptionRewardPerBlock),
  activeWorkerReward: parseAmount(worker.votingRewardPerBlock),
  topPerformanceReward: parseAmount(worker.topPerformanceBonus),
  isInstalled: false,
  stakingStartDate: worker.stakingStartDate,
  withdrawalDelay: worker.withdrawalDelay,
});

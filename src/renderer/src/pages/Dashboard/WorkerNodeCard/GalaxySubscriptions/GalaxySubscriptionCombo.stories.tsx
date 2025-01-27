import type { Meta, StoryObj } from '@storybook/react';
import { GalaxySubscriptionCombo } from './GalaxySubscriptionCombo';

const meta = {
  title: 'Pages/Dashboard/Widgets/GalaxySubscription/Combo',
  component: GalaxySubscriptionCombo,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GalaxySubscriptionCombo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GalaxySubscriptionComboWidget: Story = {
  args: {
    workerId: 'worker-id',
    namespace: 'namespace',
    name: 'Solution group name',
    status: 'running',
    stakeAmount: '1',
    floatingStakeAmount: '0.3',
    isExpired: false,
    isVotingEnabled: true,
    isStartVoteNextPeriod: false,
    workerAddress: 'worker address',
    stakingStartDate: [],
    stakingEndDate: [],
    subscriptionDate: [],
    parentData: {
      workerLinkedToEwx: true,
    },
    solutionsCount: 1,
    isPendingUnsubscribe: true,
    withdrawalDelay: 50,
    unsubscriptionDate: new Date('05 October 2024 14:48 UTC'),
    onManageVotingClosed: () => {},
    fetchWorkerAddress: () => {},
  },
};

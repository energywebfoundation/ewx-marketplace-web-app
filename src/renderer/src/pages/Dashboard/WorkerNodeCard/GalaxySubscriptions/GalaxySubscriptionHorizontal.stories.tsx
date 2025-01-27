import type { Meta, StoryObj } from '@storybook/react';
import { GalaxySubscriptionHorizontal } from './GalaxySubscriptionHorizontal';

const meta = {
  title: 'Pages/Dashboard/Widgets/GalaxySubscription/Horizontal',
  component: GalaxySubscriptionHorizontal,
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
} satisfies Meta<typeof GalaxySubscriptionHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GalaxySubscriptionHorizontalWidget: Story = {
  args: {
    id: '1',
    name: 'Galaxy Subscription',
    namespace: 'galaxy.subscription',
    isActive: true,
    isExpired: false,
    isVotingEnabled: true,
    isStartVoteNextPeriod: false,
    status: 'Running',
    stakeAmount: '99',
    floatingStakeAmount: '0.12',
    solutionsCount: 2,
    parentData: {
      ewtusd: 1.2666666,
      workerLinkedToEwx: true,
    },
    isPendingUnsubscribe: true,
    withdrawalDelay: 50,
    unsubscriptionDate: new Date('05 October 2024 14:48 UTC'),
    workerAddress: '5F7QTWiUDRzEddzoy4ygoqQiWSuDk4shoVHJe2anR9f9BaR2',
  },
};

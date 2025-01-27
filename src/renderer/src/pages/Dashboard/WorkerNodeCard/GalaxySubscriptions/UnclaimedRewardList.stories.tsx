import type { Meta, StoryObj } from '@storybook/react';
import { UnclaimedRewardList } from './UnclaimedRewardList';

const meta = {
  title: 'Pages/Dashboard/Widgets/GalaxySubscription/UnclaimedRewards',
  component: UnclaimedRewardList,
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
} satisfies Meta<typeof UnclaimedRewardList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnclaimedRewardListWidget: Story = {
  args: {
    unclaimedReward: {
      isDeleted: false,
      isExpired: false,
      isSubscribed: false,
      groupId: '123',
      ewxAddress: 'xx4323',
      totalReward: '324',
      groupNamespace: 'sxeeni',
      groupName: 'Solution Group',
      groupDescription: 'description',
      groupPublisherInfo: 'info',
    },
    isExpired: true,
    ewtusd: 1.2666666,
    reloadUnclaimedRewards: () => {},
  },
};

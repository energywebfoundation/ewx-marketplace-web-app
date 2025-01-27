import type { Meta, StoryObj } from '@storybook/react';
import { PromptLocalRemoteWorker } from './PromptLocalRemoteWorker';

const meta = {
  title: 'Features/Staking/PromptLocalRemoteWorker',
  component: PromptLocalRemoteWorker,
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
} satisfies Meta<typeof PromptLocalRemoteWorker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GalaxySubscriptionComboWidget: Story = {
  args: {
    onLocalWorker: () => {},
    onRemoteWorker: () => {},
    onClose: () => {},
  },
};

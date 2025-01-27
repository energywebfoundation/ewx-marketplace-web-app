import type { Meta, StoryObj } from '@storybook/react';
import { WorkerNodeCard } from './WorkerNodeWidget';

const meta = {
  title: 'Pages/Dashboard/Widgets/WorkerNode',
  component: WorkerNodeCard,
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
} satisfies Meta<typeof WorkerNodeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WorkerNodeWidget: Story = {
  args: {
    workerId: 'workerId',
    name: 'Solution group name',
    status: 'running',
  },
};

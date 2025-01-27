import type { Meta, StoryObj } from '@storybook/react';
import { mockDiscoverWorkers, mockDeviceRequirements } from '@main/entities/solution-group';
import { WorkerRequirements, workerToWorkerRequirements } from './WorkerRequirements';

const meta = {
  title: 'Pages/Worker Lite/WorkerRequirements',
  component: WorkerRequirements,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full w-[550px] p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkerRequirements>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    worker: workerToWorkerRequirements({
      ...mockDiscoverWorkers[0],
      stakingStartDate: new Date().toLocaleDateString(),
    }),
    device: mockDeviceRequirements,
    solutions: [{ name: 'Solution 1' }, { name: 'Solution 2' }],
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { WorkerNodeAccount } from './WorkerNodeAccount';

const mockWorkerAddress = '5DPdwyc5QAZNDBtc13PyW68P81xsKyC22LaKuyzJ746JjwwP';

const meta = {
  title: 'Pages/Dashboard/WorkerNodeAccount',
  component: WorkerNodeAccount,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="w-[250px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof WorkerNodeAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workerAddress: mockWorkerAddress,
    workerLinkedToEwx: true,
    isLoaded: true,
  },
};

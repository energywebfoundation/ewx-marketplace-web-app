import type { Meta, StoryObj } from '@storybook/react';
import { WorkerList } from './WorkerList';
import { mockDiscoverWorkers } from '@main/entities/solution-group';

const meta = {
  title: 'Pages/Discover/WorkerList',
  component: WorkerList,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-full place-items-center p-8 bg-radial-gradient">
        <div className="w-full max-w-[830px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof WorkerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workers: mockDiscoverWorkers,
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    workers: mockDiscoverWorkers,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    workers: [],
    isLoading: false,
  },
};

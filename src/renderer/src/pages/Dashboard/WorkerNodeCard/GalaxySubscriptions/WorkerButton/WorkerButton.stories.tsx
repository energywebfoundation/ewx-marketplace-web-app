import type { Meta, StoryObj } from '@storybook/react';
import {
  EnableWorkerButton,
  NoWorkerButton,
  PauseWorkerButton,
  ResumeWorkerButton,
} from './WorkerButton';

const meta = {
  title: 'Pages/Dashboard/Widgets/GalaxySubscription/ButtonsAlt',
  component: EnableWorkerButton,
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
} satisfies Meta<typeof EnableWorkerButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-full p-4 bg-radial-gradient">
      <div className="mt-4 grid grid-cols-4 gap-4 rounded bg-gray-90 p-4">
        <div className="flex flex-col gap-2">
          <EnableWorkerButton onClick={() => {}} />
          <p className="text-center">EnableWorkerButton</p>
        </div>
        <div className="flex flex-col gap-2">
          <NoWorkerButton />
          <p className="text-center">NoWorkerButton</p>
        </div>
        <div className="flex flex-col gap-2">
          <PauseWorkerButton onClick={() => {}} />
          <p className="text-center">PauseWorkerButton</p>
        </div>
        <div className="flex flex-col gap-2">
          <ResumeWorkerButton onClick={() => {}} />
          <p className="text-center">ResumeWorkerButton</p>
        </div>
      </div>
    </div>
  ),
  args: {
    onClick: () => {},
  },
};

export const EnableWorker: Story = {
  render: () => <EnableWorkerButton onClick={() => {}} />,
  args: {
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="h-[150px] w-[200px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const PauseWorker: Story = {
  render: () => <PauseWorkerButton onClick={() => {}} />,
  args: {
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="h-[150px] w-[200px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const ResumeWorker: Story = {
  render: () => <ResumeWorkerButton onClick={() => {}} />,
  args: {
    onClick: () => {},
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="h-[150px] w-[200px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

export const NoWorker: Story = {
  render: () => <NoWorkerButton />,
  args: {},
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="h-[150px] w-[200px]">
          <Story />
        </div>
      </div>
    ),
  ],
};

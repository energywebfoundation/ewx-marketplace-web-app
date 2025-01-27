import type { Meta, StoryObj } from '@storybook/react';
import { TransactionProgress } from './TransactionProgress';

const meta = {
  title: 'Components/ModalUI/TransactionProgress',
  component: TransactionProgress,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid w-[480px] place-items-center rounded-lg p-8 bg-popup-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransactionProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-8 rounded-lg">
      {[Confirm, Executing, Success, Failure].map((Story, i) => (
        <TransactionProgress key={i} {...Story.args} />
      ))}
    </div>
  ),
  args: {
    operation: 'lifting',
    step: 'confirm',
  },
};

export const Confirm: Story = {
  args: {
    operation: 'lifting',
    step: 'confirm',
  },
};

export const Executing: Story = {
  args: {
    operation: 'lifting',
    step: 'executing',
  },
};

export const Success: Story = {
  args: {
    operation: 'lifting',
    step: 'success',
  },
};

export const Failure: Story = {
  args: {
    operation: 'lifting',
    step: 'failure',
  },
};

export const Lifting: Story = {
  args: {
    operation: 'lifting',
    step: 'confirm',
  },
};

export const Lowering: Story = {
  args: {
    operation: 'lowering',
    step: 'confirm',
  },
};

export const Staking: Story = {
  args: {
    operation: 'staking',
    step: 'confirm',
  },
};

export const OperatorSignup: Story = {
  args: {
    operation: 'operator-signup',
    step: 'confirm',
  },
};

export const LinkWorker: Story = {
  args: {
    operation: 'link-worker',
    step: 'confirm',
  },
};

export const ClaimReward: Story = {
  args: {
    operation: 'claim-reward',
    step: 'confirm',
  },
};

export const Unsubscribing: Story = {
  args: {
    operation: 'unsubscribing',
    step: 'confirm',
  },
};

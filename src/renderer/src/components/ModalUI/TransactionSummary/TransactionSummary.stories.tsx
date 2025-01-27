import type { Meta, StoryObj } from '@storybook/react';
import { TransactionSummary } from './TransactionSummary';

const meta = {
  title: 'Components/ModalUI/TransactionSummary',
  component: TransactionSummary,
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
} satisfies Meta<typeof TransactionSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lifting: Story = {
  args: {
    amount: 100.93,
    operation: 'lifting',
  },
};

export const Lowering: Story = {
  args: {
    amount: 100.93,
    operation: 'lowering',
  },
};

export const Staking: Story = {
  args: {
    amount: 100.93,
    operation: 'staking',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Approve } from './Approve';

const meta = {
  title: 'Features/Top-up Staking/2. Approve',
  component: Approve,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid w-[480px] place-items-center bg-gray-90 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Approve>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    balance: 100.93673,
    gasFees: { value: 100.98, state: 'idle' },
    address: '0x0000000000',
    workerName: 'SmartFlow Q2-2024',
    initAmount: 0,
    stakedAmount: '78.9123',
    onApprove: () => {},
    onClose: () => {},
  },
};

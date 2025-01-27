import type { Meta, StoryObj } from '@storybook/react';
import { Approve } from './Approve';

const meta = {
  title: 'Features/Lowering/2. Approve',
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
    gasFees: { value: 100.98, state: 'idle' },
    balance: 100.93673,
    initAmount: 0,
    address: '0x0000000000',
    onApprove: () => {},
    onClose: () => {},
  },
};

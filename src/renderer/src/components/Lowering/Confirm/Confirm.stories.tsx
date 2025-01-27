import type { Meta, StoryObj } from '@storybook/react';
import { Confirm } from './Confirm';

const meta = {
  title: 'Features/Lowering/4. Confirm',
  component: Confirm,
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
} satisfies Meta<typeof Confirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gasFees: 100,
    amount: 100.93,
    address: '0x0000000000',
    onConfirm: () => {},
    onClose: () => {},
  },
};

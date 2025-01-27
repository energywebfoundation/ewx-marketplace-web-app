import type { Meta, StoryObj } from '@storybook/react';
import { Executing } from './Executing';

const meta = {
  title: 'Features/Staking/6. Executing',
  component: Executing,
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
} satisfies Meta<typeof Executing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    address: '0x0000000000',
    amount: 100.93,
  },
};

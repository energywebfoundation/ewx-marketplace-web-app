import type { Meta, StoryObj } from '@storybook/react';
import { CheckingIsStaked } from './CheckingIsStaked';

const meta = {
  title: 'Features/Staking/2. CheckingIsStaked',
  component: CheckingIsStaked,
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
} satisfies Meta<typeof CheckingIsStaked>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

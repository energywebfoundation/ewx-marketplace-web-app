import type { Meta, StoryObj } from '@storybook/react';
import { TransactionListButton } from './TransactionListButton';

const meta = {
  title: 'Components/Header/TransactionListButton',
  component: TransactionListButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex h-[40px] w-[40px] items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TransactionListButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

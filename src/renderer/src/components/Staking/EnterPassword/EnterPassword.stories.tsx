import type { Meta, StoryObj } from '@storybook/react';
import { EnterPassword } from './EnterPassword';

const meta = {
  title: 'Features/Staking/8. EnterPassword',
  component: EnterPassword,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EnterPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

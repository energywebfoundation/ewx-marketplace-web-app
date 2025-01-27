import type { Meta, StoryObj } from '@storybook/react';
import { ResetPassword } from './ResetPassword';

const meta = {
  title: 'Features/Staking/9. ResetPassword',
  component: ResetPassword,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <div className="w-[600px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ResetPassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPasswordReseted: () => console.log('Password reseted'),
    onClose: () => console.log('Close'),
  },
};

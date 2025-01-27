import type { Meta, StoryObj } from '@storybook/react';
import { OperatorSignUp } from './OperatorSignUp';

const meta = {
  title: 'Features/Staking/3. Operator Signup',
  component: OperatorSignUp,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => {
      return (
        <div className="grid h-full w-full place-items-center bg-radial-gradient">
          <div className="w-[600px]">
            <Story />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof OperatorSignUp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => console.log('Close'),
  },
};

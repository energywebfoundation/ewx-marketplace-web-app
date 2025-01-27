import type { Meta, StoryObj } from '@storybook/react';
import { TxFailure } from './TxFailure';

const meta = {
  title: 'Components/Tx Failure',
  component: TxFailure,
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
} satisfies Meta<typeof TxFailure>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onClose: () => {},
  },
};

export const CustomButtonText: Story = {
  args: {
    buttonText: 'Go to Dashboard',
    onClose: () => {},
  },
};

export const Lowering: Story = {
  args: {
    operation: 'lowering',
    onClose: () => {},
  },
};

export const Staking: Story = {
  args: {
    operation: 'staking',
    onClose: () => {},
  },
};

export const OperatorSignUp: Story = {
  args: {
    operation: 'operator-signup',
    onClose: () => {},
  },
};

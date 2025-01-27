import type { Meta, StoryObj } from '@storybook/react';
import { TxSuccessWorker } from './TxSuccessWorker';

const meta = {
  title: 'Components/Tx Success',
  component: TxSuccessWorker,
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
} satisfies Meta<typeof TxSuccessWorker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OperatorSignUpWorker: Story = {
  args: {
    operation: 'operator-signup',
    onNext: () => {},
    onClose: () => {},
  },
};

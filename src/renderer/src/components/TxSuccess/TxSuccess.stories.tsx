import type { Meta, StoryObj } from '@storybook/react';
import { TxSuccess } from './TxSuccess';

const meta = {
  title: 'Components/Tx Success',
  component: TxSuccess,
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
} satisfies Meta<typeof TxSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

const txn = '0x23c078f2465afae4de8fe90c1f773c034778b3057201f29c69de66616877af78';

export const Lifting: Story = {
  args: {
    operation: 'lifting',
    txUrl: `https://volta-explorer.energyweb.org/tx/${txn}`,
    description: 'Attention! Lifting operation will take approximately 30 minutes to succeed.',
    onNext: () => {},
    onClose: () => {},
  },
};

export const Lowering: Story = {
  args: {
    operation: 'lowering',
    onNext: () => {},
    onClose: () => {},
  },
};

export const Staking: Story = {
  args: {
    operation: 'staking',
    txUrl: `https://volta-explorer.energyweb.org/tx/${txn}`,
    onNext: () => {},
    onClose: () => {},
  },
};

export const OperatorSignUp: Story = {
  args: {
    operation: 'operator-signup',
    onNext: () => {},
    onClose: () => {},
  },
};

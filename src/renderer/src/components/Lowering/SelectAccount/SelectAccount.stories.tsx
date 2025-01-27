import type { Meta, StoryObj } from '@storybook/react';
import { SelectAccount } from './SelectAccount';

const meta = {
  title: 'Features/Lowering/3. SelectAccount',
  component: SelectAccount,
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
} satisfies Meta<typeof SelectAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    address: '0x1111111111',
    onAccountSelected: () => {},
    onClose: () => {},
    onGoBack: () => {},
  },
};

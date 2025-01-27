import type { Meta, StoryObj } from '@storybook/react';
import { Confirm } from './Confirm';

const meta = {
  title: 'Features/Unlink Solution Group Account/Confirm',
  component: Confirm,
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
} satisfies Meta<typeof Confirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onConfirm: () => {},
    onClose: () => {},
  },
};

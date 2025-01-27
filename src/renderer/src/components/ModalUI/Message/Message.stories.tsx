import type { Meta, StoryObj } from '@storybook/react';
import { Message } from './Message';

const meta = {
  title: 'Components/ModalUI/Message',
  component: Message,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="w-[550px] bg-gray-90 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Message>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Connection successful',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: 'Connection failed',
  },
};

export const Progress: Story = {
  args: {
    type: 'progress',
    message: 'Connecting wallet...',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionError as ConnectionErrorComponent } from './ConnectionError';

const meta = {
  title: 'Features/Lowering/1. Connect EWX Wallet/ConnectionError',
  component: ConnectionErrorComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectionErrorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConnectionError: Story = {};

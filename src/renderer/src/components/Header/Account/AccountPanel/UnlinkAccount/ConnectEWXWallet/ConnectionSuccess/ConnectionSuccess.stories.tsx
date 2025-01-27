import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionSuccess as ConnectionSuccessComponent } from './ConnectionSuccess';

const meta = {
  title: 'Features/Unlink Solution Group account/1. Connect EWX Wallet/ConnectionSuccess',
  component: ConnectionSuccessComponent,
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
} satisfies Meta<typeof ConnectionSuccessComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConnectionSuccess: Story = {};

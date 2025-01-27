import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionLoading as ConnectionLoadingComponent } from './ConnectionLoading';

const meta = {
  title: 'Features/ConnectUserWallet/ConnectionLoading',
  component: ConnectionLoadingComponent,
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
} satisfies Meta<typeof ConnectionLoadingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConnectionLoading: Story = {};

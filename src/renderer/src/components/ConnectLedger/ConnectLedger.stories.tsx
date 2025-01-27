import type { Meta, StoryObj } from '@storybook/react';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { ConnectLedger } from './ConnectLedger';

const meta = {
  title: 'Features/ConnectUserWallet/ConnectLedger',
  component: ConnectLedger,
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
} satisfies Meta<typeof ConnectLedger>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chain: MARKETPLACE_CHAINS.EWC,
    onClose: () => {},
    onConnectionSuccess: () => {},
    onConnectionError: () => {},
  },
};

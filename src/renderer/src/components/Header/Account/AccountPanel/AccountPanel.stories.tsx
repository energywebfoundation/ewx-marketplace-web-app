import type { Meta, StoryObj } from '@storybook/react';
import { AccountPanel } from './AccountPanel';

const meta = {
  title: 'Components/Header/AccountPanel',
  component: AccountPanel,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-[500px] place-items-center p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AccountPanelConnected: Story = {
  args: {
    isConnected: true,
    connectWallet: () => {},
  },
};

export const AccountPanelDisconnected: Story = {
  args: {
    isConnected: true,
    connectWallet: () => {},
  },
};

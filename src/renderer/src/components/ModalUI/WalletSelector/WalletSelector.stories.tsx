import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { WalletSelector as WalletSelectorComponent, type Wallet, Chain } from './WalletSelector';

const meta = {
  title: 'Components/ModalUI/WalletSelector',
  component: WalletSelectorComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => {
      const [selectedWallet, setSelectedWallet] = useState<Wallet>('wallet-connect');

      return (
        <div className="w-[550px] bg-gray-90 p-4">
          <Story
            args={{
              selectedWallet,
              setSelectedWallet,
            }}
          />
        </div>
      );
    },
  ],
} satisfies Meta<typeof WalletSelectorComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WalletSelector: Story = {
  args: {
    selectedWallet: 'wallet-connect',
    setSelectedWallet: () => {},
    network: Chain.EWX,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { SelectWallet as SelectWalletComponent } from './SelectWallet';
import { Chain } from '@ewf/components/ModalUI/WalletSelector';

const meta = {
  title: 'Features/Lowering/1. Connect EWX Wallet/SelectWallet',
  component: SelectWalletComponent,
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
} satisfies Meta<typeof SelectWalletComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectWallet: Story = {
  args: {
    onClose: () => {},
    network: Chain.EWX,
  },
};

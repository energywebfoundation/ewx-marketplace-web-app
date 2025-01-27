import type { Meta, StoryObj } from '@storybook/react';
import { SelectWallet as SelectWalletComponent } from './SelectWallet';
import { Chain } from '@ewf/components/ModalUI/WalletSelector';

const meta = {
  title: 'Features/ConnectUserWallet/SelectWallet',
  component: SelectWalletComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <div className="w-[550px] p-4">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SelectWalletComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectWallet: Story = {
  args: {
    onClose: () => {},
    next: () => {},
    network: Chain.EWX,
  },
};

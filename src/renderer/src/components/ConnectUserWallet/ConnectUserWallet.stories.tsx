import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ewf/components/Button';
import { ConnectUserWallet as ConnectUserWalletComponent } from './ConnectUserWallet';

const meta = {
  title: 'Features/ConnectUserWallet',
  component: ConnectUserWalletComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="h-full bg-radial-gradient">
          <div className="w-[550px] p-4">
            <Button onClick={() => setIsOpen(true)} className="bg-button-gradient">
              Connect
            </Button>
            <Story
              args={{
                isOpen,
                setIsOpen,
              }}
            />
          </div>
        </div>
      );
    },
  ],
} satisfies Meta<typeof ConnectUserWalletComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConnectUserWallet: Story = {
  args: {
    isOpen: false,
    setIsOpen: () => {},
  },
};

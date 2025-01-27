import type { Meta, StoryObj } from '@storybook/react';
import walletConnectLogo from '@ewf/assets/logos/wallet-connect.svg';
import { WalletButton } from './WalletButton';

const meta = {
  title: 'Components/WalletSelector/WalletButton',
  component: WalletButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="rounded-lg p-8 bg-popup-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WalletButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonChildren = () => (
  <>
    <img src={walletConnectLogo} width={56} height={56} alt="Wallet connect" />
    <p>Wallet Connect</p>
  </>
);

export const Default: Story = {
  render: (args) => {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[Idle, Selected, Disabled].map((Story, index) => (
          <WalletButton key={index} {...args} {...Story.args} />
        ))}
        {['Idle', 'Selected', 'Disabled'].map((text) => (
          <p key={text} className="text-center">
            {text}
          </p>
        ))}
      </div>
    );
  },
  args: {
    isSelected: false,
    disabled: false,
    onSelect: () => {},
    children: <ButtonChildren />,
  },
};

export const Idle: Story = {
  args: {
    isSelected: false,
    disabled: false,
    onSelect: () => {},
    children: <ButtonChildren />,
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
    disabled: false,
    onSelect: () => {},
    children: <ButtonChildren />,
  },
};

export const Disabled: Story = {
  args: {
    isSelected: false,
    disabled: true,
    onSelect: () => {},
    children: <ButtonChildren />,
  },
};

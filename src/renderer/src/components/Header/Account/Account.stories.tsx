import type { Meta, StoryObj } from '@storybook/react';
import { encodeAddress } from '@polkadot/util-crypto';
import { truncateAddress } from '@ewf/lib/utils';
import { Account } from '.';

const truncatedAddress = truncateAddress(
  encodeAddress('87bMJQYeEhZonJasDL129Dxd86p5TNgHmrwgxcx7ziKChvk'),
);

const meta = {
  title: 'Components/Header/Account',
  component: Account,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div>
        <p>Connected</p>
        <Account />
      </div>
      <div className="mt-4">
        <p>Not connected</p>
        <Account />
      </div>
    </div>
  ),
};

export const Connected: Story = {
  args: {
    address: truncatedAddress,
  },
};

export const NotConnected: Story = {};

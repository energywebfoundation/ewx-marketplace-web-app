import type { Meta, StoryObj } from '@storybook/react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChainDropdown } from './ChainDropdown';

const meta = {
  title: 'Pages/Discover/ChainDropdown',
  component: ChainDropdown,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="grid h-[400px] w-[400px] place-items-center bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChainDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <DropdownMenu.Item className="cursor-pointer outline-none">Lift Tokens</DropdownMenu.Item>
        <DropdownMenu.Item className="outline-none">Support</DropdownMenu.Item>
        <DropdownMenu.Item className="cursor-pointer outline-none">
          Delete Account
        </DropdownMenu.Item>
      </>
    ),
  },
};

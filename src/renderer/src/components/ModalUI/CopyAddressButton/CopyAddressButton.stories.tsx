import type { Meta, StoryObj } from '@storybook/react';
import { CopyAddressButton as CopyAddressButtonComponent } from './CopyAddressButton';

const meta = {
  title: 'Components/ModalUI/CopyAddressButton',
  component: CopyAddressButtonComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="w-[550px] bg-gray-90 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CopyAddressButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CopyAddressButton: Story = {
  args: {
    address: '0x0000000000',
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { AddressBook } from './AddressBook';

const meta = {
  title: 'Components/ModalUI/AddressBookView',
  component: AddressBook,
  parameters: {
    layout: 'top',
  },
} satisfies Meta<typeof AddressBook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCloseButton: Story = {
  args: {
    onClose: () => console.log('Close button clicked'),
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { AmountInput as AmountInputComponent } from './AmountInput';

const meta = {
  title: 'Components/ModalUI/AmountInput',
  component: AmountInputComponent,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    () => (
      <div className="w-[550px] rounded-lg bg-gray-90 p-6 bg-popup-gradient">
        <AmountInputComponent
          initAmount={0}
          balance={100.93}
          minAmount={20}
          label="Enter Subscription Amount"
          onAmountChange={() => null}
        />
      </div>
    ),
  ],
} satisfies Meta<typeof AmountInputComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AmountInput: Story = {
  args: {
    initAmount: 0,
    balance: 0,
    label: 'Enter Subscription Amount',
  },
};

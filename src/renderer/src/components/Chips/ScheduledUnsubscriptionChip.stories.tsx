import type { Meta, StoryObj } from '@storybook/react';
import { ScheduledUnsubscriptionChip } from './ScheduledUnsubscriptionChip';

const meta = {
  title: 'Components/Chips/ScheduledUnsubscriptionChip',
  component: ScheduledUnsubscriptionChip,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => {
      return (
        <div>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ScheduledUnsubscriptionChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    unsubscriptionDate: new Date('05 October 2024 14:48 UTC'),
    withdrawalDelay: 50
  },
};

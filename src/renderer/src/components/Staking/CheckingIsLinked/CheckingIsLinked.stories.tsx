import type { Meta, StoryObj } from '@storybook/react';
import { CheckingIsLinked } from './CheckingIsLinked';

const meta = {
  title: 'Features/Staking/13. CheckingIsLinked',
  component: CheckingIsLinked,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckingIsLinked>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

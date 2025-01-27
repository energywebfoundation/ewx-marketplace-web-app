import type { Meta, StoryObj } from '@storybook/react';
import { PromptVoting } from './PromptVoting';

const meta = {
  title: 'Features/Staking/7. PromptVoting',
  component: PromptVoting,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <div className="w-[600px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof PromptVoting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onAccept: () => console.log('Password reseted'),
    onClose: () => console.log('Close'),
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ewf/components/Button';
import { TopupStaking } from './TopupStaking';

const meta = {
  title: 'Features/Top-up Staking',
  component: TopupStaking,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="h-full w-full p-4 bg-radial-gradient">
          <Story args={{ isOpen, setIsOpen }} />
          <Button onClick={() => setIsOpen(true)} className="bg-button-gradient">
            Subscribe
          </Button>
        </div>
      );
    },
  ],
} satisfies Meta<typeof TopupStaking>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    workerId: '0',
    workerName: 'Worker 1',
    stakedAmount: '102.789',
    isOpen: true,
    amounts: {
      min: undefined,
      max: undefined,
    },
    setIsOpen: () => {},
  },
};

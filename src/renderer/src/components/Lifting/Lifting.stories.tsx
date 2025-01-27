import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ewf/components/Button';
import { Lifting as LiftingComponent } from './Lifting';

const meta = {
  title: 'Features/Lifting',
  component: LiftingComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div className="h-full w-full p-4 bg-radial-gradient">
          <Story args={{ isOpen, setIsOpen }} />
          <Button onClick={() => setIsOpen(true)} className="bg-button-gradient">
            Lift tokens
          </Button>
        </div>
      );
    },
  ],
} satisfies Meta<typeof LiftingComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lifting: Story = {
  args: {
    isOpen: false,
    setIsOpen: () => {},
  },
};

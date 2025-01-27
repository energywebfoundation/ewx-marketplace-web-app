import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@ewf/components/Button';
import { Lowering as LoweringComponent } from './Lowering';

const meta = {
  title: 'Features/Lowering',
  component: LoweringComponent,
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
            Lower tokens
          </Button>
        </div>
      );
    },
  ],
} satisfies Meta<typeof LoweringComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lowering: Story = {
  args: {
    isOpen: false,
    setIsOpen: () => {},
  },
};

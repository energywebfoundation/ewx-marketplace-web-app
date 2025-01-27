import type { Meta, StoryObj } from '@storybook/react';
import { Gradients as GradientComponent } from './Gradients';

const meta = {
  title: 'Design System/Gradients',
  component: GradientComponent,
  parameters: {
    layout: 'left',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GradientComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gradients: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { Playground } from './Playground';

const meta = {
  title: 'Pages/Dashboard/Widgets/Playground',
  component: Playground,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Playground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PlaygroundWidget: Story = {};

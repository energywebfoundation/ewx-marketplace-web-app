import type { Meta, StoryObj } from '@storybook/react';
import { EWXCard } from './EWXCard';

const meta = {
  title: 'Pages/SocialMedia',
  component: EWXCard,
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
} satisfies Meta<typeof EWXCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnergywebXCard: Story = {};

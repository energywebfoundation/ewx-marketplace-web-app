import type { Meta, StoryObj } from '@storybook/react';
import { EWCard } from './EnergywebCard';

const meta = {
  title: 'Pages/SocialMedia',
  component: EWCard,
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
} satisfies Meta<typeof EWCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnergywebCard: Story = {};

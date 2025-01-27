import type { Meta, StoryObj } from '@storybook/react';
import { DiscordHelpCentre } from './DiscordHelpCentre';

const meta = {
  title: 'Pages/SocialMedia',
  component: DiscordHelpCentre,
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
} satisfies Meta<typeof DiscordHelpCentre>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DiscordHelpCentreCard: Story = {};

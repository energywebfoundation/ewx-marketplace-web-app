import type { Meta, StoryObj } from '@storybook/react';
import { GithubCard } from './GithubCard';

const meta = {
  title: 'Pages/SocialMedia',
  component: GithubCard,
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
} satisfies Meta<typeof GithubCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

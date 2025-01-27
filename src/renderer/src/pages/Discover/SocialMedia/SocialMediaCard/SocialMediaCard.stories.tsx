import type { Meta, StoryObj } from '@storybook/react';
import { SocialMediaCard } from './SocialMediaCard';

const meta = {
  title: 'Pages/Discover/SocialMediaCard',
  component: SocialMediaCard,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-full place-items-center p-8 bg-radial-gradient">
        <div className="w-full max-w-[830px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SocialMediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

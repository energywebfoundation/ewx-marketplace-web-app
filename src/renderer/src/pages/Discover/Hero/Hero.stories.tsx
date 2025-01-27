import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';

const meta = {
  title: 'Pages/Discover/Hero',
  component: Hero,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[830px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar } from './Sidebar';

const meta = {
  title: 'Pages/Discover/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="grid h-[500px] w-[400px] place-items-center bg-radial-gradient">
        <div className="w-[256px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

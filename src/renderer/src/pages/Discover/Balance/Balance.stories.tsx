import type { Meta, StoryObj } from '@storybook/react';
import { Balance } from './Balance';

const meta = {
  title: 'Pages/Discover/Balance',
  component: Balance,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="grid h-[400px] w-[400px] place-items-center bg-radial-gradient">
        <div className="w-[256px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Balance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

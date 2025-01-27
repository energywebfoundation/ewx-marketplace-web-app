import type { Meta, StoryObj } from '@storybook/react';
import { SolutionsChart } from './SolutionsChart';

const meta = {
  title: 'Pages/Dashboard/Widgets',
  component: SolutionsChart,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <div className="w-[250px]">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SolutionsChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SolutionChart: Story = {
  args: {
    stats: {
      active: 8,
      inactive: 2,
      expired: 4,
      ended: 3,
      others: 20,
    },
  },
};

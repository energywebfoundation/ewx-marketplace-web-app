import type { Meta, StoryObj } from '@storybook/react';
import { WorkerDetailsLitePage } from './WorkerDetailsLite.page';

const meta = {
  title: 'Pages/Worker Lite',
  component: WorkerDetailsLitePage,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkerDetailsLitePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

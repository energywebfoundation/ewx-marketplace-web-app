import type { Meta, StoryObj } from '@storybook/react';
import { DashboardDetails } from './DashboardDetails.page';

const meta = {
  title: 'Pages/DashboardDetails.page',
  component: DashboardDetails,
  parameters: {
    layout: 'top',
  },
} satisfies Meta<typeof DashboardDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

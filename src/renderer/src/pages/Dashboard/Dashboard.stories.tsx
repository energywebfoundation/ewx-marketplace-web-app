import type { Meta, StoryObj } from '@storybook/react';
import { DashboardPage } from './Dashboard.page';

const meta = {
  title: 'Pages/Dashboard',
  component: DashboardPage,
  parameters: {
    layout: 'top',
  },
} satisfies Meta<typeof DashboardPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

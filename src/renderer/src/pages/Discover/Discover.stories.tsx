import type { Meta, StoryObj } from '@storybook/react';
import { DiscoverPage } from './Discover.page';

const meta = {
  title: 'Pages/Discover',
  component: DiscoverPage,
  parameters: {
    layout: 'top',
  },
} satisfies Meta<typeof DiscoverPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

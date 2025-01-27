import type { Meta, StoryObj } from '@storybook/react';
import { GridLayout as GridLayoutComponent } from './GridLayout';

const meta = {
  title: 'Design System/Grid-Layout',
  component: GridLayoutComponent,
  parameters: {
    layout: 'top',
  },
} satisfies Meta<typeof GridLayoutComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GridLayout: Story = {};

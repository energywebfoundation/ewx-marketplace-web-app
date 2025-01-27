import type { Meta, StoryObj } from '@storybook/react';
import { Colors as ColorsComponent } from './Colors';

const meta = {
  title: 'Design System/Colors',
  component: ColorsComponent,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ColorsComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { ExperimentalModeBanner } from './ExperimentalModeBanner';

const meta = {
  title: 'Components/ExperimentalModeBanner',
  component: ExperimentalModeBanner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ExperimentalModeBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

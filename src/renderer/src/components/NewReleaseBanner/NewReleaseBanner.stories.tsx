import type { Meta, StoryObj } from '@storybook/react';
import { NewReleaseBanner } from './NewReleaseBanner';

const meta = {
  title: 'Components/NewReleaseBanner',
  component: NewReleaseBanner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof NewReleaseBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

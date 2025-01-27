import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LoaderPage: Story = {};

import type { Meta, StoryObj } from '@storybook/react';
import { AlertButton } from './AlertButton';

const meta = {
  title: 'Components/Header/AlertButton',
  component: AlertButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="flex h-[40px] w-[40px] items-center justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AlertButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

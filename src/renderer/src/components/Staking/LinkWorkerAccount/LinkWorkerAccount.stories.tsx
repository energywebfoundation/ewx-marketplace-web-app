import type { Meta, StoryObj } from '@storybook/react';
import { LinkWorkerAccount } from './LinkWorkerAccount';

const meta = {
  title: 'Features/Staking/14. LinkWorkerAccount',
  component: LinkWorkerAccount,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkWorkerAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLink: () => {},
  },
};

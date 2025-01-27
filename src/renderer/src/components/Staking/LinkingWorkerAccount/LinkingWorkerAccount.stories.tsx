import type { Meta, StoryObj } from '@storybook/react';
import { LinkingWorkerAccount } from './LinkingWorkerAccount';

const meta = {
  title: 'Features/Staking/15. LinkingWorkerAccount',
  component: LinkingWorkerAccount,
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
} satisfies Meta<typeof LinkingWorkerAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLink: () => {},
  },
};

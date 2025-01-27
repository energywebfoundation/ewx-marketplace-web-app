import type { Meta, StoryObj } from '@storybook/react';
import { SuccessBadge } from './SuccessBadge';
import { ErrorBadge } from './ErrorBadge';
import { ProgressBadgeEWX } from './ProgressBadge';
import { DownloadBadge } from './DownloadBadge';

const meta = {
  title: 'Components/BadgeStatus',
  component: SuccessBadge,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SuccessBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-8">
      <SuccessBadge />
      <ErrorBadge />
      <ProgressBadgeEWX />
      <DownloadBadge />
    </div>
  ),
};

export const Success: Story = {
  render: () => <SuccessBadge />,
};

export const Error: Story = {
  render: () => <ErrorBadge />,
};

export const Progress: Story = {
  render: () => <ProgressBadgeEWX />,
};

export const Download: Story = {
  render: () => <DownloadBadge />,
};

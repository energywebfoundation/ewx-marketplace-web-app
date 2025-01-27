import type { Meta, StoryObj } from '@storybook/react';
import { ActiveChip } from './ActiveChip';
import { BetaChip } from './BetaChip';
import { InactiveChip } from './InactiveChip';
import { RunningChip } from './RunningChip';
import { ExpiredChip } from './ExpiredChip';
import { ScheduledChip } from './ScheduledChip';
import { EndedChip } from './EndedChip';
import { DownloadingChip } from './DownloadingChip';
import { DownloadFailedChip } from './DownloadFailedChip';
import { InstallingChip } from './InstallingChip';
import { InstallFailedChip } from './InstallFailedChip';
import { PausedChip } from './PausedChip';
import { PausingChip } from './PausingChip';
import { TerminatingChip } from './TerminatingChip';
import { UnsubscriptionDelayChip } from './UnsubscriptionDelayChip';

const meta = {
  title: 'Components/Chips',
  component: ActiveChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ActiveChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ActiveChip />
      <InactiveChip />
      <BetaChip />
      <RunningChip />
      <ExpiredChip />
      <ScheduledChip />
      <EndedChip />
      <InstallingChip />
      <InstallFailedChip />
      <PausedChip />
      <PausingChip />
      <TerminatingChip />
      <DownloadingChip />
      <UnsubscriptionDelayChip />
    </div>
  ),
};

export const Active: Story = {
  render: () => <ActiveChip />,
};

export const Inactive: Story = {
  render: () => <InactiveChip />,
};

export const Beta: Story = {
  render: () => <BetaChip />,
};

export const Running: Story = {
  render: () => <RunningChip />,
};

export const Downloading: Story = {
  render: () => <DownloadingChip />,
};

export const DownloadFailed: Story = {
  render: () => <DownloadFailedChip />,
};

export const Installing: Story = {
  render: () => <InstallingChip />,
};

export const InstallFailed: Story = {
  render: () => <InstallFailedChip />,
};

export const Paused: Story = {
  render: () => <PausedChip />,
};

export const Pausing: Story = {
  render: () => <PausingChip />,
};

export const Terminating: Story = {
  render: () => <TerminatingChip />,
};

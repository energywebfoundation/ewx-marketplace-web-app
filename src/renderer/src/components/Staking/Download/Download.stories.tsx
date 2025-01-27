import type { Meta, StoryObj } from '@storybook/react';
import { Download } from './Download';

const meta = {
  title: 'Features/Staking/16. Download',
  component: Download,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid w-[480px] place-items-center bg-gray-90 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Download>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onDownload: () => {},
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmSeedPhrase } from './ConfirmSeedPhrase';
import { generateSeedPhrase } from '../Staking';

const meta = {
  title: 'Features/Staking/12. ConfirmSeedPhrase',
  component: ConfirmSeedPhrase,
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
} satisfies Meta<typeof ConfirmSeedPhrase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    seedPhrase: generateSeedPhrase(),
  },
};

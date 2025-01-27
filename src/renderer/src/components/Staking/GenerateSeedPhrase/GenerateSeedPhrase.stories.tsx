import type { Meta, StoryObj } from '@storybook/react';
import { GenerateSeedPhrase } from './GenerateSeedPhrase';
import { generateSeedPhrase } from '../Staking';

const meta = {
  title: 'Features/Staking/11. GenerateSeedPhrase',
  component: GenerateSeedPhrase,
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
} satisfies Meta<typeof GenerateSeedPhrase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    seedPhrase: generateSeedPhrase(),
  },
};

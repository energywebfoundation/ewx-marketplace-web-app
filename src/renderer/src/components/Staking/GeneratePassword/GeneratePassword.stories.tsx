import type { Meta, StoryObj } from '@storybook/react';
import { GeneratePassword } from './GeneratePassword';
import { generateSeedPhrase } from '../Staking';

const meta = {
  title: 'Features/Staking/10. GeneratePassword',
  component: GeneratePassword,
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
} satisfies Meta<typeof GeneratePassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    seedPhrase: generateSeedPhrase(),
    onPasswordCreated: () => {},
    onClose: () => {},
  },
};

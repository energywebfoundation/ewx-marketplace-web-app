import type { Meta, StoryObj } from '@storybook/react';
import { InputSeedPhrase } from './InputSeedPhrase';

const meta = {
  title: 'Components/Header/InputSeedPhrase',
  component: InputSeedPhrase,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-[700px] place-items-center p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputSeedPhrase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCheckSeedPhrase: (seedPhrase: string) => {
      console.log(seedPhrase);
    },
  },
};

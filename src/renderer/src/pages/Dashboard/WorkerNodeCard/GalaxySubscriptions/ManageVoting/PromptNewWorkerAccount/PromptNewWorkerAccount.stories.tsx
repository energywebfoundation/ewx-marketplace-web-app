import type { Meta, StoryObj } from '@storybook/react';
import { PromptNewWorkerAccount } from './PromptNewWorkerAccount';

const meta = {
  title: 'Features/Staking/PromptNewWorkerAccount',
  component: PromptNewWorkerAccount,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PromptNewWorkerAccount>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GalaxySubscriptionComboWidget: Story = {
  args: {
    onGenerateAccount: () => {},
    onImportSeedPhrase: () => {},
    onClose: () => {},
  },
};

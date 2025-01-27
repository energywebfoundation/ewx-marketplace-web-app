import type { Meta, StoryObj } from '@storybook/react';
import { EnergywebXSocialButton } from './EnergywebXButton';
import { GithubSocialButton } from './GithubButton';
import { GlobeSocialButton } from './GlobeButton';

const meta = {
  title: 'Components/Button/SocialMedia',
  component: EnergywebXSocialButton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof EnergywebXSocialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-8">
      <EnergywebXSocialButton />
      <GlobeSocialButton />
      <GithubSocialButton />
    </div>
  ),
};

export const X: Story = {
  render: () => <EnergywebXSocialButton />,
};

export const Github: Story = {
  render: () => <GithubSocialButton />,
};

export const Globe: Story = {
  render: () => <GlobeSocialButton />,
};

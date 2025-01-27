import type { Meta, StoryObj } from '@storybook/react';
import { WelcomePage as WelcomeComponent } from './Welcome.page';

const meta: Meta<typeof WelcomeComponent> = {
  title: 'Pages/Welcome',
  component: WelcomeComponent,
  parameters: {
    layout: 'left',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Welcome: Story = {};

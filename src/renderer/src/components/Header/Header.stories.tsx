import type { Meta, StoryObj } from '@storybook/react';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import { Header as HeaderComponent } from './Header';

const meta = {
  title: 'Components/Header',
  component: HeaderComponent,
  parameters: {
    layout: 'top',
    reactRouter: reactRouterParameters({
      location: {
        pathParams: { section: 'discover' },
      },
      routing: { path: '/discover/:section' },
    }),
  },
  decorators: [
    (Story) => (
      <div className="h-full p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {};

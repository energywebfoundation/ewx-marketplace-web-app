import type { Meta, StoryObj } from '@storybook/react';
import { TabButton } from './TabButton';

const meta = {
  title: 'Components/Header/TabButton',
  component: TabButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    tab: {
      control: {
        type: 'select',
        options: ['discover', 'dashboard'],
      },
    },
    active: {
      control: {
        type: 'boolean',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-full bg-gray-90 p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TabButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[
          Discover,
          Dashboard,
          DiscoverActive,
          DashboardActive,
          DiscoverDisabled,
          DasboardDisabled,
        ].map((Story, index) => (
          <div key={index} className="w-fit">
            <TabButton {...Story.args} />
          </div>
        ))}
      </div>
    );
  },
  // Just to avoid the "No story args" error
  args: {
    tab: 'discover',
  },
};

export const Discover: Story = {
  args: {
    tab: 'discover',
  },
};

export const Dashboard: Story = {
  args: {
    tab: 'dashboard',
  },
};

export const DiscoverActive: Story = {
  args: {
    tab: 'discover',
    active: true,
  },
};

export const DashboardActive: Story = {
  args: {
    tab: 'dashboard',
    active: true,
  },
};

export const DiscoverDisabled: Story = {
  args: {
    tab: 'discover',
    disabled: true,
  },
};

export const DasboardDisabled: Story = {
  args: {
    tab: 'dashboard',
    disabled: true,
  },
};

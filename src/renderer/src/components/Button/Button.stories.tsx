import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'contrast'],
      },
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
    children: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-2 items-center gap-4">
      {[
        Primary,
        PrimarySmall,
        Contrast,
        ContrastSmall,
        OutlinedDark,
        OutlinedDarkSmall,
        Neutral,
        NeutralSmall,
      ].map((Story, index) => (
        <Button key={index} {...Story.args} className="w-fit">
          {Story.args?.children}
        </Button>
      ))}
    </div>
  ),
  args: {
    children: '',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};

export const Contrast: Story = {
  args: {
    color: 'outlined',
    children: 'Outlined',
  },
};

export const OutlinedDark: Story = {
  args: {
    color: 'outlined-dark',
    children: 'Out. Dark',
  },
};

export const Neutral: Story = {
  args: {
    color: 'neutral',
    children: 'Neutral',
  },
};

export const PrimarySmall: Story = {
  args: {
    color: 'primary',
    size: 'small',
    children: 'P. Small',
  },
};

export const ContrastSmall: Story = {
  args: {
    color: 'outlined',
    size: 'small',
    children: 'O. Small',
  },
};

export const OutlinedDarkSmall: Story = {
  args: {
    color: 'outlined-dark',
    size: 'small',
    children: 'Out. D. Small',
  },
};

export const NeutralSmall: Story = {
  args: {
    color: 'neutral',
    size: 'small',
    children: 'N. Small',
  },
};

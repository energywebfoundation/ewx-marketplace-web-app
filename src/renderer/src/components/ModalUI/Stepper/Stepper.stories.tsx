import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const meta = {
  title: 'Components/ModalUI/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story): JSX.Element => (
      <div className="grid w-[480px] place-items-center bg-gray-90 p-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[480px] bg-gray-90">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="mb-4">
          <Stepper step={step} maxStep={4} />
        </div>
      ))}
    </div>
  ),
  args: {
    step: 1,
    maxStep: 4,
  },
};

export const Step1: Story = {
  args: {
    step: 1,
    maxStep: 4,
  },
};

export const Step2: Story = {
  args: {
    step: 2,
    maxStep: 4,
  },
};

export const Step3: Story = {
  args: {
    step: 3,
    maxStep: 4,
  },
};

export const Step4: Story = {
  args: {
    step: 3,
    maxStep: 4,
  },
};

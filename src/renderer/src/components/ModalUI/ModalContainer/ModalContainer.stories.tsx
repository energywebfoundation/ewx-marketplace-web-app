import type { Meta, StoryObj } from '@storybook/react';
import { ModalContainer as ModalContainerComponent } from './ModalContainer';

const meta = {
  title: 'Components/ModalUI/ModalContainer',
  component: ModalContainerComponent,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="grid h-full w-full place-items-center bg-radial-gradient">
        <div className="w-[550px] p-4">
          <Story>Modal content</Story>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof ModalContainerComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ModalContainer: Story = {
  args: {
    children: 'Modal content',
  },
};

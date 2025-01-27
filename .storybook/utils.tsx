import type { ReactRenderer } from '@storybook/react';
import type { PartialStoryFn } from '@storybook/csf';

type Story = PartialStoryFn<ReactRenderer, Record<string, never>>;

export const layoutWrapper = (Story: Story): React.ReactNode => {
  return (
    <div className="h-full w-full text-base text-font">
      <Story />
    </div>
  );
};

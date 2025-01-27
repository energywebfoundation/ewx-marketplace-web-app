import * as Select from '@radix-ui/react-select';
import { twix } from 'tailwindcss-radix-ui';
import { PiCaretDownBold } from 'react-icons/pi';

export const Root = Select.Root;
export const Portal = Select.Portal;
export const Value = Select.Value;
export const Group = Select.Group;
export const Label = Select.Label;
export const ItemText = Select.ItemText;
export const ScrollUpButton = Select.ScrollUpButton;
export const ScrollDownButton = Select.ScrollUpButton;
export const Viewport = Select.Viewport;

export const Trigger = twix(
  Select.Trigger,
  'flex items-center gap-2 rounded-md border border-brand bg-brand/10 py-1 pl-4 pr-2',
);

export const TriggerIcon = ({ size = 20 }: { size?: number }): JSX.Element => (
  <Select.Icon>
    <PiCaretDownBold size={size} />
  </Select.Icon>
);

export const Content = twix(
  Select.Content,
  'brand right-0 z-20 mt-2 space-y-2 rounded bg-violet-darker p-2 pt-4 shadow-[2px_4px_8px_0_rgba(0,0,0,0.24)] radix-state-closed:animate-slide-up-fade-out radix-state-open:animate-slide-down-fade-in',
);

export const Item = twix(
  Select.Item,
  'relative flex cursor-pointer select-none items-start gap-2 rounded-sm px-2 py-[0.4rem] font-primary-light text-base outline-none hover:bg-brand/30 focus:bg-brand/50',
);

export const ItemIndicator = twix(
  Select.ItemIndicator,
  'absolute right-4 h-[14px] w-[7px] rotate-45 border-b-2 border-r-2 border-brand',
);

export const Separator = twix(Select.Separator, 'my-2 border border-gray-70');

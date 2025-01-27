import { twix } from 'tailwindcss-radix-ui';
import * as Dialog from '@radix-ui/react-dialog';

export const Root = Dialog.Root;
export const Trigger = Dialog.Trigger;
export const Portal = Dialog.Portal;
export const Close = Dialog.Close;
export const Title = Dialog.Title;
export const Overlay = twix(
  Dialog.Overlay,
  'fixed left-0 top-0 z-30 grid h-full w-full place-items-center overflow-y-auto py-8 backdrop-blur-xl radix-state-closed:animate-fade-out radix-state-open:animate-fade-in',
);
export const Content = twix(
  Dialog.Content,
  'radix-state-closed:animate-fade-out radix-state-open:animate-fade-in',
);

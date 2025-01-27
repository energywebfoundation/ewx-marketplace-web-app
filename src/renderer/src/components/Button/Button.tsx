import { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// Forward ref is necessary to pass Radix's ref to the button
// This is useful when using the Button as Radix's trigger
export const Button = forwardRef(
  (
    { color = 'primary', size = 'medium', disabled, children, ...rest }: Props,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>,
  ): JSX.Element => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        className={twMerge(
          clsx({
            'group rounded-full outline-none': true,
            'bg-brand hover:shadow-[0_0_16px_0_#612CC6] focus:bg-brand-light focus:shadow-[0_0_16px_0_#1782FF] active:shadow-[0_0_16px_0_#000_inset]':
              color === 'primary',
            'border-2 border-brand hover:bg-brand/25 focus:border-transparent focus:gradient-border-primary-with-black active:border-brand active:bg-gradient-to-r active:from-brand/40 active:to-brand/40 active:shadow-[0_0_16px_0_rgba(0_0_0_0.32)_inset]':
              color === 'outlined',
            'border-2 border-brand bg-black hover:bg-brand/80 focus:border-transparent focus:gradient-border-primary-with-black active:border-brand active:bg-gradient-to-r active:from-brand/40 active:to-brand/40 active:shadow-[0_0_16px_0_rgba(0_0_0_0.32)_inset]':
              color === 'outlined-dark',
            'bg-gray-60 hover:bg-gray-50 active:bg-gray-70': color === 'neutral',
            'px-10 py-4 text-lg': size === 'medium',
            'px-4 py-2 text-base': size === 'small',
            'pointer-events-none opacity-60': disabled,
            [rest.className as string]: true,
          }),
        )}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'outlined' | 'neutral' | 'outlined-dark';
  size?: 'small' | 'medium';
}

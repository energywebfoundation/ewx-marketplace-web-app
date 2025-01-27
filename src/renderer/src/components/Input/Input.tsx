import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export const Input = ({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  return (
    <input
      {...rest}
      className={twMerge(
        'w-full rounded-md bg-gray-90 p-3 text-sm outline outline-1 outline-gray-60 focus:outline-brand',
        className,
      )}
    />
  );
};

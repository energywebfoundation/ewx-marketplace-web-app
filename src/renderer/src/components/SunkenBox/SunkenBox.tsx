import clsx from 'clsx';

export const SunkenBox = ({ className, children }: Props): JSX.Element => {
  return (
    <div
      className={clsx({
        'rounded-lg bg-gray-80 p-4 shadow-sunken': true,
        [className as string]: className,
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  className?: string;
  children: React.ReactNode;
}

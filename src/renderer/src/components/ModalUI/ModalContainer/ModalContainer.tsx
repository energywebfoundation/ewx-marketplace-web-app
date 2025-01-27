import { twMerge } from 'tailwind-merge';

export const ModalContainer = ({ className, children }: Props): JSX.Element => {
  return (
    <div
      className={twMerge(
        'w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface Props {
  className?: string;
  children: React.ReactNode;
}

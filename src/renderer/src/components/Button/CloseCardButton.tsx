import { twMerge } from 'tailwind-merge';
import { PiXBold } from 'react-icons/pi';

export const CloseCardButton = ({
  onClick,
  className,
}: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        'grid h-[24px] w-[24px] place-items-center rounded-full border border-gray-60 bg-gray-80 hover:bg-gray-70 active:bg-gray-90',
        className,
      )}
    >
      <PiXBold size={16} className="fill-gray-20" />
    </button>
  );
};

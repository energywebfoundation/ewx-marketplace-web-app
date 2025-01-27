import { PiXBold } from 'react-icons/pi';

export const CloseButton = ({ onClick }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="grid h-[40px] w-[40px] place-items-center rounded-full bg-black hover:bg-gray-95"
    >
      <PiXBold size={24} />
    </button>
  );
};

interface Props {
  onClick?: () => void;
}

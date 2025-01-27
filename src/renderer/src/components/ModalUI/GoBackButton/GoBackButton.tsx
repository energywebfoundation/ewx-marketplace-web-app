import { PiArrowLeftBold } from 'react-icons/pi';

export const GoBackButton = ({ onClick }: Props): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className="grid h-[40px] w-[40px] place-items-center rounded-full bg-black p-2 hover:bg-gray-95"
    >
      <PiArrowLeftBold size={16} />
    </button>
  );
};

interface Props {
  onClick: () => void;
}

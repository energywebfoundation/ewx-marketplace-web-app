import clsx from 'clsx';

export const WalletButton = ({ isSelected, disabled, onSelect, children }: Props): JSX.Element => {
  return (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={clsx({
        'group relative rounded-lg bg-gray-90/90  p-0.5': true,
        'bg-gradient-to-b from-brand to-teal': isSelected,
      })}
    >
      {/* Disabled overlay */}
      <div
        className={clsx({
          'absolute left-0 top-0 grid h-full w-full place-items-center rounded-lg bg-gray-80/70':
            true,
          hidden: !disabled,
        })}
      >
        <p className="whitespace-nowrap rounded-sm bg-gray-20 px-2 py-1 text-sm uppercase text-gray-95">
          Not available
        </p>
      </div>
      {/* Content */}
      <div
        className={clsx({
          'flex h-full flex-col items-center justify-between gap-4 rounded-[14px] bg-gray-80 p-6 shadow-sunken':
            true,
          'bg-gray-90': isSelected,
          'group-hover:bg-gray-90': !disabled,
        })}
      >
        {children}
      </div>
    </button>
  );
};

interface Props {
  isSelected: boolean;
  disabled?: boolean;
  onSelect: () => void;
  children: JSX.Element | JSX.Element[];
}

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PiCheckBold, PiPowerBold } from 'react-icons/pi';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';

export const ExperimentalModeToggle = (): React.ReactNode => {
  const { isExperimental, toggleExperimental } = useExperimentalMode();

  return (
    <button
      onClick={toggleExperimental}
      className={clsx({
        'relative flex h-[32px] w-[64px] items-center justify-between rounded-full px-3 transition-all duration-300':
          true,
        'bg-green': isExperimental,
        'bg-red': !isExperimental,
      })}
    >
      <span
        className={twMerge(
          clsx({
            'absolute top-1/2 h-[28px] w-[28px] -translate-y-1/2 rounded-full transition-all duration-300':
              true,
            'left-[calc(100%-2px)] -translate-x-full bg-gray-70': isExperimental,
            'left-0.5 bg-white': !isExperimental,
          }),
        )}
      />
      <PiCheckBold size={16} className="fill-gray-90" />
      <PiPowerBold size={16} className="fill-white" />
    </button>
  );
};

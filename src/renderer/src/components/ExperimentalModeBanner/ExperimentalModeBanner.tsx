import { useState } from 'react';
import { PiWarning, PiXBold } from 'react-icons/pi';
import clsx from 'clsx';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';
import { CloseCardButton } from '@ewf/components/Button/CloseCardButton';

const EXPERIMENTAL_MODE_COLLAPSED_KEY = 'experimentalModeCollapsed';

export const ExperimentalModeBanner = () => {
  const isDefaultCollapsed = localStorage.getItem(EXPERIMENTAL_MODE_COLLAPSED_KEY);
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed === 'true');
  const { isExperimental } = useExperimentalMode();

  if (!isExperimental) return null;

  const collapse = () => {
    localStorage.setItem(EXPERIMENTAL_MODE_COLLAPSED_KEY, 'true');
    setIsCollapsed(true);
  };
  const expand = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      localStorage.setItem(EXPERIMENTAL_MODE_COLLAPSED_KEY, 'false');
    }
  };

  // Both max width/height and border radius are set to 48px instead of 100% to make animation smoother.
  // The 48px value comes from the width/height of the collapsed banner.
  return (
    <div
      onClick={expand}
      className={clsx({
        'fixed bottom-4 right-4 z-30 bg-gray-80 text-white shadow-md transition-all duration-300':
          true,
        'max-h-full max-w-full cursor-auto rounded-lg p-4': !isCollapsed,
        'max-h-[48px] max-w-[48px] cursor-pointer rounded-[48px] p-0': isCollapsed,
      })}
    >
      <CloseCardButton
        onClick={collapse}
        className={clsx({
          'absolute -left-2 -top-2 transition-opacity duration-300': true,
          'opacity-100': !isCollapsed,
          'opacity-0': isCollapsed,
        })}
      >
        <PiXBold size={16} className="fill-gray-20" />
      </CloseCardButton>
      <div className="flex items-stretch gap-4 transition-all">
        <div
          className={clsx({
            'grid place-items-center bg-red/10 p-3': true,
            'rounded-lg': !isCollapsed,
            'rounded-[48px]': isCollapsed,
          })}
        >
          <PiWarning size={24} className="fill-red" />
        </div>
        <div
          className={clsx({
            'flex max-w-[240px] flex-col': true,
            'text-sm opacity-100 duration-500': !isCollapsed,
            'text-[0px] opacity-0 duration-300': isCollapsed,
          })}
        >
          <span className="mb-1 font-bold uppercase">Experimental mode</span>
          <span>
            Features labeled as BETA have not been audited and may potentially result in problems.
          </span>
        </div>
      </div>
    </div>
  );
};

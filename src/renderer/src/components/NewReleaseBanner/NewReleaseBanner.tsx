import { CloseCardButton } from '@ewf/components/Button/CloseCardButton';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';
import { useNewReleaseStore } from '@ewf/stores/new-release';
import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineNewReleases } from 'react-icons/md';
import { PiXBold } from 'react-icons/pi';

const NEW_RELEASE_COLLAPSED_KEY = 'newReleaseCollapsed';

export const NewReleaseBanner = () => {
  const isDefaultCollapsed = localStorage.getItem(NEW_RELEASE_COLLAPSED_KEY);
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed === 'true');
  const { isInitialized, isExperimental } = useExperimentalMode();
  const { currentVersion, latestVersion, isNewRelease } = useNewReleaseStore();

  if (!isInitialized) return null;
  if (!isNewRelease) return null;

  const collapse = () => {
    localStorage.setItem(NEW_RELEASE_COLLAPSED_KEY, 'true');
    setIsCollapsed(true);
  };
  const expand = () => {
    if (isCollapsed) {
      setIsCollapsed(false);
      localStorage.setItem(NEW_RELEASE_COLLAPSED_KEY, 'false');
    }
  };

  // Both max width/height and border radius are set to 48px instead of 100% to make animation smoother.
  // The 48px value comes from the width/height of the collapsed banner.
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        expand();
      }}
      className={clsx({
        'fixed bottom-4 right-4 z-30 bg-gray-80 text-white shadow-md transition-all duration-300':
          !isExperimental,
        'max-h-full max-w-full cursor-auto rounded-lg p-4': !isCollapsed,
        'max-h-[48px] max-w-[48px] cursor-pointer rounded-[48px] p-0': isCollapsed,
        'fixed bottom-4 right-20 z-20 bg-gray-80 text-white shadow-md transition-all duration-300':
          isExperimental,
      })}
    >
      <CloseCardButton
        onClick={(e) => {
          e.stopPropagation();
          collapse();
        }}
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
          <MdOutlineNewReleases size={24} className="fill-green" />
        </div>
        <div
          className={clsx({
            'flex max-w-[240px] flex-col': true,
            'text-sm opacity-100 duration-500': !isCollapsed,
            'text-[0px] opacity-0 duration-300': isCollapsed,
          })}
        >
          <span className="mb-1 font-bold uppercase">New releases are available</span>
          <span>
            Please visit{' '}
            <a href="https://www.energywebx.com/#get" target="_blank" rel="noreferrer">
              https://www.energywebx.com
            </a>{' '}
            <br />
            Current version : {currentVersion}
            <br />
            Latest version : {latestVersion}
            <br />
          </span>
        </div>
      </div>
    </div>
  );
};

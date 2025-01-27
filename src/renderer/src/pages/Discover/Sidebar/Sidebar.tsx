import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PiLightningBold, PiHeartBold } from 'react-icons/pi';
import { routerConst, useDiscoverSection, Section } from '@ewf/lib/router';
import { PoweredByEW } from '@ewf/components/PoweredByEW';
import { useConnectionStore } from '@ewf/stores/connection';

export const Sidebar = (): JSX.Element => {
  const { section } = useDiscoverSection();
  const isConnected = useConnectionStore((state) => state.isConnected);

  const menuItems = [
    {
      title: 'Discover',
      icon: <PiLightningBold size={24} />,
      link: routerConst.Discover,
      section: Section.Discover,
    },
    {
      title: 'Favourites',
      icon: <PiHeartBold size={24} />,
      link: routerConst.Favourites,
      section: Section.Favourites,
      disabled: !isConnected,
    },
  ];

  const isCurrentSection = (itemSection: Section): boolean => {
    return itemSection === section;
  };

  return (
    <aside className="flex h-full w-full flex-col">
      <div className="mb-1 rounded-b-sm rounded-t-lg bg-gray-90 p-4 shadow-sm">
        <p className="text-base">EWX Marketplace</p>
      </div>
      <div className="relative flex h-full flex-col overflow-hidden rounded-b-lg rounded-t-sm bg-gray-90 p-4 shadow-sm">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.link}
              className={clsx({
                'relative z-10': true,
                'pr-0.5': isCurrentSection(item.section),
              })}
            >
              {/* Gradient border on active tab */}
              <div className="absolute right-0 z-0 h-full w-full">
                <div
                  className={clsx({
                    'h-full w-full rounded-[8px] border-r-[3px] border-transparent gradient-border':
                      isCurrentSection(item.section),
                  })}
                >
                  <div className="-mr-0.5 h-full w-full rounded-r-md"></div>
                </div>
              </div>
              <Link
                to={item.disabled ? '#' : item.link}
                className={twMerge(
                  clsx({
                    'active:rgba(161, 102, 255, 0.16) group relative z-10 flex items-center gap-3 rounded-md p-2 hover:bg-brand/5 hover:text-[#d9c2ff]':
                      true,
                    'bg-brand/20 font-bold text-sidebar-menu-active hover:bg-brand/20':
                      isCurrentSection(item.section),
                    'pointer-events-none opacity-30 hover:bg-transparent': item.disabled,
                  }),
                )}
              >
                <span
                  className={clsx({
                    'text-font-primary': !isCurrentSection(item.section),
                  })}
                >
                  {item.icon}
                </span>
                <span
                  className={clsx({
                    'font-primary-light': !isCurrentSection(item.section),
                    'font-primary-bold': isCurrentSection(item.section),
                    'text-lg': true,
                  })}
                >
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="relative z-10 flex flex-grow items-end justify-center">
          <PoweredByEW variant="white" />
        </div>
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 -mb-[150px] -ml-[273px] h-[300px] w-[800px] rounded-b-lg bg-sidebar-gradient" />
      </div>
    </aside>
  );
};

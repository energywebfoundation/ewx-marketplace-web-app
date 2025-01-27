import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { SubscriptionFlags } from '@main/entities/subscription';
import { routerConst } from '@ewf/lib/router';
import ewxFullIcon from '@ewf/assets/logos/ewx-full.svg';
import ewxFullBetaIcon from '@ewf/assets/logos/ewx-full-beta.svg';
import { TabButton } from './TabButton';
import { AlertButton } from './AlertButton';
import { Account } from './Account';
import { useConnectionStore } from '@ewf/stores/connection';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';
import { TransactionListButton } from './TransactionListButton';

export const Header = (): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const [isScroll, setIsScroll] = useState(false);
  const [lastEWXAccount, setLastEWXAccount] = useState<string | undefined>();
  const [subscriptionFlags, setSubscriptionFlags] = useState<SubscriptionFlags>();
  const isConnected = useConnectionStore((state) => state.isConnected);
  const location = useLocation();
  const currentPath = location.pathname;

  const Logo = <img src={ewxFullIcon} alt="EWX" height={24} />;
  const LogoBeta = (
    <div className="relative">
      <img src={ewxFullBetaIcon} alt="EWX" height={24} />
      <span className="absolute -top-[3px] right-[1px] font-primary-regular text-[9.5px] font-light">
        v0.0.1 BETA
      </span>
    </div>
  );

  const isActiveTab = (tabLink: string): boolean => {
    return currentPath.startsWith(tabLink);
  };

  const initAccountData = useCallback(async () => {
    setLastEWXAccount((await workerApi.getLastEWXAccount()).ewxAddress);
    setSubscriptionFlags(await workerApi.getSubscriptionFlags());
  }, [workerApi]);

  useEffect(() => {
    const onScroll = () => {
      const isCurrentScroll = window.scrollY > 0;
      const scrollIsTheSame = isCurrentScroll === isScroll;
      if (scrollIsTheSame) return;

      setIsScroll(isCurrentScroll);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [isScroll]);

  useEffect(() => {
    initAccountData();
  }, [initAccountData]);

  return (
    <header
      className={clsx({
        'sticky top-4 z-30 flex h-[64px] w-full items-center justify-between rounded-lg bg-gray-90 px-5 transition-all duration-300':
          true,
        'shadow-[0_0px_45px_25px_rgba(0,0,0,0.7)]': isScroll,
        'shadow-[0_0px_45px_25px_rgba(0,0,0,0)]': !isScroll,
      })}
    >
      <Link to={routerConst.Discover}>{isElectron() ? Logo : LogoBeta}</Link>
      <nav className="flex gap-4 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
        <TabButton tab="discover" active={isActiveTab(routerConst.Discover)} />
        <TabButton
          tab="dashboard"
          active={isActiveTab(routerConst.Dashboard)}
          disabled={!(isConnected || (lastEWXAccount && subscriptionFlags?.hasSubscription))}
        />
      </nav>
      <div className="flex items-center gap-6">
        <TransactionListButton disabled={!isConnected} />
        <AlertButton disabled={!isConnected} />
        <Account />
      </div>
    </header>
  );
};

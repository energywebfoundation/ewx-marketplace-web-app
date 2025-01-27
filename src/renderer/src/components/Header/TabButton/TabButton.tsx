import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { NeoButton } from '@ewf/components/Button';
import { routerConst } from '@ewf/lib/router';
import boltGradientIcon from '@ewf/assets/icons/bolt-gradient.svg';
import boltIcon from '@ewf/assets/icons/bolt.svg';
import walletGradientIcon from '@ewf/assets/icons/wallet-gradient.svg';
import walletIcon from '@ewf/assets/icons/wallet.svg';

export const TabButton = ({ active = false, disabled = false, tab }: Props): JSX.Element => {
  const { title, icon, link } = tabs[tab];

  return (
    <Link
      className={clsx({
        'pointer-events-none': active || disabled,
        'opacity-30': disabled,
      })}
      to={link}
    >
      <NeoButton active={active} className="flex items-center gap-2">
        {active && !disabled ? icon.active : icon.inactive}
        <span className="inline-block">{title}</span>
      </NeoButton>
    </Link>
  );
};

// This is outside of the component to infer the `tab` type from object keys
const tabs = {
  discover: {
    title: 'Discover',
    icon: {
      active: <img src={boltGradientIcon} width={32} height={32} alt="Bolt" />,
      inactive: <img src={boltIcon} width={32} height={32} alt="Bolt" />,
    },
    link: routerConst.Discover,
  },
  dashboard: {
    title: 'Dashboard',
    icon: {
      active: <img src={walletGradientIcon} width={32} height={32} alt="Wallet" />,
      inactive: <img src={walletIcon} width={32} height={32} alt="Wallet" />,
    },
    link: routerConst.Dashboard,
  },
} as const;

interface Props {
  active?: boolean;
  disabled?: boolean;
  tab: keyof typeof tabs;
}

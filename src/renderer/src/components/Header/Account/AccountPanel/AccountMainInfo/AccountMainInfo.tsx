import { useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { routerConst } from '@ewf/lib/router';
import { truncateBalance } from '@ewf/lib/utils';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Lifting } from '@ewf/components/Lifting';
import { Lowering } from '@ewf/components/Lowering';
import ewLogo from '@ewf/assets/logos/ew.svg';
import arrowUpGradientIcon from '@ewf/assets/icons/arrow-up-gradient.svg';
import arrowDownGradientIcon from '@ewf/assets/icons/arrow-down-gradient.svg';
import computerGradientIcon from '@ewf/assets/icons/computer-gradient.svg';
import { useBalanceStore } from '@ewf/stores/balance';

export const AccountMainInfo = (): React.ReactNode => {
  const [isLiftingOpen, setIsLiftingOpen] = useState(false);
  const [isLoweringOpen, setIsLoweringOpen] = useState(false);
  const balanceEWX = useBalanceStore((state) => state.balanceEWX);

  const isLoweringDisabled = false;

  return (
    <div className="mb-6 rounded-lg p-4 bg-popup-gradient">
      <SunkenBox className="mb-3 text-center">
        <div className="mb-0 flex items-center justify-center gap-2">
          <img
            src={ewLogo}
            className="rounded-full fill-white"
            width={24}
            height={24}
            alt="Energy Web Token"
          />
          <h2 className="">
            {truncateBalance(balanceEWX?.token || 0)} {balanceEWX?.symbol}
          </h2>
        </div>
      </SunkenBox>
      <div className="grid grid-cols-3 gap-1 rounded-lg">
        <ActionButton onClick={() => setIsLiftingOpen(true)} className="rounded-l-lg rounded-r-md">
          <img src={arrowUpGradientIcon} width={24} height={24} alt="Arrow up" />
          <p>Lift</p>
        </ActionButton>
        <ActionButton
          onClick={isLoweringDisabled ? () => null : () => setIsLoweringOpen(true)}
          disabled={isLoweringDisabled}
          className="relative rounded-md"
        >
          <div
            className={clsx({
              'absolute left-0 top-0 z-10 grid h-full w-full place-items-center rounded-md bg-gray-80/70':
                true,
              hidden: !isLoweringDisabled,
            })}
          />
          <img src={arrowDownGradientIcon} width={24} height={24} alt="Arrow down" />
          <p>Lower</p>
        </ActionButton>
        <Link to={routerConst.Dashboard}>
          <ActionButton className="w-full rounded-l-md rounded-r-lg">
            <img src={computerGradientIcon} width={24} height={24} alt="Computer" />
            <p>Dashboard</p>
          </ActionButton>
        </Link>
      </div>
      <Lifting isOpen={isLiftingOpen} setIsOpen={setIsLiftingOpen} />
      <Lowering isOpen={isLoweringOpen} setIsOpen={setIsLoweringOpen} />
    </div>
  );
};

const ActionButton = ({ className, onClick, disabled, children }: Props): JSX.Element => {
  const elementClassName = twMerge(
    'flex flex-col items-center justify-between gap-2 bg-gray-90 py-2 text-sm text-teal shadow hover:bg-gray-80 hover:outline hover:outline-1 hover:outline-brand active:bg-gray-95',
    className,
  );

  return (
    <button
      onClick={onClick ? onClick : undefined}
      className={clsx({
        [elementClassName]: true,
        'cursor-not-allowed hover:bg-gray-90 hover:!outline-none active:bg-gray-90': disabled,
      })}
      disabled={disabled}
      title={disabled ? 'Not available' : undefined}
    >
      {children}
    </button>
  );
};

interface Props {
  className?: string;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

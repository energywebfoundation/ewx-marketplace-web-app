import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type Operation } from '@main/entities/operation';
import triangleTealIcon from '@ewf/assets/icons/triangles-teal.svg';

export const TransactionProgress = ({ operation, step = 'confirm' }: Props): JSX.Element => {
  const operationDict: Record<Operation, string> = {
    lifting: 'Lifting',
    lowering: 'Lowering',
    staking: 'Subscribing',
    'operator-signup': 'Sign Up',
    'link-worker': 'Link Worker',
    'claim-reward': 'Claim Rewards',
    unsubscribing: 'Unsubscribing',
    'top-up-staking': 'Top-Up',
    'unlink-worker': 'Unlink Worker',
  };
  const operationText = operationDict[operation];
  const statusText = (() => {
    if (step === 'failure') return 'Failed';
    if (operation === 'lifting' || operation === 'lowering') return 'Scheduled';
    return 'Success';
  })();

  return (
    <div className="relative mb-6 grid h-[40px] w-full grid-cols-[140px_140px] justify-center gap-[48px] overflow-hidden rounded-full bg-gray-95">
      {/* Center arrows */}
      <Arrow className="left-1/2 -ml-[32px] -translate-x-1/2 bg-teal" />
      <Arrow
        className={clsx({
          'left-1/2 ml-[32px] -translate-x-1/2': true,
          'bg-transparent': step === 'confirm',
          'bg-gradient-to-tr from-teal from-45% to-gray-95 to-45%': step !== 'confirm',
        })}
      />
      <div className="z-1 relative mr-2 flex items-center justify-end bg-gradient-to-r from-brand to-teal">
        {/* Left arrow */}
        <Arrow className="left-0 -ml-[28px] bg-gray-95" />
        <p className="flex w-full max-w-[98px] justify-center text-center text-base text-gray-95">
          {operationText}
        </p>
      </div>
      <div
        className={twMerge(
          clsx({
            'relative flex items-center justify-start text-gray-95': true,
            'text-font-subtler': step === 'confirm',
            'bg-gradient-to-r from-teal from-10%': step === 'executing',
            'bg-gradient-to-r from-teal from-10% to-brand': step === 'success',
            'bg-gradient-to-r from-teal to-red to-60%': step === 'failure',
          }),
        )}
      >
        {/* Right arrow */}
        <Arrow className="right-0 -mr-[28px] bg-gray-95" />
        <p
          className={clsx({
            'ml-3 flex w-full max-w-[98px] justify-center text-center text-base': true,
            'text-font-subtler': step === 'confirm',
            'text-gray-95': step !== 'confirm',
          })}
        >
          {statusText}
        </p>
      </div>
      <img
        src={triangleTealIcon}
        height={40}
        alt="Triangle"
        className={clsx({
          'absolute left-1/2 -translate-x-1/2': true,
          hidden: step === 'confirm',
          'animate-pulse': step === 'executing',
        })}
      />
    </div>
  );
};

interface Props {
  operation: Operation;
  step?: 'confirm' | 'executing' | 'success' | 'failure';
}

const Arrow = ({ className }: ArrowProps) => {
  return (
    <div
      className={clsx({
        '-z-1 absolute top-1/2 h-[40px] w-[40px] -translate-y-1/2 rotate-45': true,
        [className as string]: true,
      })}
    />
  );
};

interface ArrowProps {
  className?: string;
}

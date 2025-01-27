import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import claimRewardsIcon from '@ewf/assets/icons/claim-rewards.svg';

export const ClaimRewardsCard = ({ disabled = false, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={disabled ? 'No rewards to claim' : 'Claim Rewards'}
      className={twMerge(
        clsx({
          'group flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60':
            true,
          'opacity-40': disabled,
        }),
        className,
      )}
    >
      <p className="pb-3 pt-1 text-sm text-font-subtler">Claim Rewards</p>
      <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
        <div className="group-after:bg-button-gray-gradient absolute flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
          <img src={claimRewardsIcon} width={28} height={28} alt="claimRewardsIcon" />
        </div>
      </div>
    </button>
  );
};

interface Props {
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

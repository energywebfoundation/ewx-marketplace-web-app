import { useState } from 'react';
import solutionGroupIcon from '@ewf/assets/icons/solution-group.svg';
import { truncateBalance, parseAmount } from '@ewf/lib/utils';
import { ClaimReward } from '@ewf/components/ClaimReward';
import { ClaimRewardsCard } from '../ClaimRewardsCard';
import { ExpiredChip } from '@ewf/components/Chips/ExpiredChip';
import { WalletApi } from '@ewf/types/api';

export const UnclaimedRewardList = ({
  unclaimedReward,
  ewtusd,
  isExpired = false,
  reloadUnclaimedRewards,
}: UnclaimedRewardListProps): JSX.Element => {
  const [isClaimRewardOpen, setIsClaimRewardOpen] = useState(false);

  const { groupName, totalReward, groupNamespace } = unclaimedReward;
  const parsedTotalReward = parseAmount(totalReward.toString()) || '0';
  const truncatedBalance = truncateBalance(parsedTotalReward);
  const usdBalance = truncateBalance(parseFloat(parsedTotalReward) * ewtusd);

  return (
    <div>
      <ClaimReward
        namespace={groupNamespace}
        isOpen={isClaimRewardOpen}
        setIsOpen={setIsClaimRewardOpen}
        onSuccess={reloadUnclaimedRewards}
      />
      <div className="mb-1 flex justify-between gap-2 rounded-b-sm rounded-t-lg border-l-4 border-teal bg-gray-90 p-4 shadow-sm">
        <div className="flex flex-row items-center gap-4">
          <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
            <img src={solutionGroupIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
          </div>
          <div className="mr-4 flex flex-shrink-0 items-center gap-4">
            <p className="max-w-[240px] break-words text-lg">{groupName}</p>
            {isExpired ? <ExpiredChip /> : null}
          </div>
        </div>
      </div>
      <div className="grid w-full max-w-[832px] grid-cols-3 gap-4 rounded-b-lg rounded-t-sm bg-gray-90 p-4 shadow-sm">
        <div className="col-span-2 flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
          <p className="mb-2 text-sm text-font-subtler">Pending Rewards</p>
          <div className="flex h-full w-full flex-col items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
            <h2 className="mb-1 max-w-[200px] truncate font-primary-bold text-xl text-gradient">
              {truncatedBalance < 0.0001 ? '< 0.0001' : truncatedBalance}
            </h2>
            <p className="text-font-subtler">
              {usdBalance < 0.0001 ? ' < 0.0001' : usdBalance} USD
            </p>
          </div>
        </div>
        <ClaimRewardsCard className="pb-[18px]" onClick={() => setIsClaimRewardOpen(true)} />
      </div>
    </div>
  );
};
export interface UnclaimedRewardListProps {
  ewtusd: number;
  unclaimedReward: WalletApi.UnclaimedRewards;
  isExpired: boolean;
  reloadUnclaimedRewards: () => void;
}

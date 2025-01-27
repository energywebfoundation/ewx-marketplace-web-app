import PlaygroundIcon from '@ewf/assets/icons/playground-icon.svg';
import ArrowLeftButton from '@ewf/assets/icons/arrow-left.svg';
import { ActiveChip } from '@ewf/components/Chips/ActiveChip';
import { BetaChip } from '@ewf/components/Chips/BetaChip';
import claimRewardsIcon from '@ewf/assets/icons/claim-rewards.svg';
import playIcon from '@ewf/assets/icons/play.svg';
import clockClockwise from '@ewf/assets/icons/clock-clockwise.svg';
import questionMark from '@ewf/assets/icons/question.svg';

export const PlaygroundHeader = (): JSX.Element => {
  return (
    <div className="mb-1 flex justify-between rounded-b-sm rounded-t-lg border-l-4 border-teal bg-gray-90 p-4 shadow-sm">
      <div className="flex flex-row items-center gap-4">
        <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
          <img src={PlaygroundIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
        </div>
        <div className="flex flex-shrink-0 flex-row items-center gap-4">
          <p className="max-w-[240px] break-words text-lg">Playground</p>
          <ActiveChip />
          <BetaChip />
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <div className="flex flex-row items-center gap-3">
          <p className="text-sm">Manage Solution Group</p>
          <img src={ArrowLeftButton} width={24} height={24} alt="GalaxySubscriptionIcon" />
        </div>
        <div className="flex flex-row items-center gap-3">
          <p className="text-sm">Manage Subscription</p>
          <img src={ArrowLeftButton} width={24} height={24} alt="GalaxySubscriptionIcon" />
        </div>
      </div>
    </div>
  );
};

const CircularProgress = (): JSX.Element => {
  return (
    <svg width="64px" height="64px">
      <defs>
        <linearGradient id="GradientColor">
          <stop offset="18.54%" stopColor="#A566FF" />
          <stop offset="100%" stopColor="#15E8FF" />
        </linearGradient>
      </defs>
      <circle
        fill="none"
        stroke="url(#GradientColor)"
        strokeWidth="5px"
        strokeDasharray="165"
        strokeDashoffset="130"
        cx="32"
        cy="32"
        r="26"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Playground = (): JSX.Element => {
  return (
    <div className="w-full max-w-[832px]">
      <PlaygroundHeader />
      <div className="grid grid-cols-2 gap-4 rounded-b-lg rounded-t-sm bg-gray-90 px-4 py-4 shadow-sm">
        <div className="flex flex-row gap-4">
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            {/* Due to Apple completeness policy we cannot include on the code any term that indicates it is not completed*/}
            {/* Not available overlay */}
            <div className="absolute left-0 top-0 z-30 grid h-full w-full place-items-center rounded-sm bg-gray-90/80">
              <p className="z-20 whitespace-nowrap rounded-sm bg-gray-20 px-2 py-1 text-sm uppercase text-gray-95">
                Not available
              </p>
            </div>
            <div className="absolute right-2 top-2 z-10 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-95">
              <img src={clockClockwise} width={11} height={11} alt="clockClockwise" />
            </div>
            <p className="mb-2 text-sm text-font-subtler">APY</p>

            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full grayscale bg-dark-gradient">
              <CircularProgress />
              <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-gradient">
                <p>9%</p>
              </div>
            </div>
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <p className="mb-2 text-sm text-font-subtler">Claim Rewards</p>

            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
              <CircularProgress />
              <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-gradient">
                <img src={claimRewardsIcon} width={28} height={28} alt="claimRewardsIcon" />
              </div>
            </div>
          </div>
          <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
            <div className="absolute right-2 top-2 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-95">
              <img src={questionMark} width={11} height={11} alt="clockClockwise" />
            </div>
            <p className="mb-2 text-sm text-font-subtler">Pause</p>

            <div className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
              <CircularProgress />
              <div className="absolute flex h-[40px] w-[40px] items-center justify-center rounded-full bg-gray-gradient">
                <img src={playIcon} width={28} height={28} alt="playIcon" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker gradient-border-dark-with-gray-85">
          <p className="mb-2 text-sm text-font-subtler">EWT Subscription Amount</p>
          <div className="flex h-full w-full items-center justify-center rounded-md px-6 py-3 text-center bg-dark-gradient">
            <h2 className="font-primary-bold text-xl text-gradient">10.000</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

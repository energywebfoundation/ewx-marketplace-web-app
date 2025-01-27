import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PiArrowLeftBold } from 'react-icons/pi';
import { routerConst } from '@ewf/lib/router';
import { Button } from '@ewf/components/Button';
import { Staking } from '@ewf/components/Staking';
import { Tooltip } from '@ewf/components/Tooltip';
import chartUpIcon from '@ewf/assets/icons/chart-up.svg';
import roundedCornerIcon from '@ewf/assets/icons/rounded-corner.svg';
import { GenericChip } from '@ewf/components/Chips/GenericChip';
import { UnsubscriptionDelayChip } from '@ewf/components/Chips/UnsubscriptionDelayChip';
import cloudsImage from '@ewf/assets/images/clouds.png';
import { useConnectionStore } from '@ewf/stores/connection';
import { useRemoteResourcesStore } from '@ewf/stores/remote-resources';
import { useApiServiceStore } from '@ewf/stores/api';
import windTurbineImage from '@ewf/assets/images/wind-turbine-long.png';
import questionMarkIcon from '@ewf/assets/icons/question.svg';
import { WorkerApi } from '@ewf/types/api';
import { GENERIC_CHIP_COLOR } from '@ewf/types/enums';

export const WorkerCardLarge = (props: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const { workerId, namespace, name, minStakingAmount, maxStakingAmount, status, withdrawalDelay } =
    props;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const [isStakingOpen, setIsStakingOpen] = useState(false);
  const [isStakedState, setIsStakedState] = useState(false);
  const [stakeStatusLoading, setStakeStatusLoading] = useState(true);
  const fetchBlacklistedSolutionGroups = useRemoteResourcesStore(
    (state) => state.fetchBlacklistedSolutionGroups,
  );
  const fetchWorkerCardImages = useRemoteResourcesStore((state) => state.fetchWorkerCardImages);

  const stake = () => {
    setIsStakingOpen(true);
  };

  const checkStakingStatus = useCallback(async () => {
    const EWXAddress = (await workerApi.getLastEWXAccount()).ewxAddress;
    if (EWXAddress) {
      const isStaked = await workerApi.isStakingTo(namespace, EWXAddress);
      setIsStakedState(isStaked);
    }
    setStakeStatusLoading(false);
  }, [namespace]);

  const buttonStatus = (() => {
    if (stakeStatusLoading) {
      return 'loading';
    }

    if (isStakedState) {
      return 'staked';
    }

    if (status === 'expired') {
      return 'expired';
    }

    if (isConnected) {
      return 'opt-in';
    }

    return 'connect';
  })();

  useEffect(() => {
    checkStakingStatus();
  }, [checkStakingStatus]);

  useEffect(() => {
    fetchBlacklistedSolutionGroups();
    fetchWorkerCardImages();
  }, [fetchBlacklistedSolutionGroups, fetchWorkerCardImages]);

  return (
    <>
      <WorkerCardLargeView {...props} buttonStatus={buttonStatus} onStake={stake} />
      <Staking
        workerId={workerId}
        workerName={name}
        namespace={namespace}
        withdrawalDelay={withdrawalDelay}
        isOpen={isStakingOpen}
        setIsOpen={setIsStakingOpen}
        setIsStaked={setIsStakedState}
        amounts={{
          min: minStakingAmount,
          max: maxStakingAmount,
        }}
      />
    </>
  );
};

export interface Props {
  workerId: WorkerApi.WorkerId;
  workerName: string;
  namespace: string;
  category: string;
  name: string;
  description: string;
  subTitle: string;
  subDescription: string;
  progress: number;
  isInstalled?: boolean;
  isStaked: boolean;
  minStakingAmount?: string;
  maxStakingAmount?: string;
  hasOperatorsAllowlist: boolean;
  status: WorkerApi.SolutionGroupStatus;
  withdrawalDelay: number;
}

export const WorkerCardLargeView = (props: WorkerCardLargeViewProps): JSX.Element => {
  const {
    workerId,
    category,
    name,
    description,
    subTitle,
    subDescription,
    hasOperatorsAllowlist,
    buttonStatus,
    withdrawalDelay,
    onStake,
  } = props;
  const blacklistedSolutions = useRemoteResourcesStore((state) => state.blacklistedWorkers);
  const { large: workerCardImages } = useRemoteResourcesStore((state) => state.workerCardImages);
  const isBlackListed = blacklistedSolutions.includes(workerId.toLowerCase());
  const isPrivate = hasOperatorsAllowlist && isBlackListed;
  const backgroundImage = workerCardImages[workerId.toLowerCase()] || windTurbineImage;

  const renderActionButton = (): JSX.Element => {
    if (buttonStatus === 'loading') {
      return (
        <Button disabled size="small" className="w-[145px] bg-button-gradient">
          Loading...
        </Button>
      );
    }

    if (buttonStatus === 'staked') {
      return (
        <Link to={routerConst.Dashboard}>
          <Button size="small" className="w-[145px] bg-button-gradient">
            Manage
          </Button>
        </Link>
      );
    }

    if (buttonStatus === 'expired') {
      return (
        <Button disabled size="small" className="w-[145px] bg-button-gradient">
          Expired
        </Button>
      );
    }

    return (
      <Button onClick={onStake} size="small" className="w-[145px] bg-button-gradient">
        {buttonStatus === 'opt-in' ? 'Opt-in' : 'Connect'}
      </Button>
    );
  };

  return (
    <section
      style={{ backgroundImage: `url(${cloudsImage})` }}
      className="h-[calc(100vh-128px)] max-h-[656px] w-full rounded-lg bg-cover bg-no-repeat"
    >
      <div className="relative flex h-full w-full flex-col rounded-lg bg-worker-gradient">
        <div className="absolute left-0 top-0 z-0 h-full w-full rounded-b-lg rounded-t-md bg-cover bg-right-bottom bg-no-repeat" />
        <img
          className="absolute bottom-0 right-0 h-[calc(100vh-128px)] max-h-[656px] rounded-bl-lg rounded-br-lg object-cover"
          src={backgroundImage}
          onError={(e) => (e.currentTarget.src = windTurbineImage)}
          alt="Solution group card"
          referrerPolicy="same-origin"
        />
        <Link
          to={routerConst.Discover}
          className="relative mb-6 ml-4 mt-4 grid min-h-[32px] w-[32px] place-items-center rounded-full bg-white text-black"
        >
          <PiArrowLeftBold size={16} />
        </Link>
        <Link
          to={routerConst.Dashboard}
          className="absolute right-4 top-4 h-[64px] w-[64px] rounded-lg border border-brand bg-violet-darker hover:bg-brand"
        >
          <span className="relative grid h-full w-full place-content-center">
            <img src={chartUpIcon} width={32} height={32} alt="Chart" />
            <img
              src={roundedCornerIcon}
              width={14}
              height={14}
              alt="Corner"
              className="absolute bottom-1.5 left-1.5"
            />
          </span>
        </Link>
        <div className="ml-4 mt-4 flex flex-grow overflow-y-hidden">
          <div className="via-black-50 flex h-min max-h-full w-3/5 max-w-[310px] flex-col rounded-lg bg-gradient-to-b from-black/60 to-black/30 p-6 shadow-lg backdrop-blur">
            {withdrawalDelay > 0 && (
              <div className="mb-6 flex">
                <UnsubscriptionDelayChip />
                <Tooltip
                  side="bottom"
                  content={
                    <div className="max-w-[120px] p-2">{`Unsubscribe will be effective after ${withdrawalDelay} block(s).`}</div>
                  }
                >
                  <div className="ml-2 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-100">
                    <img src={questionMarkIcon} width={11} height={11} alt="more info" />
                  </div>
                </Tooltip>
              </div>
            )}
            <p className="mb-3 text-sm uppercase">{category}</p>
            <h2 className="mb-3 font-primary">{name}</h2>
            <p className="-mr-3 mb-6 overflow-y-auto pr-3 text-base">{description}</p>
            <div className="flex flex-col gap-2">
              {isPrivate ? (
                <GenericChip label="PRIVATE" color={GENERIC_CHIP_COLOR.White} />
              ) : (
                renderActionButton()
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 rounded-lg bg-black/50 p-8 backdrop-blur">
          <h3 className="mb-2 font-bold">{subTitle}</h3>
          <p className="text-font-subtle">{subDescription}</p>
        </div>
      </div>
    </section>
  );
};

export interface WorkerCardLargeViewProps extends Props {
  buttonStatus: 'loading' | 'staked' | 'expired' | 'opt-in' | 'connect';
  onStake?: () => void;
}

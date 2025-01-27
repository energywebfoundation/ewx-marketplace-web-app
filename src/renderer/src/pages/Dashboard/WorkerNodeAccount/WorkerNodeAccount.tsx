import { useEffect, useState } from 'react';
import { PiGear, PiCheckBold, PiUploadSimple, PiLinkBreak } from 'react-icons/pi';
import clsx from 'clsx';
import * as Switch from '@radix-ui/react-switch';
import { twMerge } from 'tailwind-merge';
import { truncateAddress, copyTextToClipboard } from '@ewf/lib/utils';
import { useWorkerExecutionStore, WorkerExecutionStatus } from '@ewf/stores/worker-execution';
import { useDeepLink } from '@ewf/stores/deep-link';
import { RevealSeedPhrase } from '@ewf/components/Header/Account/AccountPanel/RevealSeedPhrase';
import { UnlinkAccount } from '@ewf/components/Header/Account/AccountPanel/UnlinkAccount';
import { Button } from '@ewf/components/Button';
import galaxySubscriptionIcon from '@ewf/assets/icons/galaxy-subscription-icon.svg';
import copyIcon from '@ewf/assets/icons/copy.svg';
import computerWhiteIcon from '@ewf/assets/icons/computer-white.svg';
import computerPurpleIcon from '@ewf/assets/icons/computer-purple.svg';
import serverWhiteIcon from '@ewf/assets/icons/server-white.svg';
import serverPurpleIcon from '@ewf/assets/icons/server-purple.svg';
import { SetWorkerNodeAccount } from './SetWorkerNode';
import { SetLocalWorkerAccount } from './SetLocalWorkerAccount';
import { SetRemoteWorkerAccount } from './SetRemoteWorkerAccount';
import { useApiServiceStore } from '@ewf/stores/api';
import { AlertDialog } from '@ewf/components/AlertDialog';
import { isElectron } from '@main/helpers/is-electron';

export const WorkerNodeAccount = ({
  workerAddress,
  onUpdated,
  workerLinkedToEwx,
  isLoaded,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [isCopied, setIsCopied] = useState(false);
  const [isSetWorkerAccountOpen, setIsSetWorkerAccountOpen] = useState(false);
  const [isRevealSeedPhraseOpen, setIsRevealSeedPhraseOpen] = useState(false);
  const [isUnlinkOpen, setIsUnlinkOpen] = useState(false);
  const [isSetLocalWorkerAccountOpen, setIsSetLocalWorkerAccountOpen] = useState(false);
  const [isSetRemoteWorkerAccountOpen, setIsSetRemoteWorkerAccountOpen] = useState(false);
  const [isSetRemoteWorkerAlertOpen, setIsSetRemoteWorkerAlertOpen] = useState(false);
  const [isWorkerAlreadyLinkAlertOpen, setIsWorkerAlreadyLinkAlertOpen] = useState(false);
  const workerExecution = useWorkerExecutionStore((state) => state.status);
  const deepLink = useDeepLink((state) => state.deepLink);
  const deepLinkWorkerAddress = useDeepLink((state) => state.value);

  const copyAddress = () => {
    setIsCopied(true);
    copyTextToClipboard(workerAddress);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const toggleWorkerExecution = () => {
    const newValue: WorkerExecutionStatus = workerExecution === 'local' ? 'remote' : 'local';

    newValue === 'local'
      ? setIsSetLocalWorkerAccountOpen(true)
      : setIsSetRemoteWorkerAccountOpen(true);
  };

  useEffect(() => {
    const remoteWorkerFromDeepLink = async () => {
      if (!deepLink || !deepLinkWorkerAddress) {
        return;
      }

      const linkStatus = await workerApi.workerEWXLinkStatus(deepLinkWorkerAddress);

      if (linkStatus === 'linked-to-other-worker') {
        setIsSetRemoteWorkerAccountOpen(true);
        return;
      }

      if (linkStatus === 'linked-to-current-worker') {
        workerAddress === deepLinkWorkerAddress
          ? setIsWorkerAlreadyLinkAlertOpen(true)
          : setIsSetRemoteWorkerAlertOpen(true);

        useDeepLink.setState({ deepLink: undefined, value: undefined });
        return;
      }

      if (linkStatus === 'not-linked') {
        setIsSetRemoteWorkerAccountOpen(true);
        useDeepLink.setState({ deepLink: undefined });
      }
    };

    if (!isLoaded) return;

    remoteWorkerFromDeepLink();
  }, [deepLink, workerAddress, deepLinkWorkerAddress, isLoaded, workerApi]);

  return (
    <div className="w-full">
      <SetWorkerNodeAccount
        currentExecution={workerAddress ? workerExecution : undefined}
        isOpen={isSetWorkerAccountOpen}
        setIsOpen={(isOpen) => {
          setIsSetWorkerAccountOpen(isOpen);
          onUpdated();
        }}
      />
      <RevealSeedPhrase isOpen={isRevealSeedPhraseOpen} setIsOpen={setIsRevealSeedPhraseOpen} />
      <UnlinkAccount
        isOpen={isUnlinkOpen}
        setIsOpen={(isOpen) => {
          setIsUnlinkOpen(isOpen);
          onUpdated();
        }}
      />
      <SetLocalWorkerAccount
        isOpen={isSetLocalWorkerAccountOpen}
        setIsOpen={(isOpen) => {
          setIsSetLocalWorkerAccountOpen(isOpen);
          onUpdated();
        }}
        isSwitching={Boolean(workerAddress) && workerExecution === 'remote'}
      />
      <SetRemoteWorkerAccount
        isOpen={isSetRemoteWorkerAccountOpen}
        setIsOpen={(isOpen) => {
          setIsSetRemoteWorkerAccountOpen(isOpen);
          onUpdated();
        }}
        isSwitching={Boolean(workerAddress) && workerExecution === 'local'}
      />
      <AlertDialog
        open={isSetRemoteWorkerAlertOpen}
        onOpenChange={setIsSetRemoteWorkerAlertOpen}
        title="Set new worker account"
        description="The current imported worker account is not linked to your operator account. Do you want to remove it and set a new one based on the link provided?"
        action={() => setIsSetRemoteWorkerAccountOpen(true)}
      />
      <AlertDialog
        open={isWorkerAlreadyLinkAlertOpen}
        onOpenChange={setIsWorkerAlreadyLinkAlertOpen}
        title="Worker already linked"
        description="The worker account provided on the url is already linked to this operator account"
      />
      {/* Header */}
      <section className="mb-1 flex justify-between rounded-b-sm rounded-t-lg border-l-4 border-teal bg-gray-90 p-4 shadow-sm">
        <div className="flex flex-row items-center gap-3">
          <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
            <img src={galaxySubscriptionIcon} width={16} height={16} alt="GalaxySubscriptionIcon" />
          </div>
          <div>
            <p className="text-lg">Worker Node Account</p>
          </div>
        </div>
      </section>
      {/* Body */}
      <section
        className={clsx({
          'mb-1 rounded-t-sm bg-gray-90 p-4 shadow-sm': true,
          'rounded-b-sm': workerAddress,
          'rounded-b-lg': !workerAddress,
        })}
      >
        {workerAddress ? (
          <div className="flex h-full w-full flex-col justify-center gap-2 rounded-md border-2 border-transparent p-2 shadow-darker gradient-border-dark-with-gray-85">
            <p className="ml-1 text-sm text-font-subtle">Worker Node Address</p>
            <div className="flex w-full items-center justify-center gap-3 rounded-md border-[1px] border-transparent py-3 pl-2 text-center text-sm text-white shadow-sunken gradient-border-secondary-with-gray-90">
              <span>{truncateAddress(workerAddress, 8)}</span>

              <Button onClick={copyAddress} className="flex p-1">
                {isCopied ? (
                  <PiCheckBold size={16} />
                ) : (
                  <img src={copyIcon} width={16} height={16} alt="CopyIcon" />
                )}
              </Button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="mt-4 space-y-4">
          {!workerAddress && (
            <button
              onClick={() => setIsSetWorkerAccountOpen(true)}
              className="flex w-full items-center justify-between rounded-md border-2 border-transparent px-4 py-[10px] text-font-subtle shadow-darker gradient-border-dark-with-gray-85 hover:bg-gray-70"
            >
              Set Worker Account
              <PiGear
                color="#fff"
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-brand p-1"
              />
            </button>
          )}
          <button
            onClick={() => setIsRevealSeedPhraseOpen(true)}
            className={clsx({
              'flex w-full items-center justify-between rounded-md border-2 border-transparent px-4 py-[10px] text-font-subtle shadow-darker gradient-border-dark-with-gray-85 hover:bg-gray-70':
                true,
              hidden: !workerAddress || workerExecution !== 'local',
            })}
          >
            Export Account
            <PiUploadSimple
              color="#fff"
              className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-brand p-[5px]"
            />
          </button>
          {workerAddress && (
            <button
              onClick={() => setIsUnlinkOpen(true)}
              className={clsx({
                'flex w-full items-center justify-between rounded-md border-2 border-transparent px-4 py-[10px] text-font-subtle shadow-darker gradient-border-dark-with-gray-85 hover:bg-gray-70':
                  true,
                hidden: !workerLinkedToEwx,
              })}
            >
              Unlink
              <PiLinkBreak
                color="#fff"
                className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-brand p-[5px]"
              />
            </button>
          )}
        </div>
      </section>
      {/* Footer */}
      <section
        className={clsx({
          'rounded-b-lg rounded-t-sm bg-gray-90 p-4 shadow-sm': true,
          hidden: !workerAddress,
        })}
      >
        <div className="flex h-full w-full flex-col justify-center gap-2 rounded-md border-2 border-transparent p-2 shadow-darker gradient-border-dark-with-gray-85">
          <p className="ml-1 text-sm text-font-subtle">
            {workerExecution === 'local'
              ? 'Select Where to Run Worker Node'
              : 'Worker Node Location'}
          </p>
          <div className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-4 text-center text-sm text-white shadow-sunken bg-dark-gradient">
            <span>{workerExecution === 'local' ? 'In this machine' : 'On remote server'}</span>
            <Switch.Root
              value={workerExecution}
              onCheckedChange={toggleWorkerExecution}
              disabled={!isElectron()}
              className="relative flex h-[32px] w-[60px] items-center justify-between rounded-full bg-brand px-2 transition-all duration-300"
            >
              <Switch.Thumb
                className={twMerge(
                  clsx({
                    'absolute top-1/2 grid h-[28px] w-[28px] -translate-y-1/2 place-items-center rounded-full bg-white shadow-sm transition-all duration-300':
                      true,
                    'left-0.5': workerExecution === 'local',
                    'left-[calc(100%-2px)] -translate-x-full': workerExecution === 'remote',
                  }),
                )}
              >
                <img
                  src={workerExecution === 'local' ? computerPurpleIcon : serverPurpleIcon}
                  width={workerExecution === 'local' ? 20 : 18}
                  height="auto"
                  alt="local"
                />
              </Switch.Thumb>
              <img src={computerWhiteIcon} width={18} height="auto" alt="local" />
              <img src={serverWhiteIcon} width={16} height="auto" alt="remote" />
            </Switch.Root>
          </div>
        </div>
      </section>
    </div>
  );
};

interface Props {
  workerAddress: string;
  onUpdated: () => void;
  workerLinkedToEwx: boolean;
  isLoaded: boolean;
}

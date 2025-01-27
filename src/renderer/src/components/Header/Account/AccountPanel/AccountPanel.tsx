import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PiCaretRightBold } from 'react-icons/pi';
import clsx from 'clsx';
import * as Dialog from '@ewf/components/Dialog';
import { Spinner } from '@ewf/components/Spinner';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { ConnectWalletButton } from './ConnectWalletButton';
import { DisconnectWalletButton } from './DisconnectWalletButton';
import { AccountMainInfo } from './AccountMainInfo';
import { ExperimentalModeToggle } from './ExperimentalModeToggle';
import { SocialNetworkLink } from './SocialNetworkLinks';
import { EnvSelector } from './EnvSelector';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';
import { useConnectionStore } from '@ewf/stores/connection';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { isElectron } from '@main/helpers/is-electron';
import { useApiServiceStore } from '@ewf/stores/api';

type ExportedLogs = { isOpen: boolean; status: 'success' | 'error' };

export const AccountPanel = ({ isConnected, connectWallet }: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [isEnvChanging, setIsEnvChanging] = useState(false);
  const [exportedLogs, setExportedLogs] = useState<ExportedLogs>({
    isOpen: false,
    status: 'success',
  });
  const env = useWalletEnvStore((state) => state.env);
  const disconnect = useConnectionStore((state) => state.disconnect);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const isExperimental = useExperimentalMode((state) => state.isExperimental);
  const isTestVersion = useExperimentalMode((state) => state.isTestVersion);
  const shouldShowEnvSelector = isElectron() && isExperimental && isTestVersion;

  const onEnvChanged = () => {
    setIsEnvChanging(true);
  };

  const onEnvChangeFailed = () => {
    setIsEnvChanging(false);
  };

  // If 'disconnect()' function takes more than 0.5 seconds, show the disconnecting animation
  // Weather the disconnecting animation is shown or not, it will be set to false after the
  // disconnect() function is finished, and the timeout is cleared.
  const disconnectWallet = async () => {
    const DELAY_UNTIL_ANIMATION = 500;
    const timeoutId = setTimeout(() => {
      // Only show the disconnecting animation if the user is connected
      // Otherwise, the animation will be shown after, when already disconnected
      if (isConnected) {
        setIsDisconnecting(true);
      }
    }, DELAY_UNTIL_ANIMATION);

    await disconnect();
    setIsDisconnecting(false);
    clearTimeout(timeoutId);
  };

  const exportLogs = async () => {
    try {
      const destFile = await workerApi.exportLogs();
      destFile
        ? setExportedLogs({ isOpen: true, status: 'success' })
        : setExportedLogs({ isOpen: false, status: 'success' });
    } catch (error) {
      console.error(error);
      setExportedLogs({ isOpen: true, status: 'error' });
    }
  };

  const onCloseExportLogsDialog = () => {
    setExportedLogs((previousState) => ({ ...previousState, isOpen: false }));
  };

  useEffect(() => {
    setIsEnvChanging(false);
  }, [env]);

  return (
    <div className="relative z-[100] w-[400px] rounded-lg border-2 border-transparent p-4 gradient-border-secondary-with-gray-90">
      {/* Loading wallet spinner */}
      <div
        className={clsx({
          'absolute left-0 top-0 grid h-full w-full place-items-center rounded-lg bg-gray-90/80 transition-opacity duration-300':
            true,
          'z-20 opacity-100': isDisconnecting || isEnvChanging,
          '-z-10 opacity-0': !isDisconnecting && !isEnvChanging,
        })}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{isDisconnecting ? 'Disconnecting wallet' : 'Changing environment'}</p>
          <Spinner className="h-5 w-5 text-white" />
        </div>
      </div>
      {/* Address and disconnect wallet button */}
      <div
        className={clsx({
          'relative z-10 flex items-center': true,
          'justify-between': shouldShowEnvSelector,
          'justify-end': !shouldShowEnvSelector,
          'mb-6 h-[40px]': shouldShowEnvSelector || isConnected,
        })}
      >
        {shouldShowEnvSelector ? (
          <EnvSelector onEnvChanged={onEnvChanged} onFailed={onEnvChangeFailed} />
        ) : null}
        {isConnected ? <CopyAddressButton address={addressEWX} /> : null}
        {isConnected ? <DisconnectWalletButton disconnectWallet={disconnectWallet} /> : null}
      </div>
      {isConnected ? <AccountMainInfo /> : <ConnectWalletButton connectWallet={connectWallet} />}

      <div className="mb-4 border-b border-gray-70">
        <Link to="https://discord.gg/psraNwqGqp" target="_blank">
          <div className="flex h-[46px] items-center justify-between border-t border-gray-70 px-2">
            <p className="h-fit">Create a ticket</p>
            <PiCaretRightBold size={20} />
          </div>
        </Link>
        {isElectron() && (
          <button
            onClick={exportLogs}
            className="flex h-[46px] w-full items-center justify-between border-t border-gray-70 px-2"
          >
            <p className="h-fit">Export logs</p>
            <PiCaretRightBold size={20} />
          </button>
        )}
        <div
          className={clsx({
            'flex h-[46px] items-center justify-between border-t border-gray-70 px-2': true,
            hidden: !isTestVersion,
          })}
        >
          <p className="h-fit">Experimental mode</p>
          <ExperimentalModeToggle />
        </div>
      </div>
      <SocialNetworkLink />
      <ExportLogsDialog
        isOpen={exportedLogs.isOpen}
        status={exportedLogs.status}
        onClose={onCloseExportLogsDialog}
      />
    </div>
  );
};

interface Props {
  isConnected: boolean;
  connectWallet: () => void;
}

const ExportLogsDialog = ({ isOpen, status, onClose }: ExportLogsDialogProps) => {
  const ContentComponent = status === 'success' ? TxSuccess : TxFailure;
  const title = status === 'success' ? 'Logs exported successfully' : 'Error exporting logs';

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content>
            <ContentComponent title={title} onNext={onClose} onClose={onClose} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface ExportLogsDialogProps extends ExportedLogs {
  onClose: () => void;
}

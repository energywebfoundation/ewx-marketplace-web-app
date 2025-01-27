import { useState } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { useUnlinkWorkerStore } from '@ewf/stores/unlink-worker';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useConnectionStore } from '@ewf/stores/connection';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { Confirm } from './Confirm';
import { ConnectEWXWallet } from './ConnectEWXWallet/ConnectEWXWallet';
import { formatPalletErrorMessage } from '@ewf/lib/utils';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useApiServiceStore } from '@ewf/stores/api';

type Step = 'confirm' | 'connect' | 'executing' | 'success' | 'failure';

export const UnlinkAccount = ({ isOpen, setIsOpen }: Props): JSX.Element => {
  const onClose = () => {
    setTimeout(() => setIsOpen(false), 300);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>
            <UnlinkAccountContent onClose={onClose} onSuccess={onClose} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export const UnlinkAccountContent = ({ onClose, onSuccess }: UnlinkAccountProps) => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('confirm');
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const status = useUnlinkWorkerStore((state) => state.status);
  const unlinkEWXWorker = useUnlinkWorkerStore((state) => state.unlinkWorker);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const [unlinkTxUrl, setUnlinkTxUrl] = useState('');
  const unlinkWorkerSuccessNotification = useNotificationStore(
    (state) => state.unlinkWorkerSuccessNotification,
  );
  const unlinkWorkerErrorNotification = useNotificationStore(
    (state) => state.unlinkWorkerErrorNotification,
  );

  // Steps transitions. All can go to connect because it's the reset step when closing the modal.
  // Simulates a finite state machine, but only with the transitions.
  const steps = {
    confirm: {
      connect: 'connect',
      executing: 'executing',
    },
    connect: {
      executing: 'executing',
    },
    executing: {
      success: 'success',
      failure: 'failure',
    },
    success: {},
    failure: {},
  } as const satisfies Record<Step, Partial<Record<Step, Step>>>;

  const onConfirm = async () => {
    if (isConnected) {
      await unlinkWorker();
    } else {
      setStep('connect');
    }
  };

  const unlinkWorker = async () => {
    setStep('executing');

    try {
      await unlinkEWXWorker(async ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          await workerApi.deleteWorker();
          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setUnlinkTxUrl(txUrl);
          setStep(steps.executing.success);
          unlinkWorkerSuccessNotification();
        } else {
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          unlinkWorkerErrorNotification();
          setStep(steps.executing.failure);
        }
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else if (typeof error === 'object' && error?.['message']) {
        setErrorMsg(error['message']);
      } else {
        setErrorMsg('An unknown error occurred');
      }
      setStep(steps.executing.failure);
      unlinkWorkerErrorNotification();
    }
  };

  const stepComponents: Record<Step, JSX.Element> = {
    confirm: <Confirm onConfirm={onConfirm} onClose={onClose} />,
    connect: (
      <ConnectEWXWallet onConnect={() => setStep(steps.connect.executing)} onClose={onClose} />
    ),
    executing: <TxExecuting address={addressEWX} operation="unlink-worker" txStatus={status} />,
    success: (
      <TxSuccess
        operation="unlink-worker"
        txUrl={unlinkTxUrl}
        onNext={onSuccess}
        onClose={onSuccess}
      />
    ),
    failure: <TxFailure operation="unlink-worker" onClose={onClose} message={errorMsg} />,
  };

  return stepComponents[step];
};

interface UnlinkAccountProps {
  onClose: () => void;
  onSuccess: () => void;
}

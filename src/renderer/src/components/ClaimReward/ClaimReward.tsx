import { useEffect, useState } from 'react';
import { useClaimRewardsStore } from '@ewf/stores/claim-rewards';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useConnectionStore } from '@ewf/stores/connection';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { formatPalletErrorMessage } from '@ewf/lib/utils';
import * as Dialog from '@ewf/components/Dialog';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { Confirm } from './Confirm';
import { ConnectEWXWallet } from '../Staking/ConnectEWXWallet/ConnectEWXWallet';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';

type Step = 'confirm' | 'connect' | 'executing' | 'success' | 'failure';

export const ClaimReward = ({
  namespace,
  isOpen,
  setIsOpen,
  onSuccess,
  isUnsubscribe = false,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('confirm');
  const [errorMsg, setErrorMsg] = useState('');
  const [txUrl, setTxUrl] = useState('');
  const [fee, setFee] = useState(0.0);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const status = useClaimRewardsStore((state) => state.status);
  const claimRewards = useClaimRewardsStore((state) => state.claimRewards);
  const reset = useClaimRewardsStore((state) => state.reset);
  const claimRewardsSuccessNotification = useNotificationStore(
    (state) => state.claimRewardsSuccessNotification,
  );
  const claimRewardsErrorNotification = useNotificationStore(
    (state) => state.claimRewardsErrorNotification,
  );

  useEffect(() => {
    const checkFee = async () => {
      setFee(await workerApi.getFeeEWX('claim'));
    };

    checkFee();
  }, []);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setTxUrl('');
      setFee(0);
      reset();
      setStep('confirm');
    }, 500);
  };

  const onConfirm = () => {
    isConnected ? proceedClaimRewards() : setStep('connect');
  };

  const onConnect = () => {
    proceedClaimRewards();
  };

  const proceedClaimRewards = async () => {
    try {
      setStep('executing');
      await claimRewards(namespace, async ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          if (isElectron()) {
            const firstIntervalSeconds = 15;
            setTimeout(() => {
              workerApi.syncEarnedRewards();
            }, firstIntervalSeconds * 1000);

            const secondIntervalSeconds = 45;
            setTimeout(() => {
              workerApi.syncEarnedRewards();
            }, secondIntervalSeconds * 1000);

            const thirdIntervalSeconds = 90;
            setTimeout(() => {
              workerApi.syncEarnedRewards();
            }, thirdIntervalSeconds * 1000);
          }

          if (onSuccess && !isUnsubscribe) onSuccess();
          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setTxUrl(txUrl);
          setStep('success');
          claimRewardsSuccessNotification();
        } else {
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          setStep('failure');
          claimRewardsErrorNotification();
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
      setStep('failure');
      claimRewardsErrorNotification();
    }
  };

  const stepComponents: Record<Step, JSX.Element> = {
    confirm: <Confirm fee={fee} onConfirm={onConfirm} onClose={onClose} />,
    connect: <ConnectEWXWallet onConnect={onConnect} onClose={onClose} />,
    executing: <TxExecuting operation="claim-reward" txStatus={status} />,
    success: (
      <TxSuccess
        operation="claim-reward"
        txUrl={txUrl}
        buttonLabel={isUnsubscribe ? 'Continue to Unsubscribe' : 'Close'}
        onNext={() => {
          if (isUnsubscribe && onSuccess) {
            onSuccess();
          }

          onClose();
        }}
        onClose={onClose}
      />
    ),
    failure: <TxFailure operation="claim-reward" onClose={onClose} message={errorMsg} />,
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content>{stepComponents[step]}</Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  namespace: string;
  isOpen: boolean;
  isUnsubscribe?: boolean;
  setIsOpen: (newOpen: boolean) => void;
  onSuccess?: () => void;
}

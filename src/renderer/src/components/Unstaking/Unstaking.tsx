import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerConst } from '@ewf/lib/router';
import { useUnstakingStore } from '@ewf/stores/unstaking';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useConnectionStore } from '@ewf/stores/connection';
import * as Dialog from '@ewf/components/Dialog';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { ClaimReward } from '@ewf/components/ClaimReward';
import { Confirm } from './Confirm';
import { parseAmount, formatPalletErrorMessage } from '@ewf/lib/utils';
import { ConnectEWXWallet } from '../Staking/ConnectEWXWallet/ConnectEWXWallet';
import { PromptUnsubscription } from './PromptUnsubscription';
import { PromptClaimReward } from './PromptClaimReward';
import { useApiServiceStore } from '@ewf/stores/api';
import { WorkerApi } from '@ewf/types/api';
import { isElectron } from '@main/helpers/is-electron';

type Step =
  | 'promptUnsubscription'
  | 'promptClaimReward'
  | 'confirm'
  | 'connect'
  | 'executing'
  | 'success'
  | 'failure';

export const Unstaking = ({
  workerId,
  namespace,
  withdrawalDelay = 0,
  isOpen,
  setIsOpen,
  onFinishUnsubscriptionDelay,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('promptUnsubscription');
  const [errorMsg, setErrorMsg] = useState('');
  const [fee, setFee] = useState(0.0);
  const [txUrl, setTxUrl] = useState('');
  const [isClaimRewardOpen, setIsClaimRewardOpen] = useState(false);
  const [pendingRewards, setPendingRewards] = useState('0');
  const isConnected = useConnectionStore((state) => state.isConnected);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const status = useUnstakingStore((state) => state.status);
  const unstake = useUnstakingStore((state) => state.unstake);
  const reset = useUnstakingStore((state) => state.reset);
  const unstakeSuccessNotification = useNotificationStore(
    (state) => state.unstakeSuccessNotification,
  );
  const unstakeErrorNotification = useNotificationStore((state) => state.unstakeErrorNotification);
  const unsubscriptionDelaySuccessNotification = useNotificationStore(
    (state) => state.unsubscriptionDelaySuccessNotification,
  );
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      if (withdrawalDelay === 0 && pendingRewards !== '0') {
        setStep('promptClaimReward');
      } else {
        setStep('promptUnsubscription');
      }
      reset();
      setTxUrl('');
    }, 500);
  };

  const onConfirm = () => {
    if (isConnected) {
      proceedUnstake();
    } else {
      setStep('connect');
    }
  };

  const onAcceptUnsubscription = () => {
    if (pendingRewards !== '0') {
      setStep('promptClaimReward');
    } else {
      setStep('confirm');
    }
  };

  const onAcceptClaimRewards = () => {
    setIsOpen(false);
    setIsClaimRewardOpen(true);
  };

  const onUnsubscribe = () => {
    if (!isOpen) {
      setIsOpen(true);
    }

    setStep('confirm');
  };

  const onConnect = () => {
    proceedUnstake();
  };

  const unsubscribeWithdrawal = () => {
    if (isElectron()) {
      workerApi.setPendingUnsubscription(workerId).then(() => {
        unsubscriptionDelaySuccessNotification(workerId, withdrawalDelay);
        setStep('success');
        onFinishUnsubscriptionDelay();
      });
    } else {
      setStep('success');
      onFinishUnsubscriptionDelay();
    }
  };

  const proceedUnstake = async () => {
    try {
      setStep('executing');
      await unstake(namespace, async ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setTxUrl(txUrl);

          if (withdrawalDelay > 0) {
            unsubscribeWithdrawal();
          } else {
            if (isElectron()) {
              await workerApi.setStaked(workerId, 0, false);
              await workerApi.terminate(workerId);
            }

            setStep('success');
            unstakeSuccessNotification(workerId);
          }
        } else {
          setStep('failure');
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          unstakeErrorNotification(workerId);
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
      unstakeErrorNotification(workerId);
    }
  };

  const onFinish = () => {
    onClose();
    navigate(routerConst.Dashboard);
  };

  useEffect(() => {
    const checkFee = async () => {
      setFee(await workerApi.getFeeEWX('unstake'));
    };

    const checkRewards = async () => {
      const earnedRewardsWei = await workerApi.getEarnedRewards(workerId);
      const earnedRewards = parseAmount(earnedRewardsWei);
      setPendingRewards(earnedRewards || '0');

      if (earnedRewards && earnedRewards !== '0') {
        setStep('promptClaimReward');
      } else {
        setStep('promptUnsubscription');
      }
    };

    checkFee();
    checkRewards();
  }, [workerId]);

  const stepComponents: Record<Step, JSX.Element> = {
    promptUnsubscription: (
      <PromptUnsubscription
        onAccept={onAcceptUnsubscription}
        onClose={onClose}
        withdrawalDelay={withdrawalDelay}
      />
    ),
    promptClaimReward: (
      <PromptClaimReward
        onAccept={onAcceptClaimRewards}
        onUnsubscribe={onUnsubscribe}
        onClose={onClose}
      />
    ),
    confirm: <Confirm fee={fee} onConfirm={onConfirm} onClose={onClose} />,
    connect: <ConnectEWXWallet onConnect={onConnect} onClose={onClose} />,
    executing: <TxExecuting operation="unsubscribing" txStatus={status} />,
    success: (
      <TxSuccess operation="unsubscribing" txUrl={txUrl} onNext={onFinish} onClose={onFinish} />
    ),
    failure: <TxFailure operation="unsubscribing" onClose={onClose} message={errorMsg} />,
  };

  return (
    <>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay>
            <Dialog.Content>{stepComponents[step]}</Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
      <ClaimReward
        namespace={namespace}
        isOpen={isClaimRewardOpen}
        setIsOpen={setIsClaimRewardOpen}
        onSuccess={onUnsubscribe}
        isUnsubscribe={true}
      />
    </>
  );
};

interface Props {
  workerId: WorkerApi.WorkerId;
  namespace: string;
  withdrawalDelay?: number;
  isOpen: boolean;
  setIsOpen: (newOpen: boolean) => void;
  onFinishUnsubscriptionDelay: () => void;
}

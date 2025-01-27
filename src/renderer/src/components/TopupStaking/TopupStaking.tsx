import { useState, useEffect } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { truncateBalance, formatPalletErrorMessage } from '@ewf/lib/utils';
import { useTopupStakingStore } from '@ewf/stores/topup-staking';
import { useNotificationStore } from '@ewf/stores/notifications';
import { WorkerApi } from '@ewf/types/api';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { ConnectEWXWallet } from './ConnectEWXWallet/ConnectEWXWallet';
import { Approve } from './Approve';
import { Confirm } from './Confirm';
import { useConnectionStore } from '@ewf/stores/connection';
import { useBalanceStore } from '@ewf/stores/balance';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useApiServiceStore } from '@ewf/stores/api';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';
import { isElectron } from '@main/helpers/is-electron';

type Step = 'connect' | 'approve' | 'confirm' | 'executing' | 'success' | 'failure';

export const TopupStaking = ({
  workerId,
  workerName,
  isOpen,
  stakedAmount,
  amounts,
  onClose: onTopupStakingClose,
  onFinish,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const balanceEWX = useBalanceStore((state) => state.balanceEWX);
  const status = useTopupStakingStore((state) => state.status);
  const topupStake = useTopupStakingStore((state) => state.topupStake);
  const reset = useTopupStakingStore((state) => state.reset);
  const topupSuccessNotification = useNotificationStore((state) => state.topupSuccessNotification);
  const topupErrorNotification = useNotificationStore((state) => state.topupErrorNotification);
  const [step, setStep] = useState<Step>(isConnected ? 'approve' : 'connect');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');
  const [stakingTxUrl, setStakingTxUrl] = useState('');
  const [gasFees, setGasFees] = useState<GasFees>(undefined);

  // Steps transitions. All can go to connect because it's the reset step when closing the modal.
  // Simulates a finite state machine, but only with the transitions.
  const steps = {
    connect: {
      approve: 'approve',
    },
    approve: {
      confirm: 'confirm',
    },
    confirm: {
      approve: 'approve',
      executing: 'executing',
    },
    executing: {
      success: 'success',
      failure: 'failure',
    },
    success: {},
    failure: {},
  } as const satisfies Record<Step, Partial<Record<Step, Step>>>;

  const onClose = () => {
    onTopupStakingClose();
    setTimeout(() => {
      setAmount(undefined);
      setStakingTxUrl('');
      setErrorMsg('');
      reset();
      setStep('connect');
    }, 300);
    // Delay to avoid screen flickering before animation ends
  };

  const onSuccess = () => {
    onFinish && onFinish();
    onClose();
  };

  const onConfirm = async () => {
    if (!workerId) return;
    setStep(steps.confirm.executing);

    if (!amount && amount !== 0) {
      setErrorMsg('Amount is undefined');
      setStep(steps.executing.failure);
      return;
    }

    try {
      await topupStake(workerId, amount, async ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          if (isElectron()) {
            const result = await workerApi.getSolutionGroupStake(workerId);
            if (result) {
              await workerApi.updateFloatingStaked(workerId);
            }
          }

          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setStakingTxUrl(txUrl);
          setStep(steps.executing.success);
          topupSuccessNotification(amount);
        } else {
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          setStep(steps.executing.failure);
          topupErrorNotification();
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
      topupErrorNotification();
    }
  };

  useEffect(() => {
    setGasFees({ value: 0, state: 'loading' });
    workerApi
      .getFeeEWX('staking')
      .then((fee) => setGasFees({ value: fee, state: 'idle' }))
      .catch((error) => {
        console.error('Error getting gas fees: ', error);
        setGasFees({ value: 0, state: 'idle' });
      });
  }, [isOpen, workerId, isConnected]);

  const stepComponents: Record<Step, React.ReactNode> = {
    connect: (
      <ConnectEWXWallet onConnect={() => setStep(steps.connect.approve)} onClose={onClose} />
    ),
    approve: (
      <Approve
        balance={truncateBalance(balanceEWX?.token || '0')}
        gasFees={gasFees}
        workerName={workerName}
        initAmount={amount}
        stakedAmount={stakedAmount}
        amounts={{
          min: '0',
          max: amounts.max,
        }}
        address={addressEWX}
        onApprove={(amount: number) => {
          setAmount(amount);
          setStep(steps.approve.confirm);
        }}
        onClose={onClose}
      />
    ),
    confirm: (
      <Confirm
        fee={gasFees?.value || 0.0}
        amount={amount || 0}
        stakedAmount={stakedAmount}
        address={addressEWX}
        onConfirm={onConfirm}
        onGoBack={() => {
          setStep('approve');
        }}
        onClose={onClose}
      />
    ),
    executing: (
      <TxExecuting
        amount={parseFloat(stakedAmount) || 0}
        amountSecondary={truncateBalance(parseFloat(stakedAmount.toString()) + (amount || 0))}
        address={addressEWX}
        operation="top-up-staking"
        txStatus={status}
      />
    ),
    success: (
      <TxSuccess
        operation="top-up-staking"
        txUrl={stakingTxUrl}
        onNext={onSuccess}
        onClose={onSuccess}
      />
    ),
    failure: <TxFailure operation="top-up-staking" onClose={onClose} message={errorMsg} />,
  };

  if (!workerId) return null;

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>{stepComponents[step]}</Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  workerId?: WorkerApi.WorkerId;
  workerName: string;
  isOpen: boolean;
  stakedAmount: string;
  amounts: {
    min?: string;
    max?: string;
  };
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  onFinish?: () => void;
}

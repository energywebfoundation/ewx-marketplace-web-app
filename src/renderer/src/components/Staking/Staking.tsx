import { useState, useEffect } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { ManageVoting } from '@ewf/pages/Dashboard/WorkerNodeCard/GalaxySubscriptions/ManageVoting';
import { truncateBalance, formatPalletErrorMessage } from '@ewf/lib/utils';
import { useStakingStore } from '@ewf/stores/staking';
import { useNotificationStore } from '@ewf/stores/notifications';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { CheckingIsStaked } from './CheckingIsStaked';
import { Approve } from './Approve';
import { Confirm } from './Confirm';
import { ConnectEWXWallet } from './ConnectEWXWallet/ConnectEWXWallet';
import { OperatorSignUp } from './OperatorSignUp';
import { useConnectionStore } from '@ewf/stores/connection';
import { useSignUpOperatorStore } from '@ewf/stores/sign-up-operator';
import { useBalanceStore } from '@ewf/stores/balance';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useApiServiceStore } from '@ewf/stores/api';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';
import { PromptUnsubscriptionDelay } from './PromptUnsubscriptionDelay';
import { WorkerApi } from '@ewf/types/api';
import { isElectron } from '@main/helpers/is-electron';

type Step =
  | 'connect'
  | 'checkIsStaked'
  | 'operatorSignup'
  | 'promptUnsubscriptionDelay'
  | 'approve'
  | 'confirm'
  | 'executing'
  | 'success'
  | 'failure';

export const Staking = ({
  workerId,
  workerName,
  namespace,
  isOpen,
  amounts,
  setIsOpen,
  setIsStaked,
  withdrawalDelay,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const balanceEWX = useBalanceStore((state) => state.balanceEWX);
  const status = useStakingStore((state) => state.status);
  const stake = useStakingStore((state) => state.stake);
  const reset = useStakingStore((state) => state.reset);
  const isOperatorSignedUp = useSignUpOperatorStore((state) => state.isOperatorSignedUp);
  const stakingSuccessNotification = useNotificationStore(
    (state) => state.stakingSuccessNotification,
  );
  const stakingErrorNotification = useNotificationStore((state) => state.stakingErrorNotification);
  const votingNextPeriodNotification = useNotificationStore(
    (state) => state.votingNextPeriodNotification,
  );
  const [accountStatus, setAccountStatus] = useState<'available' | 'unavailable' | 'checking'>(
    'checking',
  );
  const [step, setStep] = useState<Step>('connect');
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState('');
  const [stakingTxUrl, setStakingTxUrl] = useState('');
  const [gasFees, setGasFees] = useState<GasFees>(undefined);
  const [isVoting, setIsVoting] = useState(false);

  // Steps transitions. All can go to connect because it's the reset step when closing the modal.
  // Simulates a finite state machine, but only with the transitions.
  const steps = {
    connect: {
      checkIsStaked: 'checkIsStaked',
    },
    checkIsStaked: {
      operatorSignup: 'operatorSignup',
      approve: 'approve',
      promptUnsubscriptionDelay: 'promptUnsubscriptionDelay',
    },
    operatorSignup: {
      approve: 'approve',
      promptUnsubscriptionDelay: 'promptUnsubscriptionDelay',
    },
    promptUnsubscriptionDelay: {
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
    setIsOpen(false);
    setTimeout(() => {
      setAmount(undefined);
      setStakingTxUrl('');
      setErrorMsg('');
      setIsVoting(false);
      reset();
      setStep('connect');
    }, 300);
    // Delay to avoid screen flickering before animation ends
  };

  const checkStakingStatus = async () => {
    try {
      setStep(steps.connect.checkIsStaked);
      const isStaked = await workerApi.isStakingTo(namespace, addressEWX);

      if (isStaked) {
        setIsStaked(isStaked);
        onClose();
        return;
      } else if (!isOperatorSignedUp) {
        setStep(steps.checkIsStaked.operatorSignup);
      } else if (withdrawalDelay > 0) {
        setStep(steps.checkIsStaked.promptUnsubscriptionDelay);
      } else {
        setStep(steps.checkIsStaked.approve);
      }
    } catch (e) {
      console.error(e);
      onClose();
    }
  };

  const onConfirm = async () => {
    setStep(steps.confirm.executing);

    if (!amount && amount !== 0) {
      setErrorMsg('Amount is undefined');
      setStep(steps.executing.failure);
      return;
    }

    try {
      await stake(namespace, amount, async ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          if (isElectron()) {
            await workerApi.setStaked(workerId, amount, true);
          }
          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setStakingTxUrl(txUrl);
          setIsStaked(true);
          setStep(steps.executing.success);
          stakingSuccessNotification(amount);
          votingNextPeriodNotification(workerName);
        } else {
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          setStep(steps.executing.failure);
          stakingErrorNotification();
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
      stakingErrorNotification();
    }
  };

  const openVoting = () => {
    setIsVoting(true);
  };

  const closeVoting = () => {
    setIsVoting(false);
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const checkAccount = async () => {
      setAccountStatus('checking');

      if (isConnected) {
        const isWalletAvailable = await workerApi.walletIsAvailable();
        setAccountStatus(isWalletAvailable ? 'available' : 'unavailable');
        await checkStakingStatus();
      } else {
        setAccountStatus('unavailable');
        setStep('connect');
      }

      setGasFees({ value: 0, state: 'loading' });
      workerApi
        .getFeeEWX('staking')
        .then((fee) => setGasFees({ value: fee, state: 'idle' }))
        .catch((error) => {
          console.error('Error getting gas fees: ', error);
          setGasFees({ value: 0, state: 'idle' });
        });
    };

    checkAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, workerId]);

  const stepComponents: Record<Step, React.ReactNode> = {
    connect: <ConnectEWXWallet onConnect={checkStakingStatus} onClose={onClose} />,
    checkIsStaked: <CheckingIsStaked />,
    promptUnsubscriptionDelay: (
      <PromptUnsubscriptionDelay
        withdrawalDelay={withdrawalDelay}
        onClose={onClose}
        onAccept={() => {
          setStep(steps.promptUnsubscriptionDelay.approve);
        }}
      />
    ),
    operatorSignup: (
      <OperatorSignUp
        onFinish={() => {
          if (withdrawalDelay > 0) {
            setStep(steps.operatorSignup.promptUnsubscriptionDelay);
          } else {
            setStep(steps.operatorSignup.approve);
          }
        }}
        onClose={onClose}
      />
    ),
    approve: (
      <Approve
        balance={truncateBalance(balanceEWX?.token || '0')}
        gasFees={gasFees}
        initAmount={amount}
        amounts={amounts}
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
        amount={amount || 0}
        address={addressEWX}
        operation="staking"
        txStatus={status}
      />
    ),
    success: (
      <TxSuccess
        operation="staking"
        txUrl={stakingTxUrl}
        onNext={isElectron() ? openVoting : onClose}
        onClose={onClose}
      />
    ),
    failure: <TxFailure operation="staking" onClose={onClose} message={errorMsg} />,
  };

  if (isVoting) {
    return (
      <ManageVoting
        workerId={workerId}
        workerName={workerName}
        isOpen={isVoting}
        setIsOpen={setIsVoting}
        onManageVotingClosed={closeVoting}
        fetchWorkerAddress={() => {}}
      />
    );
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>
            {accountStatus === 'checking' ? <p>Checking account...</p> : stepComponents[step]}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  workerId: WorkerApi.WorkerId;
  workerName: string;
  namespace: string;
  isOpen: boolean;
  amounts: {
    min?: string;
    max?: string;
  };
  setIsOpen: (isOpen: boolean) => void;
  setIsStaked: (isStaked: boolean) => void;
  withdrawalDelay: number;
}

export const generateSeedPhrase = (): string[] => {
  return [
    'this',
    'is',
    'a',
    'repeated',
    'seed',
    'phrase',
    'just',
    'for',
    'testing',
    "don't",
    'use',
    'repeated',
  ];
};

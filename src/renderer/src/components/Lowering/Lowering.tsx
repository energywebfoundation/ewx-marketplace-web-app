import { useEffect, useState } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { useLoweringStore, MIN_LOWERING_AMOUNT } from '@ewf/stores/lowering';
import { useNotificationStore } from '@ewf/stores/notifications';
import { truncateBalance } from '@ewf/lib/utils';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { ConnectEWXWallet } from './ConnectEWXWallet/ConnectEWXWallet';
import { Approve } from './Approve';
import { SelectAccount } from './SelectAccount';
import { Confirm } from './Confirm';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxFailure } from '@ewf/components/TxFailure';
import { useConnectionStore } from '@ewf/stores/connection';
import { useBalanceStore } from '@ewf/stores/balance';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useApiServiceStore } from '@ewf/stores/api';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';

export const Lowering = ({ isOpen, setIsOpen }: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const balanceEWX = useBalanceStore((state) => state.balanceEWX);
  const status = useLoweringStore((state) => state.status);
  const lower = useLoweringStore((state) => state.lower);
  const reset = useLoweringStore((state) => state.reset);
  const createLoweringSuccessNotification = useNotificationStore(
    (state) => state.loweringSuccessNotification,
  );
  const createLoweringErrorNotification = useNotificationStore(
    (state) => state.loweringErrorNotification,
  );
  const [step, setStep] = useState<Step>(isConnected ? 'approve' : 'connect');
  const [amount, setAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [txUrl, setTxUrl] = useState('');
  const [gasFees, setGasFees] = useState<GasFees>(undefined);

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setAmount(0);
      setSelectedAddress(null);
      setTxUrl('');
      reset();
      setStep('approve');
    }, 500);
  };

  const connect = () => {
    setStep('approve');
  };

  const approve = (amount) => {
    setAmount(amount);
    setStep('selectAccount');
  };

  const selectAccount = (address: string) => {
    setSelectedAddress(address);
    setStep('confirm');
  };

  const onSelectAccountGoBack = () => {
    setStep('approve');
  };

  const confirm = async () => {
    setStep('executing');

    try {
      if (!selectedAddress) {
        throw new Error('No address selected');
      }

      await lower(selectedAddress, amount, ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          setStep('success');
          setTxUrl(`${walletConst.ewxExplorerUrl}/${blockHash}`);
          setErrorMsg('');
          createLoweringSuccessNotification(amount);
        } else {
          setErrorMsg(errorMsg || 'An unknown error occurred');
          setTxUrl('');
          setStep('failure');
          createLoweringErrorNotification();
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
      createLoweringErrorNotification();
    }
  };

  const confirmGoBack = (currentAmount) => {
    setAmount(currentAmount);
    setStep('selectAccount');
  };

  useEffect(() => {
    setGasFees({ value: 0, state: 'loading' });
    workerApi
      .getFeeEWX('lowering')
      .then((fees) => setGasFees({ value: fees, state: 'idle' }))
      .catch((error) => {
        console.error('Failed to get lowering fees: ', error);
        setGasFees({ value: 0, state: 'idle' });
      });
  }, []);

  const stepComponents: Record<Step, JSX.Element> = {
    connect: <ConnectEWXWallet onConnect={connect} onClose={onClose} />,
    approve: (
      <Approve
        gasFees={gasFees}
        balance={truncateBalance(balanceEWX?.token || '0')}
        initAmount={amount}
        amounts={{
          min: MIN_LOWERING_AMOUNT,
        }}
        address={addressEWX}
        onApprove={approve}
        onClose={onClose}
      />
    ),
    selectAccount: (
      <SelectAccount
        address={addressEWX}
        onAccountSelected={selectAccount}
        onGoBack={onSelectAccountGoBack}
        onClose={onClose}
      />
    ),
    confirm: (
      <Confirm
        gasFees={gasFees?.value || 0}
        amount={amount}
        address={addressEWX}
        onConfirm={confirm}
        onGoBack={confirmGoBack}
        onClose={onClose}
      />
    ),
    executing: (
      <TxExecuting amount={amount} address={addressEWX} operation="lowering" txStatus={status} />
    ),
    success: (
      <TxSuccess
        operation="lowering"
        txUrl={txUrl}
        title="Transaction scheduled"
        description="ATTENTION: Lowering operation will take approximately 24 hours to succeed."
        onNext={onClose}
        onClose={onClose}
      />
    ),
    failure: <TxFailure operation="lowering" onClose={onClose} message={errorMsg} />,
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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type Step =
  | 'connect'
  | 'approve'
  | 'selectAccount'
  | 'confirm'
  | 'executing'
  | 'success'
  | 'failure';

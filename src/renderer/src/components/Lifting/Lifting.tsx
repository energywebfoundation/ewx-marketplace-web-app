import { useState, useEffect } from 'react';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { useLiftingStore, MIN_LIFTING_AMOUNT } from '@ewf/stores/lifting';
import { useConnectionStore } from '@ewf/stores/connection';
import { useNotificationStore } from '@ewf/stores/notifications';
import { truncateBalance } from '@ewf/lib/utils';
import * as Dialog from '@ewf/components/Dialog';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { ConnectEWCWallet } from './ConnectEWCWallet/ConnectEWCWallet';
import { Approve } from './Approve';
import { Confirm } from './Confirm';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useBalanceStore } from '@ewf/stores/balance';
import { useApiServiceStore } from '@ewf/stores/api';
import { useLedgerStore, formatLedgerError } from '@ewf/stores/ledger';

type Step = 'connect' | 'approve' | 'confirm' | 'executing' | 'success' | 'failure';

export const Lifting = ({ isOpen, setIsOpen }: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('connect');
  const [amount, setAmount] = useState(0);
  const [isHWWallet, setHWWallet] = useState<boolean>(false);
  const [txn, setTxn] = useState<string | null>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [fee, setFee] = useState<number>(0.0);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const balanceEWC = useBalanceStore((state) => state.balanceEWC);
  const disconnect = useConnectionStore((state) => state.disconnect);
  const addressEWC = useConnectionStore((state) => state.addressEWC);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const publicAddressEWX = useConnectionStore((state) => state.publicAddressEWX);
  const status = useLiftingStore((state) => state.status);
  const lift = useLiftingStore((state) => state.lift);
  const reset = useLiftingStore((state) => state.reset);
  const createLiftingSuccessNotification = useNotificationStore(
    (state) => state.liftingSuccessNotification,
  );
  const createLiftingErrorNotification = useNotificationStore(
    (state) => state.liftingErrorNotification,
  );

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setAmount(0);
      setTxn(null);
      setStep('connect');
      reset();
    }, 300);
    // Delay to avoid screen flickering before animation ends
  };

  const connect = (method: 'wc' | 'ledger') => {
    setHWWallet(method === 'ledger');
    setStep('approve');
  };

  const approve = (amount: number) => {
    setAmount(amount);
    setStep('confirm');
  };

  const confirm = async () => {
    setStep('executing');

    try {
      if (isHWWallet) {
        useLiftingStore.setState({ status: 'pending-confirmation' });
        const { txnHash, errorStatus } = await workerApi.deviceLifting(addressEWX, amount);

        if (errorStatus) {
          console.error(errorStatus);
          const errorMsg = formatLedgerError(errorStatus);
          setErrorMsg(errorMsg);
          setStep('failure');
          createLiftingErrorNotification();
          return;
        }

        setTxn(txnHash);
        setStep('success');
        createLiftingSuccessNotification(amount);
      } else
        await lift(publicAddressEWX, amount, async ({ status, blockHash, errorMsg }) => {
          if (status === 'success') {
            setTxn(blockHash || '');
            setStep('success');
            createLiftingSuccessNotification(amount);
            return;
          }
          setErrorMsg(errorMsg || 'An unknown error occurred');
          setStep('failure');
          createLiftingErrorNotification();
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
      createLiftingErrorNotification();
    } finally {
      await disconnect(MARKETPLACE_CHAINS.EWC);
    }
  };

  const confirmGoBack = (currentAmount: number) => {
    setAmount(currentAmount);
    setStep('approve');
  };

  useEffect(() => {
    workerApi.getFeeEWC().then((fee) => setFee(Number(fee))); // TODO: verify fee parsing

    useLedgerStore.subscribe((state, previousState) => {
      if (previousState.status === 'connected' && state.status === 'disconnected') {
        setStep('failure');
        setErrorMsg('Ledger device was disconnected');
      }
    });
  }, []);

  const stepComponents: Record<Step, JSX.Element> = {
    connect: <ConnectEWCWallet onConnect={connect} onClose={onClose} />,
    approve: (
      <Approve
        balance={truncateBalance(balanceEWC?.token || '0')}
        initAmount={amount}
        amounts={{
          min: MIN_LIFTING_AMOUNT,
        }}
        address={addressEWC}
        onApprove={approve}
        onClose={onClose}
      />
    ),
    confirm: (
      <Confirm
        fee={fee}
        amount={amount}
        address={addressEWC}
        onConfirm={confirm}
        onGoBack={confirmGoBack}
        onClose={onClose}
      />
    ),
    executing: (
      <TxExecuting amount={amount} address={addressEWC} operation="lifting" txStatus={status} />
    ),
    success: (
      <TxSuccess
        operation="lifting"
        txUrl={`${walletConst.ewcExplorerUrl}/${txn}`}
        title="Transaction scheduled"
        description="ATTENTION: Lifting operation will take approximately 30 minutes to succeed."
        onNext={onClose}
        onClose={onClose}
      />
    ),
    failure: <TxFailure operation="lifting" onClose={onClose} message={errorMsg} />,
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

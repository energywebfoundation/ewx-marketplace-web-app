import { useState, useEffect, useRef } from 'react';
import { isAddress } from '@polkadot/util-crypto';
import clsx from 'clsx';
import { useLinkUpEwxWorkerStore } from '@ewf/stores/link-up-ewx-worker';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useSignUpOperatorStore } from '@ewf/stores/sign-up-operator';
import * as Dialog from '@ewf/components/Dialog';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { OperatorSignUp } from '@ewf/components/Staking/OperatorSignUp';
import { CheckingIsLinked } from '@ewf/components/Staking/CheckingIsLinked';
import { LinkWorkerAccount } from '@ewf/components/Staking/LinkWorkerAccount';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';
import { formatPalletErrorMessage } from '@ewf/lib/utils';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { useConnectionStore } from '@ewf/stores/connection';
import { ConnectEWXWallet } from '@ewf/components/Header/Account/AccountPanel/UnlinkAccount/ConnectEWXWallet/ConnectEWXWallet';
import { UnlinkAccountContent } from '@ewf/components/Header/Account/AccountPanel/UnlinkAccount';
import { useApiServiceStore } from '@ewf/stores/api';
import { useDeepLink } from '@ewf/stores/deep-link';

export const SetRemoteWorkerAccount = ({ isOpen, setIsOpen, isSwitching }: Props) => {
  const onClose = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content>
            <RemoteWorkerAccount onClose={onClose} isSwitching={isSwitching} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isSwitching?: boolean;
}

type Step =
  | 'confirm'
  | 'connect'
  | 'operatorSignup'
  | 'setWorkerAccount'
  | 'checkingIsLinked'
  | 'promptUnlink'
  | 'unlinkWorker'
  | 'linkWorker'
  | 'linkingWorker'
  | 'linkWorkerSuccess'
  | 'linkWorkerFailure'
  | 'settingWorkerAccount'
  | 'closing'
  | 'success';

export const RemoteWorkerAccount = ({ onClose, isSwitching }: RemoteWorkerAccountProps) => {
  const workerApi = useApiServiceStore.getState().api;
  const isOperatorSignedUp = useSignUpOperatorStore((state) => state.isOperatorSignedUp);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const defaultStep: Step = isSwitching
    ? 'confirm'
    : !isConnected
    ? 'connect'
    : !isOperatorSignedUp
    ? 'operatorSignup'
    : 'setWorkerAccount';
  const [step, setStep] = useState<Step>(defaultStep);
  const [previousStep, setPreviousStep] = useState<Step | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [workerAddress, setWorkerAddress] = useState('');
  const [linkingTxUrl, setLinkingTxUrl] = useState('');
  const [linkedWorkerAccount, setLinkedWorkerAccount] = useState('');
  const [linkErrorMsg, setLinkErrorMsg] = useState('');
  const linkAccountStatus = useLinkUpEwxWorkerStore((state) => state.status);
  const linkUpEWXWorker = useLinkUpEwxWorkerStore((state) => state.linkUpEWXWorker);
  const resetLinkAccount = useLinkUpEwxWorkerStore((state) => state.reset);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const linkWorkerSuccessNotification = useNotificationStore(
    (state) => state.linkWorkerSuccessNotification,
  );
  const linkWorkerErrorNotification = useNotificationStore(
    (state) => state.linkWorkerErrorNotification,
  );
  const deepLinkWorkerAddress = useDeepLink((state) => state.value);
  const isOperatorSignedUpRef = useRef(isOperatorSignedUp);
  isOperatorSignedUpRef.current = isOperatorSignedUp;
  const isLoading = status === 'loading';
  const isError = status === 'error';
  const targetWorkerAddress = deepLinkWorkerAddress
    ? 'deep-link'
    : linkedWorkerAccount
    ? 'linked-worker'
    : 'manual-entry';

  const confirmClose = () => {
    setPreviousStep(step);
    setStep('closing');
  };

  const handleClose = () => {
    useDeepLink.setState({ deepLink: undefined, value: undefined, status: 'idle' });
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setStep(defaultStep);
      resetLinkAccount();
    }, 300);
  };

  const onConfirm = () =>
    !isConnected
      ? setStep('connect')
      : !isOperatorSignedUp
      ? setStep('operatorSignup')
      : setStep('setWorkerAccount');

  const onConnect = () =>
    isOperatorSignedUpRef.current ? setStep('setWorkerAccount') : setStep('operatorSignup');

  const checkIsLinked = async (): Promise<boolean> => {
    setStep('checkingIsLinked');

    try {
      const linkStatus = await workerApi.workerEWXLinkStatus(workerAddress);

      if (linkStatus === 'not-linked') {
        setStep('linkWorker');
        return false;
      }

      if (linkStatus === 'linked-to-other-worker') {
        setStep('promptUnlink');
        return false;
      }

      if (linkStatus === 'linked-to-current-worker') {
        return true;
      }

      setErrorMsg('There was an error checking the worker account. Please try again.');
      setStatus('error');
      setStep('setWorkerAccount');
      return false;
    } catch (error) {
      console.error(error);
      setErrorMsg('There was an error checking the worker account. Please try again.');
      setStatus('error');
      return false;
    }
  };

  const onAccept = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    if (!isAddress(workerAddress)) {
      setErrorMsg('Invalid worker address');
      setStatus('error');
      return;
    }

    try {
      const isLinked = await checkIsLinked();

      if (!isLinked) return;

      await setWorkerAccount();
    } catch (error) {
      console.error(error);
      setErrorMsg('There was an error linking the worker account. Please try again.');
      setStatus('error');
      return;
    }
  };

  const onLinkWorker = async () => {
    setStep('linkingWorker');

    try {
      await linkUpEWXWorker(async ({ status, errorMsg: linkErrorMsg, blockHash }) => {
        if (status === 'success') {
          const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
          setLinkingTxUrl(txUrl);
          setStep('linkWorkerSuccess');
          linkWorkerSuccessNotification();
        } else {
          setLinkErrorMsg(
            linkErrorMsg ? formatPalletErrorMessage(linkErrorMsg) : 'An unknown error occurred',
          );
          linkWorkerErrorNotification();
          setStep('linkWorkerFailure');
        }
      }, workerAddress);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setLinkErrorMsg(error.message);
      } else if (typeof error === 'object' && error?.['message']) {
        setLinkErrorMsg(error['message']);
      } else {
        setLinkErrorMsg('An unknown error occurred');
      }
      setStep('linkWorkerFailure');
      linkWorkerErrorNotification();
    }
  };

  const setWorkerAccount = async () => {
    setStep('settingWorkerAccount');
    try {
      await workerApi.setRemoteWorker(workerAddress);
      setStep('success');
    } catch (error) {
      console.error(error);
      setErrorMsg('There was an error setting the worker account. Please try again.');
      setStatus('error');
    }
  };

  useEffect(() => {
    if (deepLinkWorkerAddress) {
      setWorkerAddress(deepLinkWorkerAddress);
    }

    setStatus('loading');
    workerApi
      .getLinkedWorkerNode()
      .then((currentLinkedWorkerAccount) => {
        if (currentLinkedWorkerAccount) {
          setLinkedWorkerAccount(currentLinkedWorkerAccount);

          if (!deepLinkWorkerAddress) {
            setWorkerAddress(currentLinkedWorkerAccount);
          }
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setStatus('idle'));
  }, [deepLinkWorkerAddress]);

  const stepComponents: Record<Step, React.ReactNode> = {
    confirm: (
      <ModalContainer>
        <section className="mb-8 flex justify-end">
          <CloseButton onClick={handleClose} />
        </section>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="px-8 text-center">
            <p className="mb-2 font-bold">Switching worker node location</p>
            <hr className="my-3 border border-b border-gray-70" />
            <p>
              Your worker node is running in this machine. Do you want to set a remote worker node
              instead?
            </p>
          </SunkenBox>
        </section>
        <section className="mt-8 flex justify-center gap-8">
          <Button onClick={handleClose} color="outlined">
            Cancel
          </Button>
          <Button onClick={onConfirm}>Continue</Button>
        </section>
      </ModalContainer>
    ),
    connect: <ConnectEWXWallet onConnect={onConnect} onClose={confirmClose} />,
    setWorkerAccount: (
      <ModalContainer>
        <section className="mb-8 flex justify-end">
          <CloseButton onClick={confirmClose} />
        </section>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="mb-8 text-center">
            <p className="mb-1 text-lg font-bold text-white">Configure remote worker node</p>
          </SunkenBox>
          <SunkenBox className="mt-8">
            <label htmlFor="address" className="ml-1 text-sm text-font-subtle">
              {isLoading
                ? 'Loading...'
                : linkedWorkerAccount
                ? 'Currently linked worker account'
                : 'Set worker node account'}
            </label>
            <form onSubmit={onAccept}>
              <div className="flex items-center gap-4">
                <Input
                  id="address"
                  name="address"
                  value={workerAddress}
                  onChange={(e) => {
                    setStatus('idle');
                    setErrorMsg('');
                    setWorkerAddress(e.target.value);
                  }}
                  autoFocus
                  placeholder={
                    isLoading ? 'Setting worker node account...' : 'Enter a valid EWX address'
                  }
                  className={clsx({
                    'mt-0.5 w-fit flex-grow': true,
                    'cursor-not-allowed text-font-subtler':
                      isLoading || targetWorkerAddress === 'linked-worker',
                  })}
                  disabled={isLoading || targetWorkerAddress === 'linked-worker'}
                />
              </div>
            </form>
            <p
              className={clsx({
                'ml-1 mt-1 text-sm text-red': true,
                block: isError,
                hidden: !isError,
              })}
            >
              {errorMsg}
            </p>
          </SunkenBox>
        </section>
        <section className="mt-8 flex w-full justify-center">
          <Button onClick={onAccept} className="w-[156px]">
            Accept
          </Button>
        </section>
      </ModalContainer>
    ),
    operatorSignup: (
      <OperatorSignUp onClose={confirmClose} onFinish={() => setStep('setWorkerAccount')} />
    ),
    checkingIsLinked: <CheckingIsLinked />,
    promptUnlink: (
      <ModalContainer>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="px-8 text-center">
            <p className="font-bold">Linked worker account exists</p>
          </SunkenBox>
          <SunkenBox className="mt-8 grid p-8">
            <p className="text-center">
              You already have an existing worker account linked to your operator account. Do you
              want to unlink it and set a new worker account?
            </p>
            <div className="mt-4 flex w-full items-center justify-center rounded-md border-[1px] border-transparent px-2 py-3 text-center text-sm text-white shadow-sunken gradient-border-secondary-with-gray-90">
              <span>{linkedWorkerAccount}</span>
            </div>
          </SunkenBox>
        </section>
        <section className="mt-8 flex justify-center gap-8">
          <Button onClick={confirmClose} color="outlined">
            Cancel
          </Button>
          <Button onClick={() => setStep('unlinkWorker')}>Confirm</Button>
        </section>
      </ModalContainer>
    ),
    unlinkWorker: (
      <UnlinkAccountContent onSuccess={() => setStep('linkWorker')} onClose={confirmClose} />
    ),
    linkWorker: <LinkWorkerAccount onLink={onLinkWorker} onClose={confirmClose} />,
    linkingWorker: <TxExecuting operation="link-worker" txStatus={linkAccountStatus} />,
    linkWorkerSuccess: (
      <TxSuccess
        operation="link-worker"
        txUrl={linkingTxUrl}
        onNext={setWorkerAccount}
        onClose={setWorkerAccount}
      />
    ),
    linkWorkerFailure: <TxFailure onClose={onClose} message={linkErrorMsg} />,
    settingWorkerAccount: (
      <ModalContainer>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="px-8 text-center">
            <p className="mb-2 font-bold">Setting Remote Worker Account...</p>
          </SunkenBox>
          <SunkenBox className="mt-8 grid place-items-center p-8">
            <ProgressBadgeEWX />
          </SunkenBox>
        </section>
      </ModalContainer>
    ),
    closing: (
      <ModalContainer>
        <h2 className="mb-4">Exit remote worker account setup?</h2>
        <p className="mb-8">
          You haven&apos;t finished setting the remote worker account. Are you sure you want to end
          the process? You will need to start over if you close now.
        </p>
        <div className="flex justify-end gap-4">
          <Button autoFocus onClick={() => setStep(previousStep || 'confirm')} color="outlined">
            Continue setup
          </Button>
          <Button onClick={handleClose}>Exit</Button>
        </div>
      </ModalContainer>
    ),
    success: (
      <ModalContainer>
        <section className="mb-8 flex justify-end">
          <CloseButton onClick={handleClose} />
        </section>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="px-8 text-center">
            <p className="font-bold">Remote Worker Account Set Successfully</p>
            <hr className="my-3 border border-b border-gray-70" />
            <p>
              Your worker node account has been set successfully. You can now run your worker node
              in a remote location.
            </p>
          </SunkenBox>
        </section>
        <section className="flex w-full justify-center">
          <Button onClick={handleClose} className="mt-8">
            Close
          </Button>
        </section>
      </ModalContainer>
    ),
  };

  return stepComponents[step];
};

interface RemoteWorkerAccountProps {
  onClose: () => void;
  onSuccess?: () => void;
  isSwitching?: boolean;
}

import { useState, useEffect, useRef } from 'react';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { useConnectionStore } from '@ewf/stores/connection';
import * as Dialog from '@ewf/components/Dialog';
import { Chain, type Wallet } from '@ewf/components/ModalUI/WalletSelector';
import { ConnectWC } from '@ewf/components/ConnectWC';
import { EnterPassword } from '@ewf/components/Staking/EnterPassword';
import { GeneratePassword } from '@ewf/components/Staking/GeneratePassword';
import { GenerateSeedPhrase } from '@ewf/components/Staking/GenerateSeedPhrase';
import { ConfirmSeedPhrase } from '@ewf/components/Staking/ConfirmSeedPhrase';
import { ResetPassword } from '@ewf/components/Staking/ResetPassword';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { SelectWallet } from './SelectWallet';
import { ConnectionLoading } from './ConnectionLoading';
import { ConnectionError } from './ConnectionError';
import { useApiServiceStore } from '@ewf/stores/api';

export type Step =
  | 'select'
  | 'connectWC'
  | 'connectLedger'
  | 'loading'
  | 'error'
  | 'loginWorkerAccount'
  | 'loginSuccessful'
  | 'generatePassword'
  | 'generateSeedPhrase'
  | 'confirmSeedPhrase'
  | 'resetPassword';

export const ConnectUserWallet = ({ isOpen, setIsOpen, onSuccess }: Props): JSX.Element => {
  const onClose = () => {
    setTimeout(() => setIsOpen(false), 300);
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>
            <ConnectEWXWallet onClose={onClose} onSuccess={onSuccess} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess?: () => void;
}

// Abstracted into a different component to for component mount, reset all
// states and avoid screen step issues. Reseting states after closing is not
// working in some edge cases because of race conditions. The structure is the
// same pattern as in Lifting -> ConnectEWCWallet.
const ConnectEWXWallet = ({ onClose, onSuccess }: ContentProps): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('select');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const walletConnectModal = useConnectionStore((state) => state.walletConnectModal);
  const stepRef = useRef<Step>(step);
  const isConnectingRef = useRef<boolean>(false);

  const goToConnectionMethod = (wallet: Wallet) => {
    if (wallet === 'wallet-connect') {
      setStep('connectWC');
    }

    if (wallet === 'ledger') setStep('connectLedger');
  };

  const connectionSuccess = () => {
    isConnectingRef.current = false;
    checkIfLoginWorkerAccount();
  };

  const connectionError = (msg?: string) => {
    setErrorMsg(msg);
    setStep('error');
  };

  const checkIfLoginWorkerAccount = async () => {
    try {
      const shouldPromptWorkerLogin = await workerApi.shouldPromptWorkerLogin();
      shouldPromptWorkerLogin ? setStep('loginWorkerAccount') : setStep('loginSuccessful');
    } catch (error) {
      setStep('loginSuccessful');
    }
  };

  const onSuccessFinish = () => {
    onClose();
    if (onSuccess) onSuccess();
  };

  useEffect(() => {
    if (!walletConnectModal) return;

    walletConnectModal.subscribeModal((state) => {
      if (!state.open && step === 'connectWC') {
        setTimeout(() => {
          if (stepRef.current === 'connectWC') setStep('select');
        }, 300);
      }
    });
  }, [step, walletConnectModal]);

  useEffect(() => {
    // Ref is used to keep track of step current value inside of setTimeout callback
    stepRef.current = step;
  }, [step]);

  const stepComponents: Record<Step, React.ReactNode> = {
    select: <SelectWallet next={goToConnectionMethod} onClose={onClose} network={Chain.EWX} />,
    connectWC: (
      <ConnectWC
        chain={MARKETPLACE_CHAINS.EWX}
        isConnectingCallback={() => {
          walletConnectModal?.closeModal();
          setStep('loading');
        }}
        onConnectionSuccess={connectionSuccess}
        onConnectionError={connectionError}
      />
    ),
    connectLedger: null,
    loading: <ConnectionLoading />,
    error: <ConnectionError onClose={onClose} errorMsg={errorMsg} />,
    loginWorkerAccount: (
      <EnterPassword
        onPasswordEntered={() => setStep('loginSuccessful')}
        onClose={onClose}
        onPasswordForgotten={() => setStep('resetPassword')}
      />
    ),
    resetPassword: (
      <ResetPassword
        onPasswordReseted={(seedPhrase: string[]) => {
          setSeedPhrase(seedPhrase);
          setStep('generatePassword');
        }}
        onClose={onClose}
      />
    ),
    generatePassword: (
      <GeneratePassword
        seedPhrase={seedPhrase}
        buttonText={seedPhrase ? 'Reset Password' : 'Create Worker Node Account'}
        onPasswordCreated={(createdSeedPhrase: string[], isReset) => {
          setSeedPhrase(createdSeedPhrase);
          isReset ? setStep('loginSuccessful') : setStep('generateSeedPhrase');
        }}
        onClose={onClose}
      />
    ),
    generateSeedPhrase: (
      <GenerateSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseCopied={() => setStep('confirmSeedPhrase')}
        onGoBack={() => setStep('generatePassword')}
        onClose={onClose}
      />
    ),
    confirmSeedPhrase: (
      <ConfirmSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseConfirmed={() => setStep('loginSuccessful')}
        onClose={onClose}
      />
    ),
    loginSuccessful: (
      <TxSuccess
        title="Account connected successfully"
        onNext={onSuccessFinish}
        onClose={onClose}
      />
    ),
  };

  const renderComponent = () => {
    return stepComponents[step];
  };

  return renderComponent();
};

interface ContentProps {
  onClose: () => void;
  onSuccess?: () => void;
}

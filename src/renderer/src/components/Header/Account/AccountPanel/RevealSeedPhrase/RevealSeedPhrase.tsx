import { useState } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { GenerateSeedPhrase } from '@ewf/components/Staking/GenerateSeedPhrase';
import { EnterPassword } from './EnterPassword';
import { Confirm } from './Confirm';
import { useApiServiceStore } from '@ewf/stores/api';

type Step = 'confirm' | 'login' | 'seedphrase';

export const RevealSeedPhrase = ({ isOpen, setIsOpen }: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [step, setStep] = useState<Step>('confirm');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [seedPhrase, setSeedPhrase] = useState<string>('');

  const onClose = () => {
    setIsOpen(false);
    setErrorMsg(undefined);
    setIsLoading(false);
    setTimeout(() => setStep('confirm'), 300);
  };

  const onPasswordEntered = async (password: string) => {
    setIsLoading(true);

    try {
      const seedPhrase = await workerApi.walletGetSeedPhrase(password);
      setSeedPhrase(seedPhrase);
      setErrorMsg(undefined);
      setStep('seedphrase');
    } catch (e) {
      console.error(e);
      let message = 'Something went wrong';
      if (e instanceof Error && e.message.includes('Error: ')) {
        message = e.message.split('Error: ')[1];
      }
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const stepComponents: Record<Step, React.ReactNode> = {
    confirm: <Confirm onConfirm={() => setStep('login')} onClose={onClose} />,
    login: (
      <EnterPassword
        isLoading={isLoading}
        errorMsg={errorMsg}
        onClose={onClose}
        onPasswordEntered={onPasswordEntered}
      />
    ),
    seedphrase: (
      <GenerateSeedPhrase
        seedPhrase={seedPhrase.split(' ')}
        buttonText="Close"
        onSeedPhraseCopied={onClose}
      />
    ),
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

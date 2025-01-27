import { useState } from 'react';
import { TxSuccessWorker } from '@ewf/components/TxSuccessWorker';
import { TxFailure } from '@ewf/components/TxFailure';
import { GeneratePassword } from '../Staking/GeneratePassword';
import { GenerateSeedPhrase } from '../Staking/GenerateSeedPhrase';
import { ConfirmSeedPhrase } from '../Staking/ConfirmSeedPhrase';
import { Confirm } from './Confirm';

type Step =
  | 'confirm'
  | 'generatePassword'
  | 'generateSeedPhrase'
  | 'confirmSeedPhrase'
  | 'success'
  | 'failure';

export const GenerateWorkerAccount = ({ onClose }: Props): React.ReactElement => {
  const [step, setStep] = useState<Step>('confirm');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);

  const stepComponents: Record<Step, React.ReactNode> = {
    confirm: <Confirm onConfirm={() => setStep('generatePassword')} onClose={onClose} />,
    generatePassword: (
      <GeneratePassword
        seedPhrase={seedPhrase}
        buttonText="Create Worker Node Account"
        onPasswordCreated={(createdSeedPhrase: string[]) => {
          setSeedPhrase(createdSeedPhrase);
          setStep('generateSeedPhrase');
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
        onSeedPhraseConfirmed={() => setStep('success')}
        onClose={onClose}
      />
    ),
    success: <TxSuccessWorker onNext={onClose} onClose={onClose} />,
    failure: <TxFailure onClose={onClose} />,
  };

  return stepComponents[step] as React.ReactElement;
};

interface Props {
  onClose: () => void;
}

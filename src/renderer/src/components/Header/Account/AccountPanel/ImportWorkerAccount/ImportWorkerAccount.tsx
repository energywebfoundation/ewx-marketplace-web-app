import { useState } from 'react';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { GeneratePassword } from '@ewf/components/Staking/GeneratePassword';
import { InputSeedPhrase } from './InputSeedPhrase';

type Step = 'inputSeedPhrase' | 'checking' | 'generatePassword' | 'success' | 'failure';

export const ImportWorkerAccount = ({ onClose }: Props): React.ReactNode => {
  const [seedPhrase, setSeedPhrase] = useState<string | undefined>();
  const [step, setStep] = useState<Step>('inputSeedPhrase');
  const [errMsg, setErrMsg] = useState<string>('');

  const onCheckSeedPhrase = async (seedPhrase: string) => {
    setStep('checking');
    try {
      const isValidMnemonic = mnemonicValidate(seedPhrase);
      if (isValidMnemonic) {
        setSeedPhrase(seedPhrase);
        setStep('generatePassword');
        return;
      }
      setStep('failure');
    } catch (e) {
      if (e instanceof Error) {
        setErrMsg(e.message);
      } else if (typeof e === 'object' && e?.['message']) {
        setErrMsg(e['message']);
      }
      setStep('failure');
      console.error(e);
    }
  };

  const stepComponents: Record<Step, React.ReactNode> = {
    inputSeedPhrase: <InputSeedPhrase onCheckSeedPhrase={onCheckSeedPhrase} onClose={onClose} />,
    checking: <div>Checking mnemonic...</div>,
    generatePassword: (
      <GeneratePassword
        seedPhrase={seedPhrase ? seedPhrase.split(' ') : []}
        buttonText="Import Worker Node Account"
        onPasswordCreated={() => setStep('success')}
        onClose={onClose}
      />
    ),
    success: <TxSuccess title="Mnemonic saved successfully" onClose={onClose} onNext={onClose} />,
    failure: <TxFailure onClose={onClose} message={errMsg} />,
  };

  return stepComponents[step] as React.ReactNode;
};

interface Props {
  onClose;
}

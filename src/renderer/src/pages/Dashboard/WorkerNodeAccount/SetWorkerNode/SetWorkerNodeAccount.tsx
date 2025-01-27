import { useState } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { PromptLocalRemoteWorker } from '../../WorkerNodeCard/GalaxySubscriptions/ManageVoting/PromptLocalRemoteWorker';
import { LocalWorkerAccount } from '../SetLocalWorkerAccount';
import { RemoteWorkerAccount } from '../SetRemoteWorkerAccount';
import { isElectron } from '@main/helpers/is-electron';

type Step = 'promptLocalRemoteWorker' | 'localWorker' | 'remoteWorker';

export const SetWorkerNodeAccount = ({ isOpen, setIsOpen, currentExecution }: Props) => {
  const [step, setStep] = useState<Step>('promptLocalRemoteWorker');

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => setStep('promptLocalRemoteWorker'), 300);
  };

  const stepComponents: Record<Step, React.ReactNode> = {
    promptLocalRemoteWorker: (
      <PromptLocalRemoteWorker
        onLocalWorker={() => setStep('localWorker')}
        onRemoteWorker={() => setStep('remoteWorker')}
        onClose={onClose}
      />
    ),
    localWorker: (
      <LocalWorkerAccount onClose={onClose} isSwitching={currentExecution === 'remote'} />
    ),
    remoteWorker: (
      <RemoteWorkerAccount onClose={onClose} isSwitching={currentExecution === 'local'} />
    ),
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          {isElectron() ? (
            <Dialog.Content>{stepComponents[step]}</Dialog.Content>
          ) : (
            <Dialog.Content>{stepComponents['remoteWorker']}</Dialog.Content>
          )}
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  currentExecution: 'local' | 'remote' | undefined;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

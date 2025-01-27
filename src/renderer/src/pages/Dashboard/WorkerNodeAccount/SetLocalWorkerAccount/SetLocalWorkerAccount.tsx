import { useState } from 'react';
import * as Dialog from '@ewf/components/Dialog';
import { GenerateWorkerAccount } from '@ewf/components/GenerateWorkerAccount';
import { ImportWorkerAccount } from '@ewf/components/Header/Account/AccountPanel/ImportWorkerAccount';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';
import { PromptNewWorkerAccount } from '../../WorkerNodeCard/GalaxySubscriptions/ManageVoting/PromptNewWorkerAccount';

export const SetLocalWorkerAccount = ({ isOpen, setIsOpen, isSwitching }: Props) => {
  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content>
            <LocalWorkerAccount onClose={onClose} isSwitching={isSwitching} />
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

type Step = 'confirm' | 'promptNewWorker' | 'generateAccount' | 'importAccount';

export const LocalWorkerAccount = ({ onClose, isSwitching }: LocalWorkerAccountProps) => {
  const [step, setStep] = useState<Step>(isSwitching ? 'confirm' : 'promptNewWorker');

  const handleOnClose = () => {
    onClose();
    setTimeout(() => setStep('confirm'), 300);
  };

  const onConfirm = () => setStep('promptNewWorker');

  const stepComponents: Record<Step, React.ReactNode> = {
    confirm: (
      <ModalContainer>
        <section className="mb-8 flex justify-end">
          <CloseButton onClick={handleOnClose} />
        </section>
        <section className="rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="px-8 text-center">
            <p className="mb-2 font-bold">Switching worker node location</p>
            <hr className="my-3 border border-b border-gray-70" />
            <p>
              Your worker node is running on a remote server. Do you want to run it in this machine
              instead?
            </p>
          </SunkenBox>
        </section>
        <section className="mt-8 flex justify-center gap-8">
          <Button onClick={handleOnClose} color="outlined">
            Cancel
          </Button>
          <Button onClick={onConfirm}>Continue</Button>
        </section>
      </ModalContainer>
    ),
    promptNewWorker: (
      <PromptNewWorkerAccount
        title="Set new local worker account"
        onGenerateAccount={() => setStep('generateAccount')}
        onImportSeedPhrase={() => setStep('importAccount')}
        onClose={onClose}
      />
    ),
    generateAccount: <GenerateWorkerAccount onClose={onClose} />,
    importAccount: <ImportWorkerAccount onClose={onClose} />,
  };

  return stepComponents[step];
};

interface LocalWorkerAccountProps {
  onClose: () => void;
  isSwitching?: boolean;
}

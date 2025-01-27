import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import * as Dialog from '@ewf/components/Dialog';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { useApiServiceStore } from '@ewf/stores/api';
import { MANAGE_WORKER_LABEL } from '@ewf/types/enums';

export const ManageWorkerPrompt = ({
  workerId,
  type,
  isOpen,
  setIsOpen,
  onAccept,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const onClose = () => {
    setIsOpen(false);
  };

  const processAcceptance = async () => {
    type === MANAGE_WORKER_LABEL.Pause
      ? await workerApi.pause(workerId)
      : await workerApi.pause(workerId);
    onAccept();
  };

  const onContinue = () => {
    processAcceptance();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>
            <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
              <section className="relative mb-8 flex h-[40px] justify-end">
                <CloseButton onClick={onClose} />
              </section>
              <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
                <SunkenBox className="px-8 text-center">
                  <h3 className="text-lg font-bold uppercase text-red">Important information</h3>
                  <hr className="my-3 border border-b border-gray-70" />
                  <p className="mb-2 font-bold">
                    Would you like to {type === MANAGE_WORKER_LABEL.Pause ? 'pause' : 'resume'} this
                    solution group?
                  </p>
                  <p className="mb-2">Click &quot;Continue&quot; to confirm this action.</p>
                </SunkenBox>
              </section>
              <section className="flex justify-center gap-8">
                <Button onClick={onContinue}>Continue</Button>
              </section>
            </div>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  workerId: string;
  type: MANAGE_WORKER_LABEL;
  isOpen: boolean;
  onAccept: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

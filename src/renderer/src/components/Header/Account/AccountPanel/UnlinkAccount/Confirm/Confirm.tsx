import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const Confirm = ({ onConfirm, onClose }: Props): React.ReactNode => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <h3 className="text-lg font-bold uppercase text-red">Important information</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="mb-2 font-bold">
            You are about to unlink your worker account from your operator account{' '}
          </p>
          <p className="mb-2">
            Click &quot;Unlink&quot; to proceed with this action or &quot;Cancel&quot; to close this
            dialog.
          </p>
          <br></br>
          <p className="text-sm">
            <span className="text-red">Disclaimer:</span> You will be asked to link your operator
            account with a worker account if you wish to enable a worker in the future.
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={onClose} color="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm}>Unlink</Button>
      </section>
    </div>
  );
};

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

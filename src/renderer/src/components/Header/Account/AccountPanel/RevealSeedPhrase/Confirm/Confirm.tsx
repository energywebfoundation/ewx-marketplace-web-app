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
          <p className="mb-2 font-bold">Proceed to reveal worker node account mnemonic</p>
          <p>{'Click "Confirm" to your mnemonic. You will be prompted to enter your password.'}</p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={onConfirm}>Confirm</Button>
      </section>
    </div>
  );
};

interface Props {
  onConfirm: () => void;
  onClose: () => void;
}

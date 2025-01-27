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
          <p className="mb-2 font-bold">Create new worker account</p>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="mb-1 text-center uppercase text-red">Warning</p>
          <p>
            This action will remove stored <b>worker account</b> details and will create a new one.
            You can always import your old worker account using &quot;Import Account&quot;
            functionality.
          </p>
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

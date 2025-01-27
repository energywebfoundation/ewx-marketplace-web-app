import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const Confirm = ({ fee, onConfirm, onClose }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox>
          <p className="text-center font-bold"> Submit a transaction to claim pending rewards</p>
        </SunkenBox>
      </section>
      <section className="mb-8 flex justify-between rounded-lg p-6 bg-popup-gradient">
        <p>Network fees</p>
        <p>{fee} EWT</p>
      </section>
      <section className="flex justify-center">
        <Button onClick={onConfirm}>Confirm</Button>
      </section>
    </div>
  );
};

interface Props {
  fee: number;
  onConfirm: () => void;
  onClose: () => void;
}

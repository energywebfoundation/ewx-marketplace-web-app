import { Button } from '@ewf/components/Button';
import { SuccessBadge } from '@ewf/components/StatusBadge/SuccessBadge';
import { SunkenBox } from '@ewf/components/SunkenBox';

export const ConnectionSuccess = ({ onClose }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-primary-with-gray-90">
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-8 text-center">
          <p className="text-lg font-bold">Successfully connected</p>
        </SunkenBox>
        <SunkenBox className="grid place-items-center gap-6 p-8">
          <SuccessBadge />
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button onClick={onClose}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onClose: () => void;
}

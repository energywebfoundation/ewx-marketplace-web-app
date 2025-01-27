import { Button } from '@ewf/components/Button';
import { ErrorBadge } from '@ewf/components/StatusBadge/ErrorBadge';
import { SunkenBox } from '@ewf/components/SunkenBox';

export const ConnectionError = ({ onClose }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-primary-with-gray-90">
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-8 text-center">
          <p className="text-lg font-bold">Connection error</p>
        </SunkenBox>
        <SunkenBox className="grid place-items-center gap-6 p-8">
          <ErrorBadge />
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button onClick={onClose}>Close</Button>
      </section>
    </div>
  );
};

interface Props {
  onClose: () => void;
}

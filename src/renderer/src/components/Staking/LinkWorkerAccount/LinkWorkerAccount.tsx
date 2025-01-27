import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const LinkWorkerAccount = ({ onLink, onClose }: Props): React.ReactNode => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <p className="mb-2 font-bold">Proceed to connect the worker account</p>
          <hr className="my-3 border border-b border-gray-70" />
          <p>
            {
              'Click "Continue" to connect the worker account with your EWX account. This will allow you to participate into worker node network by submitting computational results and earn extra rewards.'
            }
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={onLink}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onLink: () => void;
  onClose: () => void;
}

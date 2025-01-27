import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const PromptUnsubscription = ({
  onAccept,
  onClose,
  withdrawalDelay = 0,
}: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <h3 className="text-lg font-bold uppercase text-red">Important information</h3>
          <hr className="my-3 border border-b border-gray-70" />
          {withdrawalDelay > 0 && (
            <p className="mb-2 font-bold">{`Unsubscribing from this item will take effect after ${
              (withdrawalDelay || 0) as number
            } block(s).`}</p>
          )}
          <p className="mb-2">
            If you unsubscribe from this Solution Group, you will not be able to run the worker,
            submit votes, and collect rewards. Do you wish to continue?
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button onClick={onAccept}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onAccept: () => void;
  onClose: () => void;
  withdrawalDelay?: number;
}

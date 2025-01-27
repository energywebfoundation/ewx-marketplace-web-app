import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { Link } from 'react-router-dom';
import { routerConst } from '@ewf/lib/router';

export const PromptUnsubscriptionDelay = ({
  onAccept,
  onClose,
  withdrawalDelay,
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
          <p className="mb-2 font-bold">Solution Group with Unsubscription Delay</p>
          <p className="mb-2">
            Click &quot;Continue&quot; to opt-in to the solution group. Keep in mind that
            unsubscribing from this will have {withdrawalDelay} block(s) delay from the moment you
            unsubscribe.
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Link to={routerConst.Dashboard}>
          <Button color="outlined">Dashboard</Button>
        </Link>
        <Button onClick={onAccept}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onAccept: () => void;
  onClose: () => void;
  withdrawalDelay: number;
}

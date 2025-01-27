import { Link } from 'react-router-dom';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { routerConst } from '@ewf/lib/router';

export const PromptVoting = ({ onAccept, onClose }: Props): React.ReactNode => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <h3 className="text-lg font-bold uppercase text-red">Important information</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="mb-2 font-bold">Would you like to participate into worker node network?</p>
          <p className="mb-2">
            Click &quot;Continue&quot; to initiate a transaction to set up your worker node account
            and download worker node logic(s) for extra rewards. Click &quot;Dashboard&quot; if you
            prefer to collect only the base rewards.
          </p>
          <br></br>
          <p className="text-sm">
            <span className="text-red">Disclaimer:</span> Worker node accounts do not hold any
            tokens and cannot access your wallet account tokens. They are only used for computation
            result submissions.
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Link to={routerConst.Dashboard}>
          <Button onClick={onClose} color="outlined">
            Dashboard
          </Button>
        </Link>
        <Button onClick={onAccept}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onAccept: () => void;
  onClose: () => void;
}

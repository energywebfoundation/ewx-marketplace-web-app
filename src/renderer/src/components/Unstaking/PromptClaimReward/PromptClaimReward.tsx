import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const PromptClaimReward = ({ onUnsubscribe, onAccept, onClose }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <h3 className="text-lg font-bold uppercase text-red">Important information</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="mb-2 font-bold">Would you like to claim your pending rewards before unsubscribing?</p>
          <p className="mb-2">
            Click &quot;Continue&quot; to initiate a transaction to claim your pending rewards
            and unsubscribe. Click &quot;Unsubscribe&quot; if you
            prefer to skip rewards claim.
          </p>
          <br></br>
          <p className="text-sm">
            <span className="text-red">Disclaimer:</span> Unclaimed rewards will not be lost. They may be claimed later in the Previous Subscriptions list in the Dashboard.
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={onUnsubscribe} color="outlined">
          Unsubscribe
        </Button>
        <Button onClick={onAccept}>Continue</Button>
      </section>
    </div>
  );
};

interface Props {
  onUnsubscribe: () => void;
  onAccept: () => void;
  onClose: () => void;
}

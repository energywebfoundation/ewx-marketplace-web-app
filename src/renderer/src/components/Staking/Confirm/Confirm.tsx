import { PiArrowLeftBold } from 'react-icons/pi';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';
import { TransactionSummary } from '@ewf/components/ModalUI/TransactionSummary';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const Confirm = ({
  fee,
  amount,
  address = '',
  onConfirm,
  onGoBack,
  onClose,
}: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-between">
        <button
          onClick={() => onGoBack(amount)}
          className="grid h-[40px] w-[40px] place-items-center rounded-full bg-gray-100 text-font hover:bg-gray-95 active:bg-black"
        >
          <PiArrowLeftBold size={24} />
        </button>
        <CopyAddressButton address={address} />
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <Stepper step={3} maxStep={3} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <TransactionProgress operation="staking" step="confirm" />
        <SunkenBox className="mb-6 text-center font-bold">Confirm transaction</SunkenBox>
        <TransactionSummary amount={amount} operation="staking" />
      </section>
      <section className="mb-8 flex justify-between rounded-lg p-6 bg-popup-gradient">
        <p>Gas fees</p>
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
  amount: number;
  address: string;
  onConfirm: () => void;
  onGoBack: (amount: number) => void;
  onClose: () => void;
}

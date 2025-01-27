import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { AmountInput } from '@ewf/components/ModalUI/AmountInput';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { truncateBalance } from '@ewf/lib/utils';
import ewLogo from '@ewf/assets/logos/ew.svg';

export const Approve = ({
  balance,
  initAmount = 0,
  amounts,
  address = '',
  onApprove,
  onClose,
}: Props): JSX.Element => {
  const [amount, setAmount] = useState(initAmount);
  const truncatedBalance = truncateBalance(balance);
  const isNotAmount = !amount || amount === 0;
  const minLiftingAmount = amounts?.min ? parseFloat(amounts.min) : undefined;
  const maxLiftingAmount = amounts?.max ? parseFloat(amounts.max) : undefined;
  const nextStepDisabled = (() => {
    if (isNotAmount) return true;
    if (amount > truncatedBalance) return true;
    if (minLiftingAmount && amount < minLiftingAmount) return true;
    if (maxLiftingAmount && amount > maxLiftingAmount) return true;
    return false;
  })();

  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CopyAddressButton address={address} />
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <Stepper step={2} maxStep={3} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src={ewLogo} width={24} height={24} alt="EW" />
          <p className="font-rajdhani text-sm">Energy Web Chain</p>
        </div>
        <SunkenBox className="text-center">
          <h2 className="mb-1 font-primary">{truncatedBalance} EWT</h2>
          <p className="text-sm uppercase text-font-subtle">Your account balance</p>
        </SunkenBox>
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 text-center text-lg font-bold">Approve Lifting</SunkenBox>
        <AmountInput
          initAmount={initAmount}
          minAmount={minLiftingAmount}
          maxAmount={maxLiftingAmount}
          balance={balance}
          label="Enter Lifting Amount"
          onAmountChange={setAmount}
        />
      </section>
      <section className="flex justify-center">
        <Button disabled={nextStepDisabled} onClick={() => onApprove(amount)}>
          Approve
        </Button>
      </section>
    </div>
  );
};

interface Props {
  balance: number;
  initAmount: number;
  amounts?: {
    min?: string;
    max?: string;
  };
  address: string;
  onApprove: (amount: number) => void;
  onClose: () => void;
}

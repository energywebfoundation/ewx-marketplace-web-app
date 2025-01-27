import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { AmountInput } from '@ewf/components/ModalUI/AmountInput';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { truncateBalance } from '@ewf/lib/utils';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';
import ewxGlowLogo from '@ewf/assets/logos/ewx-glow.svg';

export const Approve = ({
  gasFees,
  balance,
  initAmount = 0,
  amounts,
  address = '',
  onApprove,
  onClose,
}: Props): JSX.Element => {
  const [amount, setAmount] = useState(initAmount);
  const isNotAmount = !amount || amount === 0;
  const truncatedBalance = truncateBalance(balance);
  const minLoweringAmount = amounts?.min ? parseFloat(amounts.min) : undefined;
  const maxLoweringAmount = amounts?.max ? parseFloat(amounts.max) : undefined;
  const isInsufficientBalance = Boolean((gasFees?.value || 0) + (minLoweringAmount || 0) > balance);
  const nextStepDisabled = (() => {
    if (isNotAmount) return true; // No valid amount
    if (amount > truncatedBalance) return true; // Amount is greater than balance
    if (isInsufficientBalance) return true; // Insufficient balance
    if (minLoweringAmount && amount < minLoweringAmount) return true; // Amount is less than min
    if (maxLoweringAmount && amount > maxLoweringAmount) return true; // Amount is greater than max
    return false;
  })();

  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CopyAddressButton address={address} />
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <Stepper step={2} maxStep={4} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <div className="mb-4 flex items-center justify-center gap-2">
          <img src={ewxGlowLogo} width={18} height={18} alt="EW" />
          <p className="font-rajdhani text-sm">Energy Web X Chain</p>
        </div>
        <SunkenBox className="text-center">
          <h2 className="mb-1 font-primary">{truncatedBalance} EWT</h2>
          <p className="text-sm uppercase text-font-subtle">Your account balance</p>
        </SunkenBox>
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 text-center text-lg font-bold">Approve Lowering</SunkenBox>
        <AmountInput
          initAmount={initAmount}
          minAmount={minLoweringAmount}
          maxAmount={maxLoweringAmount}
          balance={balance}
          label="Enter Lowering Amount"
          onAmountChange={setAmount}
          gasFees={gasFees}
          key={gasFees?.value}
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
  gasFees: GasFees;
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

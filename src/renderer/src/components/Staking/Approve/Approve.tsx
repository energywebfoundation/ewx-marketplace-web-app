import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { AmountInput } from '@ewf/components/ModalUI/AmountInput';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';
import { truncateBalance } from '@ewf/lib/utils';
import ewxGlowLogo from '@ewf/assets/logos/ewx-glow.svg';

export const Approve = ({
  balance,
  gasFees,
  address,
  initAmount,
  amounts,
  onApprove,
  onClose,
}: Props): React.ReactNode => {
  const [amount, setAmount] = useState<number | undefined>(initAmount);
  const truncatedBalance = truncateBalance(balance);
  const nextStepDisabled = !amount && amount !== 0;
  const minStakingAmount = amounts?.min ? parseFloat(amounts.min) : undefined;
  const maxStakingAmount = amounts?.max ? parseFloat(amounts.max) : undefined;

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
          <img src={ewxGlowLogo} width={18} height={18} alt="EW" />
          <p className="font-rajdhani text-sm">Energy Web X Chain</p>
        </div>
        <SunkenBox className="text-center">
          <h2 className="mb-1 font-primary">{truncatedBalance} EWT</h2>
          <p className="text-sm uppercase text-font-subtle">Your account balance</p>
        </SunkenBox>
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 text-center text-lg font-bold">
          Confirm your tokens to subscribe
        </SunkenBox>
        <AmountInput
          initAmount={initAmount}
          minAmount={minStakingAmount}
          maxAmount={maxStakingAmount}
          balance={balance}
          label="Enter Subscription Amount"
          onAmountChange={setAmount}
          gasFees={gasFees}
          key={gasFees?.value}
        />
      </section>
      <section className="flex justify-center">
        <Button
          disabled={nextStepDisabled}
          onClick={nextStepDisabled ? () => null : () => onApprove(amount)}
        >
          Continue
        </Button>
      </section>
    </div>
  );
};

interface Props {
  balance: number;
  gasFees: GasFees;
  address: string;
  initAmount: number | undefined;
  amounts?: {
    min?: string;
    max?: string;
  };
  onApprove: (amount: number) => void;
  onClose: () => void;
}

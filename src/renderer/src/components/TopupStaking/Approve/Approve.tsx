import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { AmountInput } from '@ewf/components/ModalUI/AmountInput';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { truncateBalance } from '@ewf/lib/utils';
import { type GasFees } from '@ewf/components/ModalUI/AmountInput';

export const Approve = ({
  balance,
  gasFees,
  address,
  workerName,
  initAmount,
  stakedAmount,
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
          <p className="font-rajdhani text-sm uppercase">{workerName}</p>
        </div>
        <SunkenBox className="text-center">
          <h2 className="mb-1 font-primary">{stakedAmount} EWT</h2>
          <p className="text-sm uppercase text-font-subtle">Your subscription amount</p>
        </SunkenBox>
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 text-center text-lg font-bold">Top-Up Amount</SunkenBox>
        <SunkenBox className="mb-4 text-center">
          <h2 className="mb-1 font-primary">{truncatedBalance} EWT</h2>
          <p className="text-sm uppercase text-font-subtle">Your account balance</p>
        </SunkenBox>
        <AmountInput
          initAmount={initAmount}
          minAmount={minStakingAmount}
          maxAmount={maxStakingAmount}
          balance={balance}
          label="Enter EWT Top-up Amount"
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
  workerName: string;
  initAmount: number | undefined;
  stakedAmount?: string;
  amounts?: {
    min?: string;
    max?: string;
  };
  onApprove: (amount: number) => void;
  onClose: () => void;
}

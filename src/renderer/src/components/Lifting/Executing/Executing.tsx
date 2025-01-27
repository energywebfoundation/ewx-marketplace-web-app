import { SunkenBox } from '@ewf/components/SunkenBox';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';
import { TransactionSummary } from '@ewf/components/ModalUI/TransactionSummary';

export const Executing = ({ amount, address = '' }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CopyAddressButton address={address} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <TransactionProgress operation="lifting" step="executing" />
        <SunkenBox className="mb-6 text-center">
          <p className="mb-2 font-bold">Executing transaction</p>
          <span className="text-font-subtler">Please review the transaction in your wallet</span>
        </SunkenBox>
        <TransactionSummary amount={amount} operation="lifting" />
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <ProgressBadgeEWX />
        </SunkenBox>
      </section>
    </div>
  );
};

interface Props {
  amount: number;
  address: string;
}

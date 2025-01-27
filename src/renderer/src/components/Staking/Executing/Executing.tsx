import clsx from 'clsx';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';
import { TransactionSummary } from '@ewf/components/ModalUI/TransactionSummary';
import { type TxStatus } from '@ewf/stores/tx';
import { getTransactionTitle, getTransactionDescription } from '@ewf/lib/utils';

export const Executing = ({ amount, address = '', txStatus }: Props): JSX.Element => {
  const title = getTransactionTitle(txStatus);
  const description = getTransactionDescription(txStatus);

  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px]">
        <CopyAddressButton address={address} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <TransactionProgress operation="staking" step="executing" />
        <SunkenBox className="mb-6 text-center">
          <p className="mb-2 font-bold">{title}</p>
          <span
            className={clsx({
              'text-font-subtler': true,
              'animate-pulse text-font-subtle': txStatus === 'pending-confirmation',
            })}
          >
            {description}
          </span>
        </SunkenBox>
        <TransactionSummary amount={amount} operation="staking" />
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
  txStatus?: TxStatus;
}

import { SunkenBox } from '@ewf/components/SunkenBox';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';

export const Executing = (): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <TransactionProgress operation="claim-reward" step="executing" />
        <SunkenBox className="mb-6 text-center">
          <p className="mb-2 font-bold">Executing transaction</p>
          <span className="text-font-subtler">Please review the transaction in your wallet</span>
        </SunkenBox>
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <ProgressBadgeEWX />
        </SunkenBox>
      </section>
    </div>
  );
};

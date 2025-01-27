import clsx from 'clsx';
import { type Operation } from '@main/entities/operation';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { ErrorBadge } from '@ewf/components/StatusBadge/ErrorBadge';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';
import { Button } from '@ewf/components/Button';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const TxFailure = ({
  operation,
  title = 'Transaction failed',
  message,
  buttonText = 'Close',
  onClose,
}: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        {operation ? <TransactionProgress operation={operation} step="failure" /> : null}
        <SunkenBox className="mb-6 text-center">
          <p className="text-lg font-bold">{title}</p>
          {message && <hr className="my-2 border-gray-70" />}
          <p
            className={clsx({
              hidden: !message,
            })}
          >
            {message}
          </p>
        </SunkenBox>
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <ErrorBadge />
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button onClick={onClose}>{buttonText}</Button>
      </section>
    </div>
  );
};

interface Props {
  operation?: Operation;
  title?: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
}

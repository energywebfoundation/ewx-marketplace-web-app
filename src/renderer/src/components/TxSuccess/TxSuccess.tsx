import clsx from 'clsx';
import { type Operation } from '@main/entities/operation';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { SuccessBadge } from '@ewf/components/StatusBadge/SuccessBadge';
import { TransactionProgress } from '@ewf/components/ModalUI/TransactionProgress';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const TxSuccess = ({
  operation,
  title = 'Transaction successful',
  txUrl,
  buttonLabel = 'Continue',
  description,
  onNext,
  onClose,
}: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="relative mb-8 flex h-[40px] justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        {operation ? <TransactionProgress operation={operation} step="success" /> : null}
        <SunkenBox className="mb-6 text-center">
          <p className="text-lg font-bold">{title}</p>
          {txUrl ? (
            <>
              <hr className="my-2 border-gray-70" />
              <p>Transaction URL:</p>
              <a
                href={txUrl}
                target="_blank"
                rel="noreferrer"
                className="break-words text-teal hover:underline"
              >
                {txUrl}
              </a>
            </>
          ) : null}
        </SunkenBox>
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <SuccessBadge />
        </SunkenBox>
        <SunkenBox
          className={clsx({
            'mt-4 text-center text-sm': true,
            hidden: !description,
          })}
        >
          {description}
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button autoFocus onClick={onNext}>
          {buttonLabel}
        </Button>
      </section>
    </div>
  );
};

interface Props {
  operation?: Operation;
  title?: string;
  txUrl?: string;
  buttonLabel?: string;
  description?: string;
  onNext: () => void;
  onClose: () => void;
}

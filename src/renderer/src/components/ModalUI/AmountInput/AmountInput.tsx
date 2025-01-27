import { useState, ChangeEvent } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PiCheckBold, PiXBold } from 'react-icons/pi';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Slider } from '@ewf/components/ModalUI/Slider';
import { truncateBalance } from '@ewf/lib/utils';

export type GasFees = { value: number; state: 'idle' | 'loading' } | undefined;

export const AmountInput = ({
  initAmount,
  minAmount,
  maxAmount,
  balance,
  label,
  gasFees,
  onAmountChange,
}: Props): JSX.Element => {
  const isMinimumAmount = (amount): boolean => {
    return minAmount ? amount >= minAmount : true;
  };

  const isMaximumAmount = (amount): boolean => {
    return maxAmount ? amount <= maxAmount : true;
  };

  const isInsufficientBalance = Boolean(gasFees && gasFees.value > balance);
  const formattedAmount = !initAmount && initAmount !== 0 ? '' : initAmount.toString();
  const initErrorMsg = isInsufficientBalance
    ? 'Insufficient balance'
    : isMinimumAmount(initAmount)
    ? undefined
    : `Minimum amount is ${minAmount}`;
  const [amount, setAmount] = useState(formattedAmount);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(initErrorMsg);

  const truncatedBalance = truncateBalance(balance);
  const currentPercentage = Number(amount) / truncatedBalance;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setAmountValue(value);
  };

  const setAmountFromPercentage = (percentage: number) => {
    const newAmount = truncateBalance(truncatedBalance * percentage);
    setAmountValue(newAmount.toString());
  };

  const setAmountValue = (stringValue: string) => {
    setAmount(stringValue);
    const value = parseFloat(stringValue || '0');
    // Check this format: 54 | 54.0 | 0.54 | .54 | 0
    const isValidFloatInput = /^(?:[0-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/.test(stringValue);
    const isAmountAvailable = value <= truncatedBalance;
    const isSufficientBalance = truncatedBalance > (minAmount || 0) + (gasFees?.value || 0);
    const isMinAmount = isMinimumAmount(value);
    const isMaxAmount = isMaximumAmount(value);

    if (isValidFloatInput) {
      setAmount(value.toString()); // skip set amount for invalid float to prevent NaN
      onAmountChange(value);
    }
    if (!isValidFloatInput) {
      setErrorMsg('Please enter a valid number');
      onAmountChange(0);
    } else if (!isMinAmount) setErrorMsg(`Minimum amount is ${minAmount}`);
    else if (!isMaxAmount) setErrorMsg(`Maximum amount is ${maxAmount}`);
    else if (!isAmountAvailable || !isSufficientBalance) setErrorMsg('Insufficient balance');
    else setErrorMsg(undefined);
  };

  return (
    <div>
      <SunkenBox className="mb-6 text-font-subtle">
        <div className="mb-2 flex justify-between">
          <label htmlFor="amount">{label}</label>
          <p
            className={clsx({
              'text-sm opacity-100': true,
              'text-red': errorMsg,
              'text-green': !errorMsg,
            })}
          >
            {errorMsg ? errorMsg : 'Sufficient balance'}
          </p>
        </div>
        <div className="relative">
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {errorMsg ? (
              <span className="grid place-items-center rounded-full bg-red p-1 text-gray-95">
                <PiXBold size={12} />
              </span>
            ) : amount === '0' || amount === '' ? null : (
              <span className="grid place-items-center rounded-full bg-green p-1 text-gray-95">
                <PiCheckBold size={12} />
              </span>
            )}
          </div>
          <Input
            id="amount"
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => onInputChange(e)}
            autoFocus
            className={clsx({
              '!outline-red': errorMsg,
            })}
            disabled={isInsufficientBalance}
          />
        </div>
        <p
          className={clsx({
            'mt-1 text-sm uppercase text-font-subtler': true,
            hidden: !gasFees,
          })}
        >
          Gas fees:{' '}
          <span
            className={clsx({
              'inline-block rounded-sm': true,
              'text-green': !errorMsg,
              'text-red': errorMsg,
              'animate-pulse bg-gray-60 text-font-subtler text-opacity-0':
                gasFees?.state === 'loading',
            })}
          >
            {gasFees?.state === 'loading' ? '0.0000' : truncateBalance(gasFees?.value || 0)}
          </span>
        </p>
      </SunkenBox>
      <Slider
        value={currentPercentage * 100}
        onValueChange={setAmountFromPercentage}
        disabled={isInsufficientBalance}
      />
      <div className="mt-6 flex h-[32px] items-center gap-2 font-primary-light text-sm text-font-subtle">
        {[0.1, 0.25, 0.5, 0.75].map((percentage) => (
          <PercentageButton
            key={percentage.toString()}
            disabled={isInsufficientBalance}
            selected={
              truncateBalance(truncatedBalance * percentage).toString() === amount && amount !== '0'
            }
            onClick={() => setAmountFromPercentage(percentage)}
          >
            {`${percentage * 100}%`}
          </PercentageButton>
        ))}
        <Button
          onClick={() => setAmountFromPercentage(1)}
          disabled={isInsufficientBalance}
          className={clsx({
            'h-full flex-grow p-0 text-base uppercase bg-button-gradient': true,
            'opacity-50': isInsufficientBalance,
          })}
        >
          Max
        </Button>
      </div>
    </div>
  );
};

interface Props {
  initAmount: number | undefined;
  minAmount?: number;
  maxAmount?: number;
  balance: number;
  label: string;
  gasFees?: GasFees;
  onAmountChange: (amount: number) => void;
}

const PercentageButton = ({
  selected,
  onClick,
  disabled = false,
  children,
}: PercentageButtonProps): JSX.Element => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={twMerge(
        clsx({
          'flex h-full w-[64px] items-center justify-center rounded-full border border-gray-60 bg-gray-100 text-font-subtle hover:bg-violet-darker':
            true,
          'border-brand bg-violet-darker': selected,
          'opacity-50': disabled,
        }),
      )}
    >
      {children}
    </button>
  );
};

interface PercentageButtonProps {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: string;
}

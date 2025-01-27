import { PiArrowRightBold } from 'react-icons/pi';
import { SunkenBox } from '@ewf/components/SunkenBox';
import ewxGlowLogo from '@ewf/assets/logos/ewx-glow.svg';
import ewLogo from '@ewf/assets/logos/ew.svg';
import { type Operation } from '@main/entities/operation';

export const TransactionSummary = ({ amount, amountSecondary, operation }: Props): JSX.Element => {
  return (
    <div className="relative flex w-full gap-3">
      {operation === 'lifting' ? (
        <>
          <TransactionSummaryBox chain="ewc" amount={amount} label="You lift" />
          <Arrow />
          <TransactionSummaryBox chain="ewx" amount={amount} label="You receive" />
        </>
      ) : operation === 'lowering' ? (
        <>
          <TransactionSummaryBox chain="ewx" amount={amount} label="You lower" />
          <Arrow />
          <TransactionSummaryBox chain="ewc" amount={amount} label="You receive" />
        </>
      ) : operation === 'staking' ? (
        <TransactionSummaryBox chain="ewx" amount={amount} label="You subscribe" />
      ) : operation === 'top-up-staking' ? (
        <>
          <TransactionSummaryBox chain="ewx" amount={amount} label="Your subscription amount" />
          <Arrow />
          <TransactionSummaryBox
            chain="ewx"
            amount={amountSecondary || amount}
            label="Your next subscription amount will be"
          />
        </>
      ) : null}
    </div>
  );
};

interface Props {
  amount: number | string;
  amountSecondary?: number;
  operation: Operation;
}

const Arrow = (): JSX.Element => (
  <span className="absolute left-1/2 top-1/2 grid h-[24px] w-[48px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-teal shadow">
    <PiArrowRightBold size={14} className="text-gray-95" />
  </span>
);

const TransactionSummaryBox = ({ chain, amount, label }: TransactionSummaryBox): JSX.Element => {
  const chainImagePath = chain === 'ewx' ? ewxGlowLogo : ewLogo;

  return (
    <SunkenBox className="w-full min-w-[180px] flex-grow">
      <div className="flex items-center justify-between text-font-subtle">
        <p className="text-sm">{label}</p>
        <span className="h-[20px] rounded-lg bg-gradient-to-b from-brand to-teal p-[1px]">
          <span className="grid h-full place-items-center rounded-[15px] bg-gray-80 px-2 text-sm uppercase">
            {chain}
          </span>
        </span>
      </div>
      <hr className="mb-2 mt-3 border-gray-70" />
      <div className="flex items-center justify-start gap-2">
        <img src={chainImagePath} width={20} height={20} alt={chain} />
        <p className="text-lg font-bold">{amount} EWT</p>
      </div>
    </SunkenBox>
  );
};

interface TransactionSummaryBox {
  chain: 'ewx' | 'ewc';
  amount: number | string;
  label: string;
}

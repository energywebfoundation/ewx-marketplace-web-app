import { TransactionsListTable } from './TransactionsListTable';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { Button } from '@ewf/components/Button';
import * as Dialog from '@ewf/components/Dialog';
import * as Tabs from '@radix-ui/react-tabs';
import transactionsIcon from '@ewf/assets/icons/transactions-gray.svg';
import transactions from '@ewf/assets/icons/transaction-small.svg';
import { twix } from 'tailwindcss-radix-ui';
import clsx from 'clsx';
import { TransactionType } from '@main/entities/transaction';

export const TransactionListButton = ({ disabled = false }: Props): JSX.Element => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="outline-none" asChild>
        <Button
          color="neutral"
          className={clsx({
            'relative flex h-[40px] w-[40px] items-center justify-center rounded-full p-0 shadow':
              true,
            'opacity-30': disabled,
          })}
          disabled={disabled}
        >
          <img src={transactionsIcon} width={24} height={24} alt="logIcon" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Overlay>
        <Dialog.Content className="fixed left-1/2 top-1/2 h-[621px] w-[920px] -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
          <Dialog.Title className="flex flex-row items-center justify-between gap-4 pb-5  ">
            <div className="flex flex-row items-center gap-[16px]">
              <div className="flex h-auto w-fit flex-shrink-0 rounded-full bg-brand/10 p-3">
                <img src={transactions} width={16} height={16} alt="transactionsIcon" />
              </div>
              <p className="text-font-DEFAULT text-lg font-bold leading-6">Transactions</p>
              <span className="text-sm text-font-subtler">
                (it might take some time for the changes to reflect)
              </span>
            </div>
            <Dialog.Close asChild>
              <CloseButton />
            </Dialog.Close>
          </Dialog.Title>
          <div className="flex flex-col items-center justify-between ">
            <Tabs.Root defaultValue="all" className="w-[100%]">
              <Tabs.List className="grid w-[40%] grid-cols-3 gap-[2px] rounded-b-sm rounded-t-lg bg-gray-90">
                <TabTrigger
                  value="all"
                  className="text-md rounded-bl-sm rounded-tl-lg p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
                >
                  All
                </TabTrigger>
                <TabTrigger
                  value="lifting"
                  className="text-md p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
                >
                  Lifting
                </TabTrigger>
                <TabTrigger
                  value="lowering"
                  className="text-md rounded-br-sm rounded-tr-lg p-1 font-primary-regular data-[state=active]:shadow-[inset_-2px_0_11px_rgba(0,0,0,0.45)]"
                >
                  Lowering
                </TabTrigger>
              </Tabs.List>
              <Tabs.Content value={TransactionType.ALL}>
                <TransactionsListTable type={TransactionType.ALL} />
              </Tabs.Content>
              <Tabs.Content value={TransactionType.LIFTING}>
                <TransactionsListTable type={TransactionType.LIFTING} />
              </Tabs.Content>
              <Tabs.Content value={TransactionType.LOWERING}>
                <TransactionsListTable type={TransactionType.LOWERING} />
              </Tabs.Content>
            </Tabs.Root>
          </div>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

interface Props {
  disabled?: boolean;
}

const TabTrigger = twix(
  Tabs.Trigger,
  'border-b-4 border-transparent bg-gray-80 p-5 pb-[15px] text-center text-[16px] font-normal text-font-subtler data-[state=active]:border-teal data-[state=active]:bg-gray-95 data-[state=active]:text-teal data-[state=inactive]:hover:bg-gray-70',
);

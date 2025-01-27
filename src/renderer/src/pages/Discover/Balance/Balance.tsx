import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Dialog from '@ewf/components/Dialog';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { ConnectUserWallet } from '@ewf/components/ConnectUserWallet';
import { Lifting } from '@ewf/components/Lifting';
import { Lowering } from '@ewf/components/Lowering';
import { truncateBalance } from '@ewf/lib/utils';
import ewLogo from '@ewf/assets/logos/ew.svg';
import { ChainDropdown } from './ChainDropdown';
import { AddressBook } from '@ewf/components/AddressBook';
import { useConnectionStore } from '@ewf/stores/connection';
import { useAddressBookStore } from '@ewf/stores/address-book';
import { useBalanceStore } from '@ewf/stores/balance';

export const Balance = (): JSX.Element => {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isLiftingOpen, setIsLiftingOpen] = useState(false);
  const [isLoweringOpen, setIsLoweringOpen] = useState(false);
  const [isAddressBookOpen, setIsAddressBookOpen] = useState(false);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const balanceEWX = useBalanceStore((state) => state.balanceEWX);
  const isLoading = useBalanceStore((state) => state.isLoading);
  const accounts = useAddressBookStore((state) => state.accounts);
  const resetErrorMsg = useAddressBookStore((state) => state.resetErrorMsg);
  const floatBalanceEWX = parseFloat(balanceEWX?.token || '0');
  const accountsBalance = accounts.reduce((acc, account) => acc + account.balance, 0);
  const totalBalance = floatBalanceEWX + accountsBalance;

  const Header = (): JSX.Element => (
    <div className="mb-1 rounded-b-sm rounded-t-lg bg-gray-90 p-4 shadow-sm">
      {isConnected ? (
        <>
          <p className="mb-2 text-base text-font-subtle">Total EWT Balance</p>
          <div className="flex items-center gap-3">
            <img src={ewLogo} width={24} height={24} alt="EWT" className="inline" />
            {isLoading ? (
              <div className="block h-[24px] w-[64px] animate-pulse rounded bg-gray-80" />
            ) : (
              <span className="text-lg font-bold">{truncateBalance(totalBalance)}</span>
            )}
          </div>
        </>
      ) : (
        <p className="text-base">Accounts</p>
      )}
    </div>
  );

  const WalletConnected = (): JSX.Element => (
    <>
      <p className="mb-3 text-sm text-font-subtle">Blockchain</p>
      {isLoading ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="mb-2 flex h-[28px] animate-pulse items-center rounded-full bg-gray-80"
            />
          ))}
        </>
      ) : (
        <ul>
          <div className="group mb-2 flex items-center">
            <p className="fade-in delay-50 mr-2 text-sm text-font-subtler transition group-hover:text-teal">
              EWX
            </p>
            <li className="fade-in delay-50 flex w-full items-center rounded-full border-l border-gray-80 bg-gray-80 py-1 pl-3 pr-1 transition group-hover:border-l group-hover:border-teal group-hover:shadow-sm">
              <span className="flex-grow pt-[2px]">{truncateBalance(floatBalanceEWX)}</span>
              <ChainDropdown>
                <DropdownMenu.Item
                  onClick={() => setIsLoweringOpen(true)}
                  className="fade-in delay-50 cursor-pointer rounded-md px-2 py-1 text-font-subtle outline-none transition hover:bg-brand/10 hover:!outline-none"
                >
                  Lower Tokens
                </DropdownMenu.Item>
              </ChainDropdown>
            </li>
          </div>

          {accounts.length > 0 ? (
            <div className="group flex items-center">
              <p className="fade-in delay-50 mr-2 text-sm text-font-subtler transition group-hover:text-brand">
                EWC
              </p>
              <li className="fade-in delay-50 mb-2 flex w-full items-center rounded-full border-l border-gray-80 bg-gray-80 py-1 pl-3 pr-1 transition group-hover:border-l group-hover:border-brand group-hover:shadow-sm">
                <span className="flex-grow pt-[2px]">{truncateBalance(accountsBalance)}</span>

                <ChainDropdown>
                  <DropdownMenu.Item
                    onClick={() => setIsLiftingOpen(true)}
                    className="fade-in delay-50 -mb-1 cursor-pointer rounded-md px-2 py-1 text-font-subtle outline-none transition hover:bg-brand/10"
                  >
                    Lift Tokens
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => setIsAddressBookOpen(true)}
                    className="fade-in delay-50 cursor-pointer rounded-md px-2 py-1 text-font-subtle outline-none transition hover:bg-brand/10"
                  >
                    Manage Accounts
                  </DropdownMenu.Item>
                </ChainDropdown>
              </li>
            </div>
          ) : (
            <Button
              size="small"
              className="mt-1 flex h-[35px] w-full items-center justify-between gap-2 pr-1 text-sm bg-button-gradient"
              onClick={() => setIsAddressBookOpen(true)}
            >
              Add EWC Account
              <GoPlus color="#fff" className="flex h-[25px] w-[25px] items-center justify-center" />
            </Button>
          )}
        </ul>
      )}
    </>
  );

  const WalletDisconnected = (): JSX.Element => (
    <Button
      onClick={() => setIsWalletOpen(true)}
      size="small"
      className="w-full bg-button-gradient"
    >
      Connect Wallet
    </Button>
  );

  return (
    <div className="w-full">
      <Header />
      <div className="rounded-b-lg rounded-t-sm bg-gray-90 px-4 py-3 shadow-sm">
        {isConnected && !isWalletOpen ? <WalletConnected /> : <WalletDisconnected />}
      </div>
      <ConnectUserWallet isOpen={isWalletOpen} setIsOpen={setIsWalletOpen} />
      <Lifting isOpen={isLiftingOpen} setIsOpen={setIsLiftingOpen} />
      <Lowering isOpen={isLoweringOpen} setIsOpen={setIsLoweringOpen} />
      <Dialog.Root open={isAddressBookOpen}>
        <Dialog.Portal>
          <Dialog.Overlay>
            <Dialog.Content className="w-[500px]">
              <ModalContainer>
                <AddressBook
                  onClose={() => {
                    setIsAddressBookOpen(false);
                    resetErrorMsg();
                  }}
                />
              </ModalContainer>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

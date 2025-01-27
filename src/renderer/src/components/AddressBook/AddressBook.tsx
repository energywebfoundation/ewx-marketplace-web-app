import { useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PiMinusBold, PiPlusBold, PiCopySimpleBold, PiCheckBold } from 'react-icons/pi';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Input } from '@ewf/components/Input';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { truncateAddress, truncateBalance, copyTextToClipboard } from '@ewf/lib/utils';
import accountImage from '@ewf/assets/images/account.png';
import { useAddressBookStore } from '@ewf/stores/address-book';

export const AddressBook = ({ onAccountSelected, onClose }: Props): JSX.Element => {
  const [newAddress, setNewAddress] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);
  const status = useAddressBookStore((state) => state.status);
  const accounts = useAddressBookStore((state) => state.accounts);
  const addAccount = useAddressBookStore((state) => state.addAccount);
  const deleteAccount = useAddressBookStore((state) => state.deleteAccount);
  const errorMsg = useAddressBookStore((state) => state.errorMsg);
  const isFetching = status === 'fetching';
  const isSubmitting = status === 'submitting';

  const handleSelectAccount = (address: string) => {
    setSelectedAddress(address);
    onAccountSelected?.(address);
  };

  const handleAddAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addAccount(newAddress);
    setNewAddress('');
  };

  const handleDeleteAccount = async (e: React.MouseEvent<HTMLElement>, address: string) => {
    e.stopPropagation();
    await deleteAccount(address);
  };

  const LoadingContent = (): JSX.Element => (
    <SunkenBox className="mb-4 flex h-[190px] flex-col items-center justify-center gap-4">
      <ul className="grid h-full w-full auto-rows-fr grid-cols-1 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <li key={i} className="animate-pulse rounded bg-gray-90" />
        ))}
      </ul>
    </SunkenBox>
  );

  const AccountsContent = (): JSX.Element => (
    <SunkenBox className="mb-4 max-h-[190px] overflow-auto">
      <ul className="space-y-2 text-sm">
        {accounts.map((account) => (
          <li
            key={account.address}
            onClick={() => handleSelectAccount(account.address)}
            className={clsx({
              'flex cursor-pointer items-center justify-between rounded-lg px-4 py-3  hover:bg-teal/20':
                true,
              'cursor-auto !bg-teal/40': selectedAddress === account.address,
            })}
          >
            <div className="flex items-center gap-2">
              <img
                src={accountImage}
                width={24}
                height={24}
                alt="Account"
                className="rounded-full border-2 border-white"
              />
              <p className="font-bold">{account.name}</p>
            </div>
            <CopyAddressButton address={account.address} />
            <div className="flex items-center gap-4">
              <p className="font-bold">{truncateBalance(account.balance)} EWT</p>
              <button
                onClick={(e) => handleDeleteAccount(e, account.address)}
                className="grid h-4 w-4 place-items-center rounded-full bg-white hover:bg-gray-20"
              >
                <PiMinusBold size={8} className="text-black" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </SunkenBox>
  );

  const EmptyContent = (): JSX.Element => (
    <SunkenBox className="mb-4 max-h-[180px] overflow-auto">
      <p className="py-2 text-center text-font-subtle">No accounts found</p>
    </SunkenBox>
  );

  return (
    <div>
      {Boolean(onClose) && (
        <section className="relative mb-8 flex h-[40px] justify-end">
          <CloseButton onClick={onClose} />
        </section>
      )}
      <section className="rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 text-center text-lg font-bold">Manage Account</SunkenBox>
        {isFetching ? (
          <LoadingContent />
        ) : accounts.length === 0 ? (
          <EmptyContent />
        ) : (
          <AccountsContent />
        )}
        <SunkenBox>
          <form onSubmit={handleAddAccount}>
            <label htmlFor="address" className="ml-1 text-sm text-font-subtle">
              {isSubmitting ? 'Submitting...' : 'Add account'}
            </label>
            <div className="flex items-center gap-4">
              <Input
                id="address"
                name="address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                autoFocus
                placeholder={
                  isSubmitting ? 'Adding account...' : 'Enter a valid EWC wallet address'
                }
                className="mt-0.5 w-fit flex-grow"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={twMerge(
                  clsx({
                    'grid h-[32px] w-[32px] place-items-center rounded-full bg-teal shadow-sm hover:bg-teal/70':
                      true,
                    'opacity-40': isSubmitting,
                  }),
                )}
              >
                <PiPlusBold size={16} className="text-black" />
              </button>
            </div>
            <p
              className={clsx({
                'ml-1 mt-1 text-sm text-red': true,
                block: errorMsg,
                hidden: !errorMsg,
              })}
            >
              {errorMsg}
            </p>
          </form>
        </SunkenBox>
      </section>
    </div>
  );
};

interface Props {
  onAccountSelected?: (address: string) => void;
  onClose?: () => void;
}

const CopyAddressButton = ({ address }: CopyAddressButtonProps): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = (e: React.MouseEvent<HTMLElement>, address: string) => {
    e.stopPropagation();

    setIsCopied(true);
    copyTextToClipboard(address);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      onClick={(e) => copyAddress(e, address)}
      className="flex items-center gap-1 rounded px-2 py-1 hover:bg-brand"
    >
      {truncateAddress(address)}{' '}
      {isCopied ? <PiCheckBold size={16} /> : <PiCopySimpleBold size={16} />}
    </button>
  );
};

interface CopyAddressButtonProps {
  address: string;
}

import { useState } from 'react';
import { encodeAddress } from '@polkadot/util-crypto';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PiCaretDownBold } from 'react-icons/pi';
import accountImage from '@ewf/assets/images/account.png';
import { Button } from '@ewf/components/Button';
import { ConnectUserWallet } from '@ewf/components/ConnectUserWallet';
import { truncateAddress } from '@ewf/lib/utils';
import { AccountPanel } from './AccountPanel';
import { useConnectionStore } from '@ewf/stores/connection';

export const Account = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserWalletOpen, setIsUserWalletOpen] = useState(false);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const walletIsConnected = Boolean(isConnected && addressEWX);

  const connectWallet = () => setIsUserWalletOpen(true);

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    if (!newOpen) {
      // There is a bug in Radix UI when closing both a Select (EnvSelector) and a DropdownMenu elements,
      // where the pointer event is not re-enabled (is set to 'none'). This is a workaround to fix it.
      setTimeout(() => (document.body.style.pointerEvents = 'auto'), 50);
    }
  };

  return (
    <>
      <ConnectUserWallet isOpen={isUserWalletOpen} setIsOpen={setIsUserWalletOpen} />
      <DropdownMenu.Root open={isOpen} onOpenChange={handleOpenChange}>
        <DropdownMenu.Trigger asChild>
          {walletIsConnected ? (
            <Button
              className="flex h-[40px] items-center justify-between rounded-full pl-1 pr-4 shadow bg-button-gradient hover:opacity-80 focus-visible:outline"
              aria-label="Inspect account"
            >
              <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-white bg-white">
                <img src={accountImage} width={28} height={28} alt="Account" />
              </span>
              <span className="mx-2 text-lg">{truncateAddress(encodeAddress(addressEWX))}</span>
              <PiCaretDownBold size={16} />
            </Button>
          ) : (
            <Button className="w-[160px] rounded-full px-4 py-2 text-lg shadow bg-button-gradient hover:opacity-80">
              Connect
            </Button>
          )}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className="z-30 mt-3 radix-state-closed:animate-slide-up-fade-out radix-state-open:animate-slide-down-fade-in"
          align="end"
        >
          <AccountPanel isConnected={walletIsConnected} connectWallet={connectWallet} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};

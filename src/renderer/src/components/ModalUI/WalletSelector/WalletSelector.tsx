import { SunkenBox } from '@ewf/components/SunkenBox';
import walletConnectLogo from '@ewf/assets/logos/wallet-connect.svg';
import ledgetLogo from '@ewf/assets/logos/ledger.svg';
import { WalletButton } from './WalletButton';

export const WalletSelector = ({
  selectedWallet,
  setSelectedWallet,
  network,
}: Props): JSX.Element => {
  const selectWalletConnect = () => setSelectedWallet('wallet-connect');
  const selectLedger = () => setSelectedWallet('ledger');

  return (
    <div className="rounded-lg p-6 bg-popup-gradient">
      <SunkenBox className="mb-8 text-center">
        <p className="mb-1 text-lg font-bold text-white">
          Connect to {network === Chain.EWX ? 'EWX' : 'EWC'} Account
        </p>
        <p className="text-md text-font-subtle">Select your preferred wallet</p>
      </SunkenBox>
      <div className="grid grid-cols-2 gap-6">
        <WalletButton
          isSelected={selectedWallet === 'wallet-connect'}
          onSelect={selectWalletConnect}
        >
          <img src={walletConnectLogo} width={56} height={56} alt="Wallet connect" />
          <p>Wallet Connect</p>
        </WalletButton>
        <WalletButton
          disabled={true}
          isSelected={selectedWallet === 'ledger'}
          onSelect={selectLedger}
        >
          <img src={ledgetLogo} width={56} height={56} alt="Wallet connect" />
          <p>Ledger</p>
        </WalletButton>
      </div>
    </div>
  );
};

export type Wallet = 'wallet-connect' | 'ledger';
export const enum Chain {
  EWX = 'ewx',
  EWC = 'ewc',
}
export type Network = Chain.EWX | Chain.EWC;

interface Props {
  selectedWallet: Wallet;
  setSelectedWallet: (wallet: Wallet) => void;
  network: Network;
}

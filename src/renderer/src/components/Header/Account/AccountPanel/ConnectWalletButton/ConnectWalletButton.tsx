import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';

export const ConnectWalletButton = ({ connectWallet }: Props): React.ReactNode => {
  return (
    <div className="mb-6 rounded-lg p-4 bg-popup-gradient">
      <SunkenBox className="p-6 text-center">
        <p className="mb-4">Please connect your EWX wallet to begin using the platform</p>
        <Button
          onClick={connectWallet}
          size="small"
          className="w-full text-lg shadow bg-button-gradient hover:opacity-80"
        >
          Connect Wallet
        </Button>
      </SunkenBox>
    </div>
  );
};

interface Props {
  connectWallet: () => void;
}

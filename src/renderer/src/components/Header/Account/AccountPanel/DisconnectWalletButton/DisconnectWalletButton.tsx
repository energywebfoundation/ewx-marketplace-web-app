import { PiSignOutBold } from 'react-icons/pi';
import { AlertDialog } from '@ewf/components/AlertDialog';

export const DisconnectWalletButton = ({ disconnectWallet }: Props): React.ReactNode => {
  return (
    <AlertDialog
      title="Disconnect wallet?"
      description="You will need to reconnect your wallet to use certain features, such as lifting, lowering or subscribing."
      action={disconnectWallet}
    >
      <PiSignOutBold size={16} />
    </AlertDialog>
  );
};

interface Props {
  disconnectWallet: () => void;
}

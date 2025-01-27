import { useState } from 'react';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { WalletSelector, type Wallet, Network } from '@ewf/components/ModalUI/WalletSelector';
import { Button } from '@ewf/components/Button';

export const SelectWallet = ({ onClose, next, network }: Props): JSX.Element => {
  const [wallet, setWallet] = useState<Wallet>('wallet-connect');

  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <WalletSelector selectedWallet={wallet} setSelectedWallet={setWallet} network={network} />
      </section>
      <section className="flex justify-center">
        <Button onClick={() => next(wallet)} autoFocus>
          Connect
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onClose: () => void;
  next: (wallet: Wallet) => void;
  network: Network;
}

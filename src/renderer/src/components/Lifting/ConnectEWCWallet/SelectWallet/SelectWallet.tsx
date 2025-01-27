import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { WalletSelector, type Wallet, Network } from '@ewf/components/ModalUI/WalletSelector';
import { Stepper } from '@ewf/components/ModalUI/Stepper';

export const SelectWallet = ({ onNext, onClose, network }: Props): JSX.Element => {
  const [wallet, setWallet] = useState<Wallet>('wallet-connect');

  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <Stepper step={1} maxStep={3} />
      </section>
      <section className="mb-8">
        <WalletSelector selectedWallet={wallet} setSelectedWallet={setWallet} network={network} />
      </section>
      <section className="flex justify-center">
        <Button onClick={() => onNext(wallet)}>Connect</Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onClose: () => void;
  onNext: (wallet: Wallet) => void;
  network: Network;
}

import { useState, useEffect } from 'react';
import { Chain, type Wallet } from '@ewf/components/ModalUI/WalletSelector';
import { ConnectWC } from '@ewf/components/ConnectWC';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { SelectWallet } from './SelectWallet';
import { ConnectionError } from '@ewf/components/ConnectUserWallet/ConnectionError';
import { useConnectionStore } from '@ewf/stores/connection';

export type Step = 'select' | 'connectWC' | 'connectLedger' | 'error';

export const ConnectEWXWallet = ({ onConnect, onClose }: Props): JSX.Element => {
  const [step, setStep] = useState<Step>('select');
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const walletConnectModal = useConnectionStore((state) => state.walletConnectModal);

  const goToConnectionMethod = (wallet: Wallet) => {
    wallet === 'wallet-connect' ? setStep('connectWC') : setStep('connectLedger');
  };

  const connectionError = (errorMsg?: string) => {
    setStep('error');
    setErrorMsg(errorMsg);
  };

  useEffect(() => {
    if (!walletConnectModal) return;

    walletConnectModal.subscribeModal((state) => {
      if (!state.open) {
        setStep('select');
        onClose();
      }
    });
  }, [onClose]);

  const renderStep = (): JSX.Element => {
    if (step === 'select')
      return <SelectWallet onNext={goToConnectionMethod} onClose={onClose} network={Chain.EWX} />;
    if (step === 'connectWC')
      return (
        <ConnectWC
          chain={MARKETPLACE_CHAINS.EWX}
          onConnectionSuccess={onConnect}
          onConnectionError={connectionError}
        />
      );
    if (step === 'error') return <ConnectionError errorMsg={errorMsg} onClose={onClose} />;

    onClose();
    return <></>;
  };

  return renderStep();
};

interface Props {
  onConnect: () => void;
  onClose: () => void;
}

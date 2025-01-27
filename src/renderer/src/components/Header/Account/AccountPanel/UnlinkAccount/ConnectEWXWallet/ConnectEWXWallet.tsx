import { useState, useEffect } from 'react';
import { Chain, type Wallet } from '@ewf/components/ModalUI/WalletSelector';
import { ConnectWC } from '@ewf/components/ConnectWC';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { SelectWallet } from './SelectWallet';
import { ConnectionLoading } from './ConnectionLoading';
import { ConnectionError } from '@ewf/components/ConnectUserWallet/ConnectionError';
import { useConnectionStore } from '@ewf/stores/connection';

export type Step = 'select' | 'connectWC' | 'connectLedger' | 'loading' | 'error';

export const ConnectEWXWallet = ({ onConnect, onClose }: Props): JSX.Element => {
  const [step, setStep] = useState<Step>('select');
  const [isConnecting, setIsConnecting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const walletConnectModal = useConnectionStore((state) => state.walletConnectModal);

  const goToConnectionMethod = (wallet: Wallet) => {
    if (wallet === 'wallet-connect') {
      setStep('connectWC');
    }

    if (wallet === 'ledger') setStep('connectLedger');
  };

  const connectionError = (errorMsg?: string) => {
    setStep('error');
    setErrorMsg(errorMsg);
  };

  useEffect(() => {
    if (!walletConnectModal) return;

    walletConnectModal.subscribeModal((state) => {
      if (!state.open && step === 'connectWC') {
        isConnecting ? setStep('loading') : setStep('select');
      }
    });
  }, [step, isConnecting, walletConnectModal]);

  const renderStep = (): JSX.Element => {
    if (step === 'select')
      return <SelectWallet onNext={goToConnectionMethod} onClose={onClose} network={Chain.EWX} />;
    if (step === 'connectWC')
      return (
        <ConnectWC
          chain={MARKETPLACE_CHAINS.EWX}
          isConnectingCallback={() => setIsConnecting(true)}
          onConnectionSuccess={onConnect}
          onConnectionError={connectionError}
        />
      );
    if (step === 'loading') return <ConnectionLoading />;
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

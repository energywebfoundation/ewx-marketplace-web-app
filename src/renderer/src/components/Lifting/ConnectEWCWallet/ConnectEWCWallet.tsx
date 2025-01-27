import { useState, useEffect } from 'react';
import { useConnectionStore } from '@ewf/stores/connection';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { Chain, type Wallet } from '@ewf/components/ModalUI/WalletSelector';
import { ConnectWC } from '@ewf/components/ConnectWC';
import { ConnectionLoading } from '@ewf/components/ConnectUserWallet/ConnectionLoading';
import { SelectWallet } from './SelectWallet';
import { ConnectionError } from './ConnectionError';
import { ConnectLedger } from '@ewf/components/ConnectLedger';

export type Step = 'select' | 'connectWC' | 'connectLedger' | 'loading' | 'error';

export const ConnectEWCWallet = ({ onConnect, onClose: onConnectClose }: Props) => {
  const [step, setStep] = useState<Step>('select');
  const [isConnecting, setIsConnecting] = useState(false);
  const [errMsg, setErrMsg] = useState<string>();
  const walletConnectModal = useConnectionStore((state) => state.walletConnectModal);

  const onClose = () => {
    onConnectClose();
    setTimeout(() => setStep('select'), 300);
  };

  const goToConnectionMethod = (wallet: Wallet) => {
    if (wallet === 'wallet-connect') {
      setStep('connectWC');
    }

    if (wallet === 'ledger') {
      setStep('connectLedger');
    }
  };

  const connectionError = (msg?: string) => {
    setErrMsg(msg);
    setStep('error');
  };

  useEffect(() => {
    if (!walletConnectModal) return;

    walletConnectModal.subscribeModal((state) => {
      if (!state.open && step === 'connectWC') {
        isConnecting ? setStep('loading') : setTimeout(() => setStep('select'), 0);
      }

      if (!state.open && step === 'connectLedger') {
        setStep('select');
      }
    });
  }, [step, walletConnectModal, isConnecting]);

  const stepComponents: Record<Step, React.ReactNode> = {
    select: <SelectWallet onNext={goToConnectionMethod} onClose={onClose} network={Chain.EWC} />,
    connectWC: (
      <ConnectWC
        chain={MARKETPLACE_CHAINS.EWC}
        isConnectingCallback={() => setIsConnecting(true)}
        onConnectionSuccess={() => onConnect('wc')}
        onConnectionError={connectionError}
      />
    ),
    connectLedger: (
      <ConnectLedger
        chain={MARKETPLACE_CHAINS.EWC}
        onClose={onClose}
        onConnectionSuccess={() => onConnect('ledger')}
        onConnectionError={connectionError}
      />
    ),
    loading: <ConnectionLoading />,
    error: <ConnectionError onClose={onClose} msg={errMsg} />,
  };

  const renderComponent = () => {
    return stepComponents[step];
  };

  return renderComponent();
};

interface Props {
  onConnect: (metho: 'wc' | 'ledger') => void;
  onClose: () => void;
}

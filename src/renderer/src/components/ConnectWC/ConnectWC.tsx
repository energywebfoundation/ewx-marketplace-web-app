import { useEffect, useState } from 'react';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { useConnectionStore } from '@ewf/stores/connection';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { ConnectionLoading } from '@ewf/components/ConnectUserWallet/ConnectionLoading';

export const ConnectWC = ({
  chain,
  onConnectionSuccess,
  onConnectionError,
  isConnectingCallback,
}: Props) => {
  const [recentAttempt, setRecentAttempt] = useState<number>(0);
  const [isWaitingForConnection, setIsWaitingForConnection] = useState<boolean>(false);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const isConnected = useConnectionStore((state) => state.isConnected);
  const isConnectedEWC = useConnectionStore((state) => state.isConnectedEWC);
  const client = useConnectionStore((state) => state.client);
  const connect = useConnectionStore((state) => state.connect);
  const errorMsg = useConnectionStore((state) => state.errorMsg);

  useEffect(() => {
    if (!isWaitingForConnection) return;
    const intervalId = setInterval(() => {
      const wcmModal = document
        .querySelector('wcm-modal')
        ?.shadowRoot?.querySelector('wcm-modal-backcard');

      if (wcmModal) {
        setIsWaitingForConnection(false);
      }
    }, 200);

    return () => {
      clearInterval(intervalId);
    };
  }, [isWaitingForConnection]);

  // On component mount, open the WalletConnect QR code panel to connect the wallet.
  // Once the process is done, go to the next step.
  useEffect(() => {
    const openWalletConnectQR = async () => {
      const ewxAlreadyConnected = chain === MARKETPLACE_CHAINS.EWX && isConnected;
      const ewcAlreadyConnected = chain === MARKETPLACE_CHAINS.EWC && isConnectedEWC;
      // check if recent attempt was made within the last minute
      const hasRecentlyAttempted = recentAttempt > 0 && Date.now() - recentAttempt < 60000;
      if (hasRecentlyAttempted) {
        return;
      }

      const shouldAvoidConnect = ewxAlreadyConnected || ewcAlreadyConnected;

      /**
       * As we should not reconnect we can just call `onConnectionSuccess` to proceed
       */
      if (shouldAvoidConnect) {
        onConnectionSuccess();
        return;
      }

      setRecentAttempt(Date.now());
      try {
        setIsWaitingForConnection(true);
        await connect(walletConst.CHAINS_NAMESPACES[chain], isConnectingCallback);
        onConnectionSuccess();
      } catch (error) {
        console.error(error);
        const msg = error instanceof Error ? error?.message : undefined;
        onConnectionError(msg);
        useConnectionStore.setState({ errorMsg: undefined });
      } finally {
        setIsWaitingForConnection(false);
      }
    };

    openWalletConnectQR();
  }, [
    chain,
    connect,
    isConnected,
    isConnectedEWC,
    client,
    onConnectionSuccess,
    onConnectionError,
    isConnectingCallback,
    walletConst.CHAINS_NAMESPACES,
  ]);

  useEffect(() => {
    if (errorMsg) {
      onConnectionError(errorMsg);
      useConnectionStore.setState({ errorMsg: undefined });
    }
  }, [errorMsg, onConnectionError]);

  return isWaitingForConnection ? (
    <ConnectionLoading message="Please check your wallet..." />
  ) : null;
};

interface Props {
  chain: MARKETPLACE_CHAINS;
  isConnectingCallback?: () => void;
  onConnectionSuccess: () => void;
  onConnectionError: (msg?: string) => void;
}

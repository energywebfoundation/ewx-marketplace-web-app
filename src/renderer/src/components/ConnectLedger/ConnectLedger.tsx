import { useEffect } from 'react';
import { LedgerStatus } from '@main/entities/ledger';
import { MARKETPLACE_CHAINS } from '@ewf/stores/wallet-env';
import { useConnectionStore } from '@ewf/stores/connection';
import { useBalanceStore } from '@ewf/stores/balance';
import { formatLedgerError, useLedgerStore } from '@ewf/stores/ledger';
import { useApiServiceStore } from '@ewf/stores/api';
import { SunkenBox } from '@ewf/components/SunkenBox';
import {
  ProgressBadgeEWX,
  ProgressBadgeEthereum,
  ProgressBadgeUSB,
  ProgressBadgeVerify,
} from '@ewf/components/StatusBadge/ProgressBadge';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import Web3 from 'web3';
import { DEVICE_TYPE } from '@ewf/types/enums';

export const ConnectLedger = ({
  chain,
  onClose,
  onConnectionSuccess,
  onConnectionError,
}: Props) => {
  const workerApi = useApiServiceStore.getState().api;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const client = useConnectionStore((state) => state.client);
  const setBalanceEWC = useBalanceStore((state) => state.setBalanceEWC);
  const status = useLedgerStore((state) => state.status);

  // On component mount, open the WalletConnect QR code panel to connect the wallet.
  // Once the process is done, go to the next step.
  useEffect(() => {
    const isEWC = chain === MARKETPLACE_CHAINS.EWC;

    const openLedger = async () => {
      const shouldAvoidConnect = isConnected && !isEWC;
      if (!client || shouldAvoidConnect) return;

      try {
        const plugged = await workerApi.isDevicePlugged();
        if (!plugged) {
          onConnectionError('Please plug in or unlock your Ledger device');
          return;
        }

        const locked = await workerApi.isDeviceLocked();
        if (locked) {
          onConnectionError('Please unlock ledger device');
          return;
        }

        const { address, balance, errorStatus } = await workerApi.deviceConnect(
          DEVICE_TYPE.Ledger,
          chain,
        );

        if (errorStatus) {
          const errorMsg = formatLedgerError(errorStatus);
          onConnectionError(errorMsg);
          return;
        }

        useConnectionStore.setState({ addressEWC: address });
        setBalanceEWC({
          token: balance,
          base: Web3.utils.toWei(balance, 'ether'),
          symbol: 'EWT',
        });
        onConnectionSuccess();
      } catch (error) {
        console.error(error);

        const errorMsg =
          error instanceof Error
            ? error.message
            : error?.toString
            ? error.toString()
            : 'An unknown error occurred';
        onConnectionError(errorMsg);
      }
    };

    openLedger();
  }, []);

  const stepComponents: Partial<Record<LedgerStatus, React.ReactNode>> = {
    'open-application': (
      <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 ml-auto text-center">
          <p className="text-lg font-bold">Open Ethereum App on your Ledger Device</p>
        </SunkenBox>
        <SunkenBox className="flex justify-center p-8">
          <ProgressBadgeEthereum />
        </SunkenBox>
      </div>
    ),
    connecting: (
      <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 ml-auto text-center">
          <p className="text-lg font-bold">Connecting to Ledger Device</p>
        </SunkenBox>
        <SunkenBox className="flex justify-center p-8">
          <ProgressBadgeUSB />
        </SunkenBox>
      </div>
    ),
    'verify-address': (
      <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 ml-auto text-center">
          <p className="text-lg font-bold">Verify Address on Ledger Device</p>
        </SunkenBox>
        <SunkenBox className="flex justify-center p-8">
          <ProgressBadgeVerify />
        </SunkenBox>
      </div>
    ),
    'accept-transaction': (
      <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 ml-auto text-center">
          <p className="text-lg font-bold">Accept Transaction</p>
        </SunkenBox>
        <SunkenBox className="flex justify-center p-8">
          <ProgressBadgeVerify />
        </SunkenBox>
      </div>
    ),
    'executing-transaction': (
      <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 ml-auto text-center">
          <p className="text-lg font-bold">Executing Transaction...</p>
        </SunkenBox>
        <SunkenBox className="flex justify-center p-8">
          <ProgressBadgeEWX />
        </SunkenBox>
      </div>
    ),
  };

  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-primary-with-gray-90">
      <section className="flex w-full justify-end">
        <CloseButton onClick={onClose} />
      </section>
      {stepComponents[status] || (
        <div className="mt-8 rounded-lg p-6 bg-popup-gradient">
          <SunkenBox className="mb-4 ml-auto text-center">
            <p className="text-lg font-bold">Please Continue in Ledger device</p>
          </SunkenBox>
          <SunkenBox className="flex justify-center p-8">
            <ProgressBadgeUSB />
          </SunkenBox>
        </div>
      )}
    </div>
  );
};

interface Props {
  chain: MARKETPLACE_CHAINS;
  onClose?: () => void;
  onConnectionSuccess: () => void;
  onConnectionError: (msg?: string) => void;
}

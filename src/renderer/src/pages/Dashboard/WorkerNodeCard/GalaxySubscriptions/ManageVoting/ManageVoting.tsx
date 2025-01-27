import { useState, useEffect } from 'react';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { useLinkUpEwxWorkerStore } from '@ewf/stores/link-up-ewx-worker';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useWorkerExecutionStore } from '@ewf/stores/worker-execution';
import { formatPalletErrorMessage } from '@ewf/lib/utils';
import * as Dialog from '@ewf/components/Dialog';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { Download } from '@ewf/components/Staking/Download';
import { PromptVoting } from '@ewf/components/Staking/PromptVoting';
import { LinkWorkerAccount } from '@ewf/components/Staking/LinkWorkerAccount';
import { CheckingIsLinked } from '@ewf/components/Staking/CheckingIsLinked';
import { InputSeedPhrase } from '@ewf/components/Header/Account/AccountPanel/ImportWorkerAccount/InputSeedPhrase';
import { ConfirmSeedPhrase } from '@ewf/components/Staking/ConfirmSeedPhrase';
import { EnterPassword } from '@ewf/components/Staking/EnterPassword';
import { GeneratePassword } from '@ewf/components/Staking/GeneratePassword';
import { GenerateSeedPhrase } from '@ewf/components/Staking/GenerateSeedPhrase';
import { ResetPassword } from '@ewf/components/Staking/ResetPassword';
import { ConnectEWXWallet } from '@ewf/components/Staking/ConnectEWXWallet/ConnectEWXWallet';
import { PromptLocalRemoteWorker } from './PromptLocalRemoteWorker';
import { PromptNewWorkerAccount } from './PromptNewWorkerAccount';
import { RemoteWorkerAccount } from '@ewf/pages/Dashboard/WorkerNodeAccount/SetRemoteWorkerAccount';
import { useConnectionStore } from '@ewf/stores/connection';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useApiServiceStore } from '@ewf/stores/api';
import { JoinedWithRemoteWorker } from './JoinedWithRemoteWorker/JoinedWithRemoteWorker';
import { WorkerApi } from '@ewf/types/api';

type Step =
  | 'connect'
  | 'promptVoting'
  | 'promptLocalRemoteWorker'
  | 'remoteWorker'
  | 'promptNewWorkerAccount'
  | 'importWorkerAccount'
  | 'checkingMnemonic'
  | 'checkingMnemonicFailure'
  | 'login'
  | 'generatePasswordCreate'
  | 'generatePasswordImport'
  | 'generateSeedPhrase'
  | 'confirmSeedPhrase'
  | 'resetPassword'
  | 'checkingIsLinked'
  | 'joinWithRemoteWorker'
  | 'incorrectWorkerAccount'
  | 'linkWorker'
  | 'linkingWorker'
  | 'linkWorkerSuccess'
  | 'linkWorkerFailure'
  | 'download';

export const ManageVoting = ({
  workerId,
  workerName,
  isOpen,
  setIsOpen,
  onManageVotingClosed,
  fetchWorkerAddress,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [accountStatus, setAccountStatus] = useState<'available' | 'unavailable' | 'checking'>(
    'checking',
  );
  const [step, setStep] = useState<Step>('promptVoting');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [linkingTxUrl, setLinkingTxUrl] = useState('');
  const isConnected = useConnectionStore((state) => state.isConnected);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const linkAccountStatus = useLinkUpEwxWorkerStore((state) => state.status);
  const linkUpEWXWorker = useLinkUpEwxWorkerStore((state) => state.linkUpEWXWorker);
  const resetLinkAccount = useLinkUpEwxWorkerStore((state) => state.reset);
  const workerExecution = useWorkerExecutionStore((state) => state.status);
  const linkWorkerSuccessNotification = useNotificationStore(
    (state) => state.linkWorkerSuccessNotification,
  );
  const linkWorkerErrorNotification = useNotificationStore(
    (state) => state.linkWorkerErrorNotification,
  );
  const downloadWorkerErrorNotification = useNotificationStore(
    (state) => state.downloadWorkerErrorNotification,
  );

  const steps = {
    promptVoting: {
      connect: 'connect',
      login: 'login',
      promptLocalRemoteWorker: 'promptLocalRemoteWorker',
    },
    connect: {
      login: 'login',
      generatePasswordCreate: 'generatePasswordCreate',
    },
    promptLocalRemoteWorker: {
      remoteWorker: 'remoteWorker',
      promptNewWorkerAccount: 'promptNewWorkerAccount',
    },
    remoteWorker: {},
    promptNewWorkerAccount: {
      generatePasswordCreate: 'generatePasswordCreate',
      importWorkerAccount: 'importWorkerAccount',
    },
    importWorkerAccount: {
      checkingMnemonic: 'checkingMnemonic',
    },
    checkingMnemonic: {
      generatePasswordImport: 'generatePasswordImport',
      checkingMnemonicFailure: 'checkingMnemonicFailure',
    },
    checkingMnemonicFailure: {},
    login: {
      resetPassword: 'resetPassword',
      checkingIsLinked: 'checkingIsLinked',
    },
    resetPassword: {
      generatePasswordCreate: 'generatePasswordCreate',
    },
    generatePasswordCreate: {
      generateSeedPhrase: 'generateSeedPhrase',
    },
    generatePasswordImport: {},
    generateSeedPhrase: {
      confirmSeedPhrase: 'confirmSeedPhrase',
    },
    confirmSeedPhrase: {
      checkingIsLinked: 'checkingIsLinked',
    },
    checkingIsLinked: {
      linkWorker: 'linkWorker',
      download: 'download',
      incorrectWorkerAccount: 'incorrectWorkerAccount',
      joinWithRemoteWorker: 'joinWithRemoteWorker',
    },
    incorrectWorkerAccount: {},
    joinWithRemoteWorker: {},
    linkWorker: {
      linkingWorker: 'linkingWorker',
    },
    linkingWorker: {
      linkWorkerSuccess: 'linkWorkerSuccess',
      linkWorkerFailure: 'linkWorkerFailure',
    },
    linkWorkerSuccess: {
      download: 'download',
    },
    linkWorkerFailure: {},
    download: {},
  } as const satisfies Record<Step, Partial<Record<Step, Step>>>;

  const onClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setLinkingTxUrl('');
      setStep('promptVoting');
      resetLinkAccount();
    }, 300);

    if (onManageVotingClosed) onManageVotingClosed();
    // Delay to avoid screen flickering before animation ends
  };

  const checkIsLinked = async () => {
    setStep('checkingIsLinked');

    try {
      const linkStatus = await workerApi.workerEWXLinkStatus();

      if (linkStatus === 'not-linked') {
        setStep(steps.checkingIsLinked.linkWorker);
        return;
      }

      if (linkStatus === 'linked-to-current-worker') {
        workerExecution === 'local'
          ? setStep(steps.checkingIsLinked.download)
          : setStep(steps.checkingIsLinked.joinWithRemoteWorker);
        return;
      }

      if (linkStatus === 'linked-to-other-worker') {
        setStep(steps.checkingIsLinked.incorrectWorkerAccount);
      }
    } catch (e) {
      console.error(e);
      onClose();
    }
  };

  const onConnect = () => {
    accountStatus === 'available'
      ? checkIsLinked()
      : setStep(steps.promptVoting.promptLocalRemoteWorker);
  };

  const onCheckSeedPhraseCreate = async (seedPhrase: string) => {
    setStep(steps.importWorkerAccount.checkingMnemonic);
    try {
      const isValidMnemonic = mnemonicValidate(seedPhrase);
      if (isValidMnemonic) {
        setSeedPhrase(seedPhrase.split(' '));
        setStep(steps.checkingMnemonic.generatePasswordImport);
        return;
      }
      setStep(steps.checkingMnemonic.checkingMnemonicFailure);
    } catch (e) {
      if (e instanceof Error) {
        setErrorMsg(e.message);
      } else if (typeof e === 'object' && e?.['message']) {
        setErrorMsg(e['message']);
      }
      setStep(steps.checkingMnemonic.checkingMnemonicFailure);
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const checkAccount = async () => {
      setAccountStatus('checking');
      const isWalletAvailable = await workerApi.walletIsAvailable();
      setAccountStatus(isWalletAvailable ? 'available' : 'unavailable');
    };

    checkAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, workerId]);

  const stepComponents: Record<Step, React.ReactNode> = {
    promptVoting: (
      <PromptVoting
        onAccept={() => {
          workerApi.setVoting(workerId, true).catch(console.error);
          !isConnected
            ? setStep(steps.promptVoting.connect)
            : accountStatus === 'available'
            ? checkIsLinked()
            : setStep(steps.promptVoting.promptLocalRemoteWorker);
        }}
        onClose={onClose}
      />
    ),
    connect: <ConnectEWXWallet onConnect={onConnect} onClose={onClose} />,
    promptLocalRemoteWorker: (
      <PromptLocalRemoteWorker
        onLocalWorker={() => setStep(steps.promptLocalRemoteWorker.promptNewWorkerAccount)}
        onRemoteWorker={() => setStep(steps.promptLocalRemoteWorker.remoteWorker)}
        onClose={onClose}
      />
    ),
    remoteWorker: <RemoteWorkerAccount onClose={onClose} />,
    promptNewWorkerAccount: (
      <PromptNewWorkerAccount
        onGenerateAccount={() => setStep(steps.promptNewWorkerAccount.generatePasswordCreate)}
        onImportSeedPhrase={() => setStep(steps.promptNewWorkerAccount.importWorkerAccount)}
        onClose={onClose}
      />
    ),
    importWorkerAccount: (
      <InputSeedPhrase onCheckSeedPhrase={onCheckSeedPhraseCreate} onClose={onClose} />
    ),
    checkingMnemonic: <div>Checking mnemonic...</div>,
    checkingMnemonicFailure: (
      <TxFailure onClose={onClose} message="Mnemonic could not be validated" />
    ),
    generatePasswordImport: (
      <GeneratePassword
        seedPhrase={seedPhrase}
        buttonText="Import Worker Node Account"
        onPasswordCreated={() => {
          fetchWorkerAddress();
          checkIsLinked();
        }}
        onClose={onClose}
      />
    ),
    generatePasswordCreate: (
      <GeneratePassword
        seedPhrase={seedPhrase}
        buttonText={isResetPassword ? 'Reset Password' : 'Create Worker Node Account'}
        onPasswordCreated={(createdSeedPhrase: string[]) => {
          setSeedPhrase(createdSeedPhrase);
          isResetPassword
            ? checkIsLinked()
            : setStep(steps.generatePasswordCreate.generateSeedPhrase);
        }}
        onClose={onClose}
      />
    ),
    generateSeedPhrase: (
      <GenerateSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseCopied={() => setStep(steps.generateSeedPhrase.confirmSeedPhrase)}
        onGoBack={() => setStep('generatePasswordCreate')}
        onClose={onClose}
      />
    ),
    confirmSeedPhrase: (
      <ConfirmSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseConfirmed={() => {
          fetchWorkerAddress();
          checkIsLinked();
        }}
        onClose={onClose}
      />
    ),
    login: (
      <EnterPassword
        onPasswordEntered={checkIsLinked}
        onPasswordForgotten={() => setStep(steps.login.resetPassword)}
        onClose={onClose}
      />
    ),
    resetPassword: (
      <ResetPassword
        onPasswordReseted={(seedPhrase: string[]) => {
          setSeedPhrase(seedPhrase);
          setIsResetPassword(true);
          setStep(steps.resetPassword.generatePasswordCreate);
        }}
        onClose={onClose}
      />
    ),
    checkingIsLinked: <CheckingIsLinked />,
    incorrectWorkerAccount: (
      <TxFailure
        message="Your EWX account is linked to a different worker account than the one you have installed. Please, import the correct worker account."
        onClose={onClose}
      />
    ),
    joinWithRemoteWorker: <JoinedWithRemoteWorker onClose={onClose} />,
    linkWorker: (
      <LinkWorkerAccount
        onLink={async () => {
          setStep(steps.linkWorker.linkingWorker);
          try {
            await linkUpEWXWorker(async ({ status, errorMsg, blockHash }) => {
              if (status === 'success') {
                const txUrl = `${walletConst.ewxExplorerUrl}/${blockHash}`;
                setLinkingTxUrl(txUrl);
                setStep(steps.linkingWorker.linkWorkerSuccess);
                linkWorkerSuccessNotification();
              } else {
                setErrorMsg(
                  errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred',
                );
                linkWorkerErrorNotification();
                setStep(steps.linkingWorker.linkWorkerFailure);
              }
            });
          } catch (error) {
            console.error(error);
            if (error instanceof Error) {
              setErrorMsg(error.message);
            } else if (typeof error === 'object' && error?.['message']) {
              setErrorMsg(error['message']);
            } else {
              setErrorMsg('An unknown error occurred');
            }
            setStep(steps.linkingWorker.linkWorkerFailure);
            linkWorkerErrorNotification();
          }
        }}
        onClose={onClose}
      />
    ),
    linkingWorker: <TxExecuting operation="link-worker" txStatus={linkAccountStatus} />,
    linkWorkerSuccess: (
      <TxSuccess
        operation="link-worker"
        txUrl={linkingTxUrl}
        onNext={() => setStep(steps.linkWorkerSuccess.download)}
        onClose={onClose}
      />
    ),
    linkWorkerFailure: <TxFailure onClose={onClose} message={errorMsg} />,
    download: (
      <Download
        onClose={onClose}
        onDownload={async () => {
          try {
            // Success notification is handled in the Notification provider file via event listener
            await workerApi.workerStatus(workerId, true);
          } catch (e) {
            console.error('ERROR: ', e);
            downloadWorkerErrorNotification(workerName);
          } finally {
            onClose();
          }
        }}
      />
    ),
  };

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Portal>
        <Dialog.Overlay>
          <Dialog.Content forceMount>{stepComponents[step]}</Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

interface Props {
  workerId: WorkerApi.WorkerId;
  workerName: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onManageVotingClosed?: () => void;
  fetchWorkerAddress: () => void;
}

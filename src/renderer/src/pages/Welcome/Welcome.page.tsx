import discordLogo from '@ewf/assets/icons/discord-gradient.svg';
import githubLogo from '@ewf/assets/icons/github-gradient.svg';
import linkedinLogo from '@ewf/assets/icons/linkedin-gradient.svg';
import globeIcon from '@ewf/assets/icons/web-gradient.svg';
import twitterLogo from '@ewf/assets/icons/x-gradient.svg';
import ewxFullLogo from '@ewf/assets/logos/ewx-full.svg';
import { Button } from '@ewf/components/Button';
import * as Dialog from '@ewf/components/Dialog';
import { PoweredByEW } from '@ewf/components/PoweredByEW';
import { ConfirmSeedPhrase } from '@ewf/components/Staking/ConfirmSeedPhrase';
import { EnterPassword } from '@ewf/components/Staking/EnterPassword';
import { GeneratePassword } from '@ewf/components/Staking/GeneratePassword';
import { GenerateSeedPhrase } from '@ewf/components/Staking/GenerateSeedPhrase';
import { ResetPassword } from '@ewf/components/Staking/ResetPassword';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { routerConst } from '@ewf/lib/router';
import { IpcChannel } from '@main/helpers/ipc';
import { INIT_STATUS, handleInitResponse } from '@main/helpers/init-const';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorage, SkipTutorial } from '@main/helpers/localstorage-const';
import { useNotificationStore } from '@ewf/stores/notifications';
import { useConnectionStore } from '@ewf/stores/connection';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { useDeepLink } from '@ewf/stores/deep-link';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';

export const WelcomePage = (): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  type Step =
    | 'approve'
    | 'confirm'
    | 'success'
    | 'failure'
    | 'login'
    | 'generatePassword'
    | 'generateSeedPhrase'
    | 'confirmSeedPhrase'
    | 'resetPassword';
  const [isDone, setIsDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [step, setStep] = useState<Step>('login');
  const reloadEnv = useWalletEnvStore((state) => state.reloadEnv);
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const wcSessionReload = useConnectionStore((state) => state.wcSessionReload);
  const client = useConnectionStore((state) => state.client);
  const firstTimeDownloadNotification = useNotificationStore(
    (state) => state.firstTimeDownloadNotification,
  );
  const navigate = useNavigate();

  const bottomItemLinks = [
    {
      icon: twitterLogo,
      link: 'https://twitter.com/energywebx',
      alt: 'Twitter',
    },
    {
      icon: globeIcon,
      link: 'https://www.energywebx.com/',
      alt: 'Website',
    },
    {
      icon: githubLogo,
      link: 'https://github.com/energywebfoundation/ewx-marketplace',
      alt: 'Github',
    },
    {
      icon: linkedinLogo,
      link: 'https://www.linkedin.com/company/energy-web-foundation',
      alt: 'Linkedin',
    },
    {
      icon: discordLogo,
      link: 'https://discord.gg/psraNwqGqp',
      alt: 'Discord',
    },
  ] as const;

  const onClose = () => {
    setIsOpen(false);
  };

  const steps = {
    success: {},
    failure: {},
    approve: {
      confirm: 'confirm',
    },
    confirm: {
      approve: 'approve',
    },
    login: {
      resetPassword: 'resetPassword',
    },
    resetPassword: {
      generatePassword: 'generatePassword',
      login: 'login',
    },
    generatePassword: {
      generateSeedPhrase: 'generateSeedPhrase',
      approve: 'approve',
    },
    generateSeedPhrase: {
      confirmSeedPhrase: 'confirmSeedPhrase',
    },
    confirmSeedPhrase: {},
  } as const satisfies Record<Step, Partial<Record<Step, Step>>>;

  const stepComponents: Record<Step, React.ReactNode> = {
    success: <TxSuccess operation="staking" onNext={() => {}} onClose={onClose} />,
    generatePassword: (
      <GeneratePassword
        seedPhrase={seedPhrase}
        buttonText={seedPhrase ? 'Reset Password' : 'Create Worker Node Account'}
        onPasswordCreated={async (createdSeedPhrase: string[], isReset) => {
          setSeedPhrase(createdSeedPhrase);
          if (isReset) {
            await workerApi.continueAppInit();
            setIsOpen(false);
          } else setStep(steps.generatePassword.generateSeedPhrase);
        }}
        onClose={() => {}}
      />
    ),
    generateSeedPhrase: (
      <GenerateSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseCopied={() => setStep(steps.generateSeedPhrase.confirmSeedPhrase)}
        onGoBack={() => setStep('generatePassword')}
        onClose={() => {}}
      />
    ),
    confirmSeedPhrase: (
      <ConfirmSeedPhrase
        seedPhrase={seedPhrase}
        onSeedPhraseConfirmed={() => {}}
        onClose={() => {}}
      />
    ),
    login: (
      <EnterPassword
        onPasswordEntered={async () => {
          await workerApi.continueAppInit();
          setIsOpen(false);
        }}
        onPasswordForgotten={() => setStep(steps.login.resetPassword)}
        onClose={async () => {}}
        isWelcomePage={true}
      />
    ),
    resetPassword: (
      <ResetPassword
        onPasswordReseted={(seedPhrase: string[]) => {
          setSeedPhrase(seedPhrase);
          setStep(steps.resetPassword.generatePassword);
        }}
        onClose={() => setStep(steps.resetPassword.login)}
      />
    ),
    approve: undefined,
    confirm: undefined,
    failure: undefined,
  };

  const handleInitCompleted = async () => {
    const skipTutorial = localStorage.getItem(LocalStorage.SkipTutorial);
    const skipDownloadNotification = localStorage.getItem(LocalStorage.SkipDownloadNotification);

    if (!skipTutorial) {
      const lastEWXAccount = await workerApi.getLastEWXAccount();
      const subscriptionFlags = await workerApi.getSubscriptionFlags();
      const workerAddress = window.deepLinkWorkerAddress;

      if (workerAddress) {
        useDeepLink.setState({
          deepLink: `ewx-marketplace://workerAddress=${workerAddress}`,
          value: workerAddress,
        });
      }
      if (lastEWXAccount.ewxAddress && (subscriptionFlags.hasSubscription || workerAddress)) {
        // Has last EWX account used and has subscription -> Redirect to Dashboard
        navigate(routerConst.Dashboard);
      } else {
        // No EWX account used and/or has subscription -> Redirect to Discover Page
        navigate(routerConst.Discover);
      }
    } else {
      // First time users are allowed to view tutorials
      // Set SkipTutorial flag to true so that
      //    users will be automatically redirected to appropriate screens in the succeeding app launches
      localStorage.setItem(LocalStorage.SkipTutorial, SkipTutorial.Yes);
    }

    if (!skipDownloadNotification) {
      firstTimeDownloadNotification();
      localStorage.setItem(LocalStorage.SkipDownloadNotification, 'true');
    }
  };

  useEffect(() => {
    workerApi?.appInit().then();
    if (isElectron()) {
      window.Api.on(IpcChannel.appInitCompleted, (response) => {
        setIsDone(true);
        setLoadingMessage(handleInitResponse(response));
        handleInitCompleted();
      });
      window.Api.on(IpcChannel.appInitError, (response) => {
        setLoadingMessage(handleInitResponse(response));
      });
      window.Api.on(IpcChannel.appInitProgress, ([response, data]) => {
        if (response === INIT_STATUS.Reload) {
          reloadEnv(data);
        }
        setLoadingMessage(handleInitResponse(response));
      });
      window.Api.on(IpcChannel.appInitWorker, async () => {
        // We check if the worker is running locally or remotely
        const isWorkerLocal = await workerApi.isRunLocal();

        if (isWorkerLocal) {
          setIsOpen(true);
        } else {
          // If worker is remote, we don't prompt for password and continue the app init
          await workerApi.walletInit('');
          await workerApi.continueAppInit();
          setIsOpen(false);
        }
      });

      // Clean all listeners when component unmounts
      return () => {
        window.Api.removeAllListeners(IpcChannel.appInitCompleted);
        window.Api.removeAllListeners(IpcChannel.appInitError);
        window.Api.removeAllListeners(IpcChannel.appInitProgress);
        window.Api.removeAllListeners(IpcChannel.appInitWorker);
      };
    } else {
      setIsDone(true);
    }
  }, []);

  useEffect(() => {
    if (client) wcSessionReload();
  }, [client, walletConst]);

  return (
    <>
      <section className="flex h-[100vh] items-center bg-[url('@ewf/assets/images/background-gradient.png')] bg-[length:100%_100%] bg-no-repeat">
        <div className="fixed left-0 top-0 z-0 h-full w-[800px] bg-gradient-to-r from-black from-60% 2xl:w-[calc(50%+400px)]"></div>
        <div className="relative ml-8 flex h-full flex-col p-4 lg:max-h-[600px] xl:px-16 2xl:max-w-[1024px]">
          <div className="mb-10 w-[326px]">
            <div className="mb-8">
              <img src={ewxFullLogo} alt="EWX" width={70} height={24} />
            </div>
            <h1 className="text-3xl leading-snug">Welcome to Energy Web X</h1>
            <h1 className="text-3xl leading-snug text-gradient">Worker Nodes</h1>
            <p className="mt-4 font-primary-light text-lg">{loadingMessage}</p>
          </div>
          <div className="flex gap-4">
            <Link
              className={clsx({
                'pointer-events-none': !isDone,
                'opacity-30': !isDone,
              })}
              to={routerConst.Discover}
            >
              <Button disabled={!isDone}>Launch the App</Button>
            </Link>
            <Link to="https://www.energywebx.com/" target="_blank">
              <Button color="outlined">Visit Website</Button>
            </Link>
          </div>
          <div className="flex flex-grow flex-col justify-end">
            <div className="mb-5">
              <PoweredByEW />
            </div>
            <div className="flex gap-4">
              {bottomItemLinks.map(({ icon, link, alt }) => (
                <Link to={link} key={icon} target="_blank">
                  <img src={icon} alt={alt} width={32} height={32} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Dialog.Root open={isOpen}>
        <Dialog.Portal>
          <Dialog.Overlay>
            <Dialog.Content forceMount>{stepComponents[step]}</Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
};

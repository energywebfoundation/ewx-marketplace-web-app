import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { PiEyeBold, PiEyeSlashBold } from 'react-icons/pi';
import { useApiServiceStore } from '@ewf/stores/api';

export const EnterPassword = ({
  onPasswordEntered,
  onPasswordForgotten,
  onClose,
  isWelcomePage = false,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const toggleShowPasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password') as string;

    try {
      const workerAddress = await workerApi.walletInit(password);
      setErrorMsg(undefined);
      await onPasswordEntered(workerAddress);
    } catch (e) {
      console.error(e);
      let message = 'Something went wrong';
      if (e instanceof Error && e.message.includes('Error: ')) {
        message = e.message.split('Error: ')[1];
      }
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer>
      {!isWelcomePage && (
        <section className="mb-8 flex justify-end">
          <CloseButton onClick={onClose} />
        </section>
      )}
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 text-center">
          <h3 className="text-lg font-bold">Unlock Worker Node</h3>
          <hr className="my-2 border border-gray-70" />
          <p>
            You have already created a worker node account. In order to continue result submission
            please enter your password to unlock your worker node.
          </p>
        </SunkenBox>
        <SunkenBox>
          <form id="enterPasswordForm" onSubmit={onPasswordSubmit}>
            <label htmlFor="password" className="ml-1 text-sm text-font-subtle">
              Enter password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPasswordInput ? 'text' : 'password'}
                name="password"
                placeholder="*****"
                autoFocus
                disabled={isLoading}
                className={clsx({
                  'mt-1': true,
                  '!outline-red': errorMsg,
                  'opacity-80': isLoading,
                })}
              />
              <button
                tabIndex={-1} // To avoid focus on keyboard tab
                type="button"
                onClick={toggleShowPasswordInput}
                className="absolute right-4 top-6 -translate-y-1/2"
              >
                {showPasswordInput ? <PiEyeBold /> : <PiEyeSlashBold />}
              </button>
              {errorMsg ? <p className="ml-1 mt-0.5 text-sm text-red">{errorMsg}</p> : null}
              <button
                type="button"
                onClick={onPasswordForgotten}
                className="ml-auto mt-2 w-full border-none text-right text-sm text-teal hover:underline"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button type="submit" form="enterPasswordForm" disabled={isLoading}>
          Continue
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onPasswordEntered: (workerAddress: string) => void;
  onPasswordForgotten: () => void;
  onClose: () => void;
  isWelcomePage?: boolean;
}

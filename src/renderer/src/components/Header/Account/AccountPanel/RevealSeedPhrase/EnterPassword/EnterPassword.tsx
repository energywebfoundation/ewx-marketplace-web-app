import clsx from 'clsx';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { PiEyeBold, PiEyeSlashBold } from 'react-icons/pi';
import { useState } from 'react';

export const EnterPassword = ({
  isLoading,
  errorMsg,
  onPasswordEntered,
  onClose,
}: Props): React.ReactNode => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);

  const toggleShowPasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password') as string;
    onPasswordEntered(password);
  };

  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 text-center">
          <h3 className="text-lg font-bold">Enter Password</h3>
          <hr className="my-2 border border-gray-70" />
          <p>
            In order to export your worker node account mnemonic, enter the password. This is the
            same password that you have used to create worker node account mnemonic.
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
                placeholder="Password"
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
  isLoading: boolean;
  errorMsg: string | undefined;
  onPasswordEntered: (workerAddress: string) => void;
  onClose: () => void;
}

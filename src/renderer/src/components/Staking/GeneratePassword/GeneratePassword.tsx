import { useState } from 'react';
import clsx from 'clsx';
import { PiEyeBold, PiEyeSlashBold } from 'react-icons/pi';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { useApiServiceStore } from '@ewf/stores/api';

type Validation = {
  length: boolean;
  hasNoSpaces: boolean;
  hasNumber: boolean;
  hasUpperLowerCase: boolean;
};

export const GeneratePassword = ({
  seedPhrase,
  buttonText = 'Create Worker Node Account',
  onPasswordCreated,
  onClose,
}: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [validation, setValidation] = useState<Validation>();
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showConfirmPasswordInput, setShowConfirmPasswordInput] = useState(false);

  const requirements: { constraint: keyof Validation; label: string }[] = [
    {
      constraint: 'length',
      label: 'Must have 8-16 characters',
    },
    {
      constraint: 'hasNoSpaces',
      label: 'Must not contain any spaces',
    },
    {
      constraint: 'hasNumber',
      label: 'Must contain at least one number',
    },
    {
      constraint: 'hasUpperLowerCase',
      label: 'Must contain at least one uppercase and lowercase letter',
    },
  ];

  const toggleShowPasswordInput = () => {
    setShowPasswordInput(!showPasswordInput);
  };

  const toggleShowConfirmPasswordInput = () => {
    setShowConfirmPasswordInput(!showConfirmPasswordInput);
  };

  const validatePassword = (password: string): boolean => {
    const isBetween8And16Characters = password.length >= 8 && password.length <= 16;
    const hasNoSpaces = !password.includes(' ');
    const hasNumber = /\d/.test(password);
    const hasUpperLowerCase = /[a-z]/.test(password) && /[A-Z]/.test(password);

    setValidation({
      length: isBetween8And16Characters,
      hasNoSpaces,
      hasNumber,
      hasUpperLowerCase,
    });

    return isBetween8And16Characters && hasNoSpaces && hasNumber && hasUpperLowerCase;
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;

    if (!password) {
      setValidation(undefined);
      return;
    }

    validatePassword(password);
  };

  const onPasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const password = data.get('password') as string;
    const confirmPassword = data.get('confirmPassword') as string;

    if (!password || !confirmPassword) {
      setErrorMsg('Please fill in both password fields');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (!validatePassword(password)) {
      setErrorMsg('Password does not meet password requirements');
      return;
    }

    setIsLoading(true);

    // Create password
    try {
      const mnemonic = seedPhrase.length > 0 ? seedPhrase.join(' ') : undefined;
      const { seed } = await workerApi.walletCreate(password, confirmPassword, mnemonic);

      if (seed) {
        setErrorMsg(undefined);
        onPasswordCreated(seed.split(' '), Boolean(mnemonic));
      } else {
        setErrorMsg('Something went wrong');
      }
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
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 text-center">
          <h3 className="text-lg font-bold">Create a password</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="text-sm">
            This password is used for securely storing your worker node account mnemonic, you will
            need to enter this password when application restarts in order to continue result
            submission.
          </p>
        </SunkenBox>
        <form id="generatePasswordForm" onSubmit={onPasswordSubmit}>
          <SunkenBox className="mb-6">
            <label htmlFor="password" className="ml-1 text-sm text-font-subtle">
              Enter password
            </label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPasswordInput ? 'text' : 'password'}
                name="password"
                placeholder="Be sure to use a strong password"
                disabled={isLoading}
                onChange={onPasswordChange}
              />
              <button
                tabIndex={-1} // To avoid focus on keyboard tab
                type="button"
                onClick={toggleShowPasswordInput}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPasswordInput ? <PiEyeBold /> : <PiEyeSlashBold />}
              </button>
            </div>
            <p className="mb-2 ml-1 mt-1 text-sm">Password requirements:</p>
            <ul className="mb-2 list-disc space-y-1 pl-4">
              {requirements.map(({ constraint, label }) => (
                <li
                  key={constraint}
                  className={clsx({
                    'text-sm': true,
                    'text-font': validation === undefined,
                    'text-green': validation && validation[constraint],
                    'text-red': validation && validation[constraint] === false,
                  })}
                >
                  {label}
                </li>
              ))}
            </ul>
          </SunkenBox>
          <SunkenBox>
            <label htmlFor="confirmPassword" className="ml-1 text-sm text-font-subtle">
              Re-enter password for verification
            </label>
            <div className="relative mt-1">
              <Input
                id="confirmPassword"
                type={showConfirmPasswordInput ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Use the same password as above"
                disabled={isLoading}
                className={clsx({
                  '!outline-red': errorMsg,
                })}
              />
              <button
                tabIndex={-1}
                type="button"
                onClick={toggleShowConfirmPasswordInput}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirmPasswordInput ? <PiEyeBold /> : <PiEyeSlashBold />}
              </button>
            </div>
            {errorMsg ? <span className="ml-1 mt-0.5 text-sm text-red">{errorMsg}</span> : null}
          </SunkenBox>
        </form>
      </section>
      <section className="flex justify-center">
        <Button type="submit" form="generatePasswordForm" disabled={isLoading}>
          {isLoading ? 'Storing password' : buttonText}
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  seedPhrase: string[];
  buttonText?: 'Reset Password' | 'Create Worker Node Account' | 'Import Worker Node Account';
  onPasswordCreated: (seedPhrase: string[], isReset: boolean) => void;
  onClose: () => void;
}

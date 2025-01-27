import { useState } from 'react';
import clsx from 'clsx';
import { Button } from '@ewf/components/Button';
import { Input } from '@ewf/components/Input';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { SelectCountry } from './SelectCountry';

export const SignUp = ({ onEnterData, onClose }: Props): React.ReactNode => {
  const [country, setCountry] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | undefined>();

  const onSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(undefined);

    const data = new FormData(e.currentTarget);
    const name = data.get('name')?.toString().trim() || '';

    if (!name) {
      setErrorMsg('Please fill name');
      return;
    }

    onEnterData(name, country);
  };

  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 text-center">
          <h3 className="text-lg font-bold">Sign Up as an operator</h3>
        </SunkenBox>
        <SunkenBox>
          <form id="operatorSignupForm" className="flex flex-col" onSubmit={onSumbit}>
            <label htmlFor="password" className="ml-1 text-sm text-font-subtle">
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Type your name"
              className={clsx({
                'mt-1': true,
                '!outline-red': errorMsg,
              })}
            />
            {errorMsg ? <p className="ml-1 mt-1 text-sm text-red">{errorMsg}</p> : null}
            <label htmlFor="password" className="mb-1 mt-4 text-sm text-font-subtle">
              Country of Residence
            </label>
            <SelectCountry onCountrySelected={setCountry} />
          </form>
        </SunkenBox>
      </section>
      <section className="mt-8 flex justify-center">
        <Button type="submit" form="operatorSignupForm">
          Continue
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onEnterData: (name: string, country: string) => void;
  onClose: () => void;
}

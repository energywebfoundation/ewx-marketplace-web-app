import { useState } from 'react';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { pasteTextFromClipboard } from '@ewf/lib/utils';
import { useApiServiceStore } from '@ewf/stores/api';

export const ResetPassword = ({ onPasswordReseted, onClose }: Props): React.ReactNode => {
  const workerApi = useApiServiceStore.getState().api;
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const SEED_PHRASE_LENGTH = 12;

  const onPaseSeedPhrase = async () => {
    const seedPhrase = await pasteTextFromClipboard();

    if (!seedPhrase) {
      setErrorMsg('Clipboard is empty');
      return;
    }

    const words = seedPhrase.split(' ');
    if (words.length !== SEED_PHRASE_LENGTH) {
      setErrorMsg('Mnemonic must have 12 words');
      return;
    }

    // Fill the input fields with the words
    Array.from({ length: SEED_PHRASE_LENGTH }).forEach((_, index) => {
      const inputWord = document.querySelector<HTMLInputElement>(`input[name="word-${index}"]`);
      inputWord?.setAttribute('value', words[index]);
    });

    setErrorMsg(undefined);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const inputSeedPhrase = Array.from({ length: SEED_PHRASE_LENGTH }).map((_, index) => {
      const inputWord = data.get(`word-${index}`)?.toString().trim() || '';
      return inputWord;
    });

    const isIncomplete = inputSeedPhrase.some((word) => word === '');
    if (isIncomplete) {
      setErrorMsg('Please fill all 12 words');
      return;
    }

    try {
      const isCorrectSeedPhrase = await workerApi.walletCheckMnemonic(inputSeedPhrase.join(' '));

      if (!isCorrectSeedPhrase) {
        setErrorMsg('Incorrect mnemonic');
        return;
      }

      setErrorMsg(undefined);
      onPasswordReseted(inputSeedPhrase);
    } catch (e) {
      console.error(e);
      let message = 'Something went wrong';
      if (e instanceof Error && e.message.includes('Error: ')) {
        message = e.message.split('Error: ')[1];
      }
      setErrorMsg(message);
    }
  };

  return (
    <ModalContainer className="w-auto max-w-[600px]">
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 pt-6">
          <h3 className="text-center text-lg font-bold">Enter worker node account mnemonic</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="text-center text-font-subtle">
            Please enter each word in the order it was presented to you
          </p>
        </SunkenBox>
        <SunkenBox>
          <form id="seedPhraseForm" className="grid grid-cols-3 gap-4" onSubmit={onSubmit}>
            {Array.from({ length: SEED_PHRASE_LENGTH }).map((_, index) => (
              <div key={index} className="flex items-center gap-1">
                <span className="min-w-[18px]">{index + 1}.</span>
                <input
                  name={`word-${index}`}
                  className="flex h-[38px] min-w-0 flex-grow rounded-full bg-gray-95 px-4 py-2 focus:outline focus:outline-1 focus:outline-brand"
                />
              </div>
            ))}
          </form>
        </SunkenBox>
      </section>
      {errorMsg ? <p className="ml-6 mt-2 text-red">{errorMsg}</p> : null}
      <section className="mt-8 flex justify-center gap-8">
        <Button color="outlined" onClick={onPaseSeedPhrase}>
          Paste from clipboard
        </Button>
        <Button type="submit" form="seedPhraseForm">
          Continue
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onPasswordReseted: (seedPhrase: string[]) => void;
  onClose: () => void;
}

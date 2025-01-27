import { useState } from 'react';
import clsx from 'clsx';
import { pasteTextFromClipboard } from '@ewf/lib/utils';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';

export const InputSeedPhrase = ({ onCheckSeedPhrase, onClose }: Props): React.ReactNode => {
  const SEED_PHRASE_LENGTH = 12;
  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | undefined>();
  const isAllWordsFilled = seedPhrase.length === SEED_PHRASE_LENGTH && !seedPhrase.includes('');

  const pasteSeedPhrase = async () => {
    const text = await pasteTextFromClipboard();
    const words = text.split(' ');

    if (words.length > 0 && words.length <= SEED_PHRASE_LENGTH) {
      setSeedPhrase(words);
      setErrorMsg(undefined);
    } else {
      setErrorMsg('Mnemonic has more than 12 words');
      console.error(words);
    }
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = value;
    setSeedPhrase(newSeedPhrase);
    setErrorMsg(undefined);
  };

  const onContinue = () => {
    const fullSeedPhrase = seedPhrase.join(' ');
    onCheckSeedPhrase(fullSeedPhrase);
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
            Please write each word in the order it was presented to you or paste from the clipboard
          </p>
        </SunkenBox>
        <SunkenBox className="mb-4 grid grid-cols-3 gap-4">
          {Array.from({ length: SEED_PHRASE_LENGTH }).map((_, index) => (
            <div key={index} className="flex items-center gap-1">
              <div className="w-[18px]">{index + 1}.</div>
              <input
                value={seedPhrase[index] || ''}
                onChange={(e) => onInputChange(e, index)}
                className="h-[38px] min-w-0 rounded-full bg-gray-95 px-4 outline outline-1 outline-gray-60 focus:outline-brand"
              />
            </div>
          ))}
        </SunkenBox>
      </section>
      <p
        className={clsx({
          'ml-6 mt-2 text-red': true,
          hidden: !errorMsg,
        })}
      >
        {errorMsg}
      </p>
      <section className="mt-8 flex justify-center gap-8">
        <Button color="outlined" onClick={pasteSeedPhrase}>
          Paste from clipboard
        </Button>
        <Button disabled={!isAllWordsFilled || Boolean(errorMsg)} onClick={onContinue}>
          Continue
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onCheckSeedPhrase: (seedPhrase: string) => void;
  onClose: () => void;
}

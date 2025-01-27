import { useState, useMemo } from 'react';
import clsx from 'clsx';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';

// Because a word can be repeated, we need to also keep track of the index
// to make sure we are selecting the correct word.
type Word = { value: string; index: number };

export const ConfirmSeedPhrase = ({
  seedPhrase,
  onSeedPhraseConfirmed,
  onClose,
}: Props): React.ReactNode => {
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);
  const [isError, setIsError] = useState(false);
  const isAllWordsFilled = selectedWords.length === seedPhrase.length;

  const shuffledSeedPhrase: Word[] = useMemo(
    () =>
      seedPhrase
        .map((value, index) => ({ value, sort: Math.random(), index }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value, index }) => ({ value, index })),
    [seedPhrase],
  );

  const isSelectedWord = ({ value, index }: Word): boolean => {
    return selectedWords.some((word) => word.value === value && word.index === index);
  };

  const selectWord = ({ value, index }: Word) => {
    setSelectedWords((prev) => [...prev, { value, index }]);
  };

  const undoWord = () => {
    setSelectedWords((prev) => prev.slice(0, prev.length - 1));
  };

  const checkSeedPhraseIsCorrect = () => {
    const originalSeedPhrase = seedPhrase.join(' ');
    const selectedSeedPhrase = selectedWords.map((word) => word.value).join(' ');
    const isCorrect = originalSeedPhrase === selectedSeedPhrase;

    if (isCorrect) {
      setIsError(false);
      onSeedPhraseConfirmed();
    } else {
      setIsError(true);
    }
  };

  return (
    <ModalContainer className="w-auto">
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 pt-6">
          <h3 className="text-center text-lg font-bold">Verify worker node account mnemonic</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="text-center text-font-subtle">
            Please select each word in the order it was presented to you
          </p>
        </SunkenBox>
        <SunkenBox className="mb-4 grid grid-cols-3 gap-4">
          {Array.from({ length: shuffledSeedPhrase.length }).map((_, index) => (
            <div key={index} className="flex items-center gap-1">
              <span className="w-[18px]">{index + 1}.</span>
              <span
                className={clsx({
                  'flex h-[38px] flex-grow items-center justify-center rounded-full bg-gray-95 p-2':
                    true,
                  'border border-teal bg-gray-80': Boolean(selectedWords[index]),
                  'border border-gray-30': index === selectedWords.length,
                })}
              >
                {selectedWords[index]?.value || ''}
              </span>
            </div>
          ))}
        </SunkenBox>
        <SunkenBox className="grid grid-cols-3 gap-x-3 gap-y-2">
          {shuffledSeedPhrase.map((word) => (
            <button
              key={word.index}
              onClick={() => selectWord(word)}
              className={clsx({
                'pressed:bg-teal/60 rounded-full border border-teal p-2 hover:bg-teal/30': true,
                'pointer-events-none bg-teal text-gray-90': isSelectedWord(word),
              })}
            >
              {word.value}
            </button>
          ))}
        </SunkenBox>
      </section>
      {isError ? <p className="ml-6 mt-2 text-red">Entered mnemonic is not correct</p> : null}
      <section className="mt-8 flex justify-center gap-8">
        <Button color="outlined" onClick={undoWord} disabled={!selectedWords.length}>
          Undo
        </Button>
        <Button disabled={!isAllWordsFilled} onClick={checkSeedPhraseIsCorrect}>
          Continue
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  seedPhrase: string[];
  onSeedPhraseConfirmed: () => void;
  onClose: () => void;
}

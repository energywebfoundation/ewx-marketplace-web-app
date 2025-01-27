import { useState } from 'react';
import clsx from 'clsx';
import { PiCopySimpleBold, PiCheckBold } from 'react-icons/pi';
import { Button } from '@ewf/components/Button';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { GoBackButton } from '@ewf/components/ModalUI/GoBackButton';
import { copyTextToClipboard } from '@ewf/lib/utils';

export const GenerateSeedPhrase = ({
  seedPhrase,
  buttonText,
  onSeedPhraseCopied,
  onGoBack,
  onClose,
}: Props): React.ReactNode => {
  const downloadBackup = () => {
    // To download the seed phrase as a txt file, we create a <a> element and
    // encode the text as a data url. Then, programmatically click the link.
    const text = seedPhrase.join(' ');
    const a = document.createElement('a');
    a.href = `data:text/plain,${text}`;
    a.download = 'seed-phrase-backup.txt';
    document.body.appendChild(a);
    a.click();
  };

  return (
    <ModalContainer className="w-auto">
      <section className="mb-8 flex justify-between">
        {onGoBack ? <GoBackButton onClick={onGoBack} /> : null}
        {onClose ? <CloseButton onClick={onClose} /> : null}
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 pt-6">
          <h3 className="text-center text-lg font-bold">Generate worker node account mnemonic</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="mb-1 text-center uppercase text-red">Warning</p>
          <p className="text-center text-font-subtle">
            Safely store this 12-word mnemonic, and do not share it with anyone.{' '}
          </p>
        </SunkenBox>
        <SunkenBox className="grid grid-cols-3 gap-x-3 gap-y-2">
          {seedPhrase.map((word, index) => (
            <WordButton key={word} word={word} index={index} />
          ))}
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={downloadBackup} color="outlined">
          Backup Mnemonic
        </Button>
        <Button onClick={onSeedPhraseCopied}>{buttonText || 'Continue'}</Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  seedPhrase: string[];
  buttonText?: string;
  onSeedPhraseCopied: () => void;
  onGoBack?: () => void;
  onClose?: () => void;
}

const WordButton = ({ word, index }: WordButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const text = `${index + 1}. ${word}`;

  const copyWord = () => {
    setIsCopied(true);
    copyTextToClipboard(word);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button
      key={word}
      onClick={copyWord}
      className="group relative flex items-center justify-center rounded-full border border-teal px-7 py-2 hover:bg-teal/30"
      data-testid="mnemonic-button"
    >
      {text}
      <span
        className={clsx({
          'absolute right-2 hidden group-hover:block': true,
        })}
      >
        {isCopied ? <PiCheckBold size={16} /> : <PiCopySimpleBold size={16} />}
      </span>
    </button>
  );
};

interface WordButtonProps {
  word: string;
  index: number;
}

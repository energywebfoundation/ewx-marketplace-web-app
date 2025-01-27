import { copyTextToClipboard } from '@ewf/lib/utils';
import { useState } from 'react';
import copy from '@ewf/assets/icons/copy-purple.svg';
import check from '@ewf/assets/icons/check-purple.svg';

export const CopyButton = ({ text, size, checkIcon, copyIcon }: Props): JSX.Element => {
  const [isCopied, setIsCopied] = useState(false);

  const copyAddress = () => {
    setIsCopied(true);
    copyTextToClipboard(text);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <button onClick={copyAddress}>
      {isCopied ? (
        <img src={checkIcon ?? check} alt="copy" width={size ?? 12} height={size ?? 12} />
      ) : (
        <img src={copyIcon ?? copy} alt="copy" width={size ?? 12} height={size ?? 12} />
      )}
    </button>
  );
};

interface Props {
  text: string;
  size?: number;
  checkIcon?: string;
  copyIcon?: string;
}

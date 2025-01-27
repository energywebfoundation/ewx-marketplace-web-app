import { useState } from 'react';
import { encodeAddress } from '@polkadot/util-crypto';
import clsx from 'clsx';
import { PiCopySimpleBold, PiCheckBold } from 'react-icons/pi';
import { Button } from '@ewf/components/Button';
import { truncateAddress, copyTextToClipboard } from '@ewf/lib/utils';
import accountImage from '@ewf/assets/images/account.png';

export const CopyAddressButton = ({ address, size = 'medium' }: Props): JSX.Element => {
  // Don't encode the address if it's not Polkadot address
  address = address.startsWith('0') ? address : encodeAddress(address);
  const [isCopied, setIsCopied] = useState(false);
  const truncatedAddress = truncateAddress(address);
  const imgSize = size === 'medium' ? 32 : 24;
  const iconSize = size === 'medium' ? 16 : 12;

  const copyAddress = () => {
    setIsCopied(true);
    copyTextToClipboard(address);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Button
      onClick={copyAddress}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full p-1 pr-3 bg-button-gradient"
    >
      <img
        src={accountImage}
        width={imgSize}
        height={imgSize}
        alt="Account"
        className="rounded-full border border-white"
      />
      <span
        className={clsx({
          'text-default': size === 'medium',
          'text-base': size === 'small',
        })}
      >
        {truncatedAddress}
      </span>
      {isCopied ? <PiCheckBold size={iconSize} /> : <PiCopySimpleBold size={iconSize} />}
    </Button>
  );
};

interface Props {
  address: string;
  size?: 'small' | 'medium';
}

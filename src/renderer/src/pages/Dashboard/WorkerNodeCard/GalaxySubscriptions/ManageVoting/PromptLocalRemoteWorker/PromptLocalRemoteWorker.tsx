import { useState } from 'react';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';
import { WalletButton } from '@ewf/components/ModalUI/WalletSelector/WalletButton';
import localAccountIcon from '@ewf/assets/icons/computer-glow.svg';
import remoteAccountIcon from '@ewf/assets/icons/server-glow.svg';
import { isElectron } from '@main/helpers/is-electron';

export const PromptLocalRemoteWorker = ({ onLocalWorker, onRemoteWorker, onClose }: Props) => {
  const [selectedOption, setSelectedOption] = useState<'local' | 'remote'>('local');

  const selectLocal = () => setSelectedOption('local');
  const selectRemote = () => setSelectedOption('remote');
  const onAccept = () => (selectedOption === 'local' ? onLocalWorker() : onRemoteWorker());

  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-8 text-center">
          <p className="mb-1 text-lg font-bold text-white">Select Where to Run Your Worker Node</p>
        </SunkenBox>
        <div className="grid grid-cols-2 gap-6">
          <WalletButton
            isSelected={selectedOption === 'local'}
            disabled={!isElectron()}
            onSelect={selectLocal}
          >
            <img src={localAccountIcon} width="auto" height={56} alt="Local account" />
            <p>In this machine</p>
          </WalletButton>
          <WalletButton isSelected={selectedOption === 'remote'} onSelect={selectRemote}>
            <img src={remoteAccountIcon} width="auto" height={56} alt="Remote account" />
            <p>Remote server</p>
          </WalletButton>
        </div>
      </section>
      <section className="mt-8 flex w-full justify-center">
        <Button onClick={onAccept} className="w-[156px]">
          Next
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onLocalWorker: () => void;
  onRemoteWorker: () => void;
  onClose: () => void;
}

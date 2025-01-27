import { useState } from 'react';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { GoBackButton } from '@ewf/components/ModalUI/GoBackButton';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { CopyAddressButton } from '@ewf/components/ModalUI/CopyAddressButton';
import { Stepper } from '@ewf/components/ModalUI/Stepper';
import { AddressBook } from '@ewf/components/AddressBook';
import { Button } from '@ewf/components/Button';

export const SelectAccount = ({
  address,
  onAccountSelected,
  onGoBack,
  onClose,
}: Props): JSX.Element => {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);

  const selectAccount = () => {
    if (selectedAddress) {
      onAccountSelected(selectedAddress);
    }
  };

  return (
    <ModalContainer>
      <section className="relative mb-8 flex justify-between">
        <GoBackButton onClick={onGoBack} />
        <CopyAddressButton address={address} />
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8">
        <Stepper step={3} maxStep={4} />
      </section>
      <section className="mb-8">
        <AddressBook onAccountSelected={setSelectedAddress} />
      </section>
      <section className="flex justify-center">
        <Button disabled={!selectedAddress} onClick={selectAccount}>
          Next
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  address: string;
  onAccountSelected: (address: string) => void;
  onGoBack: () => void;
  onClose: () => void;
}

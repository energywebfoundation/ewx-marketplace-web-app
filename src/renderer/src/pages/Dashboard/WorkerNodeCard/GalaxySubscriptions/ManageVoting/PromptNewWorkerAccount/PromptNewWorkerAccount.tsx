import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';

export const PromptNewWorkerAccount = ({
  title = 'Worker account not detected',
  onGenerateAccount,
  onImportSeedPhrase,
  onClose,
}: Props) => {
  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-4 px-8 pt-6">
          <h3 className="text-center text-lg font-bold">{title}</h3>
          <hr className="my-3 border border-b border-gray-70" />
          <p className="text-center text-font-subtle">
            Please create a new worker account or import an existing one by importing a seedphrase.
          </p>
        </SunkenBox>
      </section>
      <section className="flex justify-center gap-8">
        <Button onClick={onGenerateAccount}>Generate account</Button>
        <Button onClick={onImportSeedPhrase}>Import seed phrase</Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  title?: string;
  onGenerateAccount: () => void;
  onImportSeedPhrase: () => void;
  onClose: () => void;
}

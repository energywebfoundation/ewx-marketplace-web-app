import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { Button } from '@ewf/components/Button';

export const JoinedWithRemoteWorker = ({ onClose }: Props): React.ReactNode => {
  return (
    <ModalContainer>
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="px-8 text-center">
          <p className="font-bold">Joined with remote worker</p>
          <hr className="my-3 border border-b border-gray-70" />
          <p>
            Your have already configured a remote worker node account. You can now run your worker
            node in a remote location.
          </p>
        </SunkenBox>
      </section>
      <section className="flex w-full justify-center">
        <Button onClick={onClose} className="mt-8">
          Close
        </Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onClose: () => void;
}

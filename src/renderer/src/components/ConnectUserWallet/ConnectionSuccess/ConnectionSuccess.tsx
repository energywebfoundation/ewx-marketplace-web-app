import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { Message } from '@ewf/components/ModalUI/Message';

export const ConnectionSuccess = ({ onClose }: Props): JSX.Element => {
  return (
    <ModalContainer>
      <section className="mb-8">
        <Message type="success" message="Connection successful" />
      </section>
      <section className="flex justify-center">
        <Button onClick={onClose}>Continue</Button>
      </section>
    </ModalContainer>
  );
};

interface Props {
  onClose: () => void;
}

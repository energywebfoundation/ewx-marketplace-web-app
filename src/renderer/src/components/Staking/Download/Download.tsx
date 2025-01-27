import { SunkenBox } from '@ewf/components/SunkenBox';
import { DownloadBadge } from '@ewf/components/StatusBadge/DownloadBadge';
import { Button } from '@ewf/components/Button';
import { CloseButton } from '@ewf/components/ModalUI/CloseButton';

export const Download = ({ onDownload, onClose }: Props): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-8 flex justify-end">
        <CloseButton onClick={onClose} />
      </section>
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-6 text-center">
          <p className="text-lg font-bold">Download the Solution Group Node logic to opt in</p>
        </SunkenBox>
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <DownloadBadge />
        </SunkenBox>
      </section>
      <section className="flex justify-center">
        <Button onClick={onDownload}>Download</Button>
      </section>
    </div>
  );
};

interface Props {
  onDownload: () => void;
  onClose: () => void;
}

import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';

export const ConnectionLoading = (): JSX.Element => {
  return (
    <ModalContainer>
      <div className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-8 text-center">
          <p className="text-lg font-bold">Loading...</p>
        </SunkenBox>
        <SunkenBox className="grid place-items-center gap-6 p-8">
          <ProgressBadgeEWX />
        </SunkenBox>
      </div>
    </ModalContainer>
  );
};

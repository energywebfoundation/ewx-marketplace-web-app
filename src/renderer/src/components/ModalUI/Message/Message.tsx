import { SuccessBadge } from '@ewf/components/StatusBadge/SuccessBadge';
import { ErrorBadge } from '@ewf/components/StatusBadge/ErrorBadge';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';
import { SunkenBox } from '@ewf/components/SunkenBox';

export const Message = ({ type, message = '', description }: Props): JSX.Element => {
  const badge =
    type === 'success' ? (
      <SuccessBadge />
    ) : type === 'error' ? (
      <ErrorBadge />
    ) : type === 'progress' ? (
      <ProgressBadgeEWX />
    ) : null;

  return (
    <div className="mb-8 rounded-lg p-6 bg-popup-gradient">
      <SunkenBox className="mb-8 px-8 text-center">
        <p className="text-lg font-bold">{message}</p>
        {description ? (
          <div>
            <hr className="my-3 border border-b border-gray-70" />
            <p className="text-gray-400 mt-2 text-sm">{description}</p>
          </div>
        ) : null}
      </SunkenBox>
      <SunkenBox className="grid place-items-center gap-6 p-8">{badge}</SunkenBox>
    </div>
  );
};

interface Props {
  type: 'success' | 'error' | 'progress';
  message: string;
  description?: string;
}

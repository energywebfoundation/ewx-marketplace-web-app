import clsx from 'clsx';

export const ProgressBarVertical = ({
  progress,
  hasSubscriptionDate = false,
}: Props): JSX.Element => {
  const formatProgress = (progress: number): number => {
    if (progress < 0) return 0;
    if (progress > 1) return 1;
    return progress;
  };

  const formattedProgress = formatProgress(progress);

  return (
    <div
      className={clsx({
        'w-full h-full py-1 flex justify-center': true,
        'opacity-0': progress === undefined,
      })}
    >
      <div className="h-full w-[6px] rounded bg-gray-90">
        <div
          // Tailwind does not support template literal
          style={{ width: `${formattedProgress * 100}%` }}
          className="h-full rounded bg-gradient-to-r from-teal to-brand"
        >
          <div className="relative left-[-3px] flex h-full min-h-[380px] flex-grow flex-col justify-between pt-4">
            <div className="relative h-[12px] w-[12px] rounded-full bg-white"></div>
            <div className="relative h-[12px] w-[12px] rounded-full bg-white"></div>
            {hasSubscriptionDate && (
              <div className="relative h-[12px] w-[12px] rounded-full bg-white"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  progress: number;
  hasSubscriptionDate?: boolean;
  label?: string;
}

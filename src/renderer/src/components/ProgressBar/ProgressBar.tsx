import clsx from 'clsx';

export const ProgressBar = ({ progress, label }: Props): JSX.Element => {
  const formatProgress = (progress: number): number => {
    if (progress < 0) return 0;
    if (progress > 1) return 1;
    return progress;
  };

  const formattedProgress = formatProgress(progress);

  return (
    <div
      className={clsx({
        'w-full': true,
        'opacity-0': progress === undefined,
      })}
    >
      <span
        className={clsx({
          'text-sm': true,
          hidden: !label || label.length === 0,
        })}
      >
        {label}
      </span>
      <div className="mt-1 h-[11px] w-full rounded bg-gray-90">
        <div
          // Tailwind does not support template literal
          style={{ width: `${formattedProgress * 100}%` }}
          className="relative h-full rounded bg-green"
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
            {formattedProgress === 0 ? (
              <div className="hidden" />
            ) : (
              <div className="font-primary">{formattedProgress * 100}%</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface Props {
  progress: number;
  label?: string;
}

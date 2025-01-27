import clsx from 'clsx';
import warningIcon from '@ewf/assets/icons/warning-circle.svg'

export const ProgressBarError = ({ progress, label }: Props): JSX.Element => {
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
    <div className='flex flex-row justify-between'>
      <span
        className={clsx({
          'text-sm': true,
          'flex': true,
          'flex-row': true,
          'gap-1': true,
          hidden: !label || label.length === 0,
        })}
      >
        <img src={warningIcon} width={14} height={14} alt="warningIcon" />
        {label}
      </span>
      <span className="text-sm">
        {formattedProgress === 0 ? (
          <div className="hidden" />
        ) : (
          <div className="font-primary">{formattedProgress * 100}%</div>
        )}
      </span>
      </div>
      <div className="mt-1 h-[4px] w-full rounded bg-gray-90">
        <div
          // Tailwind does not support template literal
          style={{ width: `${formattedProgress * 100}%` }}
          className="relative h-full rounded bg-red"
        ></div>
      </div>
    </div>
  );
};

interface Props {
  progress: number;
  label?: string;
}

import clsx from 'clsx';
import runWorkerIcon from '@ewf/assets/icons/run-worker.svg';
import pauseIcon from '@ewf/assets/icons/pause.svg';
import playIcon from '@ewf/assets/icons/play.svg';

const WorkerButton = ({ title, image, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={clsx({
        'group flex h-full w-full flex-col items-center justify-center rounded-md border-2 border-transparent p-3 shadow-darker transition delay-75 ease-in-out gradient-border-dark-with-gray-85 hover:border-brand/60':
          true,
        'pointer-events-none opacity-30': !onClick,
      })}
    >
      <p className="my-1 text-sm text-font-subtler">{title}</p>
      <div className="mt-3 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-dark-gradient">
        <div className="group-after:bg-button-gray-gradient absolute flex h-[46px] w-[46px] items-center justify-center rounded-full bg-gray-80 shadow-sm group-active:bg-button-gray-gradient">
          {' '}
          <img src={image} width={28} height={28} alt="pauseIcon" />
        </div>
      </div>
    </button>
  );
};

interface Props {
  title: string;
  image: string;
  onClick?: () => void;
}

export const EnableWorkerButton = ({ onClick }: GenericWorkerButtonProps) => (
  <WorkerButton title="Enable Solution Group" image={runWorkerIcon} onClick={onClick} />
);

export const PauseWorkerButton = ({ onClick }: GenericWorkerButtonProps) => (
  <WorkerButton title="Pause Solution Group" image={pauseIcon} onClick={onClick} />
);

export const ResumeWorkerButton = ({ onClick }: GenericWorkerButtonProps) => (
  <WorkerButton title="Resume Solution Group" image={playIcon} onClick={onClick} />
);

export const NoWorkerButton = () => <WorkerButton title="Enable Solution Group" image={runWorkerIcon} />;

interface GenericWorkerButtonProps {
  onClick?: () => void;
}

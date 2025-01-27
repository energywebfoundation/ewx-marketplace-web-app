import clsx from 'clsx';
import { PiCheckBold } from 'react-icons/pi';

export const Stepper = ({ step, maxStep }: Props): JSX.Element => {
  const adjustStep = (step: number) => {
    if (step < 1) return 1;
    if (step > maxStep) return maxStep;
    return step;
  };

  const isLastStep = () => step === maxStep;
  const isActiveBullet = (bulletStep: number) => leftSteps.length === bulletStep + 1;
  const isCheckBullet = (bulletStep: number) => rightSteps.length === bulletStep + 1;

  const adjustedStep = adjustStep(step);
  const leftSteps = Array.from({ length: adjustedStep });
  const rightSteps = Array.from({ length: maxStep + 1 - adjustedStep });

  const CheckStep = () => <PiCheckBold className="text-white" />;

  return (
    <div
      style={{
        background: 'linear-gradient(35deg, transparent 22%, #969696 52%, transparent 82%)',
      }}
      className="rounded-lg p-[1px] shadow-[0_4px_16px_0_rgba(0,0,0,0.32)]"
    >
      <div className="relative w-full rounded-[15px] bg-gray-80  p-3">
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-x-2">
            {leftSteps.map((_, i) => (
              <StepBullet
                key={i}
                className={clsx({
                  'bg-teal text-gray-90 shadow-[0_0_4px_0_#000_inset]': true,
                  'shadow-[0_0_4px_0_theme(colors.teal)]': isActiveBullet(i),
                })}
              >
                {i + 1}
              </StepBullet>
            ))}
          </div>
          <div className="space-x-2">
            {rightSteps.map((_, i) => (
              <StepBullet
                key={i}
                className={clsx({
                  'bg-gray-70': !isLastStep(),
                  'bg-brand': isLastStep(),
                })}
              >
                {isCheckBullet(i) ? <CheckStep /> : leftSteps.length + 1 + i}
              </StepBullet>
            ))}
          </div>
        </div>
        <div
          className={clsx({
            'absolute left-1/2 top-1/2 z-0 h-1 w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-teal':
              true,
            'to-gray-100 to-80%': !isLastStep(),
            'to-brand': isLastStep(),
          })}
        />
      </div>
    </div>
  );
};

interface Props {
  step: number;
  maxStep: number;
}

const StepBullet = ({ className, children }: StepBulletProps): JSX.Element => {
  return (
    <span className="inline-flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-100 p-1">
      <span
        className={clsx({
          'flex h-full w-full items-center justify-center rounded-full text-sm': true,
          [className as string]: className,
        })}
      >
        {children}
      </span>
    </span>
  );
};

interface StepBulletProps {
  className?: string;
  children: number | JSX.Element;
}

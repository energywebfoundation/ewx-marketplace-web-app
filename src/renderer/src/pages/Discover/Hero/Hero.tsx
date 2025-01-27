import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useRemoteResourcesStore } from '@ewf/stores/remote-resources';
import { Step } from './Step';

export const Hero = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const isLoading = useRemoteResourcesStore((state) => state.isLoading);
  const steps = useRemoteResourcesStore((state) => state.heroBannerSteps);

  useEffect(() => {
    const secondsDelay = 5;
    const intervalId = setInterval(() => {
      const isLastStep = (step: number) => step === steps.length - 1;
      const nextStep = (step: number) => (isLastStep(step) ? 0 : step + 1);
      setCurrentStep(nextStep);
    }, secondsDelay * 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [steps.length]);

  const Steps = (
    <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-black">
      <div className="absolute bottom-5 left-10 z-10 space-x-3">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={clsx({
              'h-3 w-1.5 -skew-x-[40deg]': true,
              'bg-gray-20': index < currentStep,
              'bg-teal': index === currentStep,
              'bg-gray-70': index > currentStep,
            })}
          />
        ))}
      </div>
      {steps.map((step, index) => (
        <div
          key={index}
          // Tailwind does not allow string interpolation in inline styles
          style={{ left: `${(index - currentStep) * 100}%` }}
          className={`absolute h-full w-full transition-all duration-500 ease-in-out`}
        >
          <Step key={index} {...step} />
        </div>
      ))}
    </div>
  );

  const LoadingSteps = (
    <div className="h-full w-full animate-pulse rounded-[14px] bg-gray-85"></div>
  );

  return (
    <div className="h-[255px] rounded-lg bg-gradient-to-r from-brand via-blue to-black p-0.5">
      {isLoading ? LoadingSteps : Steps}
    </div>
  );
};

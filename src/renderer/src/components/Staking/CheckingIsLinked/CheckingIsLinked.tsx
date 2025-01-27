import { SunkenBox } from '@ewf/components/SunkenBox';
import { ProgressBadgeEWX } from '@ewf/components/StatusBadge/ProgressBadge';

export const CheckingIsLinked = (): JSX.Element => {
  return (
    <div className="w-[550px] rounded-lg border-2 border-transparent p-8 gradient-border-secondary-with-gray-90">
      <section className="mb-8 rounded-lg p-6 bg-popup-gradient">
        <SunkenBox className="mb-6 text-center">
          <p className="mb-2 font-bold">Checking if the accounts are linked</p>
        </SunkenBox>
        <SunkenBox className="mt-8 grid place-items-center p-8">
          <ProgressBadgeEWX />
        </SunkenBox>
      </section>
    </div>
  );
};

import clsx from 'clsx';

export const Gradients = (): JSX.Element => {
  return (
    <div className="space-y-6">
      <div>
        <Title>Border</Title>
        <div className="flex gap-4">
          <GradientBox
            label="Primary"
            className="border-2 border-transparent gradient-border-primary-with-gray-80"
          />
          <GradientBox
            label="Secondary"
            className="border-2 border-transparent gradient-border-secondary-with-gray-80"
          />
        </div>
      </div>
      <div>
        <Title>Button</Title>
        <GradientBox className="bg-button-gradient" />
      </div>
      <div>
        <Title>Pop-up</Title>
        <GradientBox className="bg-popup-gradient" />
      </div>
      <div>
        <Title>Sidebar</Title>
        <GradientBox className="bg-sidebar-gradient" />
      </div>
      <div>
        <Title>Text</Title>
        <p className="w-fit text-2xl text-gradient">Text gradient example</p>
      </div>
    </div>
  );
};

const Title = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <h2 className="mb-3 text-xl">{children}</h2>;
};

const GradientBox = ({ label, className }: GradientBoxProps): JSX.Element => {
  return (
    <div className="mr-4 inline-block">
      {label && <span className="ml-3 text-sm text-font-subtler">{label}</span>}
      <div
        className={clsx({
          'h-[150px] w-[150px] rounded-lg': true,
          [className]: true,
        })}
      />
    </div>
  );
};

interface GradientBoxProps {
  label?: string;
  className: string;
}

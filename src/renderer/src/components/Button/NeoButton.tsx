import clsx from 'clsx';

export const NeoButton = ({ active, children, ...rest }: Props): JSX.Element => {
  return (
    <button
      {...rest}
      disabled={active}
      className={clsx({
        'rounded-lg bg-gray-80 px-3 py-2 font-primary-regular': true,
        'shadow hover:bg-gray-70 active:bg-gray-95': !active,
        'bg-gray-95 shadow-[4px_4px_4px_0_theme(colors.black/25%)_inset,-4px_-4px_4px_0_rgba(132,132,132,0.25)_inset] [&>*]:text-gradient':
          active,
        [rest.className as string]: true,
      })}
    >
      {children}
    </button>
  );
};

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

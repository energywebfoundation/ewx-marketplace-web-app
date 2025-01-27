export const Layout = ({ children }: Props): JSX.Element => {
  return <div className="mx-auto box-content max-w-[1128px] px-4">{children}</div>;
};

interface Props {
  children: React.ReactNode;
}

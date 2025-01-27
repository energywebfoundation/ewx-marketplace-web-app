import { ProgressBadgeEWX } from '../StatusBadge/ProgressBadge';

export const Loader = ({ size = 'md' }: Props): JSX.Element => {
  return (
    <section className="fixed bottom-0 top-0 z-[200] flex h-[100vh] w-[100vw] items-center justify-center overflow-y-auto backdrop-blur-md bg-radial-gradient">
      <div className="rounded-full bg-gray-90/40">
        <ProgressBadgeEWX size={size} />
      </div>
    </section>
  );
};

interface Props {
  size?: 'md' | 'lg';
}

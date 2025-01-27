export const RunningChip = (props: RunningChipProps): JSX.Element => (
  <div className="flex w-fit items-center rounded-full bg-teal/10 px-3 py-1 text-center text-sm text-teal">
    {props.customStatus ? props.customStatus : 'Not Running'}
  </div>
);

interface RunningChipProps {
  customStatus?: string | null;
}

import { GENERIC_CHIP_COLOR, GenericChipColorClass } from '@ewf/types/enums';

interface GenericChipProps {
  color?: GENERIC_CHIP_COLOR;
  label: string;
}

export const GenericChip = ({
  label,
  color = GENERIC_CHIP_COLOR.Gray,
}: GenericChipProps): JSX.Element => {
  const colorClass = GenericChipColorClass[color];
  const className = `items-center flex w-fit rounded-full ${
    colorClass.bg
  } px-3 py-1 text-center text-sm${
    color === GENERIC_CHIP_COLOR.Gray ? colorClass.text : ' ' + colorClass.text
  }`;
  return <div className={className}>{label}</div>;
};

import * as SliderPrimitive from '@radix-ui/react-slider';

export const Slider = ({ value, disabled = false, onValueChange }: Props) => {
  const updateValue = (sliderValues: number[]) => {
    const newPercentage = sliderValues[0] / 100;
    onValueChange(newPercentage);
  };

  return (
    <form>
      <SliderPrimitive.Root
        className="relative flex touch-none select-none items-center"
        defaultValue={[value]}
        max={100}
        step={1}
        value={[value]}
        onValueChange={updateValue}
        disabled={disabled}
      >
        <SliderPrimitive.Track className="relative flex h-1 flex-grow rounded-full bg-black">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-gradient-to-r from-teal to-brand" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-4 w-4 rounded-full bg-brand"
          aria-label="Volume"
        />
      </SliderPrimitive.Root>
    </form>
  );
};

interface Props {
  value: number;
  disabled?: boolean;
  onValueChange: (value: number) => void;
}

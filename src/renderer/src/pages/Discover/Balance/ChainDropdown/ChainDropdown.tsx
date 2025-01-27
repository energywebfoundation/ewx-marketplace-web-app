import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { PiDotsThreeVerticalBold } from 'react-icons/pi';

export const ChainDropdown = ({ children }: Props): JSX.Element => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="fade-in delay-50 pointer-events-auto rounded-full outline-none transition hover:bg-black/30">
        <PiDotsThreeVerticalBold size={20} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={4}
        align="center"
        className="z-50 space-y-2 rounded border-[1px] border-transparent p-3 text-sm gradient-border-secondary-with-gray-90 radix-state-closed:animate-slide-up-fade-out radix-state-open:animate-slide-down-fade-in"
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

interface Props {
  children: React.ReactNode;
}

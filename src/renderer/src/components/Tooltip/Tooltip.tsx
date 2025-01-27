import * as TooltipRadix from '@radix-ui/react-tooltip';
import { twMerge } from 'tailwind-merge';

export const Tooltip = ({
  visible = true,
  content,
  side,
  asChildTrigger = false,
  className = '',
  children,
}: TooltipProps) => {
  if (!visible) return;

  return (
    <TooltipRadix.Provider delayDuration={100}>
      <TooltipRadix.Root>
        <TooltipRadix.Trigger asChild={asChildTrigger}>{children}</TooltipRadix.Trigger>
        <TooltipRadix.Portal>
          <TooltipRadix.Content
            className={twMerge(
              'z-50 rounded border-[1px] border-transparent px-3 py-1 text-sm font-light gradient-border-primary-with-gray-95',
              className,
            )}
            sideOffset={4}
            side={side}
          >
            {content}
          </TooltipRadix.Content>
        </TooltipRadix.Portal>
      </TooltipRadix.Root>
    </TooltipRadix.Provider>
  );
};

interface TooltipProps {
  visible?: boolean;
  content: React.ReactNode;
  asChildTrigger?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
  children: JSX.Element;
}

import { twix } from 'tailwindcss-radix-ui';
import { clsx } from 'clsx';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { Button } from '@ewf/components/Button';
import { ModalContainer } from '@ewf/components/ModalUI/ModalContainer';

export const Root = RadixAlertDialog.Root;
export const Trigger = RadixAlertDialog.Trigger;
export const Portal = RadixAlertDialog.Portal;

export const Overlay = twix(
  RadixAlertDialog.Overlay,
  'fixed left-0 top-0 z-30 grid h-full w-full place-items-center overflow-y-auto py-8 backdrop-blur-xl radix-state-closed:animate-fade-out radix-state-open:animate-fade-in',
);
export const Content = twix(
  RadixAlertDialog.Content,
  'radix-state-closed:animate-fade-out radix-state-open:animate-fade-in',
);

export const Title = RadixAlertDialog.Title;
export const Description = RadixAlertDialog.Description;
export const Action = RadixAlertDialog.Action;
export const Cancel = RadixAlertDialog.Cancel;

export const AlertDialog = ({
  open,
  onOpenChange,
  title,
  description,
  action,
  children,
}: Props) => {
  return (
    <RadixAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixAlertDialog.Trigger
        className={clsx({
          'h-fit rounded-sm p-0.5 hover:bg-gray-70 active:bg-gray-95': true,
          hidden: !children,
        })}
      >
        {children}
      </RadixAlertDialog.Trigger>
      <RadixAlertDialog.Portal>
        <RadixAlertDialog.Overlay className="fixed left-0 top-0 z-30 grid h-full w-full place-items-center overflow-y-auto py-8 backdrop-blur-xl radix-state-closed:animate-fade-out radix-state-open:animate-fade-in">
          <RadixAlertDialog.Content className="radix-state-closed:animate-fade-out radix-state-open:animate-fade-in">
            <ModalContainer>
              <RadixAlertDialog.Title className="mb-4">{title}</RadixAlertDialog.Title>
              <RadixAlertDialog.Description className="mb-8">
                {description}
              </RadixAlertDialog.Description>
              <div className="flex justify-end gap-4">
                <RadixAlertDialog.Cancel asChild>
                  <Button color="outlined">Cancel</Button>
                </RadixAlertDialog.Cancel>
                <RadixAlertDialog.Action asChild>
                  <Button onClick={action}>Confirm</Button>
                </RadixAlertDialog.Action>
              </div>
            </ModalContainer>
          </RadixAlertDialog.Content>
        </RadixAlertDialog.Overlay>
      </RadixAlertDialog.Portal>
    </RadixAlertDialog.Root>
  );
};

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: string;
  action?: () => void;
  children?: React.ReactNode;
}

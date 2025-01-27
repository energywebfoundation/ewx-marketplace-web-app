import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import { PiBellRingingBold } from 'react-icons/pi';
import { useNotificationStore } from '@ewf/stores/notifications';
import { Button } from '@ewf/components/Button';
import { Notifications } from '@ewf/components/Notifications';

export const AlertButton = ({ disabled = false }: Props): JSX.Element => {
  const notifications = useNotificationStore((state) => state.notifications);
  const isOpen = useNotificationStore((state) => state.isOpen);
  const openPanel = useNotificationStore((state) => state.openPanel);
  const closePanel = useNotificationStore((state) => state.closePanel);
  const isMaxNotifications = notifications.length > 999;
  const unreadNotifications = disabled
    ? 0
    : notifications.filter((notification) => !notification.isRead).length;
  const formattedNotifications = isMaxNotifications ? '+999' : unreadNotifications;

  const handleNotificationPanel = (open: boolean) => {
    open ? openPanel() : closePanel();
  };

  return (
    <DropdownMenu.Root onOpenChange={handleNotificationPanel} open={isOpen}>
      <DropdownMenu.Trigger className="outline-none" asChild>
        <Button
          color="neutral"
          className={clsx({
            'relative flex h-[40px] w-[40px] items-center justify-center rounded-full p-0 shadow':
              true,
            'opacity-30': disabled,
          })}
          disabled={disabled}
          onClick={() => openPanel()}
        >
          <PiBellRingingBold size={24} />
          <span
            className={clsx(
              'absolute -right-3 top-0 flex min-h-[20px] min-w-[20px] items-center justify-center rounded-full bg-brand px-1 text-sm text-white shadow-md',
              { hidden: unreadNotifications === 0 },
              { '-right-6': isMaxNotifications },
            )}
          >
            {formattedNotifications}
          </span>
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={4}
        align="center"
        className="z-10 overflow-y-auto radix-state-closed:animate-slide-up-fade-out radix-state-open:animate-slide-down-fade-in"
      >
        <Notifications notifications={notifications} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

interface Props {
  disabled?: boolean;
}

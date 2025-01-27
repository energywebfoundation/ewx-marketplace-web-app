import { useState, useLayoutEffect, createRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { PiDownloadSimpleBold, PiWarningCircleBold, PiCaretDown } from 'react-icons/pi';
import { timeFromNow } from '@ewf/lib/utils';
import { useNotificationStore } from '@ewf/stores/notifications';
import { CloseCardButton } from '@ewf/components/Button/CloseCardButton';
import { ProgressBarDownloading } from '@ewf/components/ProgressBar/ProgressBarDownloading';
import { ProgressBarError } from '../ProgressBar/ProgressBarError';
import { NotificationsApi } from '@ewf/types/api';

export const NotificationCard = ({ notification }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandArrowVisible, setIsExpandArrowVisible] = useState(false);
  const ref: React.RefObject<HTMLInputElement> = createRef();
  const markNotificationAsRead = useNotificationStore((state) => state.markNotificationAsRead);
  const dismissNotification = useNotificationStore((state) => state.dismissNotification);

  const typeText = (() => {
    const { type } = notification;

    if (type === 'download') return 'Download';
    if (type === 'information') return 'Information';
    if (type === 'action') return 'Action Required';
    return null;
  })();

  const isProgressBarVisible =
    notification.type === 'download' &&
    (notification.status === 'success' || notification.status === 'error');

  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  const onCardClick = () => {
    toggleExpanded();

    if (!notification || notification.isRead) {
      return;
    }

    markNotificationAsRead(notification.id);
  };

  const Icon = () =>
    notification.type === 'download' ? (
      <PiDownloadSimpleBold size={18} />
    ) : (
      <PiWarningCircleBold size={18} />
    );

  // Check if the notification description has clamped text by comparing
  // the displayed height (clientHeight) and the real height (scrollHeight).
  // If the text is clamped, show the expand arrow.
  useLayoutEffect(() => {
    if (ref.current) {
      const isClampedText = ref.current.clientHeight < ref.current.scrollHeight;
      setIsExpandArrowVisible(isClampedText);
    }
  }, [ref]);

  return (
    <div className="relative flex w-full flex-row gap-1">
      {/* NEW NOTIF. INDICATOR */}
      <span
        className={clsx({
          'absolute -left-2 -top-2 z-50 h-2 w-2 rounded-full bg-brand': true,
          hidden: notification.isRead,
        })}
      />
      {/* ICON */}
      <div className="group flex h-[35px] w-[39px] flex-col items-center justify-between rounded-l-md rounded-r-sm border-l border-gray-60 p-2 bg-notification-gradient">
        <Icon />
      </div>
      {/* CLOSE BUTTON */}
      <CloseCardButton
        onClick={() => dismissNotification(notification.id)}
        className="absolute -right-2 -top-2"
      />
      {/* CARD */}
      <button
        onClick={onCardClick}
        className="shadow-dark group flex h-full w-full flex-col items-start justify-between rounded-l-sm rounded-r border-2 border-transparent px-3 py-2 notification-shadow gradient-border-dark-with-gray-80"
      >
        <div className="mb-2 flex flex-row gap-2 break-words text-sm">
          <p>{typeText}</p>
          <p>•</p>
          <p className="text-font-subtler">{timeFromNow(notification.createdDate)}</p>
        </div>
        <div className="relative pr-6 text-left">
          <p className="mb-2 break-words text-lg font-bold leading-5">{notification.title}</p>
          <p
            ref={ref}
            className={clsx({
              'text-sm text-font-subtle transition-all duration-300': true,
              'line-clamp-1 max-h-[18px]': !isExpanded,
              'max-h-[100px]': isExpanded,
            })}
          >
            {notification.description}
          </p>
          <span
            className={clsx({
              'absolute right-0 top-6 transition-all duration-300': true,
              hidden: !isExpandArrowVisible,
              'rotate-180': isExpanded,
            })}
          >
            <PiCaretDown size={16} />
          </span>
        </div>
        <div
          className={twMerge(
            clsx({
              'w-full bg-gray-80 pt-4': true,
              hidden: !isProgressBarVisible,
            }),
          )}
        >
          {notification.status === 'success' ? (
            <ProgressBarDownloading progress={100} label="Downloaded" />
          ) : (
            <ProgressBarError progress={100} label="Downloaded" />
          )}
        </div>
      </button>
    </div>
  );
};

interface Props {
  notification: NotificationsApi.Notification;
}

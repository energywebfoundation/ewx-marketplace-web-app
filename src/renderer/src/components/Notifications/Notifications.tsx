import * as Tabs from '@radix-ui/react-tabs';
import { twix } from 'tailwindcss-radix-ui';
import { NotificationsApi } from '@ewf/types/api';
import { useNotificationStore } from '@ewf/stores/notifications';
import { NotificationCard } from './NotificationCard';
import { NotificationsEmpty } from './NotificationsEmpty';
import { isElectron } from '@main/helpers/is-electron';

export const Notifications = ({ notifications }: Props) => {
  const markAllNotificationsAsRead = useNotificationStore(
    (state) => state.markAllNotificationsAsRead,
  );

  enum Tab {
    ALL = 'all',
    DOWNLOADS = 'downloads',
    ACTION = 'action',
  }

  const filterByTab = (tab: Tab) => {
    return notifications
      .filter((notification) => notification.isVisible)
      .filter((notification) => {
        if (tab === Tab.ALL) return true;
        if (tab === Tab.DOWNLOADS) return notification.type === 'download';
        if (tab === Tab.ACTION) return notification.type === 'action';

        return false;
      });
  };

  const renderTabNotifications = (notifications: NotificationsApi.Notification[]) => {
    return notifications.length === 0 ? (
      <NotificationsEmpty />
    ) : (
      notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))
    );
  };

  return (
    <div className="flex h-fit w-[360px] flex-col gap-4 rounded-lg border-2 border-transparent pb-6 pt-5 gradient-border-secondary-with-gray-90">
      <section className="border-subtler mx-5 flex justify-between border-b border-gray-70 pb-2">
        <p className="text-md break-words">Notifications</p>
        <button
          onClick={markAllNotificationsAsRead}
          className="text-sm text-brand hover:text-brand-light"
        >
          Mark all as read
        </button>
      </section>
      <Tabs.Root defaultValue="all">
        <Tabs.List className="flex gap-2 px-5 pb-3">
          <TabTrigger value={Tab.ALL} className="px-5">
            All
          </TabTrigger>
          {isElectron() ? <TabTrigger value={Tab.DOWNLOADS}>Downloads</TabTrigger> : null}
          <TabTrigger value={Tab.ACTION}>Action required</TabTrigger>
        </Tabs.List>
        <TabsContent className="pt-2" value={Tab.ALL}>
          {renderTabNotifications(filterByTab(Tab.ALL))}
        </TabsContent>
        <TabsContent value={Tab.DOWNLOADS}>
          {renderTabNotifications(filterByTab(Tab.DOWNLOADS))}
        </TabsContent>
        <TabsContent value={Tab.ACTION}>
          {renderTabNotifications(filterByTab(Tab.ACTION))}
        </TabsContent>
      </Tabs.Root>
    </div>
  );
};

interface Props {
  notifications: NotificationsApi.Notification[];
}

const TabTrigger = twix(
  Tabs.Trigger,
  'rounded-full border-2 border-gray-80 px-4 py-2 text-center font-primary-regular text-sm text-font-subtle data-[state=active]:bg-gray-80 data-[state=inactive]:hover:bg-gray-80',
);

const TabsContent = twix(
  Tabs.Content,
  'flex max-h-[520px] flex-col gap-4 overflow-y-auto pl-5 pr-6',
);

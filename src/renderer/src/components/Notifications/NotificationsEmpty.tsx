import bellIcon from '@ewf/assets/icons/bell-ringing.svg';

export const NotificationsEmpty = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="mr-4 grid h-[80px] w-[80px] flex-shrink-0 place-items-center rounded-full bg-brand/10">
      <img src={bellIcon} width={34} height={34} alt="GalaxySubscriptionIcon" />
    </div>
    <p className="mt-6 text-gray-40 font-primary-bold">No notifications yet</p>
    <p className="mt-1 text-gray-40 text-sm">When you get notifications, they’ll show up here</p>
  </div>
);

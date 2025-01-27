import { create } from 'zustand';
import Joi from 'joi';
import { SolutionGroupId } from '@main/entities/solution-group';
import { IpcChannel } from '@main/helpers/ipc';
import { useApiServiceStore } from '@ewf/stores/api';
import { isElectron } from '@main/helpers/is-electron';
import { useWalletEnvStore } from './wallet-env';
import { NotificationsApi, WorkerApi } from '@ewf/types/api';
import { WORKER_STATUS } from '@ewf/types/enums';

type NotificationStore = {
  isInitialized: boolean;
  init: () => void;
  cleanUp: () => void;
  intervalId: NodeJS.Timeout | null;
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
  notifications: NotificationsApi.Notification[];
  createNotification: (notification: NotificationsApi.NotificationCreate) => void;
  liftingSuccessNotification: (amount: number) => void;
  liftingErrorNotification: () => void;
  loweringSuccessNotification: (amount: number) => void;
  loweringErrorNotification: () => void;
  stakingSuccessNotification: (amount: number) => void;
  stakingErrorNotification: () => void;
  topupSuccessNotification: (amount: number) => void;
  topupErrorNotification: () => void;
  operatorSignupSuccessNotification: () => void;
  operatorSignupErrorNotification: () => void;
  linkWorkerSuccessNotification: () => void;
  linkWorkerErrorNotification: () => void;
  unlinkWorkerSuccessNotification: () => void;
  unlinkWorkerErrorNotification: () => void;
  downloadWorkerSuccessNotification: (workerName: string) => void;
  downloadWorkerErrorNotification: (workerName: string) => void;
  unstakeSuccessNotification: (workerId: string) => void;
  unstakeErrorNotification: (workerId: string) => void;
  claimRewardsSuccessNotification: () => void;
  claimRewardsErrorNotification: () => void;
  fetchNotifications: () => void;
  markNotificationAsRead: (notificationId: number) => void;
  markAllNotificationsAsRead: () => void;
  dismissNotification: (notificationId: number) => void;
  firstTimeDownloadNotification: () => void;
  votingNextPeriodNotification: (workerName: string) => void;
  fetchRemoteNotifications: () => Promise<void>;
  validateRemoteNotification: (notification: RemoteNotification) => RemoteNotification | undefined;
  createNewRemoteNotifications: (remoteNotifications: RemoteNotification[]) => void;
  unsubscriptionDelaySuccessNotification: (workerName: string, withdrawalDelay: number) => void;
};

type RemoteNotification = Pick<
  NotificationsApi.Notification,
  'type' | 'status' | 'title' | 'description'
> & {
  date: number;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  isInitialized: false,
  init: () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });

    get().fetchNotifications();

    if (isElectron()) {
      window.Api.on(
        IpcChannel.solutionGroupStatusUpdated,
        (workerId: WorkerApi.WorkerId, status: WORKER_STATUS) => {
          if (status === WORKER_STATUS.Downloaded) {
            get().downloadWorkerSuccessNotification(workerId);
          }

          if (status === WORKER_STATUS.DownloadFailed) {
            get().downloadWorkerErrorNotification(workerId);
          }
        },
      );

      useWalletEnvStore.subscribe((state, prevState) => {
        if (state.env !== prevState.env) {
          get().fetchRemoteNotifications();
        }
      });
    }
  },
  cleanUp: () => {
    if (isElectron()) {
      window.Api.removeAllListeners(IpcChannel.solutionGroupStatusUpdated);
    }
    const intervalId = get().intervalId;
    if (intervalId) clearInterval(intervalId);
    set({ isInitialized: false });
  },
  intervalId: null,
  isOpen: false,
  notifications: [],
  openPanel: () => set({ isOpen: true }),
  closePanel: () => set({ isOpen: false }),

  createNotification: async (notificationCreate: NotificationsApi.NotificationCreate) => {
    try {
      const workerApi = useApiServiceStore.getState().api;
      const newNotification = await workerApi.notificationsCreate(notificationCreate);
      set({ notifications: [newNotification, ...get().notifications] });
      workerApi.sendNotification(notificationCreate.title, notificationCreate.description);
    } catch (error) {
      console.error(error);
    }
  },

  liftingSuccessNotification: (amount: number) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Lifting Operation Scheduled',
      description: `${amount} EWT are scheduled for lifting from EWC to EWX. The result will be visible in your EWX balance in about 30 minutes.`,
    });
  },
  liftingErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Lifting Operation Failed',
      description:
        'There was an issue while lifting your EWT tokens. Please try again later or contact support.',
    });
  },
  loweringSuccessNotification: (amount: number) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Lowering Operation Scheduled',
      description: `${amount} EWT are scheduled for lowering from EWX to EWC. The result will be visible in your EWC balance within 24 hours.`,
    });
  },
  loweringErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Lowering Operation Failed',
      description:
        'There was an issue while lowering your EWT tokens. Please try again later or contact support.',
    });
  },
  stakingSuccessNotification: (amount: number) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Subscription Succeeded',
      description: `You have successfully confirmed your subscription for ${amount} EWT.`,
    });
  },
  stakingErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Subscription Failed',
      description:
        'There was an issue while subscribing your EWT tokens. Please try again later or contact support.',
    });
  },
  topupSuccessNotification: (amount: number) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Topup Operation Succeeded',
      description: `${amount} EWT were successfully added to your subscription amount. It will be reflected in the next reward period`,
    });
  },
  topupErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Topup Operation Failed',
      description:
        'There was an issue while topping up your EWT subscribed tokens. Please try again later or contact support.',
    });
  },
  operatorSignupSuccessNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Operator Signup Succeeded',
      description: 'Your operator was successfully registered.',
    });
  },
  operatorSignupErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Operator Signup Failed',
      description:
        'There was an issue while registering your operator. Please try again later or contact support.',
    });
  },
  linkWorkerSuccessNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Link Worker Succeeded',
      description: 'Your worker account and EWX account were successfully linked.',
    });
  },
  linkWorkerErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Link Worker Failed',
      description:
        'There was an issue while linking your worker account and EWX account. Please try again later or contact support.',
    });
  },
  unlinkWorkerSuccessNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Unlink Worker Succeeded',
      description: 'Your worker account and EWX account were successfully unlinked.',
    });
  },
  unlinkWorkerErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Unlink Worker Failed',
      description:
        'There was an issue while unlinking your worker account and EWX account. Please try again later or contact support.',
    });
  },
  downloadWorkerSuccessNotification: (workerId: SolutionGroupId) => {
    get().createNotification({
      type: 'download',
      status: 'success',
      title: 'Solution Group Download Succeeded',
      description: `The solution group '${workerId}' was successfully downloaded.`,
    });
  },
  downloadWorkerErrorNotification: (workerId: SolutionGroupId) => {
    get().createNotification({
      type: 'download',
      status: 'error',
      title: 'Solution Group Download Failed',
      description: `There was an issue while downloading '${workerId}' solution group. Please try again later or contact support.`,
    });
  },
  unstakeSuccessNotification: (workerId: SolutionGroupId) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Unsubscribe Succeeded',
      description: `You successfully unsubscribed from the solution group '${workerId}'`,
    });
  },
  unstakeErrorNotification: (workerId: SolutionGroupId) => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Unsubscribe Failed',
      description: `There was an issue while unsubscribing '${workerId}' solution group. Please try again later or contact support.`,
    });
  },
  claimRewardsSuccessNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Claim Rewards Succeeded',
      description: `Your EWT tokens were successfully claimed.`,
    });
  },
  claimRewardsErrorNotification: () => {
    get().createNotification({
      type: 'information',
      status: 'error',
      title: 'Claim Rewards Failed',
      description:
        'There was an issue while claiming your rewards. Please try again later or contact support.',
    });
  },

  firstTimeDownloadNotification: () => {
    const workerApi = useApiServiceStore.getState().api;
    workerApi.sendNotification(
      'Download Succeeded',
      'You have successfully downloaded the Marketplace App. Dive in our solutions, run a worker node and enjoy the experience.',
    );
  },

  votingNextPeriodNotification: (workerId: SolutionGroupId) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: `${workerId} node will start voting in the next reward period`,
      description:
        'In the next reward period you should see your casted votes reflected in the Dashboard.',
    });
  },

  unsubscriptionDelaySuccessNotification: (workerId: SolutionGroupId, withdrawalDelay: number) => {
    get().createNotification({
      type: 'information',
      status: 'success',
      title: 'Unsubscribe Succeeded',
      description: `You successfully unsubscribed from the solution group '${workerId}'. It will take effect after ${withdrawalDelay} block(s).`,
    });
  },

  fetchNotifications: async () => {
    try {
      const workerApi = useApiServiceStore.getState().api;
      const notifications = await workerApi.notificationsGetAll();
      set({ notifications });
    } catch (error) {
      console.error(error);
    }
  },

  markNotificationAsRead: async (notificationId: number) => {
    try {
      const workerApi = useApiServiceStore.getState().api;
      set({
        notifications: get().notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: true } : notification,
        ),
      });
      await workerApi.notificationsMarkAsRead(notificationId);
    } catch (error) {
      console.error(error);
      // Revert changes
      set({
        notifications: get().notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, isRead: false } : notification,
        ),
      });
    }
  },

  markAllNotificationsAsRead: async () => {
    const previousNotifications = [...get().notifications];

    try {
      const workerApi = useApiServiceStore.getState().api;
      set({
        notifications: get().notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      });
      await Promise.all(
        get()
          .notifications.filter((notification) => !notification.isRead)
          .map((notification) => workerApi.notificationsMarkAsRead(notification.id)),
      );
    } catch (error) {
      console.error(error);
      // Revert changes
      set({ notifications: previousNotifications });
    }
  },

  dismissNotification: async (notificationId: number) => {
    try {
      const workerApi = useApiServiceStore.getState().api;
      set({
        notifications: get().notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true, isVisible: false }
            : notification,
        ),
      });

      await workerApi.notificationsDismiss(notificationId);
    } catch (error) {
      console.error(error);
      // Revert changes
      set({
        notifications: get().notifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: false, isVisible: true }
            : notification,
        ),
      });
    }
  },

  // NOTE: This function is not used in the current implementation
  fetchRemoteNotifications: async () => {
    const workerApi = useApiServiceStore.getState().api;
    workerApi
      .getNotificationsUrl()
      .then((url) => fetch(url))
      .then((response) => response.json())
      .then((data: RemoteNotification[]) => {
        const validatedRemoteNotifications = data
          .map((remoteNotifiaction) => get().validateRemoteNotification(remoteNotifiaction))
          .filter(Boolean) as RemoteNotification[];

        get().createNewRemoteNotifications(validatedRemoteNotifications);
      })
      .catch((error) => console.error(error));
  },

  validateRemoteNotification: (
    notification: RemoteNotification,
  ): RemoteNotification | undefined => {
    const schema = Joi.object({
      date: Joi.number().required(),
      type: Joi.string()
        .valid('information', 'download', 'action')
        .required()
        .default('information'),
      status: Joi.string().valid('success', 'info', 'error').required().default('info'),
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const { error, value } = schema.validate(notification);

    if (error) {
      console.error(error);
      return;
    }

    return value;
  },

  // Check for the stored notification's dates and display only the new ones
  createNewRemoteNotifications: async (remoteNotifications: RemoteNotification[]) => {
    const NOTIFICATIONS_LOCAL_STORAGE_KEY = 'notifications';
    const storedNotifications = localStorage.getItem(NOTIFICATIONS_LOCAL_STORAGE_KEY);
    const storedNotificationsArray: number[] = storedNotifications
      ? JSON.parse(storedNotifications)
      : [];
    const newNotifications = remoteNotifications.filter((notification) => {
      return !storedNotificationsArray.includes(notification.date);
    });
    const newNotificationsDates = newNotifications.map((notification) => notification.date);
    localStorage.setItem(
      NOTIFICATIONS_LOCAL_STORAGE_KEY,
      JSON.stringify([...storedNotificationsArray, ...newNotificationsDates]),
    );
    await Promise.all(
      newNotifications.map((notification) => {
        return get().createNotification({
          type: notification.type,
          status: notification.status,
          title: notification.title,
          description: notification.description,
        });
      }),
    );
  },
}));

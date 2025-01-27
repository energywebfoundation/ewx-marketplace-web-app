import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsApi } from '@ewf/types/api';
import { Notifications } from './Notifications';

const meta = {
  title: 'Components/Header/Notifications1',
  component: Notifications,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const mockNotifications: NotificationsApi.Notification[] = [
  {
    id: 1,
    type: 'download',
    status: 'success',
    title: 'Download success',
    description: 'This is a description.',
    isRead: false,
    createdDate: new Date(),
    isVisible: true,
  },
  {
    id: 2,
    type: 'download',
    status: 'error',
    title: 'Download error',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: true,
    createdDate: new Date(),
    isVisible: true,
  },
  {
    id: 3,
    type: 'information',
    status: 'success',
    title: 'Success notification',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-10 10:45:12'),
    isVisible: true,
  },
  {
    id: 4,
    type: 'information',
    status: 'info',
    title: 'Info notification',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-10 10:45:12'),
    isVisible: true,
  },
  {
    id: 5,
    type: 'information',
    status: 'error',
    title: 'Error notification',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-10 10:45:12'),
    isVisible: true,
  },
  {
    id: 6,
    type: 'action',
    status: 'success',
    title: 'Action success',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-04 13:45:12'),
    isVisible: true,
  },
  {
    id: 7,
    type: 'action',
    status: 'error',
    title: 'Action error',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-04 13:45:12'),
    isVisible: true,
  },
  {
    id: 8,
    type: 'action',
    status: 'info',
    title: 'Action info',
    description:
      'This is a description. It can be very long because it will be truncated on the preview.',
    isRead: false,
    createdDate: new Date('2024-01-04 13:45:12'),
    isVisible: true,
  },
];

export const Default: Story = {
  args: {
    notifications: mockNotifications,
  },
};

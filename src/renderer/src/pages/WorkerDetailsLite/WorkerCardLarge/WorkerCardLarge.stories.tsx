import type { Meta, StoryObj } from '@storybook/react';
import { WorkerCardLargeView, WorkerCardLargeViewProps } from './WorkerCardLarge';
import { SOLUTION_GROUP_STATUS } from '@ewf/types/enums';

const meta = {
  title: 'Pages/Worker Lite/WorkerCardLarge',
  component: WorkerCardLargeView,
  parameters: {
    layout: 'top',
  },
  decorators: [
    (Story) => (
      <div className="h-full w-[550px] p-4 bg-radial-gradient">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WorkerCardLargeView>;

export default meta;
type Story = StoryObj<typeof meta>;

const args: WorkerCardLargeViewProps = {
  status: SOLUTION_GROUP_STATUS.Scheduled,
  workerId: '1',
  workerName: 'Worker 1',
  namespace: 'namespace 1',
  category: 'Green Proofs',
  name: 'Don’t Trust Verify - GP4BTC',
  description:
    'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
  subTitle: 'Green Proofs for Bitcoin',
  subDescription:
    'This is a very long sentence used as mock to test component behaviour. We cannot use other famour latin placeholders because Apple check system will detect it as "not a final version"',
  progress: 0.6,
  isStaked: false,
  hasOperatorsAllowlist: false,
  buttonStatus: 'connect',
  withdrawalDelay: 50,
};

export const Loading: Story = {
  args: {
    ...args,
    buttonStatus: 'loading',
  },
};

export const Running: Story = {
  args: {
    ...args,
    buttonStatus: 'staked',
  },
};

export const OptIn: Story = {
  args: {
    ...args,
    buttonStatus: 'opt-in',
  },
};

export const Connect: Story = {
  args: {
    ...args,
    buttonStatus: 'connect',
  },
};

export const Private: Story = {
  args: {
    ...args,
    workerId: 'safc',
    hasOperatorsAllowlist: true,
    buttonStatus: 'connect',
  },
};

export const SafC: Story = {
  args: {
    ...args,
    workerId: 'safc',
    category: 'ENERGY WEB FOUNDATION',
    name: 'Sustainable Aviation Fuel Certificate Registry',
    description:
      'Sustainable aviation fuel registry worker nodes calculate and verify carbon attributes and other associated metrics for every unit of fuel tracked in the registry',
  },
};

export const Maritime: Story = {
  args: {
    ...args,
    workerId: 'maritime',
    name: 'Maritime',
  },
};

export const SmartflowBeta: Story = {
  args: {
    ...args,
    workerId: 'smartflow.beta',
    category: 'ENERGY WEB LAUNCHPAD',
    name: 'SmartFlow',
    description:
      'SmartFlow nodes perform different work packages configured by enterprise users using EnergyWeb software as service platform - Launchpad',
  },
};

export const GP4BTC: Story = {
  args: {
    ...args,
    workerId: 'gp4btc',
    category: 'ENERGY WEB',
    name: 'GreenProof for Bitcoin',
    description:
      'Performs checks and verification of data submitted by bitcoin miners in order to receive Green Proof for Bitcoin credentials',
  },
};

export const GP4EV: Story = {
  args: {
    ...args,
    workerId: 'gp4ev',
    category: 'ENERGY WEB',
    name: 'GreenProof for EVs',
    description:
      'Fractionalizes and matches energy attribute certificates and with specific electric vehicle charge events',
  },
};

export const DigitalSpine: Story = {
  args: {
    ...args,
    workerId: 'digitalspine',
    name: 'Digital Spine',
  },
};

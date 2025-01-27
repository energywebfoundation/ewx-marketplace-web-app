import { mapPalletSolutionGroupToEntity } from '@ewf/types/mappers';
import { indexedDBService, LocalStores } from './IndexedDBService';
import ewxPalletService from './EWXPalletService';
import { hexToU8a } from '@polkadot/util';
import { Keyring } from '@polkadot/api';
import { TypeRegistry } from '@polkadot/types';
import { DateTime } from 'luxon';
import Web3 from 'web3';
import { useBalanceStore } from '@ewf/stores/balance';
import { AccountInfo } from '@polkadot/types/interfaces';
import { getIndexer } from '@ewf/lib/indexer';
import {
  AddressBookApi,
  Api,
  ElectronAppApi,
  ExternalUrlApi,
  FavouritesApi,
  NodeRedServerApi,
  NotificationsApi,
  Theme,
  WalletApi,
  WalletDeviceApi,
  WorkerApi,
} from '@ewf/types/api';
import { MARKETPLACE_ENV } from '@ewf/stores/wallet-env';
import axios from 'axios';
import {
  DEVICE_TYPE,
  EWX_LINK_STATUS,
  MARKETPLACE_CHAINS,
  SOLUTION_GROUP_STATUS,
  WORKER_STATUS,
} from '@ewf/types/enums';

export const projectId = () => import.meta.env.VITE_WC_PROJECT_ID;
export const ewcRpc = () => import.meta.env.VITE_VOLTA_RPC_ENDPOINT as string;
export const ewcWs = () => import.meta.env.VITE_VOLTA_WS_ENDPOINT as string;
export const avtContractAddress = () => import.meta.env.VITE_AVT_CONTRACT_ADDRESS;
export const ewcChainId = () => import.meta.env.VITE_EWC_CHAIN_ID;
export const relayUrl = () => import.meta.env.VITE_WC_RELAY_URL;
export const smartContract = () => import.meta.env.VITE_SMART_CONTRACT;
export const ewxRpc = () => import.meta.env.VITE_POLKADOT_ENDPOINT;
export const ewxPalletRpc = () => import.meta.env.VITE_POLKADOT_PALLET_ENDPOINT;
export const ewxChainId = () => import.meta.env.VITE_EWX_CHAIN_ID;
export const environment = () =>
  (import.meta.env.VITE_ENVIRONMENT as MARKETPLACE_ENV) || ('PROD' as MARKETPLACE_ENV);
export const ewxAddress = () => import.meta.env.VITE_EWX_ADDRESS as string;
export const ipfsUrl = () => import.meta.env.VITE_IPFS_URL as string;
export const ipfsContextPath = () => import.meta.env.VITE_IPFS_CONTEXT_PATH as string;
export const whitelistUrl = () => import.meta.env.VITE_WHITELIST_URL as string;
export const ewxCheckUA = () => import.meta.env.VITE_EWX_CHECK_UA as string;
export const ewcExplorerUrl = () => import.meta.env.VITE_EWC_EXPLORER_URL as string;
export const ewxExplorerUrl = () => import.meta.env.VITE_EWX_EXPLORER_URL as string;
export const requestEwxSleep = () =>
  (import.meta.env.VITE_REQ_EWX_SLEEP as string) || ('1000' as string);
export const testVersion = () => import.meta.env.VITE_IS_TEST_VERSION as string;
export const indexerUrl = () => import.meta.env.VITE_INDEXER_URL as string;

export const abi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 't1Address',
        type: 'address',
      },
    ],
    name: 'AddressAlreadyInUse',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 't1Address',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 't1PublicKey',
        type: 'bytes',
      },
    ],
    name: 'AddressMismatch',
    type: 'error',
  },
  {
    inputs: [],
    name: 'AmountCannotBeZero',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'existingT2PublicKey',
        type: 'bytes32',
      },
    ],
    name: 'CannotChangeT2PublicKey',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CannotReceiveEWTUnlessLifting',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CollatorAlreadyRegistered',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CollatorFunctionsAreDisabled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'CollatorNotRegistered',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidConfirmations',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidLowerData',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidQuorum',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidT1PublicKey',
    type: 'error',
  },
  {
    inputs: [],
    name: 'InvalidT2PublicKey',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LiftLimitExceeded',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LiftingIsDisabled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LowerAlreadyUsed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'LoweringIsDisabled',
    type: 'error',
  },
  {
    inputs: [],
    name: 'MissingCollatorKeys',
    type: 'error',
  },
  {
    inputs: [],
    name: 'NotALowerTransaction',
    type: 'error',
  },
  {
    inputs: [],
    name: 'OwnerOnly',
    type: 'error',
  },
  {
    inputs: [],
    name: 'PaymentFailed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'RootHashAlreadyPublished',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
    ],
    name: 'T2PublicKeyAlreadyInUse',
    type: 'error',
  },
  {
    inputs: [],
    name: 'TransactionIdAlreadyUsed',
    type: 'error',
  },
  {
    inputs: [],
    name: 'UnsignedTransaction',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'previousAdmin',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'newAdmin',
        type: 'address',
      },
    ],
    name: 'AdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'beacon',
        type: 'address',
      },
    ],
    name: 'BeaconUpgraded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint8',
        name: 'version',
        type: 'uint8',
      },
    ],
    name: 'Initialized',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't1PublicKeyLHS',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 't1PublicKeyRHS',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
    ],
    name: 'LogCollatorDeregistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'LogCollatorFunctionsAreEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't1PublicKeyLHS',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'bytes32',
        name: 't1PublicKeyRHS',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
    ],
    name: 'LogCollatorRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 't1Address',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LogLifted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'LogLiftingIsEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes2',
        name: 'callId',
        type: 'bytes2',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'numBytes',
        type: 'uint256',
      },
    ],
    name: 'LogLowerCallUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 't1Address',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'LogLowered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'LogLoweringIsEnabled',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[2]',
        name: 'quorum',
        type: 'uint256[2]',
      },
    ],
    name: 'LogQuorumUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'bytes32',
        name: 'rootHash',
        type: 'bytes32',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
    ],
    name: 'LogRootPublished',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'implementation',
        type: 'address',
      },
    ],
    name: 'Upgraded',
    type: 'event',
  },
  {
    inputs: [],
    name: 'collatorFunctionsAreEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'leafHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes32[]',
        name: 'merklePath',
        type: 'bytes32[]',
      },
    ],
    name: 'confirmTransaction',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 't1PublicKey',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'confirmations',
        type: 'bytes',
      },
    ],
    name: 'deregisterCollator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    name: 'growthAmount',
    outputs: [
      {
        internalType: 'uint128',
        name: '',
        type: 'uint128',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32',
      },
    ],
    name: 'growthRelease',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'hasLowered',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToT1Address',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'idToT2PublicKey',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'isActiveCollator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'isPublishedRootHash',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'isRegisteredCollator',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'isUsedT2TransactionId',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'erc20Address',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 't2PublicKey',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'lift',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 't2PublicKey',
        type: 'bytes',
      },
    ],
    name: 'liftEWT',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'liftingIsEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 't1Address',
        type: 'address[]',
      },
      {
        internalType: 'bytes32[]',
        name: 't1PublicKeyLHS',
        type: 'bytes32[]',
      },
      {
        internalType: 'bytes32[]',
        name: 't1PublicKeyRHS',
        type: 'bytes32[]',
      },
      {
        internalType: 'bytes32[]',
        name: 't2PublicKey',
        type: 'bytes32[]',
      },
    ],
    name: 'loadCollators',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'leaf',
        type: 'bytes',
      },
      {
        internalType: 'bytes32[]',
        name: 'merklePath',
        type: 'bytes32[]',
      },
    ],
    name: 'lower',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'loweringIsEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'nextCollatorId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'numActiveCollators',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes2',
        name: '',
        type: 'bytes2',
      },
    ],
    name: 'numBytesToLowerData',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxiableUUID',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'rootHash',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'confirmations',
        type: 'bytes',
      },
    ],
    name: 'publishRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'quorum',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 't1PublicKey',
        type: 'bytes',
      },
      {
        internalType: 'bytes32',
        name: 't2PublicKey',
        type: 'bytes32',
      },
      {
        internalType: 'uint256',
        name: 't2TransactionId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'confirmations',
        type: 'bytes',
      },
    ],
    name: 'registerCollator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256[2]',
        name: '_quorum',
        type: 'uint256[2]',
      },
    ],
    name: 'setQuorum',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 't1AddressToId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 't2PublicKeyToId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'toggleCollatorFunctions',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'toggleLifting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'state',
        type: 'bool',
      },
    ],
    name: 'toggleLowering',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes2',
        name: 'callId',
        type: 'bytes2',
      },
      {
        internalType: 'uint256',
        name: 'numBytes',
        type: 'uint256',
      },
    ],
    name: 'updateLowerCall',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
    ],
    name: 'upgradeTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newImplementation',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'upgradeToAndCall',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
];

const waitFor = async (
  cb: () => Promise<boolean>,
  { retries = 10, interval = 1000 }: { interval?: number; retries?: number } = {},
) => {
  let num = retries;
  let result = await cb();
  if (result) return;
  while (!result && num > 0) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    result = await cb();
    num--;
  }
};

export const CHAINS_NAMESPACES = () => ({
  EWX: {
    polkadot: {
      methods: ['polkadot_signTransaction', 'polkadot_signMessage'],
      chains: [`polkadot:${ewxChainId()}`],
      events: ['chainChanged', 'accountsChanged'],
    },
  },
  EWC: {
    eip155: {
      methods: ['eth_sendTransaction', 'personal_sign', 'eth_getBalance', 'eth_requestAccounts'],
      events: ['chainChanged', 'accountsChanged'],
      chains: [`eip155:${ewcChainId()}`],
    },
  },
});

export const metadata = {
  name: 'EWX Marketplace',
  description: 'Energy Web Foundation Marketplace',
  url: 'https://www.energyweb.org/',
  icons: ['https://www.energyweb.org/wp-content/uploads/2022/10/Group-36175.png'],
};

export class BrowserApi implements Api {
  private readonly KEYRING = new Keyring({ type: 'sr25519' });
  private readonly EWX_BUFFER_FEE = 0.02;
  private registry = new TypeRegistry();

  async appInit(): Promise<ElectronAppApi.AppInit> {
    return Promise.resolve();
  }

  async continueAppInit(): Promise<ElectronAppApi.ContinueAppInit> {
    return Promise.resolve();
  }

  async diagnostics(): Promise<NodeRedServerApi.Diagnostics> {
    return Promise.resolve({
      isRunning: false,
      runningFlows: 0,
      pendingFlows: 0,
      totalFlows: 0,
      scheduledDeploymentTime: null,
      deployedFlows: { rev: '', flows: [] },
    });
  }

  async getWalletConst(): Promise<WalletApi.GetWalletConst> {
    return Promise.resolve({
      projectId: projectId(),
      smartContract: smartContract(),
      ewcRpc: ewcRpc(),
      ewxRpc: ewxRpc(),
      ewxPalletRpc: ewxPalletRpc(),
      avtContractAddress: avtContractAddress(),
      ewxChainId: ewxChainId(),
      ewcChainId: ewcChainId(),
      relayUrl: relayUrl(),
      CHAINS_NAMESPACES: CHAINS_NAMESPACES(),
      metadata,
      abi,
      env: environment(),
      ewcExplorerUrl: ewcExplorerUrl(),
      ewxExplorerUrl: ewxExplorerUrl(),
      requestEwxSleep: requestEwxSleep(),
      indexerUrl: indexerUrl(),
      isRunLocal: false,
    });
  }

  async queryBalance(): Promise<WorkerApi.QueryBalance> {
    const lastEwxAccount = await this.getLastEWXAccount();
    if (!lastEwxAccount.ewxAddress) {
      return '0';
    }

    const api = await ewxPalletService.connect();
    const { data } = await api.query.system.account<AccountInfo>(lastEwxAccount.ewxAddress);
    const freeBalance = data.free ? data.free.toBigInt() : BigInt(0);
    const miscFrozen = data.miscFrozen ? data.miscFrozen.toBigInt() : BigInt(0);
    const availableBalance = freeBalance - miscFrozen;
    const availableBalanceStr = availableBalance.toString();
    useBalanceStore.getState().setBalanceEWX(availableBalanceStr);
    return availableBalanceStr;
  }

  async getSubscriptionFlags(): Promise<WorkerApi.SubscriptionFlags> {
    return Promise.resolve({
      hasSubscription: false,
      hasVotingEnabled: false,
    });
  }

  async systemTheme(): Promise<Theme> {
    return Promise.resolve('dark');
  }

  // TODO: react based notifications?
  async sendNotification(title: string, message: string): Promise<ElectronAppApi.SendNotification> {
    return Promise.resolve();
  }

  // TODO: fix return type
  async notificationsCreate(
    notification: NotificationsApi.NotificationCreate,
  ): Promise<NotificationsApi.Notification> {
    const now = DateTime.now();
    const result = await indexedDBService.upsertData<NotificationsApi.Notification>(
      LocalStores.NOTIFICATIONS,
      {
        ...notification,
        id: now.toMillis(),
        createdDate: now.toJSDate(),
        isRead: false,
        isVisible: true,
      },
    );
    if (result && typeof result !== 'string') {
      return result;
    }
  }

  // TODO: fix return type
  async notificationsGetAll(): Promise<NotificationsApi.GetAll> {
    const result = await indexedDBService.fetchAll<NotificationsApi.Notification>(
      LocalStores.NOTIFICATIONS,
    );
    if (result && typeof result !== 'string') {
      return result;
    } else {
      return [];
    }
  }

  async notificationsMarkAsRead(notificationId: number): Promise<NotificationsApi.MarkAsRead> {
    const result = await indexedDBService.fetchData<NotificationsApi.Notification>(
      LocalStores.NOTIFICATIONS,
      notificationId,
    );
    if (result && typeof result !== 'string') {
      result.isRead = true;
      const updatedResult = await indexedDBService.upsertData(LocalStores.NOTIFICATIONS, result);
      if (updatedResult && typeof updatedResult !== 'string') {
        return updatedResult;
      }
    }
  }

  async notificationsDismiss(notificationId: number): Promise<NotificationsApi.Dismiss> {
    const result = await indexedDBService.fetchData<NotificationsApi.Notification>(
      LocalStores.NOTIFICATIONS,
      notificationId,
    );
    if (result && typeof result !== 'string') {
      result.isVisible = false;
      const updatedResult = await indexedDBService.upsertData(LocalStores.NOTIFICATIONS, result);
      if (updatedResult && typeof updatedResult !== 'string') {
        return updatedResult;
      }
    }
  }

  getNotificationsUrl(): Promise<ExternalUrlApi.Notifications> {
    return Promise.resolve(import.meta.env.VITE_NOTIFICATIONS_DATA_URL);
  }

  getHeroBannerUrl(): Promise<ExternalUrlApi.HeroBanner> {
    return Promise.resolve(import.meta.env.VITE_HERO_BANNER_DATA_URL);
  }

  getWorkerCardUrl(): Promise<ExternalUrlApi.WorkerCard> {
    return Promise.resolve(import.meta.env.VITE_WORKER_CARD_DATA_URL);
  }

  getBlacklistedSolutionGroupsUrl(): Promise<ExternalUrlApi.BlacklistedSolutionGroups> {
    return Promise.resolve(import.meta.env.VITE_BLACKLISTED_SOLUTION_GROUPS_DATA_URL);
  }

  async addressBookList(): Promise<AddressBookApi.List> {
    const result = await indexedDBService.fetchAll<AddressBookApi.AddressBook>(
      LocalStores.ADDRESS_BOOK,
    );
    if (result && typeof result !== 'string') {
      await this.updateBalance();
      return result;
    } else {
      return [];
    }
  }

  async addressBookCreate(address: string): Promise<AddressBookApi.Create> {
    if (!Web3.utils.isAddress(address)) {
      return {
        status: 'error',
        message: 'Invalid EWC address',
      };
    }

    try {
      const result = await indexedDBService.fetchData<AddressBookApi.AddressBook>(
        LocalStores.ADDRESS_BOOK,
        address,
      );
      if (result && typeof result !== 'string') {
        return {
          status: 'error',
          message: 'Address already exists',
        };
      }

      const ewxAddress = (await this.getLastEWXAccount()).ewxAddress;
      await indexedDBService.upsertData(LocalStores.ADDRESS_BOOK, {
        address,
        chain: 'EWC',
        balance: '0',
        symbol: 'VT',
        createdDate: DateTime.now().toISO(),
        environment: environment(),
        ewxAddress,
      });

      await this.updateBalance();

      return {
        status: 'ok',
      };
    } catch (e) {
      console.error(e);
      return {
        status: 'error',
        message: "Unknown error, can't create address",
      };
    }
  }

  async addressBookDelete(address: string): Promise<AddressBookApi.Delete> {
    await indexedDBService.removeData(LocalStores.ADDRESS_BOOK, address);
  }

  async updateBalance(): Promise<void> {
    const ewxAddress = (await this.getLastEWXAccount()).ewxAddress;
    const allAccounts = await indexedDBService.fetchAll<AddressBookApi.AddressBook>(
      LocalStores.ADDRESS_BOOK,
    );
    if (allAccounts && typeof allAccounts !== 'string') {
      const filteredAccounts = allAccounts.filter(
        (account) => account.environment === environment() && account.ewxAddress === ewxAddress,
      );

      if (filteredAccounts.length) {
        try {
          const httpProvider = new Web3.providers.HttpProvider(ewcRpc());
          const web3 = new Web3(httpProvider);
          for (const account of filteredAccounts) {
            const available = await web3.eth.getBalance(account.address);
            const balance = web3.utils.fromWei(available, 'ether');
            account.balance = balance;
            await indexedDBService.upsertData(LocalStores.ADDRESS_BOOK, account);
          }
        } catch (ex) {
          console.error(ex);
        }
      }
    }
  }

  async getFeeEWC(): Promise<WorkerApi.GetFeeEWC> {
    return Promise.resolve('0');
  }

  async getFeeEWX(type: string): Promise<WorkerApi.GetFeeEWX> {
    try {
      const api = await ewxPalletService.connect();
      const OPERATOR_KEYRING = this.KEYRING.addFromMnemonic(
        'plastic success hill liar stick clutch robot embrace say monster hire slam',
        {
          name: 'Check Fee Account',
        },
      );

      const data = {
        namespace: 'namespace_test_1',
        address: OPERATOR_KEYRING.address,
        hexPublicAddress: OPERATOR_KEYRING.publicKey,
        token: hexToU8a(avtContractAddress()),
        ewc: avtContractAddress(),
        amount: '100',
      };

      let paymentInfo;
      if (type === 'staking') {
        paymentInfo = await api.tx.workerNodePallet
          .subscribeToSolutionGroup(...[data.namespace, data.amount])
          .paymentInfo(OPERATOR_KEYRING);
      } else if (type === 'lowering') {
        paymentInfo = await api.tx.tokenManager
          .scheduleDirectLower(...[data.hexPublicAddress, data.token, data.amount, data.ewc])
          .paymentInfo(OPERATOR_KEYRING);
      } else if (type === 'claim') {
        paymentInfo = await api.tx.workerNodePallet
          .claimRewards([data.namespace])
          .paymentInfo(OPERATOR_KEYRING);
      } else if (type === 'unstake') {
        paymentInfo = await api.tx.workerNodePallet
          .unsubscribeFromSolutionGroup(...[data.namespace])
          .paymentInfo(OPERATOR_KEYRING);
      }

      const fee = parseFloat(
        Web3.utils.fromWei(parseInt(paymentInfo.toJSON().partialFee as string).toString(), 'ether'),
      ).toPrecision(4);
      return parseFloat(fee) + this.EWX_BUFFER_FEE;
    } catch (error) {
      console.error('[worker][getFeeEWX]', { error });
      return this.EWX_BUFFER_FEE;
    }
  }

  async fetchWhitelistSolutionGroups(): Promise<WorkerApi.WhitelistedSolutionGroupIds> {
    let namespaces: string[] = [];

    type WhitelistUrlResponse = {
      show: {
        solutionGroups: string[];
      };
      hide: {
        solutionGroups: string[];
      };
    };

    try {
      const url = whitelistUrl();
      const response = await axios.get<WhitelistUrlResponse>(url);
      namespaces = response.data.show.solutionGroups;
    } catch (e) {
      console.error('[fetchWhitelistSolutionGroups]', { error: e });
    }

    return namespaces;
  }

  async queryWorkerAddress(ewxAddress: string): Promise<WalletApi.QueryWorkerAddress> {
    return this.getLinkedWorkerNode();
  }

  async getSolutionGroups(): Promise<WorkerApi.GetSolutionGroups> {
    const [{ ewxAddress }, currentBlock, palletSolutionGroups] = await Promise.all([
      this.getLastEWXAccount(),
      ewxPalletService.getCurrentBlockNumber(),
      getIndexer().getSolutionsGroups(),
    ]);

    const config = {
      params: {},
    };
    if (ewxAddress) {
      config.params = {
        operator_address: ewxAddress,
      };
    }
    const discoverSolutionGroups = palletSolutionGroups.map((g) => ({
      ...mapPalletSolutionGroupToEntity(
        { ...g, withdrawalDelay: g.withdrawalDelay },
        environment(),
      ),
      operationEndBlockTimestamp: this.calculateTimestamp(
        Number(g.operationEndBlock),
        currentBlock,
      ),
      operationStartBlockTimestamp: this.calculateTimestamp(
        Number(g.operationStartBlock),
        currentBlock,
      ),
      startBlockTimestamp: this.calculateTimestamp(
        Number(g.operatorsConfig.startBlock),
        currentBlock,
      ),
    }));

    const favourites = await this.listFavourite();

    return discoverSolutionGroups.map((g) => {
      if (favourites.some((f) => f.id === g.id)) {
        return {
          ...g,
          isFavourites: true,
        };
      }
      return g;
    });
  }

  private getSubscriptionStatus({
    currentBlock,
    endBlock,
    startBlock,
  }: {
    currentBlock: number;
    startBlock: string;
    endBlock: string;
  }) {
    if (Number(currentBlock) < Number(startBlock)) {
      return SOLUTION_GROUP_STATUS.Scheduled;
    }

    if (Number(currentBlock) > Number(endBlock)) {
      return SOLUTION_GROUP_STATUS.Expired;
    }

    return SOLUTION_GROUP_STATUS.Running;
  }

  private calculateStakes(
    solutionGroupId: string,
    currentRewardPeriod: number,
    stakes: {
      currentStake: string;
      nextStake: string;
      rewardPeriodIndex: number;
      namespace: string;
    }[],
  ) {
    const stake = stakes.find((s) => s.namespace === solutionGroupId);

    if (!stake) {
      return {
        stakeAmount: '0',
        nextStakeAmount: '0',
        rewardPeriod: stake.rewardPeriodIndex,
      };
    }
    return {
      stakeAmount: Web3.utils.fromWei(stake.currentStake),
      nextStakeAmount: Web3.utils.fromWei(
        (Number(stake.nextStake) - Number(stake.currentStake)).toString(),
      ),
      rewardPeriod: stake.rewardPeriodIndex,
    };
  }

  private calculateTimestamp(blockNumber: number, currentBlock: number) {
    const currentBlockTimestamp = DateTime.now().startOf('second').toSeconds();
    const differenceInSeconds = (blockNumber - currentBlock) * 12; // Approx 12 seconds per block
    return ((currentBlockTimestamp + differenceInSeconds) * 1000).toString();
  }

  private mapIndexerToSubscription({
    group,
    solutions,
    stakes,
    currentBlockNumber,
    currentRewardPeriod,
    ewxAddress,
    unsubscribeBlock,
    canVote,
  }: {
    group: WorkerApi.GetSolutionGroupSubscriptions[number]['group'];
    solutions: (WorkerApi.GetSolutionGroupSubscriptions[number]['solutions'][number] & {
      expirationBlock: string;
    })[];
    stakes: {
      currentStake: string;
      nextStake: string;
      rewardPeriodIndex: number;
      namespace: string;
    }[];
    currentBlockNumber: number;
    ewxAddress: string;
    currentRewardPeriod: number;
    unsubscribeBlock: number;
    canVote?: boolean;
  }): WorkerApi.GetSolutionGroupSubscriptions[0] {
    const { nextStakeAmount, stakeAmount, rewardPeriod } = this.calculateStakes(
      group.namespace,
      currentRewardPeriod,
      stakes,
    );
    let isStartVoteNextPeriod =
      stakeAmount !== '0' && Number(rewardPeriod) < Number(currentRewardPeriod);

    if (canVote != undefined) {
      isStartVoteNextPeriod = !canVote;
    }

    // get unsubscription delay datetime
    let isPendingUnsubscription = false;
    let unsubscriptionDate = null;

    if (unsubscribeBlock && unsubscribeBlock > currentBlockNumber) {
      isPendingUnsubscription = true;

      const unsubscriptionDateInMs = this.calculateTimestamp(unsubscribeBlock, currentBlockNumber);
      unsubscriptionDate = DateTime.fromMillis(Number(unsubscriptionDateInMs)).toISO();
    }

    return {
      group: {
        operationEndBlockTimestamp: this.calculateTimestamp(
          Number(group.operationEndBlock),
          currentBlockNumber,
        ),
        operationStartBlockTimestamp: this.calculateTimestamp(
          Number(group.operationStartBlock),
          currentBlockNumber,
        ),
        startBlockTimestamp: this.calculateTimestamp(Number(group.startBlock), currentBlockNumber),
        ...group,
      },
      solutions: solutions.map(({ expirationBlock, ...solution }) => {
        const isExpired = Number(currentBlockNumber) > Number(expirationBlock);
        return {
          ...solution,
          isExpired,
        };
      }),
      EWXPreference: {
        createdDate: new Date(),
        environment: '',
        ewxAddress,
        floatingStakeAmount: nextStakeAmount,
        groupId: group.id,
        isActive:
          currentBlockNumber > Number(group.operationStartBlock) &&
          currentBlockNumber < Number(group.operationEndBlock),
        isFavourites: false,
        isInstall: false,
        isStaked: Number(stakeAmount) !== 0,
        isSubscription: true,
        isVotingEnabled:
          currentBlockNumber > Number(group.operationStartBlock) &&
          currentBlockNumber < Number(group.operationEndBlock),
        stakeAmount,
        subcribeId: '',
        updatedDate: new Date(),
      },
      actionStatus: 'NoAction',
      updatedDate: new Date(),
      blockNumber: currentBlockNumber,
      actionErrorMsg: '',
      actionRetry: 0,
      blockTimestamp: '',
      createdDate: new Date(),
      environment: '',
      ewxAddress,
      groupId: group.id,
      isDeleted: false,
      isExpired: currentBlockNumber > Number(group.operationEndBlock),
      isPendingUnsubscription,
      unsubscriptionDate: new Date(unsubscriptionDate),
      isStartVoteNextPeriod,
      status: this.getSubscriptionStatus({
        currentBlock: currentBlockNumber,
        endBlock: group.operationEndBlock,
        startBlock: group.operationStartBlock,
      }),
    };
  }

  async getSubscriptions(): Promise<WorkerApi.GetSolutionGroupSubscriptions> {
    const [{ ewxAddress }, currentBlockNumber, currentRewardPeriod] = await Promise.all([
      this.getLastEWXAccount(),
      ewxPalletService.getCurrentBlockNumber(),
      ewxPalletService.getCurrentRewardPeriod(),
    ]);

    const [subscriptions, canOperatorWorkersVote] = await Promise.all([
      getIndexer().getSubscriptionsByOperator(ewxAddress),
      getIndexer().checkIsOperatorNodesReadyToVote(ewxAddress),
    ]);

    return subscriptions.map(({ group, solutions, stakes, unsubscribeBlock }) => {
      let canVote = false;

      if (canOperatorWorkersVote.length) {
        const workerObj = canOperatorWorkersVote.find((s) => s.solutionGroupId === group.namespace);

        if (workerObj) {
          canVote = workerObj.canVote;
        }
      }

      const { solutions: sols, ...subscription } = this.mapIndexerToSubscription({
        currentBlockNumber,
        currentRewardPeriod,
        ewxAddress,
        group,
        solutions,
        stakes,
        unsubscribeBlock,
        canVote,
      });
      const activeSolutions = sols.filter((sol) => !sol.isExpired);
      return {
        ...subscription,
        solutions,
        actionStatus: activeSolutions.length < 1 ? WORKER_STATUS.NoSolution : 'NoAction',
      };
    });
  }

  async getSubscription(solutionGroupId: string): Promise<WorkerApi.WorkerSubscription> {
    const [{ ewxAddress }, currentBlockNumber, currentRewardPeriod] = await Promise.all([
      this.getLastEWXAccount(),
      ewxPalletService.getCurrentBlockNumber(),
      ewxPalletService.getCurrentRewardPeriod(),
    ]);

    const { group, stakes, solutions, unsubscribeBlock } = (
      await getIndexer().getSubscriptionsByOperator(ewxAddress)
    ).find((sub) => sub.group.id === solutionGroupId);
    const subscription = this.mapIndexerToSubscription({
      currentBlockNumber,
      currentRewardPeriod,
      ewxAddress,
      group,
      solutions,
      stakes,
      unsubscribeBlock,
    });

    return {
      solutionsCount: subscription.solutions.filter((sol) => !sol.isExpired).length ?? undefined,
      subscription,
      actualSubscriptionStatus: subscription.status,
      isStartVoteNextPeriod: subscription.isStartVoteNextPeriod,
    };
  }

  async get(solutionGroupId: string): Promise<WorkerApi.GetSolutionGroup> {
    const api = await ewxPalletService.connect();

    const palletSolutionGroupDetail = await getIndexer().getSolutionGroup(solutionGroupId);
    const currentBlock = await ewxPalletService.getCurrentBlockNumber();
    const solutionGroupDetail = {
      ...mapPalletSolutionGroupToEntity(palletSolutionGroupDetail, environment()),
      operationEndBlockTimestamp: this.calculateTimestamp(
        Number(palletSolutionGroupDetail.operationEndBlock),
        currentBlock,
      ),
      operationStartBlockTimestamp: this.calculateTimestamp(
        Number(palletSolutionGroupDetail.operationStartBlock),
        currentBlock,
      ),
      startBlockTimestamp: this.calculateTimestamp(
        Number(palletSolutionGroupDetail.operatorsConfig.startBlock),
        currentBlock,
      ),
    };

    const blockNumber = parseInt(solutionGroupDetail.operationStartBlock);

    // get current block to estimate subscription start date
    if (blockNumber && blockNumber !== -1) {
      const signedBlock = await api.rpc.chain.getBlock();

      let currentBlockNumber: number;
      if (signedBlock) {
        currentBlockNumber = signedBlock.block.header.number.toNumber();
      }

      const approxCurrentBlockTimestamp = DateTime.now().startOf('second').toSeconds();
      const approxDifferenceInSeconds = (blockNumber - currentBlockNumber) * 12; // Approx 12 seconds per block
      const startDateTimestamp = (approxCurrentBlockTimestamp + approxDifferenceInSeconds) * 1000;
      solutionGroupDetail.startBlockTimestamp = startDateTimestamp.toString();
    }
    solutionGroupDetail.Solution = palletSolutionGroupDetail.solutions.map(
      ({ expirationBlock, ...sol }) => {
        return {
          ...sol,
          isExpired: Number(currentBlock) > Number(expirationBlock),
        };
      },
    );
    solutionGroupDetail.isExpired =
      Number(currentBlock) > Number(solutionGroupDetail.operationEndBlock);

    return solutionGroupDetail;
  }

  async getSolutionGroupStatus(
    startBlock: number,
    endBlock: number,
  ): Promise<WorkerApi.SolutionGroupStatus> {
    const api = await ewxPalletService.connect();

    const signedBlock = await api.rpc.chain.getBlock().catch(() => undefined);
    if (!signedBlock) return;

    const currentBlockNumber = signedBlock.block.header.number.toNumber();
    if (currentBlockNumber < startBlock) {
      return Promise.resolve(SOLUTION_GROUP_STATUS.Scheduled);
    }

    if (currentBlockNumber > endBlock) {
      return Promise.resolve(SOLUTION_GROUP_STATUS.Expired);
    }

    return Promise.resolve(SOLUTION_GROUP_STATUS.Running);
  }

  async sendEwxAddress(ewxAddress: string, wcSessionId?: string): Promise<void> {
    if (!ewxAddress) {
      await indexedDBService.removeData(LocalStores.WALLET, 'ewxAddress');
    } else {
      await indexedDBService.upsertData(LocalStores.WALLET, {
        id: 'ewxAddress',
        ewxAddress,
        wcSessionId,
        env: environment(),
      });
    }
  }

  async getLastEWXAccount(): Promise<WorkerApi.GetLastEWXAccount> {
    const data = await indexedDBService.fetchData<WorkerApi.LastEWXAccount>(
      LocalStores.WALLET,
      'ewxAddress',
    );
    if (data && typeof data !== 'string') {
      return data;
    } else {
      return {
        env: environment(),
        ewxAddress: '',
      };
    }
  }

  // TODO: is this correct
  async resetAllSubscriptionsByEwx(address: string): Promise<WorkerApi.ResetAllSubscriptionsByEwx> {
    await indexedDBService.removeData(LocalStores.WALLET, 'ewxAddress');
  }

  async shouldPromptWorkerLogin(): Promise<WorkerApi.ShouldPromptWorkerLogin> {
    return Promise.resolve(false);
  }

  async isKYCDone(address: string): Promise<WorkerApi.IsKYCDone> {
    return ewxPalletService.isWorkerSignup(address);
  }

  // TODO: full implementation
  async isStakingTo(solutionNamespace: string, address: string): Promise<WorkerApi.IsStakingTo> {
    try {
      const encodedAccount = this.registry.createType('AccountId', address);
      const api = await ewxPalletService.connect();
      const operatorSubscriptions = await api.query.workerNodePallet.operatorSubscriptions.entries(
        encodedAccount.toU8a(true),
      );
    } catch (err) {
      console.error(err);
    }

    // check if operator is subscribed to solution group
    const isSubscribed = await getIndexer().checkIsStaked(solutionNamespace, address);

    return Promise.resolve(isSubscribed);
  }

  async addFavourite(workerId: string): Promise<FavouritesApi.Create> {
    const ewxAddress = (await this.getLastEWXAccount()).ewxAddress;
    if (!ewxAddress) {
      throw new Error('Not connected to an EWX address');
    }

    const result = await indexedDBService.upsertData<FavouritesApi.EWXPreference>(
      LocalStores.FAVOURITES,
      {
        groupId: workerId,
        ewxAddress,
        environment: environment(),
        isFavourites: true,
        isSubscription: false,
        isVotingEnabled: false,
        isActive: false,
        isInstall: false,
        isStaked: false,
        stakeAmount: '0',
        floatingStakeAmount: '0',
        createdDate: DateTime.now().toJSDate(),
        updatedDate: DateTime.now().toJSDate(),
        subcribeId: '',
      },
    );

    if (result && typeof result !== 'string') {
      return result;
    }
  }

  async delFavourite(workerId: string): Promise<FavouritesApi.Delete> {
    await indexedDBService.removeData(LocalStores.FAVOURITES, workerId);
    return;
  }

  async listFavourite(): Promise<FavouritesApi.List> {
    const favourites = await indexedDBService.fetchAll<FavouritesApi.EWXPreference>(
      LocalStores.FAVOURITES,
    );

    if (!favourites || typeof favourites === 'string') {
      return [];
    }

    return favourites.map((f) => ({
      id: f.groupId,
    }));
  }

  async clearFavourites(): Promise<any> {} // TODO: ?

  public isTestVersion(): Promise<boolean> {
    return Promise.resolve(testVersion() === 'true');
  }

  async walletIsAvailable(): Promise<WalletApi.IsWalletAvailable> {
    return Promise.resolve(true);
  }

  async getEarnedRewards(groupId: string): Promise<WorkerApi.GetEarnedRewards> {
    const { ewxAddress } = await this.getLastEWXAccount();
    const rewards = await getIndexer().getEarnedRewards({
      operatorId: ewxAddress,
      groupNamespace: groupId,
    });
    if (rewards.length < 1) return '0';
    return rewards
      .reduce((acc, reward) => {
        const subscriptionReward = BigInt(reward.subscriptionReward);
        const participationReward = BigInt(reward.participationReward);
        return acc + subscriptionReward + participationReward;
      }, BigInt(0))
      .toString();
  }

  // TODO: NYI methods below
  solarSystem: () => Promise<WorkerApi.WorkerSubscription>;
  addressBookBalance: (addresses: string[]) => Promise<AddressBookApi.Balance>;
  getSolutionGroupStake(solutionGroupId: string): Promise<WorkerApi.GetStakeStatus> {
    throw new Error('Method not implemented.');
  }

  setPendingUnsubscription: (groupId: string) => Promise<WorkerApi.SetPendingUnsubscription>;
  workerStatus(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadWorker> {
    throw new Error('Method not implemented.');
  }
  install(workerId: string): Promise<WorkerApi.WorkerResponse> {
    throw new Error('Method not implemented.');
  }
  terminate(workerId: string): Promise<WorkerApi.WorkerResponse> {
    throw new Error('Method not implemented.');
  }
  pause(workerId: string): Promise<WorkerApi.WorkerResponse> {
    throw new Error('Method not implemented.');
  }
  search(keyword: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
  searchDisplay(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  clearCache(): Promise<WorkerApi.WorkerResponse> {
    throw new Error('Method not implemented.');
  }
  downloadFlow(workerId: string, isSubscription: boolean): Promise<WorkerApi.DownloadFlowResponse> {
    throw new Error('Method not implemented.');
  }
  async isWorkerSubcribeReadyToVote(
    solutionNamespace: string,
  ): Promise<WorkerApi.IsWorkerReadyToVote> {
    const { ewxAddress } = await this.getLastEWXAccount();

    return await getIndexer().checkIsNodeReadyToVote(ewxAddress, solutionNamespace);
  }
  walletCreate(
    password: string,
    confirmPassword: string,
    mnemonic?: string,
  ): Promise<WalletApi.Create> {
    throw new Error('Method not implemented.');
  }
  walletDetails(): Promise<WalletApi.GetAccountDetails> {
    throw new Error('Method not implemented.');
  }
  walletInit(password: string): Promise<WalletApi.WalletInit> {
    throw new Error('Method not implemented.');
  }
  walletWorkerAddress(): Promise<WalletApi.WalletWorkerAddress> {
    throw new Error('Method not implemented.');
  }
  walletCheckMnemonic(mnemonic: string): Promise<WalletApi.CheckMnemonic> {
    throw new Error('Method not implemented.');
  }
  walletGetSeedPhrase(password: string): Promise<WalletApi.GetSeedPhrase> {
    throw new Error('Method not implemented.');
  }
  listDasboard(): Promise<WorkerApi.DashboardList[]> {
    throw new Error('Method not implemented.');
  }
  lifting(txnHash: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  systemInfo(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getTimestampFromBlockNumber(blockNumber: number): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async workerEWXLinkStatus(workerAddress?: string): Promise<WorkerApi.EWXLinkedStatus> {
    if (!workerAddress) {
      throw new Error('Need to specify worker address');
    }
    const linkedWorker = await this.getLinkedWorkerNode();
    if (!linkedWorker) {
      return EWX_LINK_STATUS.NotLinked;
    }
    if (linkedWorker === workerAddress) {
      return EWX_LINK_STATUS.LinkedToCurrentWorker;
    }
    return EWX_LINK_STATUS.LinkedToOtherWorker;
  }
  async getLinkedWorkerNode(): Promise<WorkerApi.GetLinkedWorkerNode> {
    const { ewxAddress } = await this.getLastEWXAccount();
    return await getIndexer().getLinkedWorkerNode(ewxAddress);
  }
  isVotingEnabled(workerId: string): Promise<WorkerApi.IsVotingEnabled> {
    throw new Error('Method not implemented.');
  }
  setVoting(workerId: string, enabled: boolean): Promise<WorkerApi.SetVoting> {
    throw new Error('Method not implemented.');
  }
  setStaked(workerId: string, amount: number, staked: boolean): Promise<WorkerApi.SetStaked> {
    throw new Error('Method not implemented.');
  }
  updateFloatingStaked(groupId: string): Promise<WorkerApi.UpdateFloatingStaked> {
    throw new Error('Method not implemented.');
  }
  workerVote(
    votingRoundId: string,
    noderedId: string,
    rootHash: string,
  ): Promise<WorkerApi.AddWorkerVote> {
    throw new Error('Method not implemented.');
  }
  resetAllSubscriptions(): Promise<WorkerApi.ResetAllSubscriptions> {
    throw new Error('Method not implemented.');
  }
  resetEwxAccount(address: string): Promise<WorkerApi.ResetEwxAccount> {
    throw new Error('Method not implemented.');
  }
  syncBaseData(): Promise<WorkerApi.SyncBaseData> {
    throw new Error('Method not implemented.');
  }
  startBaseDataScheduler(): Promise<WorkerApi.StartBaseDataScheduler> {
    throw new Error('Method not implemented.');
  }
  resetBaseDataAndSync(): Promise<WorkerApi.ResetBaseDataAndSync> {
    throw new Error('Method not implemented.');
  }

  async queryEWXPreference(workerId: string): Promise<WorkerApi.QueryEWXPreference> {
    const { subscription } = await this.getSubscription(workerId);
    return subscription['EWXPreference'];
  }

  async getEwtUsd(): Promise<WorkerApi.GetEwtUsd> {
    const ewtUsdPrice = await getIndexer().getEwtUsd();

    if (ewtUsdPrice) {
      return ewtUsdPrice;
    }

    console.error('Error fetching EWT USD');
    return null;
  }
  setSubcriptionBlock(
    blockNumber: number,
    timestamp: string,
    groupId: string,
  ): Promise<WorkerApi.SetSubcriptionBlock> {
    throw new Error('Method not implemented.');
  }
  getCurrentRewardPeriod(): Promise<WorkerApi.GetCurrentRewardPeriod> {
    return ewxPalletService.getCurrentRewardPeriod();
  }
  async getCurrentVoteAndRewardPeriod(
    solutionGroupId: string,
  ): Promise<WorkerApi.GetCurrentVoteAndRewardPeriod> {
    const [{ ewxAddress }, rewardPeriod] = await Promise.all([
      this.getLastEWXAccount(),
      this.getCurrentRewardPeriod(),
    ]);
    const votes = await getIndexer().getResultsSubmitted({
      groupNamespace: solutionGroupId,
      operatorId: ewxAddress,
      rewardPeriod,
    });
    return {
      rewardPeriod,
      votes,
    };
  }
  async getVotingGraphData(solutionId: string): Promise<WorkerApi.GetVotingGraphData> {
    const { ewxAddress } = await this.getLastEWXAccount();
    const transactions = await getIndexer().getTransactions({ operatorId: ewxAddress, solutionId });
    const results = {} as Record<string, Record<'successful' | 'failed', string[]>>;
    for (const { successful, result, rewardPeriodIndex } of transactions) {
      if (!results[rewardPeriodIndex]) {
        results[rewardPeriodIndex] = {
          failed: [],
          successful: [],
        };
      }
      if (successful) {
        results[rewardPeriodIndex]['successful'].push(result);
        continue;
      }
      results[rewardPeriodIndex]['failed'].push(result);
    }
    return Object.keys(results).map((rewardPeriodIndex) => ({
      rewardPeriod: Number(rewardPeriodIndex),
      failedVotes: results[rewardPeriodIndex].failed.length,
      successfulVotes: results[rewardPeriodIndex].successful.length,
    }));
  }
  syncEarnedRewards(): Promise<WorkerApi.SyncEarnedRewards> {
    throw new Error('Method not implemented.');
  }
  async getTransactionsByPeriod(
    solutionId: string,
    rewardPeriod: number,
  ): Promise<WorkerApi.GetTransactionsByPeriod> {
    const [{ ewxAddress }, currentBlockNumber] = await Promise.all([
      this.getLastEWXAccount(),
      ewxPalletService.getCurrentBlockNumber(),
    ]);
    const transactions = await getIndexer().getTransactionsByPeriod({
      operatorId: ewxAddress,
      solutionId,
      rewardPeriod,
    });
    return transactions.map(
      ({ blockNumber, solutionGroupId, blockHash, extrinsicHash, successful }, index) => {
        const timestamp = Number(this.calculateTimestamp(blockNumber, currentBlockNumber));
        return {
          ewxAddress,
          rewardPeriod,
          solutionId,
          id: index,
          groupId: solutionGroupId,
          createdDate: new Date(timestamp),
          updatedDate: new Date(timestamp),
          environment: environment(),
          transactionHash: extrinsicHash,
          finalizedBlockHash: blockHash,
          voteStatus: successful,
        };
      },
    );
  }

  exportLogs: () => Promise<string>;
  solutionNodeStatusBy(
    solutionGroupId: string,
    solutionFlowId?: string,
  ): Promise<WorkerApi.GetSolutionNodeStatus> {
    throw new Error('Method not implemented.');
  }
  listRuleActiveInMinute(solutionGroupId: string): Promise<WorkerApi.ListRuleActiveInMinute> {
    throw new Error('Method not implemented.');
  }
  updateRuleActiveInMinute(
    solutionId: string,
    ruleActiveInMinute: number,
  ): Promise<WorkerApi.UpdateRuleActiveInMinute> {
    throw new Error('Method not implemented.');
  }
  workerEngineRestart(): Promise<WorkerApi.RestartWorkerEngine> {
    throw new Error('Method not implemented.');
  }
  workerEngineStart(): Promise<WorkerApi.StartWorkerEngine> {
    throw new Error('Method not implemented.');
  }
  validateWorkerAddressBy(mnemonic: string): Promise<WalletApi.ValidateWorkerAddress> {
    throw new Error('Method not implemented.');
  }
  checkUnclaimedSolutionBy(groupId: string): Promise<WorkerApi.GetEarnedRewards> {
    throw new Error('Method not implemented.');
  }
  async listUnclaimedRewards(): Promise<WalletApi.ListUnclaimedRewards> {
    const { ewxAddress } = await this.getLastEWXAccount();
    const [solutionGroups, unclaimedRewards] = await Promise.all([
      this.getSolutionGroups(),
      getIndexer().getUnclaimedRewards(ewxAddress),
    ]);
    return unclaimedRewards.map((reward) => {
      const group = solutionGroups.find((g) => g.id === reward.solutionGroupId);
      return {
        ewxAddress,
        groupDescription: group.description,
        groupId: reward.solutionGroupId,
        groupName: group.name,
        groupNamespace: group.namespace,
        groupPublisherInfo: '',
        isDeleted: group.isDeleted,
        isExpired: group.isExpired,
        isSubscribed: false,
        totalReward: (
          Number(reward.participationReward) + Number(reward.subscriptionReward)
        ).toString(),
      };
    });
  }
  deviceConnect(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    path?: string,
  ): Promise<WalletDeviceApi.Connect> {
    throw new Error('Method not implemented.');
  }
  deviceSign(
    type: DEVICE_TYPE,
    chain: MARKETPLACE_CHAINS,
    txMsg: string,
    path?: string,
  ): Promise<WalletDeviceApi.Sign> {
    throw new Error('Method not implemented.');
  }
  isDevicePlugged(): Promise<WalletDeviceApi.IsDevicePlugged> {
    throw new Error('Method not implemented.');
  }
  isDeviceLocked(): Promise<WalletDeviceApi.IsDeviceLocked> {
    throw new Error('Method not implemented.');
  }
  deviceLowering(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lowering> {
    throw new Error('Method not implemented.');
  }
  deviceLifting(receiverAddress: string, amount: number): Promise<WalletDeviceApi.Lifting> {
    throw new Error('Method not implemented.');
  }
  async deleteWorker(): Promise<WalletApi.DeleteWorker> {
    await waitFor(
      async () => {
        const address = await this.getLinkedWorkerNode();
        return !address;
      },
      { retries: 20, interval: 1000 },
    );
  }
  async setRemoteWorker(): Promise<WalletApi.SetRemoteWorker> {
    await waitFor(
      async () => {
        const address = await this.getLinkedWorkerNode();
        return Boolean(address);
      },
      {
        interval: 1000,
        retries: 20,
      },
    );
  }

  async isRunLocal(): Promise<boolean> {
    return false;
  }
  listDashboard(): Promise<WorkerApi.DashboardList[]> {
    throw new Error('Method not implemented.');
  }
}

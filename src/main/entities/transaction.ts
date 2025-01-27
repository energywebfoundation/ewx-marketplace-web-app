export enum TransactionType {
  LIFTING = 'lifting',
  LOWERING = 'lowering',
  ALL = 'all',
}

export type Transaction = {
  id: string;
  when: string;
  type: TransactionType;
  amount: number;
  txHash?: string;
  block: string | number;
  addressEWC: string;
  addressEWX: string;
  isPending: boolean | null;
  isFinalized: boolean | null;
};

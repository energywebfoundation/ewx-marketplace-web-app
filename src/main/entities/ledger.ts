export type LedgerStatus =
  | 'connected'
  | 'open-application'
  | 'connecting'
  | 'verify-address'
  | 'accept-transaction'
  | 'executing-transaction'
  | 'disconnected';

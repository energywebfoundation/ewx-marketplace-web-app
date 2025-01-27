export interface Account {
  name: string;
  address: string;
  balance: number;
}

export interface Address {
  address: string;
  balance: string;
  chain: string;
  createdDate: string;
  updatedDate: string;
  environment: string;
  ewxAddress: string;
  symbol: string;
}

export interface LastEWXAccount {
  ewxAddress: string | undefined;
  wcSessionId?: string;
  env: string;
}

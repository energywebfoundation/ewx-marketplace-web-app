import { ApiPromise, HttpProvider } from '@polkadot/api';
import { Tuple, u128, u32 } from '@polkadot/types';
import { ewxPalletRpc } from './BrowserApi';

class EWXPalletService {
  private _api!: ApiPromise;
  private ewxPalletRpc!: string;

  public async isConnectReady(retry: number = 3): Promise<boolean> {
    try {
      this._api = await ApiPromise.create({
        provider: new HttpProvider(ewxPalletRpc()),
        types: { QueryResult: Tuple.with([u32, u128, u128]) },
        throwOnConnect: true,
        throwOnUnknown: true,
      });

      this.ewxPalletRpc = ewxPalletRpc() as string;
      await this.palletInfo();

      return true;
    } catch (error: any) {
      console.error(error.message, { error });
      if (retry === 0) return false;
      return this.isConnectReady(retry - 1);
    }
  }

  public async connect(): Promise<ApiPromise> {
    if (!this._api) {
      await this.isConnectReady();
    }
    return this._api;
  }

  public async reloadApiPallet(): Promise<ApiPromise> {
    if (this.ewxPalletRpc === ewxPalletRpc()) return this._api;
    await this.disconnectApiPallet();
    this.ewxPalletRpc = ewxPalletRpc() as string;

    const isConnectReady = await this.isConnectReady();
    if (!isConnectReady) throw Error('Unable to Connect : ' + ewxPalletRpc());

    await this.palletInfo();
    return this._api;
  }

  public async disconnectApiPallet(): Promise<void> {
    if (this._api) {
      try {
        await this._api.disconnect();
      } catch (e) {
        console.error('Error in disconnectApiPallet', { e });
      }
    }
  }

  private async palletInfo() {}

  public get api(): ApiPromise {
    return this._api;
  }

  public set api(value: ApiPromise) {
    this._api = value;
  }

  async isWorkerSignup(address: string) {
    await this.connect();
    const isSignUp = await this.api.query.workerNodePallet.workerNodeOperatorInventory(address);
    return isSignUp.toHuman() !== null;
  }

  public async getCurrentRewardPeriod() {
    await this.connect();
    try {
      const response = await this.api.query.workerNodePallet.activeRewardPeriodInfo();
      const responseJSON = response.toJSON() as { index: number };
      const currentRewardPeriod = responseJSON.index;
      return currentRewardPeriod;
    } catch (error) {
      console.error('getCurrentRewardPeriod', { error });
      throw Error('Unable to get current reward period');
    }
  }

  public async getCurrentBlockNumber() {
    await this.connect();
    const signedBlock = await this.api.rpc.chain.getBlock();
    return signedBlock.block.header.number.toNumber();
  }
}

const ewxPalletService = new EWXPalletService();
export default ewxPalletService;

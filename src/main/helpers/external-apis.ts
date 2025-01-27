import { coingeckoApi } from './axios-apis';
import { AxiosResponse } from 'axios';

const COINGECKO_API_URL = process.env.COINGECKO_EWT_USD_API_URL as string;

export const getEWTPrice = async (): Promise<number | null> => {
  return coingeckoApi
    .get(COINGECKO_API_URL)
    .then((res: AxiosResponse) => {
      if (res.data['energy-web-token']) {
        return res.data['energy-web-token'].usd;
      }

      return null;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

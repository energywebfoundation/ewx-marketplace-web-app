import axios from 'axios';

const COINGECKO_API_URL = process.env.COINGECKO_EWT_USD_API_URL as string;

export const coingeckoApi = axios.create({
  url: COINGECKO_API_URL,
});

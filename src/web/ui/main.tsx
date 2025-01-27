import { main as rendererMain } from '@ewf/main';
import { BrowserApi } from './services/BrowserApi';

const main = () => {
  const api = new BrowserApi();
  return rendererMain(api);
};

export default main();

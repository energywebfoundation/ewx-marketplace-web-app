export const sleep = (ms: number) => {
  let timer;
  return new Promise((res) => (timer = setTimeout(res, ms))).finally(() => clearTimeout(timer));
};

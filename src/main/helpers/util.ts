export const convertMapToKeyPairArray = <T>(map: Map<string | undefined, T>) =>
  Array.from(map).map(([key, value]) => ({ key, value }));

export const parseStringOrJson = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

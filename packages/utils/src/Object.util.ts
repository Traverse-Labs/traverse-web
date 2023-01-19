export const getKeyByValue = (object: object, value: any) => {
  return Object.keys(object).find((key) => object[key] === value);
};

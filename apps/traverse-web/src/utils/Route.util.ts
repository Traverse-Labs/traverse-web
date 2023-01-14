export const getTradingPairPath = (pairId: string, exchangeName: string) => {
  return `/pair/${pairId}/${exchangeName}`;
};

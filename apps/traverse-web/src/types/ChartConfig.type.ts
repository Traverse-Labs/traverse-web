export type ChartConfig = {
  name: string;
  instructions: string[];
  metric: Metric;
  period: DataPeriod;
  aggregate?: AggregationMethod;
  groupBy?: string;
};
export const AggregationMethods = ["SUM", "AVG"];

export type AggregationMethod = (typeof AggregationMethods)[number];

export const AggregationMethodLabels: Record<AggregationMethod, string> = {
  SUM: "Sum",
  AVG: "Average",
};

export const Metrics = ["U_WALLET", "TXN", "VOLUME"];

export type Metric = (typeof Metrics)[number];

export const MetricLabels: Record<Metric, string> = {
  U_WALLET: "Unique Users",
  TXN: "Transactions",
  VOLUME: "Volume",
};

export const DataPeriods = ["7", "30"];

export type DataPeriod = (typeof DataPeriods)[number];
export const DataPeriodLabels: Record<DataPeriod, string> = {
  "7": "7D",
  "30": "30D",
};

export const GroupByMethods = ["WALLET_AGE", "NFT_HOLDINGS", "SOL_HOLDINGS"];

export type GroupByMethod = (typeof GroupByMethods)[number];

export const GroupByMethodLabels: Record<GroupByMethod, string> = {
  WALLET_AGE: "Wallet Age",
  NFT_HOLDINGS: "NFT Holdings",
  SOL_HOLDINGS: "SOL Holdings",
};

import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  ChartRef,
  HorizontalBarChart,
  HorizontalBarChartProps,
  LineChart,
  LineChartProps,
  VerticalBarChart,
  VerticalBarChartProps,
} from "ui";

export type ChartConfig = {
  id?: string;
  name: string;
  instructions: string[];
  metric: Metric;
  period: DataPeriod;
  chartType: ChartType;
  aggregate?: AggregationMethod;
  groupBy?: GroupByMethod;
};
export const AggregationMethods = ["SUM", "AVG"];

export type AggregationMethod = typeof AggregationMethods[number];

export const AggregationMethodLabels: Record<AggregationMethod, string> = {
  SUM: "Sum",
  AVG: "Average",
};

export const Metrics = ["U_WALLET", "TXN", "VOLUME"];

export type Metric = typeof Metrics[number];

export const MetricLabels: Record<Metric, string> = {
  U_WALLET: "Unique Users",
  TXN: "Transactions",
  VOLUME: "Volume",
};

export const DataPeriods = ["7", "30"];

export type DataPeriod = typeof DataPeriods[number];
export const DataPeriodLabels: Record<DataPeriod, string> = {
  "7": "7D",
  "30": "30D",
};

export const GroupByMethods = [
  "WALLET_AGE",
  "NFT_HOLDINGS",
  "SOL_HOLDINGS",
  "DAPP_INTERACTIONS",
];

export type GroupByMethod = typeof GroupByMethods[number];

export const GroupByMethodLabels: Record<GroupByMethod, string> = {
  WALLET_AGE: "Wallet Age",
  NFT_HOLDINGS: "NFT Holdings",
  SOL_HOLDINGS: "SOL Holdings",
  DAPP_INTERACTIONS: "dApp Interactions",
};

export const ChartTypes = ["LINE", "HORIZONTAL_BAR", "VERTICAL_BAR"];

export type ChartType = typeof GroupByMethods[number];

export const ChartTypeLabels: Record<ChartType, string> = {
  LINE: "Line",
  HORIZONTAL_BAR: "Horizontal Bar",
  VERTICAL_BAR: "Vertical Bar",
};

export const ChartTypeComponents: Record<
  ChartType,
  ForwardRefExoticComponent<
    (LineChartProps | HorizontalBarChartProps | VerticalBarChartProps) &
      RefAttributes<ChartRef>
  >
> = {
  LINE: LineChart,
  HORIZONTAL_BAR: HorizontalBarChart,
  VERTICAL_BAR: VerticalBarChart,
};

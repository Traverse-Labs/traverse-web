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
import { Option } from "ui/types/Option.type";

export type ChartConfig = {
  id?: string;
  name: string;
  instructions: string[];
  metric: Metric;
  period: DataPeriod;
  chartType: ChartType;
  aggregate?: AggregationMethod | null;
  groupBy?: GroupByMethod | null;
};
export enum AggregationMethod {
  SUM = "SUM",
  AVG = "AVG",
}

export const AggregationMethodOptions: Option<AggregationMethod>[] = [
  {
    value: AggregationMethod.SUM,
    label: "Sum",
  },
  {
    value: AggregationMethod.AVG,
    label: "Average",
  },
];

export enum Metric {
  U_WALLET = "U_WALLET",
  TXN = "TXN",
  VOLUME = "VOLUME",
}

export const MetricOptions: Option<Metric>[] = [
  { value: Metric.U_WALLET, label: "Unique Users" },
  { value: Metric.TXN, label: "Transactions" },
  { value: Metric.VOLUME, label: "Volume" },
];

export enum DataPeriod {
  PERIOD_7 = "7",
  PERIOD_30 = "30",
}

export const DataPeriodOptions: Option<DataPeriod>[] = [
  { value: DataPeriod.PERIOD_7, label: "7D" },
  { value: DataPeriod.PERIOD_30, label: "30D" },
];

export enum GroupByMethod {
  WALLET_AGE = "WALLET_AGE",
  NFT_HOLDINGS = "NFT_HOLDINGS",
  SOL_HOLDINGS = "SOL_HOLDINGS",
  DAPP_INTERACTIONS = "DAPP_INTERACTIONS",
}

export const GroupByMethodOptions: Option<GroupByMethod | null>[] = [
  { value: GroupByMethod.WALLET_AGE, label: "Wallet Age" },
  { value: GroupByMethod.NFT_HOLDINGS, label: "NFT Holdings" },
  { value: GroupByMethod.SOL_HOLDINGS, label: "SOL Holdings" },
  { value: GroupByMethod.DAPP_INTERACTIONS, label: "dApp Interactions" },
];

export enum ChartType {
  LINE = "LINE",
  HORIZONTAL_BAR = "HORIZONTAL_BAR",
  VERTICAL_BAR = "VERTICAL_BAR",
}

export const ChartTypeOptions: Option<ChartType>[] = [
  { value: ChartType.LINE, label: "Line" },
  { value: ChartType.HORIZONTAL_BAR, label: "Horizontal Bar" },
  { value: ChartType.VERTICAL_BAR, label: "Vertical Bar" },
];

export const ChartTypeComponents: Record<
  ChartType,
  ForwardRefExoticComponent<
    (LineChartProps | HorizontalBarChartProps | VerticalBarChartProps) &
      RefAttributes<ChartRef>
  >
> = {
  [ChartType.LINE]: LineChart,
  [ChartType.HORIZONTAL_BAR]: HorizontalBarChart,
  [ChartType.VERTICAL_BAR]: VerticalBarChart,
};

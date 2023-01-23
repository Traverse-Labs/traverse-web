import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import ShowChartRoundedIcon from "@mui/icons-material/ShowChartRounded";
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
  VOLUME = "VOL",
}

export const MetricOptions: Option<Metric>[] = [
  { value: Metric.U_WALLET, label: "Unique Users" },
  { value: Metric.TXN, label: "Transactions" },
  { value: Metric.VOLUME, label: "Volume (USD)" },
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
  NFT_HOLDINGS = "NFT_HOLDINGS",
  SOL_HOLDINGS = "SOL_HOLDINGS",
  DAPP_INTERACTIONS = "DAPP_INTERACTIONS",
}

export const GroupByMethodOptions: Option<GroupByMethod | null>[] = [
  { value: GroupByMethod.NFT_HOLDINGS, label: "NFT Holdings" },
  { value: GroupByMethod.SOL_HOLDINGS, label: "SOL Holdings" },
  { value: GroupByMethod.DAPP_INTERACTIONS, label: "dApp Interactions" },
];

export enum ChartType {
  LINE = "LINE",
  HORIZONTAL_BAR = "HORIZONTAL_BAR",
  VERTICAL_BAR = "VERTICAL_BAR",
}
export const ChartTypeIcons = {
  [ChartType.LINE]: <ShowChartRoundedIcon />,
  [ChartType.HORIZONTAL_BAR]: <BarChartRoundedIcon className="rotate-90" />,
  [ChartType.VERTICAL_BAR]: <BarChartRoundedIcon />,
};

export const ChartTypeOptions: Option<ChartType>[] = [
  {
    value: ChartType.LINE,
    label: "Line",
    icon: ChartTypeIcons[ChartType.LINE],
  },
  {
    value: ChartType.HORIZONTAL_BAR,
    label: "Horizontal Bar",
    icon: ChartTypeIcons[ChartType.HORIZONTAL_BAR],
  },
  {
    value: ChartType.VERTICAL_BAR,
    label: "Vertical Bar",
    icon: ChartTypeIcons[ChartType.VERTICAL_BAR],
  },
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

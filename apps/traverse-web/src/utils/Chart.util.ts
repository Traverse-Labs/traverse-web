import { ObjectUtil } from "utils";

import {
  AggregationMethodOptions,
  ChartConfig,
  DataPeriodOptions,
  GroupByMethodOptions,
  MetricOptions,
} from "../types";

export const getChartExplanation = (config: ChartConfig) => {
  return `Daily ${ObjectUtil.getLabelFromOptions(
    MetricOptions,
    config.metric
  )} ${
    config.groupBy
      ? `by ${ObjectUtil.getLabelFromOptions(
          GroupByMethodOptions,
          config.groupBy
        )}`
      : ""
  } (Last ${ObjectUtil.getLabelFromOptions(
    DataPeriodOptions,
    config.period
  )}) for Events: ${config.instructions.join(", ")} ${
    config.aggregate
      ? `(Aggregated by ${ObjectUtil.getLabelFromOptions(
          AggregationMethodOptions,
          config.aggregate
        )})`
      : ""
  }`;
};

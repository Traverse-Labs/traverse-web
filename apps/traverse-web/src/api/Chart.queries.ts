import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { CHART_CONFIG_QUERY_KEY } from "../constants";
import { ChartConfig } from "../types";
import { getChartConfig } from "./Chart.api";

export const useGetChartConfig = (
  chartId: string
): UseQueryResult<ChartConfig> => {
  return useQuery({
    queryKey: [CHART_CONFIG_QUERY_KEY, chartId],
    queryFn: () => getChartConfig(chartId),
    enabled: Boolean(chartId),
  });
};

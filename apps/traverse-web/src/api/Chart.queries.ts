import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  CREATE_CHART_QUERY_KEY,
  GET_ALL_CHARTS,
  GET_CHART_CONFIG_QUERY_KEY,
  UPDATE_CHART_QUERY_KEY,
} from "../constants";
import { ChartConfig } from "../types";
import {
  createNewChart,
  deleteChart,
  getChartConfig,
  getCharts,
  updateChart,
} from "./Chart.api";

export const useGetChartConfig = (
  chartId: string
): UseQueryResult<ChartConfig> => {
  return useQuery({
    queryKey: [GET_CHART_CONFIG_QUERY_KEY, chartId],
    queryFn: () => getChartConfig(chartId),
    enabled: Boolean(chartId),
  });
};

export const useGetCharts = () => {
  return useQuery({
    queryKey: [GET_ALL_CHARTS],
    queryFn: () => getCharts(),
    cacheTime: 0,
  });
};

export const useCreateChartMutation = (
  config: ChartConfig,
  onSuccess?: () => void
): UseMutationResult<ChartConfig> => {
  return useMutation({
    mutationKey: [CREATE_CHART_QUERY_KEY, config],
    mutationFn: (config: ChartConfig) => createNewChart(config),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

export const useUpdateChartMutation = (
  chartId: string,
  config: ChartConfig,
  onSuccess?: () => void
): UseMutationResult<ChartConfig> => {
  return useMutation({
    mutationKey: [UPDATE_CHART_QUERY_KEY, chartId, config],
    mutationFn: (config: ChartConfig) => updateChart(chartId, config),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

export const useDeleteChartMutation = (
  onSuccess?: () => void
): UseMutationResult<ChartConfig> => {
  return useMutation({
    mutationKey: [UPDATE_CHART_QUERY_KEY],
    mutationFn: (chartId: string) => deleteChart(chartId),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

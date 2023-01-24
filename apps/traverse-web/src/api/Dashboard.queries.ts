import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  ADD_CHART_TO_DASHBOARD,
  GET_DEFAULT_DASHBOARD_CONFIG,
} from "../constants";
import { DashboardConfig } from "../types";
import {
  addChartToDashboard,
  getDashboardConfig,
  removeChartFromDashboard,
} from "./Dashboard.api";

export const useGetDashboardConfig = (
  defaultDashboard: number
): UseQueryResult<DashboardConfig> => {
  return useQuery({
    queryKey: [GET_DEFAULT_DASHBOARD_CONFIG, defaultDashboard],
    queryFn: () => getDashboardConfig(defaultDashboard),
    enabled: Boolean(defaultDashboard),
  });
};

export const useAddChartToDashboardMutation = (
  dashboardId: string,
  onSuccess?: () => void
): UseMutationResult<DashboardConfig> => {
  return useMutation({
    mutationKey: [ADD_CHART_TO_DASHBOARD, dashboardId],
    mutationFn: (chartId: string) => addChartToDashboard(dashboardId, chartId),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

export const useRemoveChartToDashboardMutation = (
  dashboardId: string,
  onSuccess?: () => void
): UseMutationResult<DashboardConfig> => {
  return useMutation({
    mutationKey: [ADD_CHART_TO_DASHBOARD, dashboardId],
    mutationFn: (chartId: string) =>
      removeChartFromDashboard(dashboardId, chartId),
    onSuccess: () => {
      onSuccess && onSuccess();
    },
  });
};

import { ApiClient } from "api-client";

import { DashboardConfig } from "../types";

export const getDashboardConfig = async (defaultDashboard: number) => {
  const response = await ApiClient.get(`/api/dashboard/${defaultDashboard}`);

  return response.data as DashboardConfig;
};

export const addChartToDashboard = async (
  dashboardId: string,
  chartId: string
) => {
  const response = await ApiClient.put(
    `/api/dashboard/${dashboardId}/add/${chartId}`
  );

  return response.data as DashboardConfig;
};

export const removeChartFromDashboard = async (
  dashboardId: string,
  chartId: string
) => {
  const response = await ApiClient.put(
    `/api/dashboard/${dashboardId}/remove/${chartId}`
  );

  return response.data as DashboardConfig;
};

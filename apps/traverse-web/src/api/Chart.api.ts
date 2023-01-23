import { ApiClient } from "api-client";

import { ChartConfig } from "../types";

// Get chart config given chart id
export const getChartConfig = async (chartId: string) => {
  const response = await ApiClient.get(`/api/chart/${chartId}`);

  return response.data as ChartConfig;
};

// Get all charts of user
export const getCharts = async () => {
  const response = await ApiClient.get(`/api/chart`);

  return response.data as ChartConfig[];
};

// Create new chart given chart config
export const createNewChart = async (config: ChartConfig) => {
  const response = await ApiClient.post(`/api/chart`, config);

  return response.data as ChartConfig;
};

// Get all charts created by user
export const updateChart = async (chartId: string, config: ChartConfig) => {
  const response = await ApiClient.put(`/api/chart/${chartId}`, config);

  return response.data as ChartConfig;
};

// Get all charts created by user
export const deleteChart = async (chartId: string) => {
  const response = await ApiClient.delete(`/api/chart`, {
    params: { id: chartId },
  });

  return response.data as ChartConfig;
};

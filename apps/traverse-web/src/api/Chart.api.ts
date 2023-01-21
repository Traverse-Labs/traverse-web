import { ApiClient } from "api-client";

import { ChartConfig } from "../types";

export const getChartConfig = async (chartId: string) => {
  const response = await ApiClient.get(`/api/chart/${chartId}`);

  return response.data as ChartConfig;
};

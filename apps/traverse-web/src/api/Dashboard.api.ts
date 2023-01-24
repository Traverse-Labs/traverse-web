import { ApiClient } from "api-client";

import { DashboardConfig } from "../types";

export const getDashboardConfig = async (defaultDashboard: number) => {
  const response = await ApiClient.get(`/api/dashboard/${defaultDashboard}`);

  return response.data as DashboardConfig;
};

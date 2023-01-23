import { ApiClient } from "api-client";

import { DashboardConfig } from "../types";

export const getDashboardConfig = async () => {
  const response = await ApiClient.get(`/api/dashboard/default`);

  return response.data as DashboardConfig;
};

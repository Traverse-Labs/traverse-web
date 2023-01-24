import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { GET_DEFAULT_DASHBOARD_CONFIG } from "../constants";
import { DashboardConfig } from "../types";
import { getDashboardConfig } from "./Dashboard.api";

export const useGetDashboardConfig = (
  defaultDashboard: number
): UseQueryResult<DashboardConfig> => {
  return useQuery({
    queryKey: [GET_DEFAULT_DASHBOARD_CONFIG, defaultDashboard],
    queryFn: () => getDashboardConfig(defaultDashboard),
    enabled: Boolean(defaultDashboard),
  });
};

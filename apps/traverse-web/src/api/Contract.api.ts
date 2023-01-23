import { ApiClient } from "api-client";
import { SeriesChartData } from "ui";

import { ChartConfig } from "../types";

export const getContractInstruction = async (contractAddress: string) => {
  const response = await ApiClient.get(
    `/api/contract/${contractAddress}/instruction`
  );

  return response.data as string[];
};

export const getContractChartData = async (
  contractAddress: string,
  config: ChartConfig
) => {
  const response = await ApiClient.get(
    `/api/contract/${contractAddress}/instruction`,
    {
      params: config,
    }
  );

  return response.data as SeriesChartData;
};

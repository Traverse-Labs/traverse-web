import { ApiClient } from "api-client";
import { ScoreCardData, SeriesChartData } from "ui";

import { ChartConfig, DataPeriod } from "../types";

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

export const getContractAutoAnalysisData = async (
  contractAddress: string,
  chartId: number,
  period: DataPeriod
) => {
  const response = await ApiClient.get(
    `/api/contract/${contractAddress}/auto/${chartId}`,
    {
      params: {
        period,
      },
    }
  );

  return response.data as SeriesChartData | ScoreCardData;
};

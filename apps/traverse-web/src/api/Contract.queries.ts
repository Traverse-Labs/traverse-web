import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ScoreCardData, SeriesChartData } from "ui";

import {
  CONTRACT_AUTO_ANALYSIS_QUERY_KEY,
  CONTRACT_INSTRUCTION_QUERY_KEY,
} from "../constants";
import { ChartConfig, DataPeriod } from "../types";
import {
  getContractAutoAnalysisData,
  getContractChartData,
  getContractInstruction,
} from "./Contract.api";

export const useGetContractInstruction = (
  contractAddress: string
): UseQueryResult<string[]> => {
  return useQuery({
    queryKey: [CONTRACT_INSTRUCTION_QUERY_KEY, contractAddress],
    queryFn: () => getContractInstruction(contractAddress),
    enabled: Boolean(contractAddress),
  });
};

export const useGetContractChartData = (
  contractAddress: string,
  config: ChartConfig
): UseQueryResult<SeriesChartData> => {
  return useQuery({
    queryKey: [CONTRACT_INSTRUCTION_QUERY_KEY, contractAddress, config],
    queryFn: () => getContractChartData(contractAddress, config),
    enabled: Boolean(contractAddress) && config.instructions.length > 0,
  });
};

export const useGetContractAutoAnalysisData = (
  contractAddress: string,
  chartId: number,
  period: DataPeriod
): UseQueryResult<SeriesChartData | ScoreCardData> => {
  return useQuery({
    queryKey: [
      CONTRACT_AUTO_ANALYSIS_QUERY_KEY,
      contractAddress,
      chartId,
      period,
    ],
    queryFn: () =>
      getContractAutoAnalysisData(contractAddress, chartId, period),
    enabled: Boolean(contractAddress) && Boolean(chartId),
  });
};

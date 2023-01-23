import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SeriesChartData } from "ui";

import { CONTRACT_INSTRUCTION_QUERY_KEY } from "../constants";
import { ChartConfig } from "../types";
import { getContractChartData, getContractInstruction } from "./Contract.api";

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

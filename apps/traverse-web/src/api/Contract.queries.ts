import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { CONTRACT_INSTRUCTION_QUERY_KEY } from "../constants";
import { getContractInstruction } from "./Contract.api";

export const useGetContractInstruction = (
  contractAddress: string
): UseQueryResult<string[]> => {
  return useQuery({
    queryKey: [CONTRACT_INSTRUCTION_QUERY_KEY, contractAddress],
    queryFn: () => getContractInstruction(contractAddress),
    enabled: Boolean(contractAddress),
  });
};

import { ApiClient } from "api-client";

export const getContractInstruction = async (contractAddress: string) => {
  const response = await ApiClient.get(
    `/api/contract/${contractAddress}/instruction`
  );

  return response.data as string[];
};

import { USER_ID_LS_KEY } from "../constants";

export const useLoggedInUser = () => {
  let userId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem(USER_ID_LS_KEY) as string;
  }

  return {
    userId,
    contractAddress: "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi",
    instructions: [
      "CloseAccount",
      "DepositStake",
      "Burn",
      "MintTo",
      "SyncNative",
    ],
  };
};

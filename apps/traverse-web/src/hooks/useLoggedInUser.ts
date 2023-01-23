import { USER_ID_LS_KEY } from "../constants";

export const useLoggedInUser = () => {
  let userId = "";

  if (typeof window !== "undefined") {
    userId = localStorage.getItem(USER_ID_LS_KEY) as string;
  }

  return {
    userId,
    contractAddress: "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD",
    instructions: [
      "TokenSwap",
      "Route",
      "Exchange",
      "SetTokenLedger",
      "AldrinSwap",
      "GetAccountDataSize",
      "WhirlpoolSwap",
      "CloseAccount",
      "Burn",
      "Swap",
      "Transfer",
      "zeAccount3",
      "WithdrawStake",
      "CropperTokenSwap",
      "zeImmutableOwner",
      "MercurialExchange",
      "MintTo",
      "SyncNative",
    ],
  };
};

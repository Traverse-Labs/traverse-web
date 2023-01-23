export enum SupportedContract {
  cega = "Cega",
  lido = "Lido",
  hubble = "Hubble",
  marinade = "Marinade Finance",
  friktion = "Friktion",
}

export const SupportedContractAddresses = {
  [SupportedContract.cega]: "3HUeooitcfKX1TSCx2xEpg2W31n6Qfmizu7nnbaEWYzs",
  [SupportedContract.lido]: "CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi",
  [SupportedContract.hubble]: "HubbLeXBb7qyLHt3x7gvYaRrxQmmgExb7fCJgDqFuB6T",
  [SupportedContract.marinade]: "MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD",
  [SupportedContract.friktion]: "VoLT1mJz1sbnxwq5Fv2SXjdVDgPXrb9tJyC8WpMDkSp",
};

export const SupportedContractOptions = [
  {
    value: SupportedContractAddresses[SupportedContract.cega],
    label: SupportedContract.cega,
  },
  {
    value: SupportedContractAddresses[SupportedContract.lido],
    label: SupportedContract.lido,
  },
  {
    value: SupportedContractAddresses[SupportedContract.hubble],
    label: SupportedContract.hubble,
  },
  {
    value: SupportedContractAddresses[SupportedContract.marinade],
    label: SupportedContract.marinade,
  },
  {
    value: SupportedContractAddresses[SupportedContract.friktion],
    label: SupportedContract.friktion,
  },
];

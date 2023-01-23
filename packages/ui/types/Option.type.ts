import { ReactNode } from "react";

export type Option<T> = {
  value: T;
  label: string;
  icon?: ReactNode;
};

export const EmptyOption: Option<null> = {
  value: null,
  label: "",
};

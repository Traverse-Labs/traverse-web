export type Option<T> = {
  value: T;
  label: string;
};

export const EmptyOption: Option<null> = {
  value: null,
  label: "",
};

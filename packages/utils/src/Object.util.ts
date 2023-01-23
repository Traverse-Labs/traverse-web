import { Option } from "ui/types/Option.type";

export const getLabelFromOptions = <T>(
  options: Option<T>[],
  value: T
): string | null => {
  const option = options.find((opt) => opt.value === value);

  if (option) {
    return option.label;
  }

  return null;
};

import { clsx } from "clsx";
import { ChangeEvent } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
  isTextOnly?: boolean;
};
const TextInput = (props: Props) => {
  const { placeholder, value, onChange, classname, isTextOnly = false } = props;

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(
        "block w-full rounded-md border-slate-700 bg-slate-800 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500",
        isTextOnly && "border-none bg-slate-900 focus:border-none focus:ring-0",
        classname
      )}
    />
  );
};

export default TextInput;

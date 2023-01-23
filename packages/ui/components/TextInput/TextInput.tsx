import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { ChangeEvent } from "react";

const textInputStyle = cva(
  "block w-full rounded-md border-slate-700 text-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500",
  {
    variants: {
      variant: {
        primary: "bg-slate-800",
        ghost: "border-none bg-transparent focus:border-none focus:ring-0",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export type TextInputStyleProps = VariantProps<typeof textInputStyle>;

type Props = {
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  classname?: string;
} & TextInputStyleProps;

const TextInput = (props: Props) => {
  const { placeholder, value, onChange, classname, variant } = props;

  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={clsx(textInputStyle({ variant }), classname)}
    />
  );
};

export default TextInput;

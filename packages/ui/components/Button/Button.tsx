import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { ReactNode } from "react";

const buttonStyle = cva(
  "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: "bg-teal-600 hover:bg-teal-700",
        secondary: "bg-transparent hover:bg-slate-800 border border-gray-700",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "sm",
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonStyle>;

type Props = {
  children?: ReactNode;
  classname?: string;
} & ButtonProps;

const Button = (props: Props) => {
  const { children, classname, variant, size } = props;

  return (
    <button
      type="button"
      className={clsx(buttonStyle({ variant, size }), classname)}
    >
      {children}
    </button>
  );
};

export default Button;

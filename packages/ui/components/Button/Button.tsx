import { cva, VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import React from "react";

const buttonStyle = cva(
  "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition focus:ring-offset-2 focus:ring-offset-slate-900 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary: " text-slate-50 bg-teal-600 hover:bg-teal-500",
        secondary: "bg-transparent hover:bg-slate-800 border border-gray-700",
      },
      size: {
        xs: "px-2.5 py-1.5 text-xs",
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-4 py-2 text-base",
        xl: "px-6 py-3 text-base",
      },
      state: {
        active: "",
        disabled: "pointer-events-none opacity-50 hover",
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
  children?: React.ReactNode;
  classname?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
} & ButtonProps;

const Button = (props: Props) => {
  const { children, classname, variant, size, onClick, isDisabled } = props;

  const state = isDisabled ? "disabled" : "active";

  return (
    <button
      type="button"
      className={clsx(buttonStyle({ variant, size, state }), classname)}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
};

export default Button;

import { clsx } from "clsx";
import Image, { ImageProps } from "next/image";

type Props = {
  src: ImageProps["src"];
  size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl";
  isCircular?: boolean;
  className?: string;
};

const sizeStyle = {
  xxs: "h-3 w-3",
  xs: "h-4 w-4",
  sm: "h-8 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
};

const LogoImg = (props: Props & ImageProps) => {
  const { src, size = "sm", isCircular, className } = props;

  return (
    <div
      className={clsx(
        "relative",
        sizeStyle[size],
        isCircular && "rounded-full border-2 border-slate-500 p-[5px]",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image layout="fill" objectFit="contain" src={src} alt="" priority />
      </div>
    </div>
  );
};

export default LogoImg;

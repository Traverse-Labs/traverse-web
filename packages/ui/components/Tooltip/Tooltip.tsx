import ClickAwayListener from "@mui/material/ClickAwayListener";
import MuiTooltip from "@mui/material/Tooltip";
import { clsx } from "clsx";
import { Breakpoint } from "constant";
import { ReactElement, useState } from "react";

import { useMinWidth } from "../../hooks";

type Props = {
  children: ReactElement;
  content: string;
  tooltipClassname?: string;
  placement?: "top" | "bottom" | "left" | "right";
};
const Tooltip = (props: Props) => {
  const { children, tooltipClassname, content, placement = "bottom" } = props;

  const mdAndAbove = useMinWidth(Breakpoint.md);

  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const commonProps = {
    arrow: true,
    slotProps: {
      tooltip: {
        className: clsx(tooltipClassname, "text-xs m-3 bg-zinc-700"),
      },
      arrow: {
        className: "text-zinc-700",
      },
    },
    title: content,
    placement,
  };

  if (mdAndAbove) {
    return <MuiTooltip {...commonProps}>{children}</MuiTooltip>;
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <MuiTooltip {...commonProps} onClose={handleTooltipClose} open={open}>
        <div onClick={handleTooltipOpen}>{children}</div>
      </MuiTooltip>
    </ClickAwayListener>
  );
};

export default Tooltip;

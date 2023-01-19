import { clsx } from "clsx";
import { useState } from "react";

type Props = {
  labels: string[];
  onClick: (label: string, index: number) => void;
  isPersistentState?: boolean;
  defaultSelection?: number;
};

const ButtonGroup = (props: Props) => {
  const {
    labels,
    onClick,
    isPersistentState = false,
    defaultSelection = 0,
  } = props;

  if (labels.length < 2) {
    throw new Error(
      "'labels' prop needs at least 2 items for Button Group. Else use a single Button instead"
    );
  }

  const [activeIndex, setActiveIndex] = useState(defaultSelection);

  const defaultStyle =
    "relative inline-flex items-center border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-50 transition hover:bg-slate-700 hover:text-slate-50 whitespace-nowrap";

  const handleButtonClick = (label: string, idx: number) => {
    setActiveIndex(idx);
    onClick(label, idx);
  };

  const getActiveStyle = (idx: number) => {
    if (isPersistentState && idx === activeIndex) {
      return "bg-teal-600 text-slate-50 hover:bg-teal-600 hover: text-slate-50";
    }

    return null;
  };

  const getMiddleButtons = () => {
    const middleButtons = [];

    if (labels.length < 3) {
      return null;
    }

    for (let i = 1; i < labels.length - 1; i++) {
      middleButtons.push(
        <button
          key={`button-group-${labels[i]}`}
          type="button"
          className={clsx(getActiveStyle(i), defaultStyle, "-ml-px")}
          onClick={() => handleButtonClick(labels[i], i)}
        >
          {labels[i]}
        </button>
      );
    }

    return middleButtons;
  };

  return (
    <div className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={clsx(getActiveStyle(0), defaultStyle, "-ml-px rounded-l-md")}
        onClick={() => handleButtonClick(labels[0], 0)}
      >
        {labels[0]}
      </button>
      {getMiddleButtons()}
      <button
        type="button"
        className={clsx(
          getActiveStyle(labels.length - 1),
          defaultStyle,
          "-ml-px rounded-r-md"
        )}
        onClick={() =>
          handleButtonClick(labels[labels.length - 1], labels.length - 1)
        }
      >
        {labels[labels.length - 1]}
      </button>
    </div>
  );
};

export default ButtonGroup;

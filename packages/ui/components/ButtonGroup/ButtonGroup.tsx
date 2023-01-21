import { cva } from "class-variance-authority";

import { Option } from "../../types/Option.type";

const buttonStyle = cva(
  "relative inline-flex items-center border border-slate-700 px-4 py-2 text-sm font-medium text-slate-50 transition  hover:text-slate-50 whitespace-nowrap -ml-px",
  {
    variants: {
      variant: {
        active: "bg-teal-600 hover:bg-teal-700",
        inactive: "bg-slate-800 hover:bg-slate-700",
      },
      position: {
        start: "rounded-l-md",
        middle: "",
        end: "rounded-r-md",
      },
    },
    defaultVariants: {
      variant: "inactive",
      position: "middle",
    },
  }
);

type Props<T> = {
  value: T;
  options: Option<T>[];
  onClick: (selectedOption: Option<T>) => void;
  isPersistentState?: boolean;
};

const ButtonGroup = <T,>(props: Props<T>) => {
  const { value, options, onClick, isPersistentState = false } = props;

  if (options.length < 2) {
    throw new Error(
      "'options' prop needs at least 2 items for Button Group. Else use a single Button instead"
    );
  }

  const handleButtonClick = (option: Option<T>) => {
    onClick(option);
  };

  const getVariant = (option: Option<T>) => {
    if (isPersistentState && option.value === value) {
      return "active";
    }

    return "inactive";
  };

  const getMiddleButtons = () => {
    const middleButtons = [];

    if (options.length < 3) {
      return null;
    }

    for (let i = 1; i < options.length - 1; i++) {
      middleButtons.push(
        <button
          key={`button-group-${options[i].label}`}
          type="button"
          className={buttonStyle({
            variant: getVariant(options[i]),
            position: "middle",
          })}
          onClick={() => handleButtonClick(options[i])}
        >
          {options[i].label}
        </button>
      );
    }

    return middleButtons;
  };

  return (
    <div className="isolate inline-flex rounded-md shadow-sm">
      <button
        type="button"
        className={buttonStyle({
          variant: getVariant(options[0]),
          position: "start",
        })}
        onClick={() => handleButtonClick(options[0])}
      >
        {options[0].label}
      </button>
      {getMiddleButtons()}
      <button
        type="button"
        className={buttonStyle({
          variant: getVariant(options[options.length - 1]),
          position: "end",
        })}
        onClick={() => handleButtonClick(options[options.length - 1])}
      >
        {options[options.length - 1].label}
      </button>
    </div>
  );
};

export default ButtonGroup;

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { Fragment, MouseEventHandler, useState } from "react";

const sizeOptions = {
  sm: "py-1 px-2",
  md: "py-2 px-3",
};

const dropdownAlignOptions = {
  left: "left-0",
  right: "right-0",
};

type Props = {
  options: string[];
  defaultOption?: string;
  placeholder?: string;
  isFullWidth?: boolean;
  isChevronIconShown?: boolean;
  size?: keyof typeof sizeOptions;
  dropdownAlign?: keyof typeof dropdownAlignOptions;
  isRemovable?: boolean;
  onRemove?: (option: string) => void;
  onChange?: (prevOption: string, newOption: string) => void;
  isResetOnChange?: boolean;
  isResetOnRemove?: boolean;
};

export default function DropdownSelect(props: Props) {
  const {
    options,
    defaultOption = null,
    placeholder = "Select Option...",
    isFullWidth,
    isChevronIconShown,
    size = "md",
    dropdownAlign = "left",
    onRemove,
    isRemovable,
    onChange,
    isResetOnChange,
    isResetOnRemove,
  } = props;

  const [selected, setSelected] = useState(defaultOption);

  const handleRemove: MouseEventHandler = (e) => {
    e.preventDefault();
    onChange && onChange(selected, undefined);
    isResetOnRemove && setSelected(null);
  };

  const handleChange = (option: string) => {
    onChange && onChange(selected, option);
    setSelected(option);
    isResetOnChange && setSelected(null);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1">
            <Listbox.Button
              className={clsx(
                "relative max-w-full cursor-pointer text-ellipsis rounded-md border border-slate-600 bg-slate-800 text-left text-slate-50 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 sm:text-sm",
                isFullWidth && "w-full",
                isChevronIconShown && "pr-10",
                sizeOptions[size]
              )}
            >
              <div className="flex items-center gap-1">
                <span className="block truncate">
                  {selected || (
                    <span className="italic text-slate-400">{placeholder}</span>
                  )}
                </span>
                {isRemovable && selected && (
                  <XMarkIcon
                    className="isolate h-5 w-5 rounded-full text-teal-500 transition hover:bg-teal-700 hover:text-teal-100"
                    onClick={handleRemove}
                  />
                )}
              </div>
              {isChevronIconShown && (
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-slate-50"
                    aria-hidden="true"
                  />
                </span>
              )}
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              enter="transition-opacity duration-75"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={clsx(
                  "absolute z-10 mt-1 max-h-60 overflow-auto rounded-md border border-slate-600 bg-slate-800 py-1 text-slate-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",
                  isFullWidth && "w-full",
                  dropdownAlignOptions[dropdownAlign]
                )}
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx(
                        "transition-50 transition",
                        active ? "bg-teal-600 text-white" : "text-slate-50",
                        "relative flex cursor-pointer select-none items-center justify-between gap-3 text-ellipsis py-2 px-3"
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? "font-semibold" : "font-normal",
                            "block truncate"
                          )}
                        >
                          {option}
                        </span>
                        <span
                          className={clsx(
                            "transition-0 transition",
                            active ? "text-white" : "text-teal-500",
                            selected ? "opacity-100" : "opacity-0"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { clsx } from "clsx";
import { Fragment, MouseEventHandler } from "react";

import { EmptyOption, Option } from "../../types/Option.type";

const sizeOptions = {
  sm: "py-1 px-2",
  md: "py-2 px-3",
};

const dropdownAlignOptions = {
  left: "left-0",
  right: "right-0",
};

export type DropdownSelectProps<T> = {
  value: T | null;
  options: Option<T | null>[];
  placeholder?: string;
  isFullWidth?: boolean;
  isChevronIconShown?: boolean;
  size?: keyof typeof sizeOptions;
  dropdownAlign?: keyof typeof dropdownAlignOptions;
  isRemovable?: boolean;
  onChange?: (newOption: Option<T>, prevOption?: Option<T>) => void;
};

export default function DropdownSelect<T>(props: DropdownSelectProps<T>) {
  const {
    value,
    options,
    placeholder = "Select Option...",
    isFullWidth,
    isChevronIconShown,
    size = "md",
    dropdownAlign = "left",
    isRemovable,
    onChange,
  } = props;

  const currentOption =
    options.find((opt) => opt.value === value) || EmptyOption;

  const handleRemove: MouseEventHandler = (e) => {
    e.preventDefault();
    onChange && onChange(EmptyOption, currentOption);
  };

  const handleChange = (optionLabel: string) => {
    const newOption = options.find((opt) => opt.label === optionLabel);

    onChange && onChange(newOption, currentOption);
  };

  return (
    <Listbox value={currentOption.label} onChange={handleChange}>
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
                  {currentOption?.label ? (
                    <div className="flex items-center gap-1">
                      {currentOption.icon || null}
                      {currentOption.label}
                    </div>
                  ) : (
                    <span className="italic text-slate-400">{placeholder}</span>
                  )}
                </span>
                {isRemovable && currentOption && (
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
                    key={option.label}
                    className={({ active }) =>
                      clsx(
                        "transition-50 transition",
                        active ? "bg-teal-600 text-white" : "text-slate-50",
                        "relative flex cursor-pointer select-none items-center justify-between gap-3 text-ellipsis py-2 px-3"
                      )
                    }
                    value={option.label}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={clsx(
                            selected ? "font-semibold" : "font-normal",
                            "block flex items-center gap-1 truncate"
                          )}
                        >
                          {option.icon || null}
                          {option.label}
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

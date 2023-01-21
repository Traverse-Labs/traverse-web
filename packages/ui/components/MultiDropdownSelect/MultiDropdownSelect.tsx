import { uniq } from "ramda";
import { useCallback } from "react";

import { Option } from "../../types/Option.type";
import { DropdownSelect } from "../DropdownSelect";

type Props<T> = {
  values: T[];
  options: Option<T>[];
  onChange?: (options: Option<T>[]) => void;
  placeholder?: string;
};

enum Action {
  Add,
  Change,
}

const MultiDropdownSelect = <T,>(props: Props<T>) => {
  const { values, options, onChange, placeholder } = props;

  const selectedOptions = useCallback(() => {
    const temp = [];

    values.map((value) => {
      const tempOpt = options.filter((opt) => opt.value === value)[0];

      tempOpt && temp.push(tempOpt);
    });

    return temp;
  }, [options, values]);

  const handleChange = (
    action: Action,
    option: Option<T>,
    prevOption?: Option<T>
  ) => {
    if (action === Action.Add) {
      const newOptions = selectedOptions().filter(
        (opt) => opt.value !== option.value
      );

      newOptions.push(option);
      onChange(newOptions);
      return;
    }

    if (action === Action.Change) {
      if (option.value === null) {
        const newOptions = selectedOptions().filter(
          (opt) => opt.value !== prevOption.value
        );

        onChange(newOptions);
      } else {
        const newOptions = [...selectedOptions()];
        let idx = 0;

        newOptions.forEach((opt, i) => {
          if (opt.value === prevOption.value) {
            idx = i;
          }
        });

        newOptions[idx] = option;

        onChange(uniq(newOptions));
      }
    }
  };

  console.log(selectedOptions());

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {selectedOptions().map((opt) => (
        <DropdownSelect
          key={opt.label}
          value={opt.value}
          options={options}
          isRemovable
          onChange={(opt: Option<T>, prevOpt: Option<T>) =>
            handleChange(Action.Change, opt, prevOpt)
          }
        />
      ))}
      <DropdownSelect
        value={null}
        options={options}
        onChange={(opt: Option<T>) => handleChange(Action.Add, opt)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default MultiDropdownSelect;

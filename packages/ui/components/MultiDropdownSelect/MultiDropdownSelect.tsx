import { uniq, without } from "ramda";
import { useState } from "react";

import { DropdownSelect } from "../DropdownSelect";

type Props = {
  options: string[];
  onChange?: (selected: string[]) => void;
  placeholder?: string;
};
const MultiDropdownSelect = (props: Props) => {
  const { options, onChange, placeholder } = props;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (
    prevOption: string,
    selectedOption: string | undefined
  ) => {
    if (!selectedOption) {
      const newOptions = without(prevOption, [...selectedOptions]);

      setSelectedOptions(newOptions);
      onChange && onChange(newOptions);
      return;
    }

    let newOptions = [...selectedOptions];
    const prevOptionIdx = newOptions.indexOf(prevOption);

    if (prevOptionIdx !== -1) {
      newOptions[prevOptionIdx] = selectedOption;
    } else {
      newOptions.push(selectedOption);
    }

    newOptions = uniq(newOptions);

    setSelectedOptions(newOptions);
    onChange && onChange(newOptions);
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {selectedOptions.map((opt) => (
        <DropdownSelect
          key={opt}
          options={options}
          defaultOption={opt}
          isRemovable
          onChange={handleChange}
        />
      ))}
      <DropdownSelect
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        isResetOnChange
      />
    </div>
  );
};

export default MultiDropdownSelect;

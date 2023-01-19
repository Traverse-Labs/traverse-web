import { uniq, without } from "ramda";
import { useState } from "react";

import { DropdownSelect } from "../DropdownSelect";

type Props = {
  options: string[];
  onChange: (selected: string[]) => void;
};
const MultiDropdownSelect = (props: Props) => {
  const { options } = props;

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleChange = (prevOption: string, selectedOption: string) => {
    const newOptions = [...selectedOptions];
    const prevOptionIdx = newOptions.indexOf(prevOption);

    if (prevOptionIdx !== -1) {
      newOptions[prevOptionIdx] = selectedOption;
    } else {
      newOptions.push(selectedOption);
    }

    setSelectedOptions(uniq(newOptions));
  };

  const handleRemove = (removedOption: string) => {
    setSelectedOptions((prev) => without(removedOption, prev));
  };

  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      {selectedOptions.map((opt) => (
        <DropdownSelect
          key={opt}
          options={options}
          defaultOption={opt}
          isRemovable
          onRemove={handleRemove}
          onChange={handleChange}
        />
      ))}
      <DropdownSelect
        options={options}
        onChange={handleChange}
        isResetOnChange
      />
    </div>
  );
};

export default MultiDropdownSelect;

import { useState } from "react";
import { MultiDropdownSelect } from "ui";
import { Option } from "ui/types/Option.type";

const MOCK_OPTIONS = [
  {
    value: "U_WALLET",
    label: "Unique Users",
  },
  {
    value: "TXN",
    label: "Transactions",
  },
  {
    value: "VOLUME",
    label: "Volume",
  },
];

export default {
  title: "Components/Multi Dropdown Select",
  component: MultiDropdownSelect,
  argTypes: {},
};

export const Base = () => {
  const [values, setValues] = useState<string[] | []>([]);

  const handleChange = (options: Option<string>[]) => {
    console.log(options);
    const newValues = options.map((opt) => opt.value);

    setValues(newValues);
  };

  return (
    <MultiDropdownSelect
      values={values}
      options={MOCK_OPTIONS}
      onChange={handleChange}
    />
  );
};

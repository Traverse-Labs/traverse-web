import { useState } from "react";
import { DropdownSelect } from "ui";
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
  title: "Components/Dropdown Select",
  component: DropdownSelect,
  argTypes: {
    value: { control: "object" },
    options: { control: "object" },
    size: { control: { type: "radio" }, options: ["sm", "md"] },
    isFullWidth: { control: "boolean" },
    isChevronIconShown: { control: "boolean" },
    dropdownAlign: { control: { type: "radio" }, options: ["left", "right"] },
    placeholder: { control: "text" },
    isRemovable: { control: "text" },
  },
};

export const Base = () => {
  const [value, setValue] = useState<string | null>("TXN");

  const handleChange = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <DropdownSelect
      value={value}
      options={MOCK_OPTIONS}
      onChange={handleChange}
    />
  );
};

export const WithCustomPlaceholder = () => {
  const [value, setValue] = useState<string | null>(null);

  const handleChange = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <DropdownSelect
      value={value}
      options={MOCK_OPTIONS}
      onChange={handleChange}
      placeholder="My custom placeholder..."
    />
  );
};

export const WithRemoveIcon = () => {
  const [value, setValue] = useState<string | null>("TXN");

  const handleChange = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <DropdownSelect
      value={value}
      options={MOCK_OPTIONS}
      onChange={handleChange}
      isRemovable
    />
  );
};

export const FullWidth = () => {
  const [value, setValue] = useState<string | null>("TXN");

  const handleChange = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <DropdownSelect
      value={value}
      options={MOCK_OPTIONS}
      onChange={handleChange}
      isFullWidth
    />
  );
};

export const ChevronIconShown = () => {
  const [value, setValue] = useState<string | null>("TXN");

  const handleChange = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <DropdownSelect
      value={value}
      options={MOCK_OPTIONS}
      onChange={handleChange}
      isChevronIconShown
    />
  );
};

import { useState } from "react";
import { ButtonGroup } from "ui";
import { Option } from "ui/types/Option.type";

export default {
  title: "Components/Button Group",
  component: ButtonGroup,
  argTypes: {
    value: { control: "object" },
    options: { control: "object" },
    isPersistentState: { control: "boolean" },
  },
};

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

export const Base = () => {
  const [value, setValue] = useState<string>("TXN");

  const handleClick = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <ButtonGroup value={value} options={MOCK_OPTIONS} onClick={handleClick} />
  );
};

export const PersistentState = () => {
  const [value, setValue] = useState<string>("TXN");

  const handleClick = (option: Option<string>) => {
    console.log(option);
    setValue(option.value);
  };

  return (
    <ButtonGroup
      isPersistentState
      value={value}
      options={MOCK_OPTIONS}
      onClick={handleClick}
    />
  );
};

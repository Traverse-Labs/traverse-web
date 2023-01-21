import { useState } from "react";
import { TextInput } from "ui";

export default {
  title: "Components/Text Input",
  component: TextInput,
  argTypes: {
    placeholder: { control: "text" },
  },
};

export const Base = () => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text here..."
    />
  );
};

export const TextOnly = () => {
  const [value, setValue] = useState("Default Text");

  return (
    <TextInput
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter Chart Title..."
      isTextOnly
      classname="text-lg font-bold"
    />
  );
};

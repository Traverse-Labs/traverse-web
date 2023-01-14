import { ComponentStory } from "@storybook/react";
import React from "react";

import { DropdownSelect } from "ui";

export default {
  title: "Components/Dropdown Select",
  component: DropdownSelect,
  argTypes: {
    className: { control: "text" },
    options: { control: "object" },
    defaultOption: { control: "text" },
  },
};

const Template: ComponentStory<typeof DropdownSelect> = (args) => (
  <DropdownSelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: ["Option 1", "Option 2", "Option 3 (Default)", "Option 4"],
  defaultOption: "Option 3 (Default)",
};

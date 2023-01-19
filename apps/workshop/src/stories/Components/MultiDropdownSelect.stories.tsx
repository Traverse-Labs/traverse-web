import { ComponentStory } from "@storybook/react";
import { MultiDropdownSelect } from "ui";

export default {
  title: "Components/Multi Dropdown Select",
  component: MultiDropdownSelect,
  argTypes: {
    options: { control: "object" },
    onChange: { action: "clicked" },
  },
};

const Template: ComponentStory<typeof MultiDropdownSelect> = (args) => (
  <MultiDropdownSelect {...args} />
);

export const Base = Template.bind({});
Base.args = {
  options: ["Deposit", "Withdrawal", "Transfer", "Stake", "Add Liquidity"],
};

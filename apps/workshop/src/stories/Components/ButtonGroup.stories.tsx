import { ComponentStory } from "@storybook/react";
import { ButtonGroup } from "ui";

export default {
  title: "Components/Button Group",
  component: ButtonGroup,
  argTypes: {
    labels: { control: "object" },
    onClick: { action: "clicked" },
    isPersistentState: { control: "boolean" },
    defaultSelection: { control: "number" },
  },
};

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  labels: ["Unique Users", "Transactions", "Txn Volume"],
};

export const PersistentState = Template.bind({});
PersistentState.args = {
  ...Default.args,
  isPersistentState: true,
};

export const CustomDefaultState = Template.bind({});
CustomDefaultState.args = {
  ...PersistentState.args,
  defaultSelection: 2,
};

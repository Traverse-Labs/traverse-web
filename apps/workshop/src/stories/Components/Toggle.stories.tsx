import { ComponentStory } from "@storybook/react";
import { Toggle } from "ui";

export default {
  title: "Components/Toggle",
  component: Toggle,
  argTypes: {
    onChange: { action: "clicked" },
  },
};

const Template: ComponentStory<typeof Toggle> = (args) => <Toggle {...args} />;

export const Base = Template.bind({});
Base.args = {};

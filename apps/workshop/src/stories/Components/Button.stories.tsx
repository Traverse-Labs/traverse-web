import { ComponentStory } from "@storybook/react";
import { Button } from "ui";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: { action: "clicked" },
    variant: { control: "radio", options: ["primary", "secondary"] },
    size: { control: "radio", options: ["xs", "sm", "md", "lg", "xl"] },
  },
};

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>Primary button</div>,
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: <div>Secondary button</div>,
  variant: "secondary",
};

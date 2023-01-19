import { ComponentStory } from "@storybook/react";
import { DropdownSelect } from "ui";

export default {
  title: "Components/Dropdown Select",
  component: DropdownSelect,
  argTypes: {
    options: { control: "object" },
    defaultOption: { control: "text" },
    size: { control: { type: "radio" }, options: ["sm", "md"] },
    isFullWidth: { control: "boolean" },
    isChevronIconShown: { control: "boolean" },
    dropdownAlign: { control: { type: "radio" }, options: ["left", "right"] },
    placeholder: { control: "text" },
    isRemovable: { control: "text" },
    onRemove: { action: "clicked" },
    onChange: { action: "clicked" },
    isResetOnRemove: { control: "boolean" },
    isResetOnChange: { control: "boolean" },
  },
};

const Template: ComponentStory<typeof DropdownSelect> = (args) => (
  <DropdownSelect {...args} />
);

export const Base = Template.bind({});
Base.args = {
  options: [
    "The First 1",
    "Second 2",
    "A Third Option 3",
    "Some Very Very Very Very Very Very Long Option 4",
  ],
};

export const WithCustomPlaceholder = Template.bind({});
WithCustomPlaceholder.args = {
  ...Base.args,
  placeholder: "+ Add event...",
};

export const WithDefaultOption = Template.bind({});
WithDefaultOption.args = {
  ...Base.args,
  defaultOption: "A Third Option 3",
};

export const WithRemoveIcon = Template.bind({});
WithRemoveIcon.args = {
  ...Base.args,
  defaultOption: "A Third Option 3",
  isRemovable: true,
  isResetOnRemove: true,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  ...Base.args,
  isFullWidth: true,
};

export const WithChevron = Template.bind({});
WithChevron.args = {
  ...Base.args,
  isChevronIconShown: true,
};

export const AlignRight: ComponentStory<typeof DropdownSelect> = (args) => (
  <div className="flex w-full justify-end">
    <DropdownSelect {...args} {...Base.args} dropdownAlign="right" />
  </div>
);

export const ManyOptions = Template.bind({});
ManyOptions.args = {
  options: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
  ],
  defaultOption: "16",
};

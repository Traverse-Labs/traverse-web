import { ComponentStory } from "@storybook/react";
import { HorizontalBarChart } from "ui";

import { mockValues } from "./MockData";

export default {
  title: "Charts/Horizontal Bar Chart",
  component: HorizontalBarChart,
  argTypes: {
    data: { control: "object" },
    options: {
      argTypes: {
        seriesLabel: { control: "text" },
        categoriesLabel: { control: "text" },
      },
    },
  },
};

const Template: ComponentStory<typeof HorizontalBarChart> = (args) => (
  <div className="w-full rounded-md bg-slate-800 p-4">
    <HorizontalBarChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    series: [
      {
        name: "Deposit",
        values: mockValues(2),
      },
      {
        name: "Withdrawal",
        values: mockValues(2),
      },
    ],
    categories: [
      "how are you today blah blah blah how are you today blah blah blah how are you today blah blah blah how are you today blah blah blah",
      "how are you today blah blah blah",
    ],
  },
  options: {
    seriesLabel: "Unique Wallets",
  },
};

import { ComponentStory } from "@storybook/react";
import { VerticalBarChart } from "ui";

import { mockValues } from "./MockData";

export default {
  title: "Charts/Vertical Bar Chart",
  component: VerticalBarChart,
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

const Template: ComponentStory<typeof VerticalBarChart> = (args) => (
  <div className="w-full rounded-md bg-slate-800 p-4">
    <VerticalBarChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    series: [
      {
        name: "Deposit",
        values: mockValues(4),
      },
      {
        name: "Withdrawal",
        values: mockValues(4),
      },
    ],
    categories: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    ],
  },
  options: {
    seriesLabel: "Unique Wallets",
  },
};

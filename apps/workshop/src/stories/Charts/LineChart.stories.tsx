import { ComponentStory } from "@storybook/react";
import { LineChart } from "ui";

import { mockCategories, mockValues } from "./MockData";

export default {
  title: "Charts/Line Chart",
  component: LineChart,
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

const Template: ComponentStory<typeof LineChart> = (args) => (
  <div className="w-full rounded-md bg-slate-800 p-4">
    <LineChart {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  data: {
    series: [
      {
        name: "Deposit",
        values: mockValues(),
      },
      {
        name: "Withdrawal",
        values: mockValues(),
      },
    ],
    categories: mockCategories,
  },
  options: {
    seriesLabel: "Unique Wallets",
  },
};

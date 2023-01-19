import { DehydratedStateProps, LineChart, NextPageWithLayout } from "ui";

import { getPageLayout } from "../src/layouts/Layout";

const mockData = {
  series: [
    {
      name: "Series 1",
      values: [1, 2, 3],
    },
    {
      name: "Series 2",
      values: [4, 5, 6],
    },
    {
      name: "Series 3",
      values: [7, 8, 9],
    },
  ],
  categories: ["a", "b", "c"],
};

const Home: NextPageWithLayout<DehydratedStateProps> = () => {
  return (
    <div className="flex h-full flex-1 flex-col">
      <LineChart
        data={mockData}
        options={{
          title: "Daily Unique Users",
          seriesLabel: "Unique Users",
        }}
      />
    </div>
  );
};

Home.getLayout = getPageLayout;

export default Home;

import { Button } from "ui";

import { getPageLayout } from "../../src/layouts/Layout";
import { ChartConfig } from "../../src/types";

const MOCK_CHART_CONFIGS: ChartConfig[] = [
  {
    id: "1",
    name: "This is my first chart",
    instructions: ["Withdrawal", "Deposit"],
    metric: "U_WALLET",
    period: "7",
    chartType: "LINE",
    aggregate: "SUM",
    groupBy: "NFT_HOLDINGS",
  },
  {
    id: "2",
    name: "This is my second chart",
    instructions: ["Liquidity Pull", "Rug Pull"],
    metric: "TXN",
    period: "30",
    chartType: "HORIZONTAL_BAR",
    aggregate: "AVERAGE",
    groupBy: "SOL_HOLDINGS",
  },
];

const ChartPage = () => {
  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-4 text-3xl font-bold">Your Charts</div>
      <Button variant="primary" classname="mb-4">
        Create New Chart
      </Button>
      <div className="space-y-2">
        {MOCK_CHART_CONFIGS.map((config) => (
          <div
            key={config.id}
            className="cursor-pointer rounded-md bg-slate-800 py-4 px-6 transition hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 hover:ring-offset-slate-900"
          >
            <div>{config.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

ChartPage.getLayout = getPageLayout;

export default ChartPage;

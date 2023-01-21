import { Button } from "ui";

import { getPageLayout } from "../../../src/layouts/Layout";
import {
  AggregationMethod,
  ChartConfig,
  ChartType,
  DataPeriod,
  GroupByMethod,
  Metric,
} from "../../../src/types";

const MOCK_CHART_CONFIGS: ChartConfig[] = [
  {
    id: "1",
    name: "This is my first chart",
    instructions: ["Withdrawal", "Deposit"],
    metric: Metric.U_WALLET,
    period: DataPeriod.PERIOD_7,
    chartType: ChartType.LINE,
    aggregate: AggregationMethod.SUM,
    groupBy: GroupByMethod.NFT_HOLDINGS,
  },
  {
    id: "2",
    name: "This is my second chart",
    instructions: ["Liquidity Pull", "Rug Pull"],
    metric: Metric.TXN,
    period: DataPeriod.PERIOD_30,
    chartType: ChartType.HORIZONTAL_BAR,
    aggregate: AggregationMethod.AVG,
    groupBy: GroupByMethod.SOL_HOLDINGS,
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

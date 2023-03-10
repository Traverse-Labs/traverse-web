import { ChartEdit } from "../../../../src/components/ChartEdit";
import { getPageLayout } from "../../../../src/layouts/Layout";
import {
  ChartConfig,
  ChartType,
  DataPeriod,
  Metric,
} from "../../../../src/types";

const defaultConfig: ChartConfig = {
  name: "",
  instructions: [],
  metric: Metric.U_WALLET,
  period: DataPeriod.PERIOD_30,
  chartType: ChartType.LINE,
  aggregate: undefined,
  groupBy: undefined,
};

const NewChartPage = () => {
  return <ChartEdit defaultConfig={defaultConfig} />;
};

NewChartPage.getLayout = getPageLayout;

export default NewChartPage;

import { useState } from "react";
import { ButtonGroup, DehydratedStateProps, NextPageWithLayout } from "ui";
import { Option } from "ui/types/Option.type";

import ChartCard from "../../src/components/ChartCard";
import ScoreCard from "../../src/components/ScoreCard";
import { useUserContext } from "../../src/contexts/UserContext";
import { getPageLayout } from "../../src/layouts/Layout";
import {
  AggregationMethod,
  ChartConfig,
  ChartType,
  DataPeriod,
  DataPeriodOptions,
  GroupByMethod,
  Metric,
} from "../../src/types";

type DashboardConfig = {
  id: number;
  name: string;
  user_id: string;
  charts: {
    id: number;
    name: string;
    user_id: number;
    config: ChartConfig;
  }[];
  autoCharts: {
    chart_id: number;
    dashboard_id: number;
    chart_type: ChartType;
  }[];
};

const MOCK_DASHBOARD_DATA: DashboardConfig = {
  id: 10,
  name: "new dashboar2d",
  user_id: "2",
  charts: [
    {
      id: 40,
      name: "my new chart yo",
      user_id: 2,
      config: {
        instructions: ["MintTo", "Burn"],
        metric: Metric.U_WALLET,
        period: DataPeriod.PERIOD_30,
        chartType: ChartType.LINE,
        aggregate: AggregationMethod.SUM,
        groupBy: GroupByMethod.SOL_HOLDINGS,
      },
    },
  ],
  autoCharts: [
    {
      chart_id: 1,
      dashboard_id: 10,
      chart_type: ChartType.SCORECARD,
    },
    {
      chart_id: 2,
      dashboard_id: 10,
      chart_type: ChartType.SCORECARD,
    },
    {
      chart_id: 3,
      dashboard_id: 10,
      chart_type: ChartType.SCORECARD,
    },
    {
      chart_id: 4,
      dashboard_id: 10,
      chart_type: ChartType.LINE,
    },
    {
      chart_id: 5,
      dashboard_id: 10,
      chart_type: ChartType.LINE,
    },
    {
      chart_id: 6,
      dashboard_id: 10,
      chart_type: ChartType.LINE,
    },
    {
      chart_id: 7,
      dashboard_id: 10,
      chart_type: ChartType.LINE,
    },
    {
      chart_id: 8,
      dashboard_id: 10,
      chart_type: ChartType.HORIZONTAL_BAR,
    },
    {
      chart_id: 9,
      dashboard_id: 10,
      chart_type: ChartType.VERTICAL_BAR,
    },
    {
      chart_id: 10,
      dashboard_id: 10,
      chart_type: ChartType.HORIZONTAL_BAR,
    },
    {
      chart_id: 11,
      dashboard_id: 10,
      chart_type: ChartType.HORIZONTAL_BAR,
    },
  ],
};

const DashboardPage: NextPageWithLayout<DehydratedStateProps> = () => {
  const { projectName } = useUserContext();

  const [period, setPeriod] = useState(DataPeriod.PERIOD_60);

  const scorecardConfigs = MOCK_DASHBOARD_DATA.autoCharts.filter(
    (chart) => chart.chart_type === ChartType.SCORECARD
  );

  const chartCardConfigs = MOCK_DASHBOARD_DATA.autoCharts.filter(
    (chart) => chart.chart_type !== ChartType.SCORECARD
  );

  const handlePeriodChange = (option: Option<DataPeriod>) => {
    setPeriod(option.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-neon mb-4 text-4xl font-bold">{projectName}</div>
      <div className="display mb-4 flex w-full items-center justify-between text-2xl font-bold">
        Dashboard
        <ButtonGroup
          value={period}
          options={DataPeriodOptions}
          onClick={handlePeriodChange}
          isPersistentState
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {scorecardConfigs.map((config) => {
          return (
            <div
              key={config.chart_id}
              className="h-40 rounded-lg bg-slate-800/75 p-8 pt-6"
            >
              <ScoreCard chartId={config.chart_id} period={period} />
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {chartCardConfigs.map((config) => {
          return (
            <div
              key={config.chart_id}
              className="mb-2 h-96 rounded-lg bg-slate-800/75 p-8 pt-6"
            >
              <ChartCard
                chartId={config.chart_id}
                period={period}
                chartType={config.chart_type as ChartType}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

DashboardPage.getLayout = getPageLayout;

export default DashboardPage;

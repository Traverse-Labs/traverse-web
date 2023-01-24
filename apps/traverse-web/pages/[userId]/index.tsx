import { useState } from "react";
import {
  ButtonGroup,
  DehydratedStateProps,
  LoadingSpinner,
  NextPageWithLayout,
} from "ui";
import { Option } from "ui/types/Option.type";

import { useGetDashboardConfig } from "../../src/api/Dashboard.queries";
import ChartCard from "../../src/components/ChartCard";
import ScoreCard from "../../src/components/ScoreCard";
import { useUserContext } from "../../src/contexts/UserContext";
import { getPageLayout } from "../../src/layouts/Layout";
import { ChartType, DataPeriod, DataPeriodOptions } from "../../src/types";

const DashboardPage: NextPageWithLayout<DehydratedStateProps> = () => {
  const { projectName, defaultDashboard } = useUserContext();

  const [period, setPeriod] = useState(DataPeriod.PERIOD_60);

  const { data: dashboardConfig, isFetching } =
    useGetDashboardConfig(defaultDashboard);

  if (isFetching || !dashboardConfig) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <LoadingSpinner />
      </div>
    );
  }

  const scorecardConfigs = dashboardConfig.autoCharts.filter(
    (chart) => chart.chart_type === ChartType.SCORECARD
  );

  const chartCardConfigs = dashboardConfig.autoCharts.filter(
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

import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { Button, LoadingSpinner, Toggle } from "ui";

import {
  useDeleteChartMutation,
  useGetCharts,
} from "../../../src/api/Chart.queries";
import {
  useAddChartToDashboardMutation,
  useRemoveChartToDashboardMutation,
} from "../../../src/api/Dashboard.queries";
import { useUserContext } from "../../../src/contexts/UserContext";
import { getPageLayout } from "../../../src/layouts/Layout";
import { ChartTypeIcons } from "../../../src/types";
import { getChartExplanation } from "../../../src/utils";

const ChartPage = () => {
  const { userId, defaultDashboard } = useUserContext();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { projectName } = useUserContext();

  const {
    data: chartConfigs,
    isLoading: isLoadingCharts,
    isFetching: isFetchingCharts,
    refetch,
  } = useGetCharts();

  const handleDeleteSuccess = () => {
    refetch();
  };

  const { mutate: deleteChart, isLoading: isDeletingChart } =
    useDeleteChartMutation(handleDeleteSuccess);

  const { mutate: addChart } = useAddChartToDashboardMutation(
    `${defaultDashboard}`
  );

  const { mutate: removeChart } = useRemoveChartToDashboardMutation(
    `${defaultDashboard}`
  );

  const handleDeleteClick = (
    e: React.MouseEvent<SVGSVGElement>,
    chartId: string
  ) => {
    e.preventDefault();
    setDeletingId(chartId);
    deleteChart(chartId);
  };

  const createNewChartButton = (
    <Link href={`/${userId}/chart/new`}>
      <div>
        <Button variant="primary" classname="mb-4">
          Create New Chart
        </Button>
      </div>
    </Link>
  );

  const emptyDisplay = () => {
    if (chartConfigs && chartConfigs.length === 0) {
      return (
        <div className="flex h-80 w-full flex-col items-center justify-center gap-4 rounded-lg bg-slate-800/75">
          <div>
            You have not created any custom chart, create one now for your
            project!
          </div>
          {createNewChartButton}
        </div>
      );
    }

    return null;
  };

  const handleAddToDashboardToggle = (status: boolean, chartId: string) => {
    if (status) {
      addChart(chartId);
    } else {
      removeChart(chartId);
    }
  };

  const charts = (chartConfigs || []).map((config) => (
    <Link key={config.id} href={`/${userId}/chart/${config.id}`}>
      <div className="flex w-full cursor-pointer flex-col items-start justify-between gap-1 rounded-md bg-slate-800/75 py-4 px-6 transition hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 hover:ring-offset-slate-900">
        <div className="flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Toggle
              onChange={(status) =>
                handleAddToDashboardToggle(status, config.id)
              }
              defaultStatus={config.inDefaultDashboard}
            />
            Add to dashboard
          </div>
          <div className="relative w-10">
            {deletingId === config.id &&
            (isDeletingChart || isFetchingCharts) ? (
              <LoadingSpinner className="relative -right-2 w-10 flex-none text-slate-600" />
            ) : (
              <TrashIcon
                className="h-10 w-10 flex-none rounded-full p-2 text-slate-600 transition hover:bg-slate-900"
                onClick={(e) => handleDeleteClick(e, config.id)}
              />
            )}
          </div>
        </div>
        <div>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {ChartTypeIcons[config.chartType]}
              <div>{config.name}</div>
            </div>
            <div className="text-sm italic text-slate-400">
              {getChartExplanation(config)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-neon mb-4 text-4xl font-bold">{projectName}</div>
      <div className="mb-4 text-2xl font-bold">My Charts</div>
      {chartConfigs && chartConfigs.length > 0 && createNewChartButton}
      <div className="space-y-2">
        {isLoadingCharts ? (
          <LoadingSpinner
            className="text-slate-600"
            label={"Loading charts' information..."}
          />
        ) : (
          charts
        )}
        {emptyDisplay()}
      </div>
    </div>
  );
};

ChartPage.getLayout = getPageLayout;

export default ChartPage;

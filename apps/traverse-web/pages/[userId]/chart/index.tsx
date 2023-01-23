import { TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";
import { Button, LoadingSpinner } from "ui";

import {
  useDeleteChartMutation,
  useGetCharts,
} from "../../../src/api/Chart.queries";
import { useUserContext } from "../../../src/contexts/UserContext";
import { getPageLayout } from "../../../src/layouts/Layout";
import { ChartTypeIcons } from "../../../src/types";
import { getChartExplanation } from "../../../src/utils";

const ChartPage = () => {
  const { userId } = useUserContext();

  const [deletingId, setDeletingId] = useState<string | null>(null);

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

  const handleDeleteClick = (
    e: React.MouseEvent<SVGSVGElement>,
    chartId: string
  ) => {
    e.preventDefault();
    setDeletingId(chartId);
    deleteChart(chartId);
  };

  const charts = (chartConfigs || []).map((config) => (
    <Link key={config.id} href={`/${userId}/chart/${config.id}`}>
      <div className="flex cursor-pointer items-center justify-between gap-1 rounded-md bg-slate-800/75 py-4 px-6 transition hover:ring-2 hover:ring-teal-500 hover:ring-offset-2 hover:ring-offset-slate-900">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {ChartTypeIcons[config.chartType]}
            <div>{config.name}</div>
          </div>
          <div className="text-sm italic text-slate-400">
            {getChartExplanation(config)}
          </div>
        </div>
        <div className="relative w-10">
          {deletingId === config.id && (isDeletingChart || isFetchingCharts) ? (
            <LoadingSpinner className="relative -right-2 w-10 flex-none text-slate-600" />
          ) : (
            <TrashIcon
              className="h-10 w-10 flex-none rounded-full p-2 text-slate-600 transition hover:bg-slate-900"
              onClick={(e) => handleDeleteClick(e, config.id)}
            />
          )}
        </div>
      </div>
    </Link>
  ));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-4 text-3xl font-bold">My Charts</div>
      <Link href={`/${userId}/chart/new`}>
        <div>
          <Button variant="primary" classname="mb-4">
            Create New Chart
          </Button>
        </div>
      </Link>
      <div className="space-y-2">
        {isLoadingCharts ? (
          <LoadingSpinner
            className="text-slate-600"
            label={"Loading charts' information..."}
          />
        ) : (
          charts
        )}
      </div>
    </div>
  );
};

ChartPage.getLayout = getPageLayout;

export default ChartPage;

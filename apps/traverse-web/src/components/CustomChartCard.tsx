import { UseQueryResult } from "@tanstack/react-query";
import { LoadingSpinner, SeriesChartData } from "ui";
import { ObjectUtil } from "utils";

import { useGetContractChartData } from "../api/Contract.queries";
import { useUserContext } from "../contexts/UserContext";
import { ChartConfig, ChartTypeComponents, MetricOptions } from "../types";
import { getChartExplanation } from "../utils";

type Props = {
  config: ChartConfig;
};
const CustomChartCard = (props: Props) => {
  const { config } = props;

  const { programAddress } = useUserContext();

  const { data: chartData, isFetching } = useGetContractChartData(
    programAddress,
    config
  ) as UseQueryResult<SeriesChartData>;

  const ChartElement = ChartTypeComponents[config.chartType];

  return (
    <div className="relative h-full">
      {!chartData || isFetching ? (
        <LoadingSpinner className="text-slate-600" />
      ) : (
        <div className="relative flex h-full space-y-4">
          <div className="pb-4 text-slate-300">
            {config.name}{" "}
            <span className="text-sm text-slate-400">
              ({getChartExplanation(config)})
            </span>
          </div>
          <ChartElement
            data={{
              series: chartData.series,
              categories: chartData.categories,
            }}
            options={{
              seriesLabel: ObjectUtil.getLabelFromOptions(
                MetricOptions,
                config.metric
              ),
            }}
            className="absolute h-full w-full"
          />
        </div>
      )}
    </div>
  );
};

export default CustomChartCard;

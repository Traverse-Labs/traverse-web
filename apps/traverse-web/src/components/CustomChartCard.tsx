import { UseQueryResult } from "@tanstack/react-query";
import { LoadingSpinner, SeriesChartData } from "ui";

import { useGetContractChartData } from "../api/Contract.queries";
import { useUserContext } from "../contexts/UserContext";
import { ChartConfig, ChartTypeComponents } from "../types";

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
          <div className="text-slate-300">{config.name}</div>
          <ChartElement
            data={{
              series: chartData.series,
              categories: chartData.categories,
            }}
            options={{}}
            className="absolute h-full w-full"
          />
        </div>
      )}
    </div>
  );
};

export default CustomChartCard;

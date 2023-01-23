import { UseQueryResult } from "@tanstack/react-query";
import { ChartCardData, LoadingSpinner } from "ui";

import { useGetContractAutoAnalysisData } from "../api/Contract.queries";
import { useUserContext } from "../contexts/UserContext";
import { ChartType, ChartTypeComponents, DataPeriod } from "../types";

type Props = {
  chartId: number;
  chartType: ChartType;
  period: DataPeriod;
};
const ChartCard = (props: Props) => {
  const { chartId, chartType, period } = props;

  const { programAddress } = useUserContext();
  const { data: chartData, isFetching } = useGetContractAutoAnalysisData(
    programAddress,
    chartId,
    period
  ) as UseQueryResult<ChartCardData>;

  const ChartElement = ChartTypeComponents[chartType];

  return (
    <div className="relative h-full">
      {isFetching ? (
        <LoadingSpinner className="text-slate-600" />
      ) : (
        <div className="relative flex h-full space-y-4">
          <div className="text-slate-300">{chartData.name}</div>
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

export default ChartCard;

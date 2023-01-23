import { UseQueryResult } from "@tanstack/react-query";
import CountUp from "react-countup";
import { LoadingSpinner, ScoreCardData } from "ui";

import { useGetContractAutoAnalysisData } from "../api/Contract.queries";
import { useUserContext } from "../contexts/UserContext";
import { DataPeriod } from "../types";

type Props = {
  chartId: number;
  period: DataPeriod;
};
const ScoreCard = (props: Props) => {
  const { chartId, period } = props;

  const { programAddress } = useUserContext();
  const { data: scoreCardData, isLoading } = useGetContractAutoAnalysisData(
    programAddress,
    chartId,
    period
  ) as UseQueryResult<ScoreCardData>;

  return (
    <div className="h-full">
      {isLoading ? (
        <LoadingSpinner className="text-slate-600" />
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-4 lg:items-start">
          <div className="text-slate-400">{scoreCardData.name}</div>
          <div className="text-5xl font-bold text-teal-300">
            <CountUp
              end={scoreCardData.data as unknown as number}
              separator=","
              duration={1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;

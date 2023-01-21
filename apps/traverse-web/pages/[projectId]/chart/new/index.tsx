import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

import { useGetContractInstruction } from "../../../../src/api/Contract.queries";
import { ChartEdit } from "../../../../src/components/ChartEdit";
import { SUPPORTED_CONTRACT } from "../../../../src/constants";
import { getPageLayout } from "../../../../src/layouts/Layout";
import {
  ChartConfig,
  ChartType,
  DataPeriod,
  Metric,
} from "../../../../src/types";

const defaultConfig: ChartConfig = {
  name: "Untitled Chart",
  instructions: [],
  metric: Metric.U_WALLET,
  period: DataPeriod.PERIOD_7,
  chartType: ChartType.LINE,
  aggregate: undefined,
  groupBy: undefined,
};

interface IParams extends ParsedUrlQuery {
  projectId: string;
}

const NewChartPage = () => {
  const router = useRouter();
  const { projectId } = router.query as IParams;

  const contractAddress = SUPPORTED_CONTRACT[projectId];

  const { data: instructions } = useGetContractInstruction(contractAddress);

  const instructionOptions = (instructions || []).map((i) => ({
    value: i,
    label: i,
  }));

  return (
    <ChartEdit
      defaultConfig={defaultConfig}
      instructions={instructionOptions}
    />
  );
};

NewChartPage.getLayout = getPageLayout;

export default NewChartPage;

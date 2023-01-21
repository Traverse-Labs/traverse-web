import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { DehydratedStateProps } from "ui";

import { useGetChartConfig } from "../../../../src/api/Chart.queries";
import { useGetContractInstruction } from "../../../../src/api/Contract.queries";
import { ChartEdit } from "../../../../src/components/ChartEdit";
import { SUPPORTED_CONTRACT } from "../../../../src/constants";
import { getPageLayout } from "../../../../src/layouts/Layout";

interface IParams extends ParsedUrlQuery {
  chartId: string;
  projectId: string;
}

type Props = DehydratedStateProps;

const EditChartPage = (_props: Props) => {
  const router = useRouter();
  const { projectId, chartId } = router.query as IParams;

  const contractAddress = SUPPORTED_CONTRACT[projectId];

  const { data: config } = useGetChartConfig(chartId);

  const { data: instructions } = useGetContractInstruction(contractAddress);

  const instructionOptions = (instructions || []).map((i) => ({
    value: i,
    label: i,
  }));

  console.log(instructions);

  if (!config) {
    return null;
  }

  console.log(config);

  return <ChartEdit defaultConfig={config} instructions={instructionOptions} />;
};
//
// export const getStaticProps: GetStaticProps<Props> = async (context) => {
//   const { chartId } = context.params as IParams;
//
//   const queryClient = new QueryClient();
//
//   await queryClient.prefetchQuery({
//     queryKey: [CHART_CONFIG_QUERY_KEY, chartId],
//     queryFn: () => getChartConfig(chartId),
//   });
//
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: REVALIDATE_DURATION_IN_S,
//     fallback: PATH_FALLBACK,
//   };
// };

EditChartPage.getLayout = getPageLayout;

export default EditChartPage;

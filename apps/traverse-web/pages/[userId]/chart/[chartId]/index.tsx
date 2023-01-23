import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { DehydratedStateProps } from "ui";

import { useGetChartConfig } from "../../../../src/api/Chart.queries";
import { ChartEdit } from "../../../../src/components/ChartEdit";
import { getPageLayout } from "../../../../src/layouts/Layout";

interface IParams extends ParsedUrlQuery {
  chartId: string;
}

type Props = DehydratedStateProps;

const EditChartPage = (_props: Props) => {
  const router = useRouter();
  const { chartId } = router.query as IParams;

  const { data: config } = useGetChartConfig(chartId);

  if (!config) {
    return null;
  }

  return <ChartEdit defaultConfig={config} chartId={chartId} />;
};

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

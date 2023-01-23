import ChevronLeft from "@mui/icons-material/ChevronLeft";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
  Button,
  ButtonGroup,
  DropdownSelect,
  LoadingSpinner,
  MultiDropdownSelect,
  TextInput,
} from "ui";
import { Option } from "ui/types/Option.type";
import { ObjectUtil } from "utils";

import {
  useCreateChartMutation,
  useUpdateChartMutation,
} from "../api/Chart.queries";
import { useGetContractChartData } from "../api/Contract.queries";
import { useUserContext } from "../contexts/UserContext";
import {
  AggregationMethod,
  AggregationMethodOptions,
  ChartConfig,
  ChartType,
  ChartTypeComponents,
  ChartTypeOptions,
  DataPeriod,
  DataPeriodOptions,
  GroupByMethod,
  GroupByMethodOptions,
  Metric,
  MetricOptions,
} from "../types";
import { getChartExplanation } from "../utils";

type Props = {
  defaultConfig: ChartConfig;
  chartId?: string;
};

export const ChartEdit = (props: Props) => {
  const { defaultConfig, chartId } = props;

  const router = useRouter();

  const [chartName, setChartName] = useState(defaultConfig.name);

  const isNewChartPage = router.pathname === "/[userId]/chart/new";

  const saveButtonLabel = isNewChartPage ? "Create Chart" : "Save Changes";

  const [config, setConfig] = useState<ChartConfig>(defaultConfig);

  const { userId, instructions, contractAddress } = useUserContext();
  const handleSuccessCallback = () => {
    router.push(`/${userId}/chart`);
  };

  const { mutate: updateChart, isLoading: isUpdating } = useUpdateChartMutation(
    chartId,
    config,
    handleSuccessCallback
  );
  const { mutate: saveChart, isLoading: isCreating } = useCreateChartMutation(
    config,
    handleSuccessCallback
  );

  const saveButtonCallback = isNewChartPage ? saveChart : updateChart;
  const isSavingInProgress = isUpdating || isCreating;

  const { data: chartData, isFetching: isChartDataFetching } =
    useGetContractChartData(contractAddress, config);

  const instructionOptions = (instructions || []).map((i) => ({
    value: i,
    label: i,
  }));

  const handleInstructionsChange = (instructionOptions: Option<string>[]) => {
    const newInstructions = instructionOptions.map((io) => io.value);

    setConfig((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const handleGroupByChange = (option: Option<GroupByMethod | null>) => {
    setConfig((prev) => ({
      ...prev,
      groupBy: option.value,
      aggregate: option.value ? AggregationMethod.SUM : undefined,
    }));
  };

  const handleMetricChange = (option: Option<Metric>) => {
    setConfig((prev) => ({ ...prev, metric: option.value }));
  };

  const handlePeriodChange = (option: Option<DataPeriod>) => {
    setConfig((prev) => ({ ...prev, period: option.value }));
  };

  const handleChartTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setChartName(e.target.value);
  };

  const handleChartTypeChange = (option: Option<ChartType>) => {
    setConfig((prev) => ({ ...prev, chartType: option.value }));
  };

  const handleAggregationChange = (
    aggregationOption: Option<AggregationMethod | null>
  ) => {
    setConfig((prev) => ({ ...prev, aggregate: aggregationOption.value }));
  };

  const ChartElement = ChartTypeComponents[config.chartType];

  const handleSave = () => {
    const finalConfig = { ...config, name: chartName || "Untitled Chart" };

    saveButtonCallback(finalConfig);
  };

  return (
    <div className="mx-4 pt-4 pb-16 text-slate-300 sm:mx-0">
      <header>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="cursor-pointer text-slate-500">
            <Link href={`/${userId}/chart`}>
              <div className="relative -left-2 flex w-fit items-center gap-1 rounded-lg p-2 pr-4 transition hover:bg-slate-800/50">
                <ChevronLeft className="h-5 w-5" />
                <span>Back to My Charts</span>
              </div>
            </Link>
          </div>
          <h1 className="flex flex-col-reverse items-start gap-4 leading-tight tracking-tight sm:flex-row sm:items-center">
            <TextInput
              value={chartName}
              onChange={handleChartTitleChange}
              placeholder="Enter Chart Title..."
              classname="font-bold text-3xl -ml-2"
              variant="ghost"
            />
            <Button
              variant="primary"
              classname=""
              onClick={handleSave}
              isDisabled={config.instructions.length === 0}
            >
              {isSavingInProgress ? (
                <LoadingSpinner className="text-slate-50" label="Saving..." />
              ) : (
                <div className="flex items-center gap-2">
                  <SaveOutlined />
                  {saveButtonLabel}
                </div>
              )}
            </Button>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-none">
            <div className="space-y-4 rounded-md bg-slate-800/75 p-6 sm:p-8">
              <div>
                <div className="pb-1 text-lg font-bold">Events</div>
                <div className="text-sm text-slate-500">
                  Select the events you want to analyze
                </div>
              </div>
              <MultiDropdownSelect
                values={config.instructions}
                options={instructionOptions}
                onChange={handleInstructionsChange}
                placeholder="+ Add Event"
              />
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <div className="text-slate-400">...aggregated by</div>
                <DropdownSelect
                  value={config.aggregate}
                  options={AggregationMethodOptions}
                  placeholder="Select Method..."
                  onChange={handleAggregationChange}
                  isRemovable={!config.groupBy}
                />
              </div>
            </div>
            <div className="space-y-4 rounded-md bg-slate-800/75 p-6 sm:p-8">
              <div>
                <div className="pb-1 text-lg font-bold">User Group</div>
                <div className="text-sm text-slate-500">
                  Select the user group you want to analyze
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <div className="text-slate-400">...grouped by</div>
                <DropdownSelect
                  value={config.groupBy}
                  options={GroupByMethodOptions}
                  isRemovable
                  placeholder="Select User Group..."
                  onChange={handleGroupByChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <ButtonGroup
              value={config.metric}
              options={MetricOptions}
              onClick={handleMetricChange}
              isPersistentState
            />
            <div className="flex items-center gap-4">
              <DropdownSelect
                value={config.chartType}
                options={ChartTypeOptions}
                onChange={handleChartTypeChange}
                isChevronIconShown
              />
              <ButtonGroup
                value={config.period}
                options={DataPeriodOptions}
                onClick={handlePeriodChange}
                isPersistentState
              />
            </div>
          </div>
          <div className="w-full space-y-4 rounded-md bg-slate-800/75 py-8 px-4 sm:p-8">
            {config.instructions.length > 0 ? (
              <div>
                {chartData && !isChartDataFetching ? (
                  <div className="flex flex-col items-start justify-between gap-2 text-sm italic text-slate-400 sm:flex-row">
                    {getChartExplanation(config)}
                  </div>
                ) : null}
                <div className="relative h-96 w-full">
                  {chartData && !isChartDataFetching ? (
                    <ChartElement
                      data={chartData}
                      options={{
                        seriesLabel: ObjectUtil.getLabelFromOptions(
                          MetricOptions,
                          config.metric
                        ),
                      }}
                      className="absolute h-full w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-1 text-sm italic text-slate-500">
                      <LoadingSpinner />
                      Querying for latest contract information...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="italic text-slate-500">
                Please select at least 1 event...
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

import { ChangeEvent, useState } from "react";
import {
  Button,
  ButtonGroup,
  DropdownSelect,
  MultiDropdownSelect,
  TextInput,
} from "ui";
import { ObjectUtil } from "utils";

import { getPageLayout } from "../../../src/layouts/Layout";
import {
  AggregationMethod,
  AggregationMethodLabels,
  ChartConfig,
  ChartTypeComponents,
  ChartTypeLabels,
  ChartTypes,
  DataPeriodLabels,
  DataPeriods,
  GroupByMethodLabels,
  MetricLabels,
  Metrics,
} from "../../../src/types";

const MOCK_INSTRUCTIONS = [
  "Deposit",
  "Withdrawal",
  "Add Liquidity",
  "Remove Liquidity",
  "Transfer",
];

const MOCK_CHART_DATA = {
  series: [
    {
      name: "Deposit",
      values: [1, 52, 3, 154, 5, 6],
    },
    {
      name: "Withdrawal",
      values: [1, 56, 3, 234, 6, 45],
    },
  ],
  categories: ["22 Jul", "23 Jul", "24 Jul", "25 Jul", "26 Jul", "27 Jul"],
};

const defaultConfig: ChartConfig = {
  name: "Untitled Chart",
  instructions: [],
  metric: Metrics[0],
  period: DataPeriods[0],
  chartType: ChartTypes[0],
  aggregate: undefined,
  groupBy: undefined,
};

const NewChartPage = () => {
  const [config, setConfig] = useState(defaultConfig);

  const handleInstructionsChange = (instructions: string[]) => {
    setConfig((prev) => ({ ...prev, instructions }));
  };

  const handleGroupByChange = (
    _prev: keyof typeof AggregationMethodLabels,
    groupByLabel: keyof typeof AggregationMethodLabels
  ) => {
    const groupBy = ObjectUtil.getKeyByValue(GroupByMethodLabels, groupByLabel);

    setConfig((prev) => ({
      ...prev,
      groupBy,
      aggregate: groupBy ? "SUM" : undefined,
    }));
  };

  const handleMetricChange = (metricLabel: keyof typeof MetricLabels) => {
    const metric = ObjectUtil.getKeyByValue(MetricLabels, metricLabel);

    setConfig((prev) => ({ ...prev, metric }));
  };

  const handlePeriodChange = (periodLabel: keyof typeof DataPeriodLabels) => {
    const period = ObjectUtil.getKeyByValue(DataPeriodLabels, periodLabel);

    setConfig((prev) => ({ ...prev, period }));
  };

  const handleChartTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfig((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChartTypeChange = (
    _prev: keyof typeof AggregationMethodLabels,
    chartTypeLabel: keyof typeof AggregationMethodLabels
  ) => {
    const chartType = ObjectUtil.getKeyByValue(ChartTypeLabels, chartTypeLabel);

    setConfig((prev) => ({ ...prev, chartType }));
  };

  const chartExplanation = (
    <div className="space-y-2 px-4">
      <div className="text-slate-300">
        Daily {MetricLabels[config.metric]}{" "}
        {config.groupBy && (
          <span>by {`${GroupByMethodLabels[config.groupBy]}`}</span>
        )}{" "}
        (Last {DataPeriodLabels[config.period]})
      </div>
      <div className="text-xs text-slate-400">
        {config.instructions.join(", ")}
      </div>
    </div>
  );

  const handleAggregationChange = (
    _prev: AggregationMethod,
    aggregateLabel: keyof typeof AggregationMethodLabels
  ) => {
    const aggregate = ObjectUtil.getKeyByValue(
      AggregationMethodLabels,
      aggregateLabel
    );

    setConfig((prev) => ({ ...prev, aggregate }));
  };

  const ChartElement = ChartTypeComponents[config.chartType];

  return (
    <div className="mx-4 pt-4 pb-16 text-slate-300 sm:mx-0">
      <header>
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="cursor-pointer text-slate-500">
            {"<"} Back to Chart List
          </div>
          <h1 className="flex items-center gap-4 leading-tight tracking-tight">
            <TextInput
              value={config.name}
              onChange={handleChartTitleChange}
              placeholder="Enter Chart Title..."
              classname="font-bold text-3xl -ml-2"
              isTextOnly
            />
            <Button>Save</Button>
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
          <div className="grid w-full grid-rows-2 gap-4 sm:grid-cols-2 sm:grid-rows-none">
            <div className="space-y-4 rounded-md bg-slate-800 p-6 sm:p-8">
              <div>
                <div className="pb-1 text-lg font-bold">Contract Events</div>
                <div className="text-sm text-slate-500">
                  Select the events you want to analyze
                </div>
              </div>
              <MultiDropdownSelect
                options={MOCK_INSTRUCTIONS}
                onChange={handleInstructionsChange}
                placeholder="+ Add Event"
              />
              {config.instructions.length >= 2 && (
                <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                  <div className="text-slate-400">...aggregated by</div>
                  <DropdownSelect
                    options={Object.values(AggregationMethodLabels)}
                    placeholder="Select Method..."
                    onChange={handleAggregationChange}
                    isRemovable={!config.groupBy}
                    isResetOnRemove
                    value={AggregationMethodLabels[config.aggregate]}
                  />
                </div>
              )}
            </div>
            <div className="space-y-4 rounded-md bg-slate-800 p-6 sm:p-8">
              <div>
                <div className="pb-1 text-lg font-bold">User Group</div>
                <div className="text-sm text-slate-500">
                  Select the user group you want to analyze
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
                <div className="text-slate-400">...grouped by</div>
                <DropdownSelect
                  options={Object.values(GroupByMethodLabels)}
                  isRemovable
                  isResetOnRemove
                  placeholder="Select User Group..."
                  onChange={handleGroupByChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <ButtonGroup
              labels={Object.values(MetricLabels)}
              onClick={handleMetricChange}
              isPersistentState
            />
            <div className="flex items-center gap-4">
              <DropdownSelect
                options={Object.values(ChartTypeLabels)}
                defaultOption={ChartTypeLabels[ChartTypes[0]]}
                onChange={handleChartTypeChange}
                isChevronIconShown
              />
              <ButtonGroup
                labels={Object.values(DataPeriodLabels)}
                onClick={handlePeriodChange}
                isPersistentState
              />
            </div>
          </div>
          <div className="w-full space-y-4 rounded-md bg-slate-800 py-8 px-4 sm:p-8">
            <div className="flex flex-col items-start justify-between gap-2 sm:flex-row">
              {chartExplanation}
            </div>
            <div className="relative h-96 w-full">
              <ChartElement
                data={MOCK_CHART_DATA}
                options={{}}
                className="absolute h-full w-full"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

NewChartPage.getLayout = getPageLayout;

export default NewChartPage;

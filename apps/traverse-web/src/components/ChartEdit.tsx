import { ChangeEvent, useState } from "react";
import {
  Button,
  ButtonGroup,
  DropdownSelect,
  MultiDropdownSelect,
  TextInput,
} from "ui";
import { Option } from "ui/types/Option.type";

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

type Props = {
  defaultConfig: ChartConfig;
  instructions: Option<string>[];
};

// const MOCK_INSTRUCTIONS: Option<string>[] = [
//   {
//     value: "Deposit",
//     label: "Deposit",
//   },
//   {
//     value: "Withdrawal",
//     label: "Withdrawal",
//   },
//   {
//     value: "Add Liquidity",
//     label: "Add Liquidity",
//   },
//   {
//     value: "Remove Liquidity",
//     label: "Remove Liquidity",
//   },
//   {
//     value: "Transfer",
//     label: "Transfer",
//   },
// ];

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

export const ChartEdit = (props: Props) => {
  const { defaultConfig, instructions } = props;

  const [config, setConfig] = useState<ChartConfig>(defaultConfig);

  console.log(config);

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
    setConfig((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleChartTypeChange = (option: Option<ChartType>) => {
    setConfig((prev) => ({ ...prev, chartType: option.value }));
  };

  const chartExplanation = (
    <div className="space-y-2 px-4">
      <div className="text-slate-300">
        Daily {MetricOptions[config.metric]}{" "}
        {config.groupBy && (
          <span>by {`${GroupByMethodOptions[config.groupBy]}`}</span>
        )}{" "}
        (Last {DataPeriodOptions[config.period]})
      </div>
      <div className="text-xs text-slate-400">
        {config.instructions.join(", ")}
      </div>
    </div>
  );

  const handleAggregationChange = (
    aggregationOption: Option<AggregationMethod | null>
  ) => {
    setConfig((prev) => ({ ...prev, aggregate: aggregationOption.value }));
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
                values={config.instructions}
                options={instructions}
                onChange={handleInstructionsChange}
                placeholder="+ Add Event"
              />
              {config.instructions.length >= 2 && (
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

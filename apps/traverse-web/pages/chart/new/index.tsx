import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import {
  ButtonGroup,
  DropdownSelect,
  LineChart,
  MultiDropdownSelect,
} from "ui";
import { ObjectUtil } from "utils";

import { getPageLayout } from "../../../src/layouts/Layout";
import {
  AggregationMethod,
  AggregationMethodLabels,
  AggregationMethods,
  ChartConfig,
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
      values: [1, 2, 3, 4, 5, 6],
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
  aggregate: AggregationMethods[0],
  groupBy: undefined,
};

const NewChartPage = () => {
  const [config, setConfig] = useState(defaultConfig);

  const handleInstructionsChange = (instructions: string[]) => {
    setConfig((prev) => ({ ...prev, instructions }));
  };

  // const handleAggregationChange = (
  //   _prev: AggregationMethod,
  //   aggregateLabel: keyof typeof AggregationMethodLabels
  // ) => {
  //   const aggregate = ObjectUtil.getKeyByValue(
  //     AggregationMethodLabels,
  //     aggregateLabel
  //   );
  //
  //   setConfig((prev) => ({ ...prev, aggregate }));
  // };

  const handleGroupByChange = (
    _prev: AggregationMethod,
    groupByLabel: keyof typeof AggregationMethodLabels
  ) => {
    const groupBy = ObjectUtil.getKeyByValue(GroupByMethodLabels, groupByLabel);

    setConfig((prev) => ({ ...prev, groupBy }));
  };

  const handleMetricChange = (metricLabel: keyof typeof MetricLabels) => {
    const metric = ObjectUtil.getKeyByValue(MetricLabels, metricLabel);

    setConfig((prev) => ({ ...prev, metric }));
  };

  const handlePeriodChange = (periodLabel: keyof typeof DataPeriodLabels) => {
    const period = ObjectUtil.getKeyByValue(DataPeriodLabels, periodLabel);

    setConfig((prev) => ({ ...prev, period }));
  };

  console.log(config);

  return (
    <div className="pt-4 pb-16 text-slate-300">
      <header>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="flex items-center gap-4 text-3xl font-bold leading-tight tracking-tight">
            {config.name}
            <PencilSquareIcon className="h-5 w-5" />
          </h1>
        </div>
      </header>
      <main className="mx-4">
        <div className="mx-auto max-w-7xl space-y-4 sm:px-6 lg:px-8">
          <div className="w-full space-y-4 rounded-md bg-slate-800 p-8">
            <div>
              <div className="pb-1 text-lg font-bold">
                Contract Instruction Events
              </div>
              <MultiDropdownSelect
                options={MOCK_INSTRUCTIONS}
                onChange={handleInstructionsChange}
                placeholder="+ Add Event"
              />
            </div>
            {/*{config.instructions.length >= 2 && (*/}
            {/*  <div className="flex items-center gap-2">*/}
            {/*    <div>...aggregated by</div>*/}
            {/*    <DropdownSelect*/}
            {/*      options={Object.values(AggregationMethodLabels)}*/}
            {/*      placeholder="Select Agg Method..."*/}
            {/*      onChange={handleAggregationChange}*/}
            {/*      defaultOption={AggregationMethodLabels["SUM"]}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*)}*/}
            <div className="flex items-center gap-2">
              <div>...grouped by</div>
              <DropdownSelect
                options={Object.values(GroupByMethodLabels)}
                isRemovable
                isResetOnRemove
                placeholder="Select User Group..."
                onChange={handleGroupByChange}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <ButtonGroup
              labels={Object.values(MetricLabels)}
              onClick={handleMetricChange}
              isPersistentState
            />
            <ButtonGroup
              labels={Object.values(DataPeriodLabels)}
              onClick={handlePeriodChange}
              isPersistentState
            />
          </div>
          <div className="w-full space-y-4 rounded-md bg-slate-800 p-8">
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
            <LineChart
              data={MOCK_CHART_DATA}
              options={{
                height: 500,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

NewChartPage.getLayout = getPageLayout;

export default NewChartPage;

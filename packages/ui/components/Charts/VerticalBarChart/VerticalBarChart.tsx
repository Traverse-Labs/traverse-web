import "../Highcharts/HighchartsSetup";

import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { mergeDeepRight } from "ramda";
import React, { forwardRef } from "react";
import colors from "tailwindcss/colors";

import { chartPaletteLight, FontSizes } from "../../../styles";
import { ChartRef, SeriesChartData } from "../../../types";

export type VerticalBarChartProps = {
  className?: string;
  data: SeriesChartData;
  options?: {
    title?: string;
    categoryLabel?: string;
    seriesLabel?: string;
    formatY?: string;
    tooltipPointFormat?: string;
    height?: number;
    isMarkerShown?: boolean;
    isLegendShown?: boolean;
    customOptions?: object;
    isSharedTooltip?: boolean;
  };
};

const defaultOptions = {
  tooltipPointFormat: `{series.name}: <b>{point.y}</b>`,
  isMarkerShown: false,
  isLegendShown: true,
  customOptions: {},
  isSharedTooltip: true,
};

const VerticalBarChart = forwardRef<ChartRef, VerticalBarChartProps>(
  (props: VerticalBarChartProps, ref) => {
    const { className, data, options } = props;

    const {
      categoryLabel,
      seriesLabel,
      title,
      height,
      formatY,
      isMarkerShown,
      isLegendShown,
      customOptions,
      isSharedTooltip,
    } = { ...defaultOptions, ...options };

    const seriesData = data.series.map((s, i) => {
      return {
        name: s.name,
        data: s.values,
        type: "column",
        color: chartPaletteLight[i],
      };
    });

    const hcOptions = {
      chart: {
        type: "column",
        marginTop: !title ? 32 : undefined,
        height,
        marginLeft: 50,
        backgroundColor: colors.slate[800],
      },
      plotOptions: {
        series: {
          marker: {
            enabled: isMarkerShown,
            radius: 3,
          },
          boostThreshold: 2000,
          animation: {
            duration: 1000,
          },
          borderColor: colors.slate[900],
        },
      },
      title: {
        text: title,
        align: "left",
        style: {
          color: colors.slate[50],
          fontSize: FontSizes.size14,
        },
        margin: 40,
      },
      xAxis: {
        categories: data.categories,
        title: {
          text: categoryLabel,
        },
        crosshair: {
          color: colors.slate[700],
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: seriesLabel,
          style: {
            textAnchor: "start",
          },
          rotation: 0,
          align: "high",
          y: -20,
          x: -30,
        },
        labels: {
          reserveSpace: false,
          ...(formatY ? { format: formatY } : {}),
        },
        gridLineColor: colors.slate[700],
      },
      tooltip: {
        shared: isSharedTooltip,
      },
      legend: {
        enabled: isLegendShown,
      },
      series: seriesData,
    };

    return (
      <HighchartsReact
        ref={ref}
        allowChartUpdate={false}
        containerProps={{ className }}
        highcharts={Highcharts}
        options={mergeDeepRight(hcOptions, customOptions)}
      />
    );
  }
);

VerticalBarChart.displayName = "VerticalBarChart";

export default VerticalBarChart;

import * as Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";
import HighchartsReact from "highcharts-react-official";
import { mergeDeepRight } from "ramda";
import React, { forwardRef } from "react";
import colors from "tailwindcss/colors";

import { chartPaletteLight, FontSizes } from "../../../styles";
import { ChartRef, SeriesChartData } from "../../../types";
import { HighchartsDefaults } from "../Highcharts";

if (typeof window !== "undefined") {
  Boost(Highcharts);

  Highcharts.setOptions(HighchartsDefaults);

  // @ts-ignore
  // eslint-disable-next-line import/namespace
  const seriesTypes = Highcharts.seriesTypes;

  seriesTypes.line.prototype.drawLegendSymbol =
    seriesTypes.column.prototype.drawLegendSymbol;
}

type LineChartProps = {
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
  height: 300,
  isMarkerShown: false,
  isLegendShown: true,
  customOptions: {},
  isSharedTooltip: true,
};

const LineChart = forwardRef<ChartRef, LineChartProps>(
  (props: LineChartProps, ref) => {
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
        type: "line",
        color: chartPaletteLight[i],
      };
    });

    const hcOptions = {
      chart: {
        type: "line",
        marginLeft: 50,
        marginTop: !title ? 32 : undefined,
        height,
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

LineChart.displayName = "LineChart";

export default LineChart;

export type SeriesChartData = {
  series: {
    name?: string;
    values: number[];
  }[];
  categories: string[];
};

export type ScoreCardData = {
  name: string;
  data: string;
};

export type ChartCardData = {
  name: string;
  series: {
    name?: string;
    values: number[];
  }[];
  categories: string[];
};

export type ChartRef = {
  chart: Highcharts.Chart;
  container: React.RefObject<HTMLDivElement>;
};

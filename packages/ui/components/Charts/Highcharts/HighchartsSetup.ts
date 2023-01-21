import * as Highcharts from "highcharts";
import Boost from "highcharts/modules/boost";

import { HighchartsDefaults } from "./index";

if (typeof window !== "undefined") {
  Boost(Highcharts);

  Highcharts.setOptions(HighchartsDefaults);

  // @ts-ignore
  // eslint-disable-next-line import/namespace
  const seriesTypes = Highcharts.seriesTypes;

  seriesTypes.line.prototype.drawLegendSymbol =
    seriesTypes.column.prototype.drawLegendSymbol;
}

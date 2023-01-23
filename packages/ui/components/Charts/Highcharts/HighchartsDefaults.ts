import colors from "tailwindcss/colors";

import { FontSizes } from "../../../styles";

const HighchartsDefaults = {
  lang: {
    thousandsSep: ",",
    numericSymbols: ["K", "M", "B", "T"],
    rangeSelectorZoom: "Zoom",
  },

  plotOptions: {
    series: {
      marker: {
        radius: 3,
      },
      boostThreshold: 2000,
      animation: {
        duration: 1000,
      },
      borderColor: "transparent",
    },
  },

  title: {
    align: "left",
    style: {
      color: colors.slate[50],
      fontSize: FontSizes.size14,
    },
    margin: 40,
  },

  chart: {
    backgroundColor: `transparent`,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  },

  xAxis: {
    title: {
      style: {
        color: colors.slate[50],
        fontWeight: "bold",
      },
    },
    labels: {
      style: {
        color: colors.slate[400],
      },
    },
    crosshair: {
      color: colors.slate[700],
    },
  },

  yAxis: {
    title: {
      style: {
        color: colors.slate[400],
      },
    },
    labels: {
      style: {
        color: colors.slate[400],
      },
    },
    gridLineColor: colors.slate[700],
  },

  tooltip: {
    useHTML: true,
    outside: true,
    borderWidth: 0,
  },

  legend: {
    itemStyle: {
      color: colors.slate[400],
    },
    itemHoverStyle: {
      color: colors.slate[50],
    },
  },

  credits: {
    enabled: false,
  },
};

export default HighchartsDefaults;

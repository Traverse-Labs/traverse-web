import colors from "tailwindcss/colors";

const HighchartsDefaults = {
  lang: {
    thousandsSep: ",",
    numericSymbols: ["K", "M", "B", "T"],
    rangeSelectorZoom: "Zoom",
  },

  chart: {
    backgroundColor: colors.slate[800],
    style: {
      fontFamily: "Noto Sans, sans-serif",
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
  },

  yAxis: {
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

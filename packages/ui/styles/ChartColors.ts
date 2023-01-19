const chartColors = {
  red1: "#E35E5D",
  red2: "#e59797",
  lightGrey: "#D9E4E6",
  green1: "#6EA175",
  green2: "#93D09B",
  blue1: "#00679e",
  blue2: "#6DB4BB",
  yellow: "#FFD899",
};

export const chartPaletteLight = [
  "#33b1ff",
  "#fa4d56",
  "#d2a106",
  "#8a3ffc",
  "#007d79",
  "#ff7eb6",
  "#ba4e00",
  "#bae6ff",
  "#d4bbff",
  "#fff1f1",
];

export const sankeyColors = {
  main: chartColors.yellow,
  nodes: chartPaletteLight,
};

export const getSankeyColors = (mainColorIndex: number): string[] => [
  ...sankeyColors.nodes.slice(0, mainColorIndex),
  sankeyColors.main,
  ...sankeyColors.nodes.slice(mainColorIndex + 1, sankeyColors.nodes.length),
];

export default chartColors;

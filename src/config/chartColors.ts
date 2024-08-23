type ChartThemes = {
  [key: string]: { colors: string[]; grid: string };
};
const chartColors: ChartThemes = {
  light: { colors: ["#FFB067", "#FF7077", "#ACEEF3"], grid: "#d1d1d1" },
  dark: { colors: ["#FFA384", "#EFE7BC", "#74BDCB"], grid: "#393939" },
  "catppuccin-mocha": {
    colors: ["#fab387", "#74c7ec", "#cba6f7", "#b4befe", "#a6e3a1"],
    grid: "#313244",
  },
};

export const getChartColors = () => {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const localStorageTheme = localStorage.getItem("vite-ui-theme");
  const theme = localStorageTheme
    ? localStorageTheme
    : systemTheme.matches
      ? "dark"
      : "light";

  return chartColors[theme];
};

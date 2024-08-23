import "chart.js/auto";
import { Pie } from "react-chartjs-2";

export default function PieChart({
  data,
  colors,
}: {
  data: { name: string; count: number }[];
  colors?: string[];
}) {
  const sourceData = {
    labels: data.map((source) => source.name),
    datasets: [
      {
        label: " Count",
        data: data.map((source) => source.count),
        backgroundColor: colors || ["salmon", "pink", "coral"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <Pie
      data={sourceData}
      options={{ plugins: { legend: { position: "bottom" } } }}
    />
  );
}

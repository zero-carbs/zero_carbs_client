import { Bar } from "react-chartjs-2";
import CardWrapper from "@/components/CardWrapper";
import { formatPrice, convertCentsToDollars } from "@/lib/utils";

export default function MonthlySalesBarChart({
  salesData,
  colors,
  gridColor,
}: {
  salesData: { name: string; value: number }[];
  colors: string[];
  gridColor: string;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    elements: {
      bar: {
        borderRadius: 2,
        inflateAmount: 0.3,
      },
    },
    plugins: {
      legend: { position: "bottom" as const },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            return (label += formatPrice(convertCentsToDollars(context.raw)));
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
      },
      y: {
        grid: { color: gridColor },
        grace: "10%",
        type: "linear" as const,
        display: true,
        position: "left" as const,
        yAxisId: "y",
        ticks: {
          callback: (value: string | number) =>
            formatPrice(convertCentsToDollars(Number(value))),
        },
      },
    },
  };

  const sourceData = {
    labels: months,
    datasets: [
      {
        label: " Sales",
        data: salesData.map((data) => data.value),
        backgroundColor: colors[0] || ["salmon"],
        borderColor: colors[0] || ["salmon"],
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  return (
    <CardWrapper
      title="Sales: 2024"
      content={<Bar data={sourceData} options={options} />}
    />
  );
}

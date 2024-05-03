import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "FigTree";

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        // Custom callback function to format labels
        callback: (value: number | string) => value,
      },
    },
  },
  datasets: {
    bar: {
      borderRadius: 25,
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
      align: "start",
      labels: {
        boxWidth: 15,
        useBorderRadius: true,
        borderRadius: 2,
      },
    },
    title: {
      display: true,
      align: "start",
      text: "Activity",
    },
  },
};

const labels: string[] = [
  "23-04-2024",
  "24-04-2024",
  "25-04-2024",
  "26-04-2024",
  "27-04-2024",
  "28-04-2024",
  "29-04-2024",
];
const avgCheckInData: number[] = [1200, 4500, 8700, 6448, 1000, 7888, 3000];

const data: ChartData<"line"> = {
  labels,
  datasets: [
    {
      label: "Avg Check In",
      data: avgCheckInData,
      borderColor: "#0a8686",
      backgroundColor: "rgba(10,134,134,0.5)",
      borderWidth: 1,
    },
  ],
};

const DashboardAvgCheckInChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-h-80 min-w-[500px] max-w-[500px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardAvgCheckInChart;

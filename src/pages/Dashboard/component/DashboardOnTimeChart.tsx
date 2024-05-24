import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  BarElement,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "Poppins";

const options: ChartOptions<"bar"> = {
  responsive: true,
  datasets: {
    bar: {
      borderRadius: 50,
      barThickness: 20,
    },
  },
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
  "2-04-2024",
];

const onTimeData: number[] = [8, 4, 8, 6, 10, 7, 3];
const lateData: number[] = [4, 6, 1, 7, 2, 5, 12];

const data: ChartData<"bar"> = {
  labels,
  datasets: [
    {
      label: "Late",
      data: lateData,
      borderColor: "#ff8c00",
      backgroundColor: "rgba(255,140,0,0.5)",
      borderWidth: 1,
    },
    {
      label: "On Time",
      data: onTimeData,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      borderWidth: 1,
      borderRadius: 50,
    },
  ],
};

const DashboardOnTimeChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-h-80 min-w-[500px] max-w-[500px]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default DashboardOnTimeChart;

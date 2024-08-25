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
import { useGetAverageCheckOutOfTheWeekQuery } from "../common/dashboard-api";
import { convertToHM } from "../../../utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "Poppins";

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
        callback: (value: number | string) => convertToHM(value),
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

const DashboardAvgCheckoutChart = () => {
  const { data: avgCheckOutOfTheWeekData } =
    useGetAverageCheckOutOfTheWeekQuery();

  const data: ChartData<"line"> = {
    labels: avgCheckOutOfTheWeekData?.dates || [],
    datasets: [
      {
        label: "Avg Check Out",
        data: avgCheckOutOfTheWeekData?.avgTimes || [],
        borderColor: "#0a8686",
        backgroundColor: "rgba(10,134,134,0.5)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-h-80 max-w-[500px] min-w-[500px] ">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardAvgCheckoutChart;

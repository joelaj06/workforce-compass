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
import { useGetAverageCheckInOfTheWeekQuery } from "../common/dashboard-api";
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

const DashboardAvgCheckInChart = () => {
  const { data: avgCheckInOfTheWeekData } =
    useGetAverageCheckInOfTheWeekQuery();

  const data: ChartData<"line"> = {
    labels: avgCheckInOfTheWeekData?.dates || [],
    datasets: [
      {
        label: "Avg Check In",
        data: avgCheckInOfTheWeekData?.avgTimes || [],
        borderColor: "#0a8686",
        backgroundColor: "rgba(10,134,134,0.5)",
        borderWidth: 1,
      },
    ],
  };
  console.log(avgCheckInOfTheWeekData);

  console.log(data);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 max-h-80 min-w-[500px] max-w-[500px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default DashboardAvgCheckInChart;

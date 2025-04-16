'use client'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartAdmin = () => {
  // Dữ liệu cho biểu đồ
  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Students",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Teachers",
        data: [8, 15, 6, 10, 4, 7],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Companies",
        data: [5, 10, 8, 12, 6, 9],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  // Tùy chọn cho biểu đồ
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Data Overview",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ChartAdmin;
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function CountryChart({ data }) {
  const labels = data.map((item) => item.country);
  const values = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Phishing Events",
        data: values,
        backgroundColor: [
          "#4F46E5",
          "#EF4444",
          "#10B981",
          "#F59E0B",
          "#3B82F6",
          "#8B5CF6",
          "#EC4899",
        ],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
      title: {
        display: true,
        text: "Phishing by Country",
        color: "#ffffff",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      y: {
        ticks: {
          color: "#ffffff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div style={{ marginTop: "20px" }}>
    <h2>Phishing by Country</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

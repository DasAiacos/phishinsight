import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
} from "chart.js";
import "chartjs-adapter-date-fns";

import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
);

export default function RecentChart({ data }) {
  const sorted = [...data].sort(
    (a, b) => new Date(a.date_detected) - new Date(b.date_detected)
  );

  const chartData = {
    datasets: [
      {
        label: "Risk Score",
        data: sorted.map((item) => ({
          x: new Date(item.date_detected),
          y: item.score,
        })),
        borderColor: "#EF4444",
        backgroundColor: "rgba(239, 68, 68, 0.3)",
        pointRadius: 4,
        tension: 0.01,
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
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const item = sorted[ctx.dataIndex];
            return [
              `Score: ${item.score}`,
              `Country: ${item.country_code}`,
              `Domain: ${item.domain}`,
            ];
          },
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
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
    <div style={{ marginTop: "30px" }}>
      <h2>Recent Phishing Events</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}
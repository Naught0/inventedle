import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
);

const labels = ["1", "2", "3", "4", "5", "X"];

export function GuessStatsChart({
  numGuesses,
}: {
  numGuesses?: Record<string, number>;
}) {
  return (
    <div className="grid w-full">
      <h4 className="text-center text-lg">Global Stats</h4>
      <Bar
        options={{
          indexAxis: "y",
          responsive: true,
          scales: {
            y: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#aaa",
                font: {
                  family: "JetBrains Mono",
                  size: 16,
                  weight: "bolder",
                },
              },
            },
            x: {
              ticks: {
                color: "#aaa",
                stepSize: 1,
                font: {
                  family: "JetBrains Mono",
                  size: 16,
                  weight: "bolder",
                },
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        }}
        data={{
          labels,
          datasets: [
            {
              borderRadius: 5,
              label: "Number of Guesses",
              data: labels.map(
                (l) => numGuesses?.[l as keyof typeof numGuesses] ?? 0,
              ),
              backgroundColor: "#f56bb0",
            },
          ],
        }}
      />
    </div>
  );
}

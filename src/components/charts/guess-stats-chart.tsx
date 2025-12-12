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

export function GuessStatsChart({
  numGuesses,
}: {
  numGuesses: Record<string, number>;
}) {
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
  );
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
                display: false,
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
        }}
        data={{
          labels: Object.keys(numGuesses),
          datasets: [
            {
              borderRadius: 5,
              label: "Number of Guesses",
              data: Object.values(numGuesses),
              backgroundColor: "#f56bb0",
            },
          ],
        }}
      />
    </div>
  );
}

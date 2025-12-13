import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  ChartDataLabels,
);

const labels = ["1", "2", "3", "4", "5", "X"];

function getPercentOfTotal(num: number, numGuesses: Record<string, number>) {
  const total = Object.values(numGuesses).reduce((a, b) => a + b, 0);
  return (num / total) * 100;
}

export function GuessStatsChart({
  numGuesses,
  title = "Global stats",
}: {
  numGuesses?: Record<string, number>;
  title?: string;
}) {
  if (!numGuesses) return null;

  return (
    <div className="bg-accent grid w-full rounded-lg p-3 lg:p-5">
      <h4 className="text-center text-xl font-extralight uppercase">{title}</h4>
      <div className="relative max-h-[300px] w-full">
        <Bar
          className=""
          plugins={[ChartDataLabels]}
          height={400}
          options={{
            maintainAspectRatio: true,
            responsive: true,
            indexAxis: "y",
            scales: {
              y: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  z: 1,
                  color: "#aaa",
                  font: {
                    family: "JetBrains Mono",
                    size: 16,
                    weight: "bolder",
                  },
                },
              },
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  display: false,
                  z: 1,
                  color: "#aaa",
                  stepSize: 1,
                  font: {
                    family: "JetBrains Mono",
                    size: 16,
                    weight: "bolder",
                  },
                },
              },
            },
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
              datalabels: {
                clamp: true,
                formatter(value) {
                  if (value === 0) {
                    return "";
                  }
                  return `${value} (${getPercentOfTotal(
                    value,
                    numGuesses,
                  ).toFixed()}%)`;
                },
                color: (props) => {
                  const value = props.dataset.data[props.dataIndex];
                  if (value === 0) {
                    return "#cfcfcf";
                  }
                  return "#2e2e2e";
                },
                font: {
                  family: "JetBrains Mono",
                  size: 15,
                  weight: "bolder",
                },
              },
            },
          }}
          data={{
            labels,
            datasets: [
              {
                borderRadius: 4,
                label: "Number of Guesses",
                data: labels.map(
                  (l) => numGuesses?.[l as keyof typeof numGuesses] ?? 0,
                ),
                backgroundColor: (props) => {
                  const value = props.dataset.data[props.dataIndex];
                  if (value === 0) {
                    return "hsl(333 16% 21%)";
                  }
                  return "#f56bb0";
                },
                maxBarThickness: 50,
                minBarLength: 80,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

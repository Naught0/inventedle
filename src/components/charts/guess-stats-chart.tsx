"use client";
import {
  Bar,
  BarChart,
  YAxis,
  XAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";

function getPercentOfTotal(num: number, numGuesses: Record<string, number>) {
  const total = Object.values(numGuesses).reduce((a, b) => a + b, 0);
  return (num / total) * 100;
}

export function GuessStatsChart({
  numGuesses,
  title = "Global",
}: {
  numGuesses?: Record<string, number>;
  title?: string;
}) {
  if (!numGuesses) return null;

  return (
    <ChartContainer title={title}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          margin={{ top: 10, bottom: 0, right: 0, left: 0 }}
          width="100%"
          height="100%"
          data={Object.entries(numGuesses).map(([label, value]) => ({
            label,
            value,
            barLabel:
              value !== 0
                ? `${value}(${getPercentOfTotal(value, numGuesses).toFixed(0)}%)`
                : "",
          }))}
          responsive
        >
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: "#eee" }}
            fontSize={18}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            padding={{ top: 0, bottom: 0 }}
            width={32}
          />
          <XAxis
            type="number"
            dataKey={"value"}
            padding={{ left: 0, right: 0 }}
            domain={[0, (dataMax) => dataMax * 1.3]}
            hide
          />
          <Bar
            dataKey="value"
            fill="#f56bb0"
            activeBar={{ fill: "hsl(333, 78%, 60%)" }}
            radius={[0, 5, 5, 0]}
          >
            <LabelList
              position="right"
              dataKey="barLabel"
              className="fill-foreground text-sm font-bold md:text-base"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

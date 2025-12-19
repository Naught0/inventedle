import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";

const SimpleBarChart = () => {
  return (
    <ChartContainer title={"Friend Stats"}>
      <ResponsiveContainer className={"w-[512px]"}>
        <BarChart
          layout="vertical"
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          responsive
          data={[
            { label: "1", foo: 180 },
            { label: "2", foo: 100 },
            { label: "3", foo: 50 },
            { label: "4", foo: 500 },
            { label: "5", foo: 300 },
            { label: "X", foo: 300 },
          ]}
        >
          <YAxis
            type="category"
            dataKey="label"
            tick={{ fill: "#eee" }}
            tickLine={false}
            axisLine={false}
          />
          <XAxis type="number" dataKey={"foo"} hide />
          <Bar
            dataKey="foo"
            fill="#f56bb0"
            activeBar={{ fill: "hsl(333, 78%, 60%)" }}
            radius={[0, 5, 5, 0]}
            minPointSize={10}
          >
            <LabelList
              dataKey="foo"
              position="inside"
              className="fill-foreground font-bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default SimpleBarChart;

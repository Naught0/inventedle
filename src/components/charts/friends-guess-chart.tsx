import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LabelList,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer } from "./chart-container";
import { FriendGuessChartResults } from "@/db/server-only";
import Image from "next/image";
import { Stack } from "../ui/stack";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverArrow, PopoverContent } from "@radix-ui/react-popover";

export function FriendsGuessChartAlt({
  data,
}: {
  data?: FriendGuessChartResults;
}) {
  return (
    <ChartContainer title="Friend Stats">
      <Stack className="flex flex-col gap-6">
        {Object.entries(data ?? {}).map(([label, result]) => (
          <Stack key={label} className="gap-4" horizontal>
            <span className="w-fit text-xl font-bold">{label}</span>
            <div className="inline-flex w-full items-center gap-2">
              {result
                .filter((r) => !!r.user)
                .map((r) => (
                  <FriendBubble key={r.id} data={r.user!} />
                ))}
            </div>
          </Stack>
        ))}
      </Stack>
    </ChartContainer>
  );
}

export function FriendsGuessChart({
  data,
}: {
  data?: FriendGuessChartResults;
}) {
  const totalResults = Object.values(data ?? {}).reduce(
    (a, b) => a + b.length,
    0,
  );
  const chartData = Object.entries(data ?? {}).map(([label, result]) => ({
    label,
    value: result.length,
    barLabel: result.length
      ? `${result.length} (${((result.length / totalResults) * 100).toFixed(2)}%)`
      : "",
    friends: result.map((r) => r.user),
  }));
  return (
    <ChartContainer title={"Friend Stats"}>
      <ResponsiveContainer className={"pr-12"}>
        <BarChart
          layout="vertical"
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          responsive
          width="100%"
          height="100%"
          data={chartData}
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
          />
          <XAxis
            type="number"
            dataKey={"value"}
            padding={{ left: 0, right: 0 }}
            hide
          />
          <Bar
            dataKey="value"
            fill="#f56bb0"
            activeBar={{ fill: "hsl(333, 78%, 60%)" }}
            radius={[0, 5, 5, 0]}
          >
            {chartData.map((d) => (
              <div key={d.label} className="flex items-center gap-2">
                <LabelList
                  position="outside"
                  className="fill-foreground font-bold"
                  content={
                    <FriendBubble
                      data={
                        d.friends[0] ?? { id: "", name: "Test", image: null }
                      }
                    />
                  }
                />
              </div>
            ))}
            <LabelList
              position="insideRight"
              dataKey="barLabel"
              className="fill-foreground font-bold"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

function renderFriendBubbles({
  friends,
}: {
  friends: FriendGuessChartResults[string][number]["user"][];
}) {
  return (
    <div className="flex items-center gap-2">
      {friends
        .filter((f) => !!f)
        .map((f) => (
          <div key={f.id} className="flex items-center gap-2">
            {f.image ? (
              <FriendBubble data={f} />
            ) : (
              <PlaceholderImage name={f.name} />
            )}
          </div>
        ))}
    </div>
  );
}

function FriendBubble({
  data,
}: {
  data: NonNullable<FriendGuessChartResults[string][number]["user"]>;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <div className="flex items-center gap-2">
          {data.image ? (
            <Image
              src={data.image}
              width={32}
              height={32}
              alt={`${data.name} profile picture`}
              className="border-foreground rounded-full border-2 shadow"
            />
          ) : (
            <PlaceholderImage name={data.name} />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-primary-dark rounded-md px-4 py-2">
        <PopoverArrow />
        {data.name}
      </PopoverContent>
    </Popover>
  );
}

function PlaceholderImage({ name }: { name: string }) {
  return (
    <div className="border-primary-foreground bg-primary text-primary-foreground flex size-4 items-center justify-center gap-2 rounded-full">
      <span>{name[0].toUpperCase()}</span>
    </div>
  );
}

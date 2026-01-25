import { BarChart, Bar, XAxis, YAxis, LabelList, LabelProps } from "recharts";
import { ChartContainer } from "./chart-container";
import { FriendGuessChartResults } from "@/actions/server-only";
import Image from "next/image";
import { Stack } from "../ui/stack";
import { useState } from "react";
import Link from "next/link";

export function FriendsGuessChartAlt({
  data,
}: {
  data?: FriendGuessChartResults;
}) {
  return (
    <ChartContainer title="Friend Stats">
      <Stack className="flex flex-col gap-6">
        {Object.entries(data ?? {}).map(([label, result]) => (
          <Stack key={label} className="gap-3" horizontal>
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
      ? `${result.length}(${((result.length / totalResults) * 100).toFixed(0)}%)`
      : "",
    friends: result.map((r) => r.user),
  }));
  return (
    <ChartContainer title={"Friends"}>
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
            dataKey={(data) => data.friends}
            className="fill-foreground font-bold"
            content={<FriendBubbleLabel />}
          />
          <LabelList
            position="right"
            dataKey="barLabel"
            className="fill-foreground text-sm font-bold md:text-base"
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

function FriendBubbleLabel(props: LabelProps) {
  const value = props.value as unknown as StatFriend[];
  const [hover, setHover] = useState(false);
  return (
    <foreignObject
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="fade-in flex w-full items-center justify-start px-1.5 py-1">
        {value
          .filter((f) => !!f)
          .slice(0, 5)
          .map((f) => (
            <span
              key={f.id}
              className={`transition-all ${hover ? "mr-1" : "-mr-4 lg:-mr-3"}`}
            >
              <FriendBubble data={f} />
            </span>
          ))}
      </div>
    </foreignObject>
  );
}

type StatFriend = NonNullable<FriendGuessChartResults[string][number]["user"]>;

function FriendBubble({ data }: { data: StatFriend }) {
  return (
    <Link href={`/stats/${data.id}`} prefetch={false}>
      <div className="flex items-center gap-2">
        {data.image ? (
          <Image
            src={data.image}
            width={32}
            height={32}
            alt={`${data.name} profile picture`}
            title={data.name}
            className="border-foreground rounded-full border-2 shadow-md"
          />
        ) : (
          <PlaceholderImage name={data.name} />
        )}
      </div>
    </Link>
  );
}

function PlaceholderImage({ name }: { name: string }) {
  return (
    <div className="text-primary-foreground flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-300">
      <span className="font-extrabold">{name[0].toUpperCase()}</span>
    </div>
  );
}

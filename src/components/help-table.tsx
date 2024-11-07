import { PiArrowFatDownFill, PiArrowFatUpFill } from "react-icons/pi";
import { formatYear } from "./game/utils";
import type { GameRule } from "./game/types";

function Square({ className }: { className: string }) {
  return <div className={`${className} h-6 w-6 rounded`} />;
}

const getBg = (idx: number) => {
  const colors = [
    "bg-emerald-600/50",
    "bg-yellow-600/50",
    "bg-orange-500/50",
    "bg-destructive/50",
  ];

  return colors[idx % colors.length];
};

export function HelpTable({ rules }: { rules: GameRule[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr>
            <th className="bg-background sticky left-0 py-3 text-left">
              <div className="inline-flex gap-2">Year</div>
            </th>
            <th>
              <div className="inline-flex gap-2">
                <Square className="bg-emerald-600" /> Win
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2">
                <Square className="bg-closeYellow" /> Close
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2">
                <Square className="bg-orange-500" /> Warmer
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2">
                <Square className="bg-destructive" /> Far
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, idx) => (
            <tr key={`${JSON.stringify(rule)}`}>
              <td className="bg-background sticky left-0 px-3 py-3 text-left">
                {rule.yearStarting !== undefined && (
                  <div className={`inline-flex items-center gap-3`}>
                    <PiArrowFatUpFill />
                    {formatYear(rule.yearStarting)}
                  </div>
                )}
                {rule.yearEnding && (
                  <div className={"inline-flex items-center gap-3"}>
                    <PiArrowFatDownFill />
                    {formatYear(rule.yearEnding)}
                  </div>
                )}
              </td>
              {rule.scale.map((hotnessRule, hIdx) => (
                <td className={getBg(hIdx) + " px-3"} key={hotnessRule.hotness}>
                  {hotnessRule.maxDistance}
                </td>
              ))}
              <td className={getBg(3) + " px-3"} key={"far"}>
                &ge;{rule.scale[2].maxDistance + 1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

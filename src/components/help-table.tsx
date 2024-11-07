import { PiArrowFatDownFill, PiArrowFatUpFill } from "react-icons/pi";
import { formatYear } from "./game/utils";
import type { GameRule } from "./game/types";

function Square({ className }: { className: string }) {
  return <div className={`${className} h-6 w-6 rounded`} />;
}

const getBg = (idx: number) => {
  const colors = ["bg-emerald-600", "bg-yellow-600", "bg-destructive"];

  return colors[idx % colors.length];
};

export function HelpTable({ rules }: { rules: GameRule[] }) {
  return (
    <table className="text-right">
      <thead>
        <tr>
          <th className="py-3 text-left">
            <div className="inline-flex gap-2">Year</div>
          </th>
          <th>
            <div className="inline-flex gap-2">
              Win <Square className="bg-emerald-600" />
            </div>
          </th>
          <th>
            <div className="inline-flex gap-2">
              Close <Square className="bg-yellow-600" />
            </div>
          </th>
          <th>
            <div className="inline-flex gap-2">
              Far <Square className="bg-destructive" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {rules.map((rule, idx) => (
          <tr key={`${JSON.stringify(rule)}`}>
            <td className={`px-3 py-3 text-left ${getBg(idx)}`}>
              {rule.yearStarting !== undefined && (
                <div className={`inline-flex items-center gap-3`}>
                  <PiArrowFatUpFill />
                  {formatYear(rule.yearStarting)}
                </div>
              )}
              {rule.yearEnding && (
                <div className={`inline-flex items-center gap-3 ${getBg(idx)}`}>
                  <PiArrowFatDownFill />
                  {formatYear(rule.yearEnding)}
                </div>
              )}
            </td>
            {rule.scale.map((hotnessRule) => (
              <td className={getBg(idx) + " px-3"} key={hotnessRule.hotness}>
                {hotnessRule.maxDistance}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

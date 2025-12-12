import { PiArrowFatDownFill, PiArrowFatUpFill } from "react-icons/pi";
import { formatYear } from "./game/utils";
import type { GameRule } from "./game/types";

function Square({ className }: { className: string }) {
  return <div className={`${className} h-6 w-6 rounded`} />;
}

const getBg = (idx: number) => {
  const colors = [
    "bg-status-success",
    "bg-status-warning text-status-warning-foreground",
    "bg-status-orange",
    "bg-status-error",
  ];

  return colors[idx % colors.length];
};

export function HelpTable({ rules }: { rules: GameRule[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-right">
        <thead>
          <tr>
            <th></th>
            <th colSpan={4} className="text-center">
              Years from Correct Answer
            </th>
          </tr>
          <tr>
            <th className="bg-background sticky left-0 px-2 py-3 text-left md:px-3">
              <div className="inline-flex gap-2">Invention Year</div>
            </th>
            <th>
              <div className="inline-flex gap-2 px-2 md:px-3">
                <Square className="bg-status-success" />
                <span className="hidden md:inline"> Win</span>
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2 px-2 md:px-3">
                <Square className="bg-status-warning" />
                <span className="hidden md:inline"> Almost</span>
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2 px-2 md:px-3">
                <Square className="bg-status-orange" />
                <span className="hidden md:inline"> Closer</span>
              </div>
            </th>
            <th>
              <div className="inline-flex gap-2 px-2 md:px-3">
                <Square className="bg-status-error" />
                <span className="hidden md:inline"> Far</span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule) => (
            <tr key={`${JSON.stringify(rule)}`}>
              <td className="bg-background sticky left-0 px-2 py-3 text-left md:px-3">
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
                <td
                  className={getBg(hIdx) + " px-2 font-bold md:px-3"}
                  key={hotnessRule.hotness}
                >
                  {hotnessRule.maxDistance}
                </td>
              ))}
              <td className={getBg(3) + " px-2 font-bold md:px-3"} key={"far"}>
                &gt;{rule.scale[2].maxDistance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { Era } from "./types";
import { Button } from "../ui/button";

export function EraSelect({
  value = Era.CE,
  onChange,
}: {
  onChange: (value: Era) => void;
  value?: Era;
}) {
  function toggleEra() {
    onChange(value === Era.BCE ? Era.CE : Era.BCE);
  }
  return (
    <Button
      type="button"
      className="h-[42px] rounded-l-none lg:h-[46px]"
      onClick={toggleEra}
    >
      {value}
    </Button>
  );
}

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
    <Button className="h-[46px] rounded-l-none" onClick={toggleEra}>
      {value}
    </Button>
  );
}

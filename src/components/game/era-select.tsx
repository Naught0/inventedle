import { Era } from "./types";
import { Button } from "../ui/button";

export function EraSelect({
  value = Era.CE,
  onChange,
  disabled,
}: {
  onChange: (value: Era) => void;
  value?: Era;
  disabled?: boolean;
}) {
  function toggleEra() {
    onChange(value === Era.BCE ? Era.CE : Era.BCE);
  }
  return (
    <Button
      type="button"
      className="h-[42px] rounded-l-none lg:h-[46px]"
      onClick={toggleEra}
      disabled={disabled}
    >
      {value}
    </Button>
  );
}

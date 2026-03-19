import { Button } from "../ui/button";
import { Era } from "./enum";

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
      className="h-11 rounded-l-none"
      onClick={toggleEra}
      disabled={disabled}
    >
      {value}
    </Button>
  );
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { defaultRules } from "./game/rules";
import { HelpTable } from "./help-table";
import { PiQuestion } from "react-icons/pi";
import { DialogClose } from "@radix-ui/react-dialog";

export function Help() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="inline-flex items-center gap-2 text-sm md:text-base"
        >
          <PiQuestion />
          <span>How to play</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen max-h-[90vh] overflow-y-auto md:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Game Rules</DialogTitle>
          <DialogDescription className="text-left text-base">
            <p>The rules of the game depend on the year of the invention.</p>
            <p>
              E.g. To win for inventions from the year 2000 or newer, your guess
              must be within 1 (one) year of the invention's creation. For an
              invention made in 1910, you must guess within 5 (five) years to
              win. Find all the rules in the table below.
            </p>
          </DialogDescription>
        </DialogHeader>
        <HelpTable rules={defaultRules} />
        <DialogFooter>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

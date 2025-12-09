import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { defaultRules } from "./game/rules";
import { HelpTable } from "./help-table";
import { PiQuestion } from "react-icons/pi";

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
      <DialogContent className="max-w-screen max-h-[90vh] overflow-y-auto font-mono md:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Game Rules</DialogTitle>
          <DialogDescription className="text-left text-base">
            <article className="prose prose-invert">
              <ol>
                <li>Guess the year of the invention.</li>
              </ol>
              <p>
                The range of accepted years depends on the year of the
                invention.
              </p>
              <p>
                E.g. To win for inventions from the year 2000 onward, you must
                guess the exact year to get it right. For an invention made in
                1910, you would need to guess a year 1909-1911 to win. The
                margin to win becomes more forgiving as you go farther back in
                time.
              </p>
              <p>Find all the rules in the table below.</p>
            </article>
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

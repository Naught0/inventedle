import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { Dialog } from "@radix-ui/react-dialog";
function parseYearInput(input: FormDataEntryValue | null) {
  return parseInt(input?.toString() ?? "");
}
export function AddInvention() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Add an Invention
      </DialogTrigger>
      <DialogContent className="max-w-full sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>Add an Invention</DialogTitle>
        </DialogHeader>
        <form
          action={async (data) => {
            "use server";
            const start_year = parseYearInput(data.get("start_year"));
            const end_year = parseYearInput(data.get("end_year"));
            const description = data.get("description")?.toString();
            if (!start_year || !description) return;

            await db.invention.create({
              data: {
                start_year,
                end_year,
                description,
              },
            });
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="start_year" className="text-right">
                start_year
              </Label>
              <Input id="start_year" name="start_year" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="end_year" className="text-right">
                end_year
              </Label>
              <Input id="end_year" name="end_year" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                description
              </Label>
              <Input
                id="description"
                name="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

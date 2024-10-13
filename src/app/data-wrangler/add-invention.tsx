import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { inventions } from "@/db/schema";
import { Dialog } from "@radix-ui/react-dialog";

export function AddInvention() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add an Invention</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add an Invention</DialogTitle>
        </DialogHeader>
        <form
          action={async (data) => {
            "use server";
            const year = data.get("year")?.toString();
            const description = data.get("description")?.toString();
            console.log(year, description);
            if (!year || !description) return;

            await db.insert(inventions).values({
              year,
              description,
            });
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="year" className="text-right">
                year
              </Label>
              <Input id="year" name="year" className="col-span-3" />
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

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/db";
import { Invention } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";

async function getInvention(id: number) {
  console.log(id);
  return await db.invention.findUniqueOrThrow({ where: { id } });
}

async function updateInvention(invention: Invention) {
  await db.invention.update({
    where: { id: invention.id },
    data: invention,
  });
}

async function getRemaining() {
  const remaining = await db.invention.count({
    where: { name_updated: false },
  });
  return remaining;
}

export default async function Page({ params }: { params: { id: string } }) {
  params = await params;
  const invention = await getInvention(parseInt(params.id));
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-lg">{await getRemaining()} left to name</p>
      <Table data={[invention]} />
      <form
        className="flex flex-col gap-3"
        action={async (data) => {
          "use server";
          await updateInvention({
            ...invention,
            name: data.get("name") as string,
            name_updated: true,
          });
          revalidatePath(`/data-wrangler/tinder/${params.id}`);
        }}
      >
        <Label>New name</Label>
        <Input type="text" name="name" defaultValue={invention.name ?? ""} />
        <div className="flex flex-row gap-3">
          <Button type="submit">Update</Button>
          <Link
            className={buttonVariants()}
            href="/data-wrangler/tinder"
            onClick={async () => {
              "use server";
              await updateInvention({ ...invention, name_updated: true });
            }}
          >
            Next
          </Link>
        </div>
      </form>
    </div>
  );
}

function Table({ data }: { data: Invention[] }) {
  return data.map((invention) => (
    <div key={invention.id} className="flex flex-col gap-3">
      <p className="bold">
        {invention.name} ({invention.start_year}
        {invention.end_year && invention.end_year !== invention.start_year
          ? ` - ${invention.end_year}`
          : ""}
        )
      </p>
      <p>{invention.description}</p>
    </div>
  ));
}

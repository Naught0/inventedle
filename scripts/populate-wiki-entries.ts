import { db } from "@/db";
import data from "../data.json";
import { InventionCreateInput } from "@/db/prisma/generated/models";

function convertSchema(item: (typeof data)[0]): InventionCreateInput {
  return {
    name: item.name,
    year: item.year,
    description: item.description,
    image_url: item.imageUrl,
    invention_link: item.link,
    related_links: item.additionalLinks.join(","),
  };
}
async function main() {
  const converted = data.map(convertSchema);
  await db.invention.createMany({ data: converted });
}

await main();

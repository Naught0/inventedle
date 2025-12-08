import { Hyperlink } from "../hyperlink";
import { InventionModel } from "@/db/prisma/generated/models";

export function Summary({ invention }: { invention: InventionModel }) {
  return (
    <article className="flex flex-col gap-2">
      {invention.description}
      {invention.invention_link && (
        <Hyperlink
          href={invention.invention_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more on Britannica®
        </Hyperlink>
      )}
    </article>
  );
}

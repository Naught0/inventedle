import { Hyperlink } from "../hyperlink";
import { InventionModel } from "@/db/prisma/generated/models";

export function Summary({ invention }: { invention: InventionModel }) {
  return (
    <article className="flex flex-col gap-2">
      <blockquote className="text-muted-foreground border-primary bg-primary/10 p-2">
        {invention.description}
      </blockquote>
      {invention.invention_link && (
        <Hyperlink
          href={invention.invention_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more on Britannica®
        </Hyperlink>
      )}
      {invention.inventor && (
        <>
          <p className="text-lg font-bold">Inventor</p>
          <p>
            {invention.inventor_link ? (
              <Hyperlink href={invention.inventor_link}>
                {invention.inventor}
              </Hyperlink>
            ) : (
              invention.inventor
            )}
          </p>
        </>
      )}
    </article>
  );
}

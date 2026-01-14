import { Hyperlink } from "../hyperlink";
import { InventionModel } from "@/db/prisma/generated/models";

export function Summary({ invention }: { invention: InventionModel }) {
  return (
    <article className="flex flex-col gap-0">
      {invention.inventor && (
        <div className="mb-3">
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
        </div>
      )}
      <blockquote className="text-muted-foreground border-primary bg-accent rounded-lg p-2.5">
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
    </article>
  );
}

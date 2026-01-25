import { Hyperlink } from "../hyperlink";
import { InventionModel } from "@/db/prisma/generated/models";
import { Stack } from "../ui/stack";

function getSourceName(link: string) {
  if (link.includes("wikipedia")) {
    return "Wikipedia";
  }
  if (link.includes("britannica")) {
    return "Britannica";
  }

  return new URL(link).hostname;
}
export function Summary({ invention }: { invention: InventionModel }) {
  return (
    <article className="flex flex-col gap-2">
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
      <Stack gap={false}>
        <blockquote className="text-muted-foreground border-primary bg-accent mb-1 rounded-lg p-2.5">
          {invention.description}
        </blockquote>
        {invention.invention_link && (
          <Hyperlink
            href={invention.invention_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more on {getSourceName(invention.invention_link)}
          </Hyperlink>
        )}
      </Stack>
      {invention.related_links && (
        <Stack gap={false}>
          <label className="font-bold">Further Reading</label>
          {invention.related_links.split(",").map((link) => (
            <Hyperlink
              key={link}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link}
            </Hyperlink>
          ))}
        </Stack>
      )}
    </article>
  );
}

import { Hyperlink } from "../hyperlink";
import { Invention } from "@prisma/client";

export function Summary({ invention }: { invention: Invention }) {
  return (
    <div className="flex flex-col gap-2">
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
    </div>
  );
}

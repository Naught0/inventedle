import React from "react";
import { Hyperlink } from "../hyperlink";
import { Invention } from "@prisma/client";

export default function WikiSummary({ invention }: { invention: Invention }) {
  return (
    <div className="flex flex-col gap-2">
      <article
        dangerouslySetInnerHTML={{ __html: invention.wiki_summary! }}
        className="line-clamp-5"
      />
      {invention.wiki_link && (
        <Hyperlink
          href={invention.wiki_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read more on Wikipedia
        </Hyperlink>
      )}
    </div>
  );
}

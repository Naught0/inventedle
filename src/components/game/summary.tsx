import { Hyperlink } from "../hyperlink";
import { InventionModel } from "@/db/prisma/generated/models";
import { Stack } from "../ui/stack";
import { PiLinkSimpleHorizontal } from "react-icons/pi";
import { BsWikipedia } from "react-icons/bs";

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
    <article className="flex flex-col gap-3">
      {invention.inventor && (
        <div>
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
            className="w-fit"
          >
            Read more on {getSourceName(invention.invention_link)}
          </Hyperlink>
        )}
      </Stack>
      {invention.related_links && (
        <Stack gap={false}>
          <label className="mb-1 font-bold">Related Pages</label>
          {invention.related_links.split(/[\n,]/).map((link) => (
            <RelatedLink key={link} href={link} />
          ))}
        </Stack>
      )}
    </article>
  );
}

function getSourceIcon(href: string) {
  if (href.includes("wikipedia"))
    return (
      <span className="text-primary-dark bg-foreground size-fit rounded p-[3px]">
        <BsWikipedia strokeWidth={0.33} size={14} />
      </span>
    );

  return <PiLinkSimpleHorizontal />;
}

function getTitleFromUrl(url: string) {
  if (url.includes("wikipedia"))
    return decodeURIComponent(url.split("/").slice(-1)[0]).replaceAll("_", " ");

  return url;
}

function RelatedLink({ href }: { href: string }) {
  return (
    <Hyperlink className="inline-flex w-fit items-center gap-1" href={href}>
      {getSourceIcon(href)}
      {getTitleFromUrl(href)}
    </Hyperlink>
  );
}

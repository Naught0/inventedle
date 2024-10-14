import type { Invention, Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import wiki from "wikipedia";
import DOMPurify from "isomorphic-dompurify";
import { db } from "@/db";
import sharp from "sharp";

const URI = "https://en.wikipedia.org/wiki/Timeline_of_historic_inventions";

// TODO: Parse YearType (Xth cetury, 1900, etc.)
async function getWikiPage(url = URI) {
  const resp = await fetch(url);
  return await resp.text();
}

function lineItemToDTO(elem: Element): Prisma.InventionCreateInput | null {
  const time = elem.querySelector("b");
  if (!time) return null;

  const yearStr = time.textContent?.replace(/\:$/, "");
  if (time) time.remove();

  const description = stripFootnotes(elem.textContent?.trim() ?? "");
  if (!yearStr) return null;
  if (yearStr.match(/^[0-9]+ BC$/i)) {
    const year = -parseInt(yearStr);
    return { start_year: year, end_year: year, description };
  }

  if (!/^\d*$/g.test(yearStr ?? "")) return null;
  const year = parseInt(yearStr);
  if (isNaN(year)) return null;

  return { start_year: year, end_year: year, description };
}

function stripFootnotes(text: string) {
  return text.replaceAll(/\[.*\]/g, "");
}

async function getInventions(): Promise<Prisma.InventionCreateInput[]> {
  const html = await getWikiPage();
  const doc = new JSDOM(html).window.document;
  const container = doc.querySelector(".mw-content-ltr.mw-parser-output");
  if (!container) throw new Error("Could not find expected container on page");

  // Remove noise
  const refs = container.querySelector(".refbegin");
  if (refs) container.removeChild(refs);
  // Filter by id so we don't match footnotes
  const lis = [...container.querySelectorAll("li")].filter((li) => !li.id);
  // Filter out null
  const dtos = [...lis].map((li) => lineItemToDTO(li)).filter((li) => !!li);
  return dtos;
}

async function getWikiInfo(
  name: string,
): Promise<Pick<Invention, "name" | "wiki_summary" | "image_url">> {
  const results = await wiki.search(name, { limit: 1 });
  const s = await wiki.summary(results.results[0].title);
  return {
    name: results.results[0].title,
    image_url: s.originalimage?.source,

    wiki_summary: DOMPurify.sanitize(s.extract_html),
  };
}

async function enrichDbWithWikiData() {
  const inventions = await db.invention.findMany();
  const failedToWiki = [];
  for (let i = 0; i < inventions.length; i++) {
    console.log(i + 1, "/", inventions.length);
    const invention = inventions[i];
    if (!invention.name) continue;
    if (invention.wiki_summary || invention.image_url) continue;

    try {
      const data = await getWikiInfo(invention.name);
      console.log(invention.name, "got wiki info", data);
      await db.invention.update({
        where: { id: invention.id },
        data,
      });
    } catch {
      console.error("Couldn't get wiki info for", invention.name);
      failedToWiki.push(invention.name);
    }
    console.log(invention.name, "updating with wiki info");
  }

  await writeFile("failedToWiki.json", JSON.stringify(failedToWiki));
}

async function downloadAndCompressImage(url: string, filename: string) {
  const resp = await fetch(url);
  const buffer = await resp.arrayBuffer();
  const image = sharp(buffer).resize({ width: 1280 }).webp({ force: true });
  await image.toFile(filename);
}

(async () => {
  const inventions = await db.invention.findMany({
    select: { id: true, image_url: true },
    where: { image_url: { not: null } },
  });

  for (let i = 0; i < inventions.length; i++) {
    const invention = inventions[i];
    console.log(i + 1, "/", inventions.length);
    const filename = `./public/img/inventions/${invention.id}.webp`;
    await downloadAndCompressImage(invention.image_url!, filename);
  }
})();

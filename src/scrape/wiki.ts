import { db } from "@/db";
import type { Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";

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

async function main(): Promise<Prisma.InventionCreateInput[]> {
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

(async () => {
  const dtos = await main();
  try {
    await db.invention.createMany({ data: dtos });
  } catch (e) {
    console.error(e);
  }
  await writeFile(
    "./src/app/data/data.json",
    JSON.stringify(dtos, undefined, 2),
  );
})();

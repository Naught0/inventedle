import { JSDOM } from "jsdom";
import { InventionInsert, inventions } from "@/db/schema";
import { writeFile } from "fs/promises";
import { db } from "@/db";

const URI = "https://en.wikipedia.org/wiki/Timeline_of_historic_inventions";

async function getWikiPage(url = URI) {
  const resp = await fetch(url);
  return await resp.text();
}

function lineItemToDTO(elem: Element): InventionInsert | null {
  const dto: InventionInsert = {};
  const time = elem.querySelector("b");
  if (!time) return null;

  dto.year = time.textContent?.replace(/\:$/, "");
  if (!/^\d*$/g.test(dto.year ?? "")) return null;
  if (time) time.remove();
  dto.description = stripFootnotes(elem.textContent?.trim() ?? "");

  return dto;
}

function stripFootnotes(text: string) {
  return text.replaceAll(/\[.*\]/g, "");
}

async function main(): Promise<InventionInsert[]> {
  const html = await getWikiPage();
  const doc = new JSDOM(html).window.document;
  const container = doc.querySelector(".mw-content-ltr.mw-parser-output");
  if (!container) throw new Error("Could not find expected container on page");

  // Remove noise
  const refs = container.querySelector(".refbegin");
  if (refs) container.removeChild(refs);
  // Filter by id so we don't match footnotes
  const lis = [...container.querySelectorAll("li")].filter((li) => !li.id);

  const dtos = [...lis].map((li) => lineItemToDTO(li)).filter((li) => li);
  return dtos as InventionInsert[];
}

(async () => {
  const dtos = await main();
  await db.insert(inventions).values(dtos);
  await writeFile("./src/app/data/data.json", JSON.stringify(dtos));
})();

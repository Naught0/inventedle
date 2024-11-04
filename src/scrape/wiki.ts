/* eslint-disable @typescript-eslint/no-unused-vars  */
import type { Invention, Prisma } from "@prisma/client";
import { writeFile } from "fs/promises";
import { JSDOM } from "jsdom";
import wiki, { wikiSummary } from "wikipedia";
import DOMPurify from "isomorphic-dompurify";
import { db } from "@/db";
import sharp from "sharp";
import { PexelsSearchResults } from "./types";

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
): Promise<Pick<Invention, "wiki_summary" | "image_url" | "wiki_link">> {
  const results = await wiki.search(name, { limit: 1 });
  const s: wikiSummary = await wiki.summary(results.results[0].title);
  return {
    image_url: s.originalimage?.source,
    wiki_summary: DOMPurify.sanitize(s.extract_html),
    wiki_link: s.content_urls.desktop.page,
  };
}

async function getHigherResImage(query: string) {
  const resp = await fetch(
    "https://api.pexels.com/v1/search?" + new URLSearchParams({ query }),
    {
      headers: {
        Authorization: process.env.PEXELS_KEY!,
      },
    },
  );
  const data: PexelsSearchResults = await resp.json();
  return data.photos[0].src.large2x;
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

async function downloadImage(url: string) {
  const resp = await fetch(url);
  return await resp.arrayBuffer();
}

function compressImage(buffer: ArrayBuffer) {
  return sharp(buffer).resize({ width: 1280, withoutEnlargement: true }).webp();
}

async function downloadAndCompressImage(url: string, filename: string) {
  const buffer = await downloadImage(url);
  const image = compressImage(buffer);
  await image.toFile(filename);
}

async function updateWithWikiData() {
  const inventions = await db.invention.findMany({
    select: { id: true, name: true },
    where: { wiki_link: null, name: { not: null } },
  });
  for (const i of inventions) {
    console.log(i.name);
    const data = await getWikiInfo(i.name!);
    try {
      await db.invention.update({
        where: { id: i.id },
        data,
      });
    } catch {
      console.log("Skipping", i.name);
    }
  }
}

async function populateMissingDbImages() {
  const missingImages = await db.invention.findMany({
    where: { image_url: null },
  });

  for (const invention of missingImages) {
    try {
      const url = await getHigherResImage(invention.name!);
      await db.invention.update({
        where: { id: invention.id },
        data: { image_url: url },
      });
      console.log(invention.name, url);
    } catch {
      console.log("Skipping", invention.name);
    }
  }
}

async function downloadAndCompressPexelsImages() {
  const inventions = await db.invention.findMany({
    where: { image_url: { contains: "pexels" } },
  });
  for (const invention of inventions) {
    await downloadAndCompressImage(
      invention.image_url!,
      `public/img/inventions/${invention.id}.webp`,
    );
    console.log("Downloaded", invention.name);
  }
}

(async () => {
  await populateMissingDbImages();
  const inventions = await db.invention.findMany({
    where: { id: { in: [3, 4, 392] } },
  });
  for (const invention of inventions) {
    console.log(invention.name);
    const url = await getHigherResImage(invention.name!);
    await db.invention.update({
      where: { id: invention.id },
      data: { image_url: url },
    });
    await downloadAndCompressImage(
      invention.image_url!,
      `public/img/inventions/${invention.id}.webp`,
    );
  }
})();

import { db } from "@/db";
import { readFileSync, writeFileSync } from "fs";
import ollama from "ollama";
import pLimit from "p-limit";

const limit = pLimit(5);

async function populateNameFromDescription() {
  const inventions = JSON.parse(readFileSync("inventions.json").toString()) as {
    description: string;
    start_year: number;
    end_year?: number;
  }[];
  let processed = 0;
  const promises = inventions.map(async (i) => {
    return limit(async () => {
      const resp = {
        ...i,
        name: (
          await ollama.chat({
            model: "gemma3:12b-it-qat",
            messages: [
              {
                role: "system",
                content:
                  "Reply in as few words as possible while being accurate. Do not include years or dates in your reply. Do not include any information about time in your reply. Do not be overly generic. Do not extrapolate.",
              },
              {
                role: "user",
                content: `What is the invention being mentioned in the following sentence? Your answer should be succinct as it will be used in a guessing game in which a user must guess the words or concepts described. You must use the most common name for whatever invention/concept is described. The sentence is:\n"${i.description}."`,
              },
            ],
          })
        ).message.content,
      };

      processed += 1;
      console.log("Processed", processed, "/", promises.length);
      return resp;
    });
  });
  const out = await Promise.all(promises);

  writeFileSync("inventions_ai.json", JSON.stringify(out, undefined, 2));
}

async function writeToDb() {
  const inventions = JSON.parse(
    readFileSync("inventions.britannica.json").toString(),
  ) as {
    image_url: string;
    inventor: string;
    inventor_link: string;
    name: string;
    invention_link: string;
    year: number;
    description: string;
  }[];
  for (const data of inventions) {
    await db.invention.create({ data });
  }
}

(async () => {
  // await populateNameFromDescription();
  await writeToDb();
})();

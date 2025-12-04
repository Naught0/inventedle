import { db } from "@/db";
import { readFileSync, writeFileSync } from "fs";
import ollama from "ollama";
import pLimit from "p-limit";

const limit = pLimit(3);

async function populateNameFromDescription() {
  const inventions = JSON.parse(readFileSync("inventions.json").toString()) as {
    description: string;
    start_year: number;
    end_year?: number;
  }[];
  const out = await Promise.all(
    inventions.map(async (i) => {
      console.log(i.description);
      return limit(async () => ({
        ...i,
        name: (
          await ollama.chat({
            model: "gemma3:4b",
            messages: [
              {
                role: "system",
                content:
                  "Reply in as few words as possible while being accurate. Do not include years or dates in your reply. Do not include any information about time in your reply.",
              },
              {
                role: "user",
                content: `What is the invention being mentioned in the following sentence? ${i.description}. Your answer should be succinct as it will be used in a guessing game in which a user must guess the words or concepts described.`,
              },
            ],
          })
        ).message.content,
      }));
    }),
  );

  writeFileSync("inventions_ai.json", JSON.stringify(out, undefined, 2));
}

async function writeToDb() {
  const inventions = JSON.parse(
    readFileSync("inventions_ai.json").toString(),
  ) as {
    description: string;
    start_year: number;
    end_year?: number;
    name: string;
  }[];
  for (const data of inventions) {
    await db.invention.create({ data });
  }
}

(async () => {
  // await populateNameFromDescription();
  await writeToDb();
})();

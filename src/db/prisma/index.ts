import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function createClient(): PrismaClient | undefined {
  if (process.env.DOCKER_BUILDING) return;
  if (!process.env.TURSO_DATABASE_URL && !process.env.DATABASE_URL)
    throw new Error("Neither TURSO_DATABASE_URL nor DATABASE_URL is set");

  return new PrismaClient({
    adapter: new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL ?? process.env.DATABASE_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN,
    }),
  });
}

const client = createClient() as PrismaClient;

export { client };

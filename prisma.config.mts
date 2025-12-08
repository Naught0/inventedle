import "dotenv/config";
import { defineConfig, PrismaConfig } from "prisma/config";

let config: PrismaConfig = { schema: "prisma/schema.prisma" };
if (process.env.NODE_ENV === "development") {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  config = defineConfig({
    ...config,
    datasource: {
      url: process.env.DATABASE_URL,
    },
  });
} else if (process.env.NODE_ENV === "production") {
  if (!process.env.TURSO_DATABASE_URL) {
    throw new Error("TURSO_DATABASE_URL is not defined");
  }
  if (!process.env.TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_AUTH_TOKEN is not defined");
  }

  config = defineConfig({ ...config });
}

export default config;

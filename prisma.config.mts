import "dotenv/config";
import { PrismaConfig } from "prisma/config";

export default {
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL ?? process.env.TURSO_DATABASE_URL!,
  },
  typedSql: {
    path: "./prisma/sql",
  },
} satisfies PrismaConfig;

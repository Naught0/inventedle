import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// let client: PrismaClient;
// if (process.env.NODE_ENV === "production") {
//   client = new PrismaClient({
//     adapter: new PrismaLibSql({
//       url: `${process.env.TURSO_DATABASE_URL}`,
//       authToken: `${process.env.TURSO_AUTH_TOKEN}`,
//     }),
//   });
// } else if (process.env.NODE_ENV === "development") {
//   client = new PrismaClient({
//     adapter: new PrismaLibSql({ url: `${process.env.DATABASE_URL}` }),
//   });
// }
const client = new PrismaClient({
  adapter: new PrismaLibSql({ url: `${process.env.DATABASE_URL}` }),
});

export { client };

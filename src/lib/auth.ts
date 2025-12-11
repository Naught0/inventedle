import { db } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  socialProviders: {
    discord: {
      clientId: process.env.BA_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.BA_DISCORD_CLIENT_SECRET as string,
      scope: ["identify"],
    },
  },
});

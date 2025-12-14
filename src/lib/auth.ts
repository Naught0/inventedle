import { db } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
    expiresIn: 60 * 60 * 24 * 7,
  },
  account: {
    accountLinking: {
      trustedProviders: ["discord", "google", "github"],
      updateUserInfoOnLink: true,
      allowDifferentEmails: false,
    },
  },
  socialProviders: {
    discord: {
      clientId: process.env.BA_DISCORD_CLIENT_ID as string,
      clientSecret: process.env.BA_DISCORD_CLIENT_SECRET as string,
      scope: ["identify"],
    },
    google: {
      clientId: process.env.BA_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BA_GOOGLE_CLIENT_SECRET as string,
      scope: ["email", "profile"],
    },
  },
});

export async function getServerSession() {
  return auth.api.getSession();
}

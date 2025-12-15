import { db } from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { headers } from "next/headers";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "sqlite",
  }),
  user: {
    additionalFields: {
      isPublic: {
        type: "boolean",
        default: false,
        input: true,
      },
    },
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

export type SessionWithUser = typeof auth.$Infer.Session;

export async function getServerSession(
  params?: Omit<Parameters<typeof auth.api.getSession>[0], "headers"> & {
    headers?: ReadonlyHeaders;
  },
) {
  return auth.api.getSession({
    ...params,
    headers: params?.headers ?? (await headers()),
  });
}

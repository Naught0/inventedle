import { createAuthClient } from "better-auth/react";

export const { useSession, signUp, signIn, signOut } = createAuthClient({
  baseURL: process.env.BETTER_AUTH_BASE_URL,
});

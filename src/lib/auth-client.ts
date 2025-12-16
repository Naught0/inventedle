import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth";

export const { useSession, signUp, signIn, signOut } = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>()],
});

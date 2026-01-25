import { useSession } from "@/lib/auth-client";
import { useContext } from "react";
import { SessionContext } from "../providers";

export function useDefaultSession() {
  const initialSession = useContext(SessionContext);
  const { data, ...session } = useSession();

  return {
    session: data || initialSession,
    ...session,
  };
}

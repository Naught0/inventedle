"use client";
import type { SessionWithUser } from "@/lib/auth";
import { createContext } from "react";
import { QueryContext } from "@/components/hooks/query";

export const SessionContext = createContext<SessionWithUser | null>(null);

export function Providers({
  children,
  session,
}: React.PropsWithChildren & { session?: SessionWithUser | null }) {
  return (
    <QueryContext>
      <SessionContext.Provider value={session ?? null}>
        {children}
      </SessionContext.Provider>
    </QueryContext>
  );
}

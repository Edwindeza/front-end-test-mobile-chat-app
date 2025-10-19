import React, { ReactNode } from "react";
import { DatabaseProvider } from "@/shared/database/DatabaseProvider";

export function AppProvider({ children }: { children: ReactNode }) {
  return <DatabaseProvider>{children}</DatabaseProvider>;
}

// src/hooks/useAuth.ts
import { useContext } from "react";
import { DataContext, } from "@/context/DataContext";
import type { DataContextType } from "@/lib/types";

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within an DataProvider");
  }
  return context;
};

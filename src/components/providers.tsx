"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EdgeStoreProvider } from "../lib/edgestore";

import { ReactNode } from "react";
import { TooltipProvider } from "./ui/tooltip";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <EdgeStoreProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>;
      </QueryClientProvider>
    </EdgeStoreProvider>
  );
}

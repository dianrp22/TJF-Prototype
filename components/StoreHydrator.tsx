"use client";

import { useHydrateStore } from "@/lib/useHydrateStore";

export default function StoreHydrator({ children }: { children: React.ReactNode }) {
  useHydrateStore();
  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { useTJFStore } from "@/lib/store";

export function useHydrateStore() {
  useEffect(() => {
    useTJFStore.persist.rehydrate();
  }, []);
}

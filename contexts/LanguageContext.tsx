"use client";

import { createContext, useContext, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export type Lang = "id" | "en";

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const Ctx = createContext<LangCtx>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();

  const setLang = (l: Lang) => {
    // pathname is always the "clean" browser URL (before rewrite)
    // English: /resources, /contact, /
    // Indonesian: /id/resources, /id/contact, /id
    const segments = pathname.split("/").filter(Boolean);
    const hasIdPrefix = segments[0] === "id";
    const cleanPath = hasIdPrefix ? "/" + segments.slice(1).join("/") : pathname;

    if (l === "en") {
      router.push(cleanPath || "/");
    } else {
      const target = cleanPath === "/" ? `/${l}` : `/${l}${cleanPath}`;
      router.push(target);
    }
  };

  return <Ctx.Provider value={{ lang, setLang }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

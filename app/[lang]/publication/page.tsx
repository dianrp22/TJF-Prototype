"use client";
import { usePublicData } from "@/lib/usePublicData";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/contexts/LanguageContext";
import PublicationContent from "./_content";

interface Props {
  params: { lang: string };
}

export default function ResourcesPage({ params }: Props) {
  const { lang } = params;
  const { publications } = usePublicData(lang);
  const tr = useT(lang as Lang).resources;

  return <PublicationContent publications={publications as any[]} lang={lang} tr={tr} />;
}

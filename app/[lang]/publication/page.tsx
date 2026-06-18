import { getServerData } from "@/lib/getServerData";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/contexts/LanguageContext";
import PublicationContent from "./_content";

interface Props {
  params: { lang: string };
}

export default function ResourcesPage({ params }: Props) {
  const { lang } = params;
  const { publications } = getServerData(lang);
  const tr = useT(lang as Lang).resources;

  return <PublicationContent publications={publications} lang={lang} tr={tr} />;
}

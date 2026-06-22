"use client";
import { usePublicData } from "@/lib/usePublicData";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/contexts/LanguageContext";
import TopicContent from "./_content";

interface Props {
  params: { lang: string };
}

export default function TopicsPage({ params }: Props) {
  const { lang } = params;
  const { knowledgeTopics, newsItems, publications, initiativeStories } = usePublicData(lang);
  const tr = useT(lang as Lang).topics;

  return (
    <TopicContent
      knowledgeTopics={knowledgeTopics as any[]}
      newsItems={newsItems as any[]}
      publications={publications as any[]}
      initiativeStories={initiativeStories as any[]}
      lang={lang}
      tr={tr}
    />
  );
}

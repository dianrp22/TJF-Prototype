import { getServerData } from "@/lib/getServerData";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/contexts/LanguageContext";
import TopicContent from "./_content";

interface Props {
  params: { lang: string };
}

export default function TopicsPage({ params }: Props) {
  const { lang } = params;
  const { knowledgeTopics, newsItems, publications, initiativeStories } = getServerData(lang);
  const tr = useT(lang as Lang).topics;

  return (
    <TopicContent
      knowledgeTopics={knowledgeTopics}
      newsItems={newsItems}
      publications={publications}
      initiativeStories={initiativeStories}
      lang={lang}
      tr={tr}
    />
  );
}

import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpen, Newspaper } from "lucide-react";
import { getServerData } from "@/lib/getServerData";
import TopicDetailContent from "./_content";

interface Props {
  params: { lang: string; slug: string };
}

export default function TopicDetailPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { knowledgeTopics, publications, newsItems, initiatives, initiativeStories } = getServerData(lang);

  const topic = knowledgeTopics.find((t) => t.slug === params.slug);
  if (!topic) return notFound();

  const relatedPubs = publications.filter((p) =>
    (p.topics as string[])?.includes(topic.slug)
  );
  const relatedNews = newsItems.filter((n) =>
    (n.topics as string[])?.includes(topic.slug)
  );
  const displayPubs = relatedPubs.length > 0 ? relatedPubs : publications.slice(0, 3);
  const displayNews = relatedNews.length > 0 ? relatedNews : newsItems.slice(0, 3);
  const otherTopics = knowledgeTopics.filter((t) => t.slug !== params.slug).slice(0, 3);
  const relatedResearch = publications.filter((p) =>
    (p.topics as string[])?.includes(topic.slug) &&
    ["Research Article", "Brief"].includes(p.category)
  );
  const topicInitiativeSlugs = initiatives
    .filter((ini) => (ini.topics as string[])?.includes(topic.slug))
    .map((ini) => ini.slug);
  const relatedInitiatives = initiativeStories.filter((s) =>
    topicInitiativeSlugs.includes(s.initiativeSlug)
  );

  const ui = {
    back:           lang === "en" ? "Back to Topics"            : "Kembali ke Topik",
    all:            lang === "en" ? "All"                        : "Semua",
    articles:       lang === "en" ? "News"                       : "Berita",
    publications:   lang === "en" ? "Publications"               : "Publikasi",
    relatedPubs:    lang === "en" ? "Related Publications"       : "Publikasi Terkait",
    latestNews:     lang === "en" ? "Latest News"                : "Berita Terbaru",
    otherTopics:    lang === "en" ? "Other Topics"               : "Topik Lainnya",
    relatedResearch:lang === "en" ? "Related Research Areas"     : "Area Riset Terkait",
    relatedInit:    lang === "en" ? "Related Initiatives"        : "Program Terkait",
    exploreResearch:lang === "en" ? "Explore Research"           : "Lihat Riset",
    exploreInit:    lang === "en" ? "Explore Initiatives"        : "Lihat Inisiatif",
    research:       lang === "en" ? "Research"                   : "Riset",
    initiatives2:   lang === "en" ? "Initiatives"                : "Inisiatif",
    readMore:       lang === "en" ? "Read More"                  : "Selengkapnya",
    sources:        lang === "en" ? "sources"                    : "sumber",
    empty:          lang === "en" ? "No content found for this topic." : "Belum ada konten untuk topik ini.",
  };

  return (
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[440px] sm:h-[520px] overflow-hidden">
        <Image
          src={topic.image}
          alt={topic.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-between px-4 sm:px-10 py-8 max-w-7xl mx-auto w-full">
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{topic.icon}</span>
                <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                  {lang === "en" ? "Topic" : "Topik"}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-3">
                {topic.title}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">
                {topic.description}
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-white text-xs font-bold">{displayPubs.length} {ui.publications.toLowerCase()}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-white text-xs font-bold">{displayNews.length} {ui.articles.toLowerCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT (client: tab filter) ──────────────────── */}
      <TopicDetailContent
        displayPubs={displayPubs as any[]}
        displayNews={displayNews as any[]}
        relatedResearch={relatedResearch as any[]}
        relatedInitiatives={relatedInitiatives as any[]}
        otherTopics={otherTopics as any[]}
        lang={lang}
        lp={lp}
        ui={ui}
      />
    </div>
  );
}

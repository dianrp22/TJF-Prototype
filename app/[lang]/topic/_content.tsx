"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Search, X, BookOpen, Newspaper, FlaskConical, Lightbulb, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

type AnyItem = Record<string, unknown>;

function matchesQuery(item: AnyItem, q: string): boolean {
  const lower = q.toLowerCase();
  const title = (item.title as string ?? "").toLowerCase();
  const tags = (item.tags as string[] ?? []).join(" ").toLowerCase();
  const topics = (item.topics as string[] ?? []).join(" ").toLowerCase();
  const excerpt = (item.excerpt as string ?? item.description as string ?? "").toLowerCase();
  return title.includes(lower) || tags.includes(lower) || topics.includes(lower) || excerpt.includes(lower);
}

interface KnowledgeTopic {
  id: string | number;
  slug: string;
  title: string;
  description: string;
  image: string;
  icon: string;
  count: number;
  [key: string]: unknown;
}

interface Tr {
  badge: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  all: string;
  contribute: string;
  contributeDesc: string;
  contributeBtn: string;
  sources: string;
  viewAll: string;
  featureBadge: string;
  heroDesc: string;
  exploreByTopic: string;
  noResults: string;
  resetSearch: string;
  resultsFound: string;
  readMore: string;
}

interface Props {
  knowledgeTopics: KnowledgeTopic[];
  newsItems: AnyItem[];
  publications: AnyItem[];
  initiativeStories: AnyItem[];
  lang: string;
  tr: Tr;
}

export default function TopicContent({ knowledgeTopics, newsItems, publications, initiativeStories, lang, tr }: Props) {
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;

  const [query, setQuery] = useState("");
  const q = query.trim();

  const results = useMemo(() => {
    if (!q) return null;
    return {
      news:        (newsItems        as AnyItem[]).filter((i) => matchesQuery(i, q)),
      pubs:        (publications     as AnyItem[]).filter((i) => matchesQuery(i, q)),
      research:    (publications     as AnyItem[]).filter((i) => matchesQuery(i, q) && ["Research Article", "Brief"].includes(i.category as string)),
      initiatives: (initiativeStories as AnyItem[]).filter((i) => matchesQuery(i, q)),
    };
  }, [q, newsItems, publications, initiativeStories]);

  const totalResults = results ? results.news.length + results.pubs.length + results.initiatives.length : 0;

  const catColors: Record<string, string> = {
    "Research Article": "bg-blue-100 text-blue-700",
    "Annual Report":    "bg-green-100 text-green-700",
    "Brief":            "bg-amber-100 text-amber-700",
    "Book":             "bg-purple-100 text-purple-700",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden text-white">
        <Image
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=85"
          alt="Knowledge topics"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tjf-blue-dark/90 via-tjf-blue-dark/70 to-tjf-blue-dark/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <Compass className="w-3.5 h-3.5" />
              {tr.featureBadge}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-cyan-400 to-[#2D7D46] bg-clip-text text-transparent">{tr.title}</h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed mb-8">{tr.heroDesc}</p>

            {/* Search bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={tr.searchPlaceholder}
                className="w-full bg-white/15 backdrop-blur-sm border border-white/25 text-white placeholder-white/50 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SEARCH RESULTS ───────────────────────────────── */}
      {results && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500">
                <span className="font-bold text-gray-900">{totalResults}</span> {tr.resultsFound}{" "}
                <span className="font-semibold text-tjf-blue">"{q}"</span>
              </p>
              <button onClick={() => setQuery("")} className="text-xs text-gray-400 hover:text-tjf-blue transition-colors flex items-center gap-1">
                <X className="w-3 h-3" /> {tr.resetSearch}
              </button>
            </div>

            {totalResults === 0 && (
              <div className="text-center py-16">
                <Search className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">{tr.noResults}</p>
              </div>
            )}

            {/* Initiatives */}
            {results.initiatives.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <Lightbulb className="w-4 h-4 text-tjf-amber" />
                  <h2 className="text-base font-black text-gray-900">
                    {lang === "en" ? "Initiatives" : "Inisiatif"}
                    <span className="ml-2 text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{results.initiatives.length}</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.initiatives.map((story) => (
                    <Link
                      key={story.slug as string}
                      href={lp(`/initiatives/${story.initiativeSlug as string}/${story.slug as string}`)}
                      className="group flex gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-tjf-amber/40 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={story.image as string} alt={story.title as string} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{story.location as string}</p>
                        <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-tjf-amber transition-colors">{story.title as string}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Research */}
            {results.research.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <FlaskConical className="w-4 h-4 text-tjf-blue" />
                  <h2 className="text-base font-black text-gray-900">
                    {lang === "en" ? "Research" : "Riset"}
                    <span className="ml-2 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{results.research.length}</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.research.map((pub) => (
                    <Link
                      key={pub.slug as string}
                      href={lp(`/publication/${pub.slug as string}`)}
                      className="group flex gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-tjf-blue/40 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={pub.image as string} alt={pub.title as string} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${catColors[pub.category as string] ?? "bg-gray-100 text-gray-600"}`}>{pub.category as string}</span>
                        <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-tjf-blue transition-colors">{pub.title as string}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Publications */}
            {results.pubs.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-4 h-4 text-tjf-blue" />
                  <h2 className="text-base font-black text-gray-900">
                    {lang === "en" ? "Publications" : "Publikasi"}
                    <span className="ml-2 text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{results.pubs.length}</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.pubs.map((pub) => (
                    <Link
                      key={pub.slug as string}
                      href={lp(`/publication/${pub.slug as string}`)}
                      className="group flex gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-tjf-blue/40 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={pub.image as string} alt={pub.title as string} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 inline-block ${catColors[pub.category as string] ?? "bg-gray-100 text-gray-600"}`}>{pub.category as string}</span>
                        <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-tjf-blue transition-colors">{pub.title as string}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* News */}
            {results.news.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-5">
                  <Newspaper className="w-4 h-4 text-tjf-amber" />
                  <h2 className="text-base font-black text-gray-900">
                    {lang === "en" ? "News" : "Berita"}
                    <span className="ml-2 text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{results.news.length}</span>
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.news.map((news) => (
                    <Link
                      key={news.slug as string}
                      href={lp(`/news/${news.slug as string}`)}
                      className="group flex gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-tjf-amber/40 hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={news.image as string} alt={news.title as string} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-gray-400 mb-1 font-medium">{news.date as string}</p>
                        <p className="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-tjf-amber transition-colors">{news.title as string}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── TOPICS GRID (hidden when searching) ──────────── */}
      {!results && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-12">
              <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-5 h-px bg-tjf-blue" />
                {tr.exploreByTopic}
              </span>
              <h2 className="font-display text-3xl font-black text-gray-900 mt-1">
                {lang === "en" ? "Our Core Topics" : "Topik Utama Kami"}
              </h2>
              <p className="text-gray-500 mt-2 text-sm max-w-xl">
                {lang === "en"
                  ? "Explore TJF's work organized by thematic area. Each topic brings together research, articles, and resources."
                  : "Jelajahi karya TJF berdasarkan area tematik. Setiap topik mengumpulkan riset, artikel, dan sumber daya terkait."}
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {knowledgeTopics.map((topic, i) => (
                <AnimatedSection key={topic.id} delay={i * 0.08}>
                  <Link
                    href={lp(`/topic/${topic.slug}`)}
                    className="group relative block rounded-3xl overflow-hidden h-80 hover:-translate-y-1 transition-transform duration-300"
                  >
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                    <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1">
                      <span className="text-white text-[10px] font-bold">{topic.count} {tr.sources}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{topic.icon}</span>
                        </div>
                        <h3 className="text-white font-black text-xl leading-tight mb-1.5">{topic.title}</h3>
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-2">{topic.description}</p>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <ArrowRight className="w-4 h-4 text-gray-900" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────── */}
      {!results && (
        <section className="py-14 bg-gray-50 border-t border-gray-100">
          <AnimatedSection>
            <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-black text-gray-900 mb-2">{tr.contribute}</h2>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">{tr.contributeDesc}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={lp("/contact")}
                  className="inline-flex items-center justify-center gap-2 bg-tjf-blue text-white font-bold px-6 py-3 rounded-xl hover:bg-tjf-blue-dark transition-colors"
                >
                  {tr.contributeBtn} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={lp("/publication")}
                  className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl hover:border-tjf-blue hover:text-tjf-blue transition-colors"
                >
                  {lang === "en" ? "Browse All Publications" : "Lihat Semua Publikasi"} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </section>
      )}
    </div>
  );
}

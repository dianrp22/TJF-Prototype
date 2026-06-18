"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, BookOpen, Newspaper, Filter, FlaskConical, Lightbulb, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-100 text-blue-700 border-blue-200",
  "Annual Report":    "bg-green-100 text-green-700 border-green-200",
  "Brief":            "bg-amber-100 text-amber-700 border-amber-200",
  "Book":             "bg-purple-100 text-purple-700 border-purple-200",
};

const newsCatColors: Record<string, string> = {
  "Berita Organisasi":  "bg-blue-100 text-blue-700",
  "Organization News":  "bg-blue-100 text-blue-700",
  "Dampak":             "bg-green-100 text-green-700",
  "Impact":             "bg-green-100 text-green-700",
  "Kegiatan":           "bg-amber-100 text-amber-700",
  "Events":             "bg-amber-100 text-amber-700",
  "Cerita Dampak":      "bg-purple-100 text-purple-700",
  "Impact Story":       "bg-purple-100 text-purple-700",
  "Riset":              "bg-emerald-100 text-emerald-700",
  "Research":           "bg-emerald-100 text-emerald-700",
};

type Tab = "all" | "articles" | "publications" | "research" | "initiatives";

interface Props {
  displayPubs: any[];
  displayNews: any[];
  relatedResearch: any[];
  relatedInitiatives: any[];
  otherTopics: any[];
  lang: string;
  lp: (path: string) => string;
  ui: {
    back: string;
    all: string;
    articles: string;
    publications: string;
    relatedPubs: string;
    latestNews: string;
    otherTopics: string;
    relatedResearch: string;
    relatedInit: string;
    exploreResearch: string;
    exploreInit: string;
    research: string;
    initiatives2: string;
    readMore: string;
    sources: string;
    empty: string;
  };
}

export default function TopicDetailContent({ displayPubs, displayNews, relatedResearch, relatedInitiatives, otherTopics, lang, lp, ui }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all",          label: ui.all,          count: displayPubs.length + displayNews.length + relatedResearch.length + relatedInitiatives.length },
    { key: "initiatives",  label: ui.initiatives2, count: relatedInitiatives.length },
    { key: "research",     label: ui.research,     count: relatedResearch.length },
    { key: "publications", label: ui.publications, count: displayPubs.length },
    { key: "articles",     label: ui.articles,     count: displayNews.length },
  ];

  return (
    <>
      {/* ── CONTENT ──────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href={lp("/topic")} className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> {ui.back}
          </Link>

          {/* Tab bar */}
          <div className="flex items-center gap-2 mb-10 border-b border-gray-100 pb-4">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === tab.key
                    ? "bg-tjf-blue text-white shadow-sm"
                    : "text-gray-500 hover:text-tjf-blue hover:bg-gray-50"
                }`}
              >
                {tab.label}
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Articles */}
          {(activeTab === "all" || activeTab === "articles") && displayNews.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-6">
                <Newspaper className="w-4 h-4 text-tjf-amber" />
                <h2 className="text-lg font-black text-gray-900">{ui.latestNews}</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayNews.map((news, i) => (
                  <AnimatedSection key={news.id} delay={i * 0.07}>
                    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-amber/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={news.image} alt={news.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${newsCatColors[news.category] ?? "bg-gray-100 text-gray-600"}`}>
                            {news.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-[10px] text-gray-400 mb-2 font-medium">{news.date}</p>
                        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-amber transition-colors flex-1 line-clamp-3">{news.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{news.excerpt}</p>
                        <Link href={lp(`/news/${news.slug}`)} className="inline-flex items-center gap-1 text-tjf-amber text-xs font-bold group-hover:gap-2 transition-all duration-200">
                          {ui.readMore} <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {(activeTab === "all" || activeTab === "publications") && displayPubs.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-tjf-blue" />
                  <h2 className="text-lg font-black text-gray-900">{ui.relatedPubs}</h2>
                </div>
                <Link href={lp("/publication")} className="text-xs font-bold text-tjf-blue hover:underline inline-flex items-center gap-1">
                  {lang === "en" ? "View all" : "Lihat semua"} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayPubs.map((pub, i) => (
                  <AnimatedSection key={pub.id} delay={i * 0.07}>
                    <Link href={lp(`/publication/${pub.slug}`)} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-blue/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={pub.image} alt={pub.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catColors[pub.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                            {pub.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs text-gray-400 mb-2">{pub.date}</p>
                        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-blue transition-colors flex-1 line-clamp-3">{pub.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{pub.description}</p>
                        <div className="inline-flex items-center gap-1 text-tjf-blue text-xs font-bold group-hover:gap-2 transition-all duration-200">
                          {ui.readMore} <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {/* Research */}
          {(activeTab === "all" || activeTab === "research") && relatedResearch.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-tjf-blue" />
                  <h2 className="text-lg font-black text-gray-900">{ui.relatedResearch}</h2>
                </div>
                <Link href={lp("/publication")} className="text-xs font-bold text-tjf-blue hover:underline inline-flex items-center gap-1">
                  {ui.exploreResearch} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedResearch.map((pub, i) => (
                  <AnimatedSection key={pub.id} delay={i * 0.07}>
                    <Link href={lp(`/publication/${pub.slug}`)} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-blue/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={pub.image} alt={pub.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catColors[pub.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                            {pub.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-xs text-gray-400 mb-2">{pub.date}</p>
                        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-blue transition-colors flex-1 line-clamp-3">{pub.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{pub.description}</p>
                        <div className="inline-flex items-center gap-1 text-tjf-blue text-xs font-bold group-hover:gap-2 transition-all duration-200">
                          {ui.readMore} <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {/* Initiative Stories */}
          {(activeTab === "all" || activeTab === "initiatives") && relatedInitiatives.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-tjf-amber" />
                  <h2 className="text-lg font-black text-gray-900">{ui.relatedInit}</h2>
                </div>
                <Link href={lp("/initiatives")} className="text-xs font-bold text-tjf-amber hover:underline inline-flex items-center gap-1">
                  {ui.exploreInit} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {relatedInitiatives.map((story, i) => (
                  <AnimatedSection key={story.id} delay={i * 0.07}>
                    <Link href={lp(`/initiatives/${story.initiativeSlug}/${story.slug}`)} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-amber/30 transition-all duration-300 hover:-translate-y-1 h-full">
                      <div className="relative h-44 overflow-hidden">
                        <Image src={story.image} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                            {lang === "en" ? "Initiative" : "Inisiatif"}
                          </span>
                        </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <p className="text-[10px] text-gray-400 mb-2 font-medium flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" /> {story.location}
                        </p>
                        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-amber transition-colors flex-1 line-clamp-3">{story.title}</h3>
                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{story.excerpt}</p>
                        <div className="inline-flex items-center gap-1 text-tjf-amber text-xs font-bold group-hover:gap-2 transition-all duration-200">
                          {ui.readMore} <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── OTHER TOPICS ─────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-gray-900">{ui.otherTopics}</h2>
              <Link href={lp("/topic")} className="text-xs font-bold text-tjf-blue hover:underline inline-flex items-center gap-1">
                {lang === "en" ? "All topics" : "Semua topik"} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherTopics.map((other) => (
                <Link
                  key={other.id}
                  href={lp(`/topic/${other.slug}`)}
                  className="group relative rounded-2xl overflow-hidden h-44 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Image src={other.image} alt={other.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div>
                      <span className="text-lg mr-2">{other.icon}</span>
                      <h3 className="text-white font-black text-sm leading-tight inline">{other.title}</h3>
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-3 h-3 text-gray-900" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}

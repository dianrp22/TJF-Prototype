"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useT } from "@/lib/i18n";
import { usePublicData } from "@/lib/usePublicData";
import type { Lang } from "@/contexts/LanguageContext";

const catStyleId: Record<string, string> = {
  "Berita Organisasi": "bg-blue-100 text-blue-700",
  "Dampak":            "bg-green-100 text-green-700",
  "Kegiatan":          "bg-amber-100 text-amber-700",
  "Cerita Dampak":     "bg-purple-100 text-purple-700",
  "Publikasi":         "bg-blue-100 text-blue-700",
  "Riset":             "bg-emerald-100 text-emerald-700",
};

const catStyleEn: Record<string, string> = {
  "Organization News": "bg-blue-100 text-blue-700",
  "Impact":            "bg-green-100 text-green-700",
  "Events":            "bg-amber-100 text-amber-700",
  "Impact Story":      "bg-purple-100 text-purple-700",
  "Publication":       "bg-blue-100 text-blue-700",
  "Research":          "bg-emerald-100 text-emerald-700",
};

interface Props {
  params: { lang: string };
}

export default function NewsPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const tr = useT(lang as Lang).news;
  const { newsItems } = usePublicData(lang);
  const catStyle = lang === "en" ? catStyleEn : catStyleId;

  const featured = newsItems[0];
  const rest = newsItems.slice(1);

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-tjf-blue-dark to-tjf-blue text-white min-h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl font-black mb-3">{tr.title}</h1>
            <p className="text-blue-100 text-lg max-w-xl leading-relaxed">{tr.subtitle}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured */}
        {featured && (
          <AnimatedSection className="mb-10">
            <Link href={lp(`/news/${(featured as any).slug}`)} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col lg:flex-row">
              <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden min-h-[240px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${catStyle[featured.category] ?? "bg-gray-100 text-gray-600"}`}>
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="flex-1 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-gray-400 font-medium">{featured.date}</span>
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-tjf-blue transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-gray-500 text-base leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="inline-flex items-center gap-2 text-tjf-blue font-bold text-sm group-hover:gap-3 transition-all duration-200">
                  {tr.readMore} <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </AnimatedSection>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((news, i) => (
            <AnimatedSection key={news.id} delay={i * 0.07}>
              <Link href={lp(`/news/${(news as any).slug}`)} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-blue/20 transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catStyle[news.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-[10px] text-gray-400 mb-2 font-medium">{news.date}</p>
                  <h3 className="font-black text-gray-900 text-base leading-snug mb-2 group-hover:text-tjf-blue transition-colors flex-1">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-4">{news.excerpt}</p>
                  <div className="inline-flex items-center gap-1 text-tjf-blue text-sm font-bold group-hover:gap-2 transition-all duration-200">
                    {tr.readMore} <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}

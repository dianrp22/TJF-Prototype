"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Tag, Share2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { usePublicData } from "@/lib/usePublicData";

interface Props {
  params: { lang: string; slug: string };
}

const catColors: Record<string, string> = {
  "Berita Organisasi":  "bg-blue-100 text-blue-700 border-blue-200",
  "Organization News":  "bg-blue-100 text-blue-700 border-blue-200",
  "Dampak":             "bg-green-100 text-green-700 border-green-200",
  "Impact":             "bg-green-100 text-green-700 border-green-200",
  "Kegiatan":           "bg-amber-100 text-amber-700 border-amber-200",
  "Events":             "bg-amber-100 text-amber-700 border-amber-200",
  "Cerita Dampak":      "bg-purple-100 text-purple-700 border-purple-200",
  "Impact Story":       "bg-purple-100 text-purple-700 border-purple-200",
  "Publikasi":          "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Publication":        "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Riset":              "bg-teal-100 text-teal-700 border-teal-200",
  "Research":           "bg-teal-100 text-teal-700 border-teal-200",
};

const topicLabels: Record<string, { id: string; en: string }> = {
  "food-security":  { id: "Ketahanan Pangan", en: "Food Security" },
  "agriculture":    { id: "Pertanian",         en: "Agriculture" },
  "suboptimal-land":{ id: "Lahan Suboptimal",  en: "Suboptimal Land" },
  "livelihood":     { id: "Penghidupan",       en: "Livelihood" },
  "landscape":      { id: "Lanskap",           en: "Landscape" },
  "governance":     { id: "Tata Kelola",       en: "Governance" },
};

type NewsItem = { slug: string; id: number; title: string; category: string; date: string; excerpt: string; image: string; topics?: string[]; content: string[] };

export default function NewsDetailPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { newsItems } = usePublicData(lang);

  const article = (newsItems as unknown as NewsItem[]).find((n) => n.slug === params.slug);
  if (!article) return <div className="min-h-screen flex items-center justify-center text-gray-400">Konten tidak ditemukan.</div>;

  const otherArticles = (newsItems as unknown as NewsItem[]).filter((n) => n.slug !== params.slug).slice(0, 3);

  const ui = {
    back:         lang === "en" ? "Back to News"      : "Kembali ke Berita",
    moreArticles: lang === "en" ? "More News"         : "Berita Lainnya",
    topics:       lang === "en" ? "Topics"            : "Topik",
    category:     lang === "en" ? "Category"          : "Kategori",
    share:        lang === "en" ? "Share"             : "Bagikan",
    readMore:     lang === "en" ? "Read More"         : "Selengkapnya",
  };

  return (
    <div className="bg-white">
      {/* ── HERO IMAGE ───────────────────────────────────── */}
      <section className="relative h-[380px] sm:h-[480px] overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-end px-4 sm:px-10 pb-10 max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-3 flex-wrap">
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${catColors[article.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-white/60 text-xs">
              <Calendar className="w-3 h-3" />
              {article.date}
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-black text-white leading-tight">
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ────────────────────────────── */}
      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

            {/* Main content */}
            <div>
              <Link
                href={lp("/news")}
                className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> {ui.back}
              </Link>

              {/* Lead */}
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-tjf-amber pl-5">
                {article.excerpt}
              </p>

              {/* Article body */}
              <div className="prose prose-gray max-w-none">
                {(article.content as string[]).map((para, i) => (
                  <p key={i} className="text-gray-700 leading-[1.9] mb-6 text-base">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Category */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{ui.category}</h3>
                <span className={`inline-block text-sm font-bold px-3 py-1.5 rounded-full border ${catColors[article.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {article.category}
                </span>
              </div>

              {/* Topics */}
              {article.topics && (article.topics as string[]).length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-5">
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                    <span className="flex items-center gap-1.5"><Tag className="w-3 h-3" /> {ui.topics}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(article.topics as string[]).map((slug) => {
                      const label = topicLabels[slug]?.[lang as "id" | "en"] ?? slug;
                      return (
                        <Link
                          key={slug}
                          href={lp(`/topic/${slug}`)}
                          className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full hover:border-tjf-blue hover:text-tjf-blue transition-colors"
                        >
                          {label} <ArrowRight className="w-3 h-3" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Share */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                  <span className="flex items-center gap-1.5"><Share2 className="w-3 h-3" /> {ui.share}</span>
                </h3>
                <div className="flex gap-2">
                  {[
                    { label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.068 5.45-6.068zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
                    { label: "LinkedIn",    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                    { label: "WhatsApp",   path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
                  ].map((s) => (
                    <button key={s.label} aria-label={s.label} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-tjf-blue hover:text-white transition-colors">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.path} /></svg>
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── MORE ARTICLES ─────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-black text-gray-900">{ui.moreArticles}</h2>
              <Link href={lp("/news")} className="text-xs font-bold text-tjf-blue hover:underline inline-flex items-center gap-1">
                {lang === "en" ? "All news" : "Semua berita"} <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherArticles.map((other, i) => (
                <AnimatedSection key={other.id} delay={i * 0.08}>
                  <Link
                    href={lp(`/news/${other.slug}`)}
                    className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-amber/30 transition-all duration-300 hover:-translate-y-1 h-full"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${catColors[other.category] ?? "bg-white/80 text-gray-700 border-white/50"}`}>
                          {other.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-[10px] text-gray-400 mb-1.5 font-medium">{other.date}</p>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-3 group-hover:text-tjf-amber transition-colors flex-1 line-clamp-3">
                        {other.title}
                      </h3>
                      <div className="inline-flex items-center gap-1 text-tjf-amber text-xs font-bold group-hover:gap-2 transition-all duration-200">
                        {ui.readMore} <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

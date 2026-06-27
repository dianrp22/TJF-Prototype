"use client";

import { useState } from "react";
import { Search, Download, Filter, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AnimatedSection from "@/components/ui/AnimatedSection";

const categories = ["all", "Research Article", "Annual Report", "Brief", "Book"];

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-50 text-blue-700",
  "Annual Report":    "bg-green-50 text-green-700",
  "Brief":            "bg-amber-50 text-amber-700",
  "Book":             "bg-purple-50 text-purple-700",
};

interface Publication {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  description: string;
  tags: string[];
  image: string;
  [key: string]: unknown;
}

interface Tr {
  badge: string;
  title: string;
  subtitle: string;
  desc: string;
  searchPlaceholder: string;
  all: string;
  download: string;
  readMore: string;
}

interface Props {
  publications: Publication[];
  lang: string;
  tr: Tr;
}

export default function PublicationContent({ publications, lang, tr }: Props) {
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;

  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch]                 = useState("");
  const [showFilter, setShowFilter]         = useState(false);

  const allLabel = tr.all;

  const filtered = publications.filter((p) => {
    const matchCat    = activeCategory === "all" || p.category === activeCategory;
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const counts: Record<string, number> = { all: publications.length };
  categories.slice(1).forEach((c) => { counts[c] = publications.filter((p) => p.category === c).length; });

  const catLabel = (c: string) => c === "all" ? allLabel : c;

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-tjf-blue to-tjf-blue-light text-white min-h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl font-black mb-1">{tr.title}</h1>
            <p className="text-blue-100 text-lg opacity-90">{tr.subtitle}</p>
            <p className="text-blue-200 text-sm mt-1 max-w-md">{tr.desc}</p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter bar */}
        <AnimatedSection className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={tr.searchPlaceholder}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-tjf-blue/20 focus:border-tjf-blue transition-all"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all lg:hidden ${showFilter ? "bg-tjf-blue text-white border-tjf-blue" : "border-gray-200 text-gray-600 hover:border-tjf-blue"}`}
          >
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0 hidden lg:block">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sticky top-24">
              <h3 className="font-black text-gray-800 text-sm mb-4">
                {lang === "en" ? "Category" : "Kategori"}
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between transition-all duration-200 ${
                        activeCategory === cat
                          ? "bg-tjf-blue text-white font-bold shadow-md"
                          : "text-gray-600 hover:bg-white hover:shadow-sm font-medium"
                      }`}
                    >
                      <span>{catLabel(cat)}</span>
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${activeCategory === cat ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}>
                        {counts[cat] ?? 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-500">
                {lang === "en" ? "Showing" : "Menampilkan"}{" "}
                <span className="font-black text-gray-900">{filtered.length}</span>{" "}
                {lang === "en" ? "publications" : "publikasi"}
                {activeCategory !== "all" && (
                  <span> {lang === "en" ? "in" : "dalam"} <span className="text-tjf-blue font-semibold">{activeCategory}</span></span>
                )}
              </p>
              {(activeCategory !== "all" || search) && (
                <button
                  onClick={() => { setActiveCategory("all"); setSearch(""); }}
                  className="text-xs text-gray-400 hover:text-tjf-blue flex items-center gap-1 font-semibold transition-colors"
                >
                  <X className="w-3 h-3" /> Reset
                </button>
              )}
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div className="space-y-3" layout>
                {filtered.map((pub, i) => (
                  <motion.div
                    key={pub.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-tjf-blue/30 hover:shadow-card transition-all duration-300 flex gap-4 items-start"
                  >
                    <Link href={lp(`/publication/${(pub as any).slug}`)} className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <Image src={pub.image} alt={pub.title} fill className="object-cover" sizes="64px" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[pub.category] || "bg-gray-100 text-gray-600"}`}>{pub.category}</span>
                        <span className="text-[10px] text-gray-400">{pub.date}</span>
                      </div>
                      <Link href={lp(`/publication/${(pub as any).slug}`)}>
                        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1.5 group-hover:text-tjf-blue transition-colors cursor-pointer">{pub.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 mb-2">{pub.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {pub.tags.map((tag: string) => (
                          <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">#{tag}</span>
                        ))}
                      </div>
                      <Link href={lp(`/publication/${(pub as any).slug}`)} className="inline-flex items-center gap-1 text-[11px] font-bold text-tjf-blue opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:gap-1.5">
                        {tr.readMore} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <button className="flex-shrink-0 flex items-center gap-1.5 self-start bg-tjf-blue-pale text-tjf-blue text-xs font-bold px-3 py-2 rounded-xl hover:bg-tjf-blue hover:text-white transition-all duration-200 group-hover:shadow-md">
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lang === "en" ? "Download" : "Unduh"}</span>
                    </button>
                  </motion.div>
                ))}
                {filtered.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-400">
                    <div className="text-5xl mb-3">📭</div>
                    <p className="font-semibold">{lang === "en" ? "No publications found." : "Tidak ada publikasi yang cocok."}</p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

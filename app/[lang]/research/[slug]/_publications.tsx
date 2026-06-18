"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, FlaskConical, Filter } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-100 text-blue-700 border-blue-200",
  "Annual Report":    "bg-green-100 text-green-700 border-green-200",
  "Brief":            "bg-amber-100 text-amber-700 border-amber-200",
  "Book":             "bg-purple-100 text-purple-700 border-purple-200",
};

interface Props {
  areaPubs: any[];
  categories: string[];
  otherAreas: any[];
  areaSlug: string;
  lang: string;
  lp: (path: string) => string;
  tr: {
    back: string;
    all: string;
    outputLabel: string;
    results: string;
    empty: string;
    related: string;
    readMore: string;
  };
}

export default function ResearchPublications({ areaPubs, categories, otherAreas, areaSlug, lang, lp, tr }: Props) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all"
    ? areaPubs
    : areaPubs.filter((p) => p.category === activeFilter);

  return (
    <>
      {/* ── RESEARCH OUTPUT ──────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={lp("/research")}
            className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            {tr.back}
          </Link>

          {/* Section heading */}
          <div className="mb-8">
            <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-2">
              <FlaskConical className="w-3.5 h-3.5" />
              {tr.outputLabel}
            </span>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-2 flex-wrap mb-10">
            <Filter className="w-4 h-4 text-gray-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeFilter === cat
                    ? "bg-tjf-blue text-white border-tjf-blue shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-tjf-blue/40 hover:text-tjf-blue"
                }`}
              >
                {cat === "all" ? tr.all : cat}
              </button>
            ))}
            <span className="ml-auto text-xs text-gray-400 font-medium">
              {filtered.length} {tr.results}
            </span>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">{tr.empty}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((pub, i) => (
                <AnimatedSection key={pub.id} delay={i * 0.07}>
                  <Link
                    href={lp(`/research/${areaSlug}/${pub.slug}`)}
                    className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-tjf-blue/30 hover:shadow-card transition-all duration-300 h-full"
                  >
                    <div className="relative h-40 bg-gray-50 overflow-hidden">
                      <Image
                        src={pub.image}
                        alt={pub.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${catColors[pub.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {pub.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <p className="text-xs text-gray-400 mb-2">{pub.date}</p>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-blue transition-colors line-clamp-3 flex-1">
                        {pub.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">
                        {pub.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-tjf-blue text-xs font-bold group-hover:gap-2.5 transition-all duration-200">
                        {tr.readMore} <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── OTHER AREAS ──────────────────────────────────── */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-xl font-black text-gray-900 mb-6">{tr.related}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {otherAreas.map((other) => (
                <Link
                  key={other.id}
                  href={lp(`/research/${other.slug}`)}
                  className="group relative rounded-2xl overflow-hidden h-44 hover:-translate-y-1 transition-transform duration-300"
                >
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <h3 className="text-white font-black text-sm leading-tight flex-1 pr-3">
                      {other.title}
                    </h3>
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

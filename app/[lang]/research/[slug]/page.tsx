import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, FlaskConical } from "lucide-react";
import { getServerData } from "@/lib/getServerData";
import ResearchPublications from "./_publications";

interface Props {
  params: { lang: string; slug: string };
}

export default function ResearchAreaPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { researchFocusAreas, publications } = getServerData(lang);

  const area = researchFocusAreas.find((a) => a.slug === params.slug);
  if (!area) return notFound();

  const areaPubs = publications.filter((p) =>
    (p as typeof p & { researchAreas?: string[] }).researchAreas?.includes(params.slug)
  );

  const categories = ["all", ...Array.from(new Set(areaPubs.map((p) => p.category)))];
  const otherAreas = researchFocusAreas.filter((a) => a.slug !== params.slug);

  const tr = {
    back:        lang === "en" ? "Back to Research"                   : "Kembali ke Riset",
    all:         lang === "en" ? "All"                                : "Semua",
    outputLabel: lang === "en" ? "Research Output"                    : "Output Riset",
    results:     lang === "en" ? "results"                            : "hasil",
    empty:       lang === "en" ? "No research output found in this category." : "Belum ada output riset dalam kategori ini.",
    related:     lang === "en" ? "Other Research Topics"              : "Topik Riset Lainnya",
    readMore:    lang === "en" ? "Read More"                          : "Selengkapnya",
  };

  return (
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative h-[420px] sm:h-[500px] overflow-hidden">
        <Image
          src={area.image}
          alt={area.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10 max-w-7xl mx-auto w-full">
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                <FlaskConical className="w-3 h-3" />
                {lang === "en" ? "Research Focus" : "Fokus Riset"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3">
                {area.title}
              </h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-2xl">
                {area.description}
              </p>
              <div className="flex items-center gap-4 mt-5">
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-white/80" />
                  <span className="text-white text-xs font-bold">
                    {area.stat.publications} {lang === "en" ? "publications" : "publikasi"}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                  <span className="text-white text-xs font-bold">{area.stat.years}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID + OTHER AREAS (client) ──────────── */}
      <ResearchPublications
        areaPubs={areaPubs as any[]}
        categories={categories}
        otherAreas={otherAreas as any[]}
        areaSlug={params.slug}
        lang={lang}
        tr={tr}
      />
    </div>
  );
}

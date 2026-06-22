"use client";
import Image from "next/image";
import { usePublicData } from "@/lib/usePublicData";
import StoriesContent from "./_stories";

interface Props {
  params: { lang: string; slug: string };
}

export default function InitiativeDetailPage({ params }: Props) {
  const { lang, slug } = params;
  const { initiatives, initiativeStories } = usePublicData(lang);

  const initiative = initiatives.find((i) => i.slug === slug);
  if (!initiative) return <div className="min-h-screen flex items-center justify-center text-gray-400">Konten tidak ditemukan.</div>;

  const stories = initiativeStories.filter((s) => s.initiativeSlug === slug);

  const locations   = ["all", ...Array.from(new Set(stories.map((s) => s.location)))];
  const landTypes   = ["all", ...Array.from(new Set(stories.map((s) => s.landType)))];
  const commodities = ["all", ...Array.from(new Set(stories.map((s) => s.commodity)))];

  const ui = {
    home:        lang === "en" ? "Home"         : "Beranda",
    initiatives: lang === "en" ? "Initiatives"  : "Inisiatif",
    back:        lang === "en" ? "Back to Initiatives" : "Kembali ke Inisiatif",
    location:    lang === "en" ? "Location"     : "Lokasi",
    landType:    lang === "en" ? "Land Type"    : "Tipe Lahan",
    commodity:   lang === "en" ? "Commodity"    : "Komoditas",
    all:         lang === "en" ? "All"          : "Semua",
    stories:     lang === "en" ? "Stories"      : "Cerita",
    results:     lang === "en" ? "results"      : "hasil",
    empty:       lang === "en" ? "No stories found for the selected filters." : "Tidak ada cerita yang cocok dengan filter ini.",
    readMore:    lang === "en" ? "Read Story"   : "Baca Cerita",
  };

  const colorMap: Record<string, string> = {
    green: "bg-tjf-green",
    blue:  "bg-tjf-blue",
    amber: "bg-tjf-amber",
  };
  const badgeColor = colorMap[initiative.color] ?? "bg-tjf-blue";

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO ── */}
      <section className="relative h-[440px] sm:h-[520px] overflow-hidden">
        <Image
          src={(initiative as typeof initiative & { image: string }).image}
          alt={initiative.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
        <div className="absolute inset-0 flex flex-col justify-between px-4 sm:px-10 py-8 max-w-7xl mx-auto w-full">
          <div className="flex items-end justify-between gap-6">
            <div className="flex-1 max-w-2xl">
              <span className={`inline-block text-xs font-black px-3 py-1.5 rounded-full mb-4 text-white ${badgeColor}`}>
                {initiative.icon} {lang === "en" ? "Initiative" : "Inisiatif"}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-3">{initiative.title}</h1>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-5">{initiative.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {[
                  { v: initiative.stats.projects,  l: lang === "en" ? "projects"  : "proyek" },
                  { v: initiative.stats.provinces, l: lang === "en" ? "provinces" : "provinsi" },
                ].map((s) => (
                  <div key={s.l} className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5">
                    <span className="text-white font-black text-sm">{s.v}+</span>
                    <span className="text-white/70 text-xs">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTERS + STORIES ── */}
      <StoriesContent
        stories={stories as any[]}
        lang={lang}
        programSlug={slug}
        ui={ui}
        locations={locations}
        landTypes={landTypes}
        commodities={commodities}
      />
    </div>
  );
}

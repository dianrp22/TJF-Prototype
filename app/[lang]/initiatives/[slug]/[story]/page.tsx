"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Layers, Leaf, Share2, Calendar } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { usePublicData } from "@/lib/usePublicData";

interface Props {
  params: { lang: string; slug: string; story: string };
}

export default function InitiativeStoryPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { initiatives, initiativeStories } = usePublicData(lang);

  const initiative = initiatives.find((i) => i.slug === params.slug);
  const story      = initiativeStories.find((s) => s.slug === params.story && s.initiativeSlug === params.slug);

  if (!initiative || !story) return <div className="min-h-screen flex items-center justify-center text-gray-400">Konten tidak ditemukan.</div>;

  const related = initiativeStories
    .filter((s) => s.initiativeSlug === params.slug && s.slug !== params.story)
    .slice(0, 3);

  const ui = {
    home:        lang === "en" ? "Home"             : "Beranda",
    initiatives: lang === "en" ? "Initiatives"      : "Inisiatif",
    back:        lang === "en" ? `Back to ${initiative.title}` : `Kembali ke ${initiative.title}`,
    related:     lang === "en" ? "Related Stories"  : "Cerita Terkait",
    viewAll:     lang === "en" ? "View All Stories" : "Lihat Semua Cerita",
    share:       lang === "en" ? "Share"            : "Bagikan",
    location:    lang === "en" ? "Location"         : "Lokasi",
    landType:    lang === "en" ? "Land Type"        : "Tipe Lahan",
    commodity:   lang === "en" ? "Commodity"        : "Komoditas",
    readMore:    lang === "en" ? "Read Story"       : "Baca Cerita",
  };

  return (
    <div className="bg-white min-h-screen">
      {/* ── HERO IMAGE ── */}
      <section className="relative h-[360px] sm:h-[460px] overflow-hidden">
        <Image src={story.image} alt={story.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        <div className="absolute inset-0 flex flex-col justify-between px-4 sm:px-10 py-6 max-w-7xl mx-auto w-full">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2 flex-wrap mb-4">
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              <MapPin className="w-3 h-3" /> {story.location}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              <Layers className="w-3 h-3" /> {story.landType}
            </span>
            <span className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              <Leaf className="w-3 h-3" /> {story.commodity}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight">
            {story.title}
          </h1>
          <div className="flex items-center gap-2 mt-3 text-white/60 text-xs">
            <Calendar className="w-3 h-3" />
            {story.date}
          </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT + SIDEBAR ── */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

            {/* Main content */}
            <article>
              <AnimatedSection>
                <Link href={lp(`/initiatives/${initiative.slug}`)}
                  className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                  {ui.back}
                </Link>

                {/* Lead */}
                <p className="text-lg text-gray-600 leading-relaxed mb-8 font-medium border-l-4 border-tjf-green pl-5">
                  {story.excerpt}
                </p>

                {/* Body */}
                <div className="space-y-6">
                  {(story.content as string[]).map((para, i) => (
                    <p key={i} className="text-gray-700 leading-[1.9] text-base">{para}</p>
                  ))}
                </div>

                {/* Share */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3 flex-wrap">
                  <Share2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500 font-medium">{ui.share}:</span>
{[
                  { label: "Twitter / X", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.068 5.45-6.068zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
                  { label: "LinkedIn",    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
                  { label: "WhatsApp",   path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" },
                  { label: "Facebook",   path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
                ].map((s) => (
                  <button key={s.label} aria-label={s.label} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-tjf-blue hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.path} /></svg>
                  </button>
                ))}
                </div>
              </AnimatedSection>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Classification tags */}
              <AnimatedSection direction="right" className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-black text-gray-900 text-sm mb-4">
                  {lang === "en" ? "Classification" : "Klasifikasi"}
                </h3>
                <ul className="space-y-3 text-xs">
                  {[
                    { icon: MapPin, label: ui.location, value: story.location },
                    { icon: Layers, label: ui.landType, value: story.landType },
                    { icon: Leaf,   label: ui.commodity, value: story.commodity },
                  ].map((item) => (
                    <li key={item.label} className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                        <item.icon className="w-3.5 h-3.5" />
                        {item.label}
                      </span>
                      <span className="font-bold text-gray-700 bg-white border border-gray-100 px-2.5 py-1 rounded-full">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>

              {/* Initiative info */}
              <AnimatedSection direction="right" delay={0.07}>
                <Link href={lp(`/initiatives/${initiative.slug}`)}
                  className="group relative block rounded-2xl overflow-hidden h-36 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Image
                    src={(initiative as typeof initiative & { image: string }).image}
                    alt={initiative.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="280px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 p-4 flex flex-col justify-between">
                    <span className="self-start text-[10px] font-bold bg-white/20 backdrop-blur-sm border border-white/30 text-white px-2 py-0.5 rounded-full uppercase tracking-wide">
                      {lang === "en" ? "Initiative" : "Inisiatif"}
                    </span>
                    <div className="flex items-end justify-between gap-2">
                      <p className="text-white font-black text-sm leading-snug">{initiative.title}</p>
                      <ArrowRight className="w-3.5 h-3.5 text-white/70 group-hover:text-white flex-shrink-0" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>

              {/* Related stories */}
              {related.length > 0 && (
                <AnimatedSection direction="right" delay={0.14}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5">
                    <h3 className="font-black text-gray-900 text-sm mb-4">{ui.related}</h3>
                    <div className="space-y-3">
                      {related.map((rel) => (
                        <Link key={rel.id} href={lp(`/initiatives/${initiative.slug}/${rel.slug}`)}
                          className="group flex gap-3 hover:bg-green-50 rounded-xl p-2 -mx-2 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="40px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-700 leading-snug line-clamp-2 group-hover:text-tjf-green transition-colors">
                              {rel.title}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5" /> {rel.location}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link href={lp(`/initiatives/${initiative.slug}`)}
                      className="mt-4 flex items-center justify-center gap-1.5 text-xs text-tjf-green font-bold hover:underline"
                    >
                      {ui.viewAll} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AnimatedSection>
              )}
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FlaskConical } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { useT } from "@/lib/i18n";
import { getServerData } from "@/lib/getServerData";
import type { Lang } from "@/contexts/LanguageContext";

interface Props {
  params: { lang: string };
}

export default function ResearchPage({ params }: Props) {
  const lang = params.lang;
  const tr  = useT(lang as Lang).research;
  const lp  = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { researchFocusAreas } = getServerData(lang);

  return (
    <div className="bg-white">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1600&q=85"
          alt="Research and laboratory work"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tjf-blue-dark/90 via-tjf-blue-dark/70 to-tjf-blue-dark/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wide">
              <FlaskConical className="w-3.5 h-3.5" />
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-5 leading-tight bg-gradient-to-r from-cyan-400 to-[#2D7D46] bg-clip-text text-transparent">
              {tr.title}
            </h1>
            <p className="text-blue-100 text-base leading-relaxed max-w-2xl">
              {tr.subtitle}
            </p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── FOCUS AREAS ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-5 h-px bg-tjf-blue" />
              {tr.focusTitle}
              <span className="w-5 h-px bg-tjf-blue" />
            </span>
            <h2 className="font-display text-3xl font-black text-gray-900 mt-1">{tr.focusSubtitle}</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {researchFocusAreas.map((area, i) => (
              <AnimatedSection key={area.id} delay={i * 0.1}>
                <Link href={lp(`/research/${area.slug}`)} className="group block relative rounded-3xl overflow-hidden h-72 hover:-translate-y-1 transition-transform duration-300">
                  {/* Background photo */}
                  <Image
                    src={area.image}
                    alt={area.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Number badge top-left */}
                  <div className="absolute top-5 left-5 w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white text-xs font-black">
                    {String(area.id).padStart(2, "0")}
                  </div>

                  {/* Content bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                          {area.stat.publications} {lang === "en" ? "publications" : "publikasi"}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">
                          {area.stat.years}
                        </span>
                      </div>
                      <h3 className="text-white font-black text-xl leading-tight mb-1.5">
                        {area.title}
                      </h3>
                      <p className="text-white/75 text-xs leading-relaxed line-clamp-2">
                        {area.description}
                      </p>
                    </div>

                    {/* Arrow button */}
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-tjf-blue to-tjf-blue-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-black mb-3">
              {lang === "en"
                ? "Want to collaborate on research?"
                : "Ingin berkolaborasi dalam penelitian?"}
            </h2>
            <p className="text-blue-100 mb-6 text-sm leading-relaxed">
              {lang === "en"
                ? "TJF welcomes researchers, institutions, and practitioners to jointly produce high-quality, impactful knowledge."
                : "TJF membuka pintu bagi peneliti, lembaga, dan praktisi untuk bersama menghasilkan pengetahuan berkualitas tinggi yang berdampak."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={lp("/contact")}
                className="inline-flex items-center justify-center gap-2 bg-white text-tjf-blue font-bold px-7 py-3 rounded-xl hover:bg-blue-50 transition-colors"
              >
                {lang === "en" ? "Contact Us" : "Hubungi Kami"} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={lp("/publication")}
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/10 transition-colors"
              >
                {lang === "en" ? "Browse Publications" : "Lihat Publikasi"}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

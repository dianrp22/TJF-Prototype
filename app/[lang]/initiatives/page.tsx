"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useT } from "@/lib/i18n";
import { usePublicData } from "@/lib/usePublicData";
import type { Lang } from "@/contexts/LanguageContext";

const colorMap: Record<string, { bg: string; text: string; badge: string; border: string; icon: string }> = {
  green: {
    bg: "from-green-50 to-emerald-50",
    text: "text-tjf-green",
    badge: "bg-tjf-green text-white",
    border: "border-green-100",
    icon: "bg-green-100 text-green-700",
  },
  blue: {
    bg: "from-blue-50 to-sky-50",
    text: "text-tjf-blue",
    badge: "bg-tjf-blue text-white",
    border: "border-blue-100",
    icon: "bg-blue-100 text-blue-700",
  },
  amber: {
    bg: "from-amber-50 to-yellow-50",
    text: "text-tjf-amber",
    badge: "bg-tjf-amber text-white",
    border: "border-amber-100",
    icon: "bg-amber-100 text-amber-700",
  },
};

interface Props {
  params: { lang: string };
}

export default function InitiativesPage({ params }: Props) {
  const lang = params.lang;
  const tr = useT(lang as Lang).initiatives;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { initiatives } = usePublicData(lang);

  const totalProjects  = initiatives.reduce((s, i) => s + i.stats.projects,  0);
  const totalProvinces = Math.max(...initiatives.map((i) => i.stats.provinces));

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=85"
          alt="Agricultural field initiative"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tjf-blue-dark/90 via-tjf-blue-dark/70 to-tjf-blue-dark/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl font-black mb-3">{tr.title}</h1>
            <p className="text-green-100 text-lg max-w-xl leading-relaxed">
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

      {/* Overview Stats */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: tr.statTotalPrograms,  value: String(initiatives.length) },
              { label: tr.statActiveProjects, value: String(totalProjects) },
              { label: tr.statProvinces,      value: String(totalProvinces) },
            ].map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.08}>
                <div className="bg-gradient-to-br from-tjf-blue-pale to-white border border-blue-100 rounded-2xl p-5 text-center hover:shadow-md transition-shadow">
                  <div className="text-3xl font-black text-tjf-blue">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-1">{s.label}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-10 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {initiatives.map((init, i) => {
            const c = colorMap[init.color] || colorMap.blue;
            return (
              <AnimatedSection key={init.id} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <div
                  id={init.slug}
                  className={`group rounded-3xl overflow-hidden border ${c.border} shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col lg:flex-row ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Visual — thumbnail */}
                  <div className="relative lg:w-2/5 min-h-[260px] overflow-hidden">
                    <Image
                      src={(init as typeof init & { image: string }).image}
                      alt={init.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-5 left-5 flex gap-5">
                      {[
                        { v: String(init.stats.projects),  l: tr.statProjects },
                        { v: String(init.stats.provinces), l: tr.statProvincesSmall },
                      ].map((s) => (
                        <div key={s.l} className="text-center">
                          <div className="text-2xl font-black text-white">
                            <AnimatedCounter value={s.v} />
                          </div>
                          <div className="text-xs text-white/70">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-8 lg:p-10 bg-white">
                    <span className={`inline-block text-xs font-black px-3 py-1 rounded-full mb-4 ${c.badge}`}>
                      Program {init.id} {tr.programOf} 4
                    </span>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">{init.title}</h2>
                    <p className={`text-sm font-bold mb-4 ${c.text}`}>{init.tagline}</p>
                    <p className="text-gray-500 text-base leading-relaxed mb-6">{init.description}</p>

                    <div className="mb-6">
                      <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">{tr.focusTitle}</h4>
                      <ul className="space-y-2">
                        {init.focus.map((f: string) => (
                          <li key={f} className="flex items-start gap-2.5 text-base text-gray-600">
                            <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.text}`} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={lp(`/initiatives/${init.slug}`)}
                      className={`inline-flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${c.badge}`}
                    >
                      {tr.viewDetail}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-tjf-blue-pale to-white">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-black text-gray-900 mb-3">{tr.partnersTitle}</h2>
            <p className="text-gray-500 mb-6">{tr.partnersSubtitle}</p>
            <Link
              href={lp("/contact")}
              className="inline-flex items-center gap-2 bg-tjf-blue text-white font-bold px-8 py-3.5 rounded-xl hover:bg-tjf-blue-dark hover:shadow-glow-blue transition-all duration-300 hover:scale-[1.02]"
            >
              {tr.partnersBtn} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

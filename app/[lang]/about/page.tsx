import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PartnerLogo from "@/components/ui/PartnerLogo";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useT } from "@/lib/i18n";
import { getServerData } from "@/lib/getServerData";
import type { Lang } from "@/contexts/LanguageContext";

interface Props {
  params: { lang: string };
}

export default function AboutPage({ params }: Props) {
  const lang = params.lang;
  const tr = useT(lang as Lang).about;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { values, team } = tr;
  const { stats, partners } = getServerData(lang);

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=85"
          alt="People working together"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-tjf-blue-dark/90 via-tjf-blue-dark/70 to-tjf-blue-dark/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl sm:text-6xl font-black mb-4 leading-tight bg-gradient-to-r from-cyan-400 to-[#2D7D46] bg-clip-text text-transparent">
              Tay Juhana <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-300">
                Foundation
              </span>
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">{tr.subtitle}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-3">
                <span className="w-4 h-px bg-tjf-blue" /> {tr.mvBadge}
              </span>
              <h2 className="font-display text-4xl font-black text-gray-900 mb-8">{tr.whyTitle}</h2>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-4 border-tjf-blue">
                  <h3 className="font-black text-gray-900 mb-2">{tr.visionLabel}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{tr.visionText}</p>
                </div>
                <div className="relative pl-6 border-l-4 border-tjf-green">
                  <h3 className="font-black text-gray-900 mb-2">{tr.missionLabel}</h3>
                  <p className="text-gray-500 text-base leading-relaxed">{tr.missionText}</p>
                </div>
                <div className="space-y-2 pt-2">
                  {[tr.check1, tr.check2, tr.check3].map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-base text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-tjf-green flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="grid grid-cols-2 gap-4">
                {stats.map((s, i) => (
                  <div key={s.label} className={`rounded-2xl p-6 text-center ${i % 2 === 0 ? "bg-tjf-blue-pale border border-blue-100" : "bg-tjf-green-light border border-green-100"}`}>
                    <div className="text-3xl mb-2">{s.icon}</div>
                    <div className={`text-3xl font-black mb-1 ${i % 2 === 0 ? "text-tjf-blue" : "text-tjf-green"}`}>
                      <AnimatedCounter value={s.value} />
                    </div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-tjf-green text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-4 h-px bg-tjf-green" /> {tr.valuesBadge} <span className="w-4 h-px bg-tjf-green" />
            </span>
            <h2 className="font-display text-4xl font-black text-gray-900 mt-1">{tr.valuesTitle}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.08}>
                <div className="group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-card-hover hover:border-tjf-blue/20 transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="w-12 h-12 bg-tjf-blue-pale rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-black text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-base text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-4 h-px bg-tjf-blue" /> {tr.teamBadge}
            </span>
            <h2 className="font-display text-4xl font-black text-gray-900 mt-1">{tr.teamTitle}</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <div className="group text-center bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-card-hover hover:border-tjf-blue/20 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-tjf-blue-pale to-blue-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {t.icon}
                  </div>
                  <h4 className="font-black text-gray-900 text-sm">{t.name}</h4>
                  <p className="text-xs text-tjf-blue font-bold mt-0.5 mb-2">{t.role}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.bio}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-12 bg-tjf-blue-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">{tr.partnersBadge}</p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-6 animate-marquee w-max">
              {[...(partners as { name: string; logo: string }[]), ...(partners as { name: string; logo: string }[])].map((p, i) => (
                <PartnerLogo key={i} name={p.name} logo={p.logo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-tjf-blue to-tjf-blue-dark text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-20" />
        <AnimatedSection>
          <div className="relative max-w-2xl mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-black mb-3">{tr.ctaTitle}</h2>
            <p className="text-blue-100 mb-6">{tr.ctaSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href={lp("/contact")} className="inline-flex items-center justify-center gap-2 bg-white text-tjf-blue font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
                {tr.ctaBtn1} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={lp("/contact")} className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors">
                {tr.ctaBtn2}
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

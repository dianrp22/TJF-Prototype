"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Sprout, MapPin, Search } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { useT } from "@/lib/i18n";
import { usePublicData } from "@/lib/usePublicData";
import PartnerLogo from "@/components/ui/PartnerLogo";
import type { Lang } from "@/contexts/LanguageContext";

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-100 text-blue-700",
  "Annual Report":    "bg-green-100 text-green-700",
  "Brief":            "bg-amber-100 text-amber-700",
  "Book":             "bg-purple-100 text-purple-700",
};

interface Props {
  params: { lang: string };
}

export default function HomePage({ params }: Props) {
  const lang = params.lang;
  const tr = useT(lang as Lang).home;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { publications, initiatives, newsItems, knowledgeTopics, partners } = usePublicData(lang);

  const totalProjects  = initiatives.reduce((s, i) => s + i.stats.projects,  0);
  const totalProvinces = Math.max(...initiatives.map((i) => i.stats.provinces));

  const statsData = [
    { labelKey: "statLabel1" as const, value: "150+",                icon: BookOpen, color: "from-blue-500 to-tjf-blue" },
    { labelKey: "statLabel2" as const, value: `${totalProjects}+`,   icon: Sprout,   color: "from-tjf-green to-emerald-600" },
    { labelKey: "statLabel4" as const, value: String(totalProvinces), icon: MapPin,  color: "from-purple-500 to-violet-600" },
  ];

  const initLabels = lang === "id"
    ? { projects: "proyek", provinces: "provinsi" }
    : { projects: "projects", provinces: "provinces" };

  return (
    <div className="bg-white overflow-x-hidden">
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Background split — kiri putih, kanan foto */}
        <div className="absolute inset-0 flex">
          <div className="w-full lg:w-1/2 bg-white" />
          <div className="hidden lg:block lg:w-1/2 relative">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=85"
              alt="Indonesian farmland"
              fill
              className="object-cover"
              priority
              sizes="50vw"
            />
            {/* Fade dari kiri ke kanan */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
            {/* Latest publication card */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
                <p className="text-[10px] text-gray-400 mb-1 font-bold uppercase tracking-widest">
                  {lang === "en" ? "Latest Publication" : "Publikasi Terbaru"}
                </p>
                <p className="text-sm font-bold text-gray-900 leading-snug line-clamp-2">{publications[0]?.title}</p>
                <Link href={lp(`/publication/${(publications[0] as any)?.slug}`)} className="inline-flex items-center gap-1 text-tjf-blue text-xs font-bold mt-2 hover:gap-2 transition-all">
                  {lang === "en" ? "Read more" : "Baca selengkapnya"} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Konten — sejajar dengan navbar max-w-7xl */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)] flex items-center">
          <div className="w-full lg:w-1/2 py-28 lg:py-0">
            <div className="hero-1">
              <span className="inline-flex items-center gap-2 bg-tjf-blue/10 border border-tjf-blue/20 text-tjf-blue text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-tjf-green rounded-full animate-pulse" />
                {tr.heroBadge}
              </span>
            </div>
            <h1 className="hero-2 font-display text-5xl sm:text-6xl xl:text-7xl font-black text-tjf-blue-dark leading-[1.05] tracking-tight mb-4">
              {tr.heroLine1}<br />
              {tr.heroLine2}<br />
              <span className="relative inline-block">
                <span className="relative z-10">{tr.heroLine3} {tr.heroLine4}</span>
                <span className="absolute bottom-1 left-0 w-full h-4 bg-tjf-amber/30 -z-0 rounded" />
              </span>
            </h1>
            <p className="hero-3 text-gray-500 text-lg leading-relaxed mb-10 max-w-md">{tr.heroSubtitle}</p>
            <div className="hero-4 flex flex-col sm:flex-row gap-3">
              <Link
                href={lp("/topic")}
                className="group inline-flex items-center justify-center gap-2 bg-tjf-blue text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:bg-tjf-blue-dark hover:scale-[1.02] transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                {tr.heroCta1}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={lp("/initiatives")}
                className="inline-flex items-center justify-center gap-2 border-2 border-tjf-blue text-tjf-blue font-semibold px-6 py-3.5 rounded-xl hover:bg-tjf-blue-pale transition-all duration-300"
              >
                {tr.heroCta2}
              </Link>
            </div>
            <div className="flex items-center gap-8 mt-12 pt-8 border-t border-gray-100">
              {statsData.map((s) => (
                <div key={s.labelKey}>
                  <div className="text-2xl font-black text-tjf-blue-dark font-display">{s.value}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">{tr[s.labelKey as keyof typeof tr]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── KNOWLEDGE TOPICS ──────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-2">
                <span className="w-4 h-px bg-tjf-blue" />
                {tr.khBadge}
              </span>
              <h2 className="font-display text-4xl font-black text-gray-900">{tr.khTitle}</h2>
              <p className="text-gray-500 mt-2 max-w-md text-base leading-relaxed">{tr.khSubtitle}</p>
            </div>
            <Link href={lp("/topic")} className="hidden sm:inline-flex items-center gap-1.5 text-tjf-blue text-sm font-bold hover:gap-3 transition-all duration-200">
              {tr.khViewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {knowledgeTopics.slice(0, 3).map((topic, i) => (
              <AnimatedSection key={topic.id} delay={i * 0.07}>
                <Link
                  href={lp(`/topic/${topic.slug}`)}
                  className="group relative block rounded-2xl overflow-hidden h-56 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                >
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                  <div className="relative h-full flex flex-col justify-end p-4">
                    <div>
                      <div className="text-white font-bold text-sm leading-tight mb-0.5 drop-shadow">{topic.title}</div>
                      <div className="text-white/70 text-[10px] font-medium">{topic.count} {tr.khSources}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="w-3 h-3 text-white" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INITIATIVES ───────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-tjf-green text-xs font-bold uppercase tracking-widest mb-2">
              <span className="w-4 h-px bg-tjf-green" />
              {tr.initBadge}
              <span className="w-4 h-px bg-tjf-green" />
            </span>
            <h2 className="font-display text-4xl font-black text-gray-900 mt-1">{tr.initTitle}</h2>
            <p className="text-gray-500 mt-2 max-w-md mx-auto text-base">{tr.initSubtitle}</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {initiatives.map((init, i) => (
              <AnimatedSection key={init.id} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                <Link
                  href={lp(`/initiatives/${init.slug}`)}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-tjf-blue/30 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 h-full"
                >
                  {/* Thumbnail */}
                  <div className="relative h-56 overflow-hidden flex-shrink-0">
                    <Image
                      src={(init as typeof init & { image: string }).image}
                      alt={init.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    {/* Badge top-left */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 bg-black/40 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                        <span>{init.icon}</span>
                        {lang === "en" ? "Initiative" : "Inisiatif"}
                      </span>
                    </div>
                    {/* Stats bottom-left */}
                    <div className="absolute bottom-3 left-4 flex gap-5">
                      {[
                        { v: init.stats.projects,  l: initLabels.projects },
                        { v: init.stats.provinces, l: initLabels.provinces },
                      ].map((s) => (
                        <div key={s.l} className="text-center">
                          <div className="text-lg font-black text-white leading-none">{s.v}</div>
                          <div className="text-[10px] text-white/70 mt-0.5">{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="font-black text-gray-900 text-base leading-snug group-hover:text-tjf-blue transition-colors mb-1">{init.title}</h3>
                    <p className="text-tjf-green text-sm font-semibold mb-2">{init.tagline}</p>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">{init.description}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-tjf-blue text-sm font-bold group-hover:gap-2 transition-all duration-200">
                      {lang === "en" ? "View Initiative" : "Lihat Inisiatif"} <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PUBLICATIONS ──────────────────────────────────────── */}
      <section className="py-20 bg-tjf-blue-pale">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-tjf-blue text-xs font-bold uppercase tracking-widest mb-2">
                <span className="w-4 h-px bg-tjf-blue" />
                {tr.pubBadge}
              </span>
              <h2 className="font-display text-4xl font-black text-gray-900">{tr.pubTitle}</h2>
            </div>
            <Link href={lp("/publication")} className="hidden sm:inline-flex items-center gap-1.5 text-tjf-blue text-sm font-bold hover:gap-3 transition-all duration-200">
              {tr.pubViewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Featured publication */}
            <AnimatedSection className="lg:col-span-2" direction="left">
              <Link
                href={lp(`/publication/${(publications[0] as any).slug}`)}
                className="group bg-white rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-blue/30 border border-white transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={publications[0].image}
                    alt={publications[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[publications[0].category] ?? "bg-gray-100 text-gray-600"}`}>
                      {publications[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] text-gray-400 mb-2">{publications[0].date}</span>
                  <h4 className="font-black text-gray-900 text-lg leading-snug group-hover:text-tjf-blue transition-colors line-clamp-3 flex-1">
                    {publications[0].title}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-4 text-tjf-blue text-sm font-bold group-hover:gap-2.5 transition-all duration-200">
                    {lang === "en" ? "Read More" : "Selengkapnya"} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* 3 smaller publications */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {publications.slice(1, 4).map((pub, i) => (
                <AnimatedSection key={pub.id} delay={(i + 1) * 0.08} direction="right">
                  <Link
                    href={lp(`/publication/${(pub as any).slug}`)}
                    className="group bg-white rounded-2xl overflow-hidden hover:shadow-card-hover border border-white hover:border-tjf-blue/30 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={pub.image}
                        alt={pub.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 20vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${catColors[pub.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {pub.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <span className="text-[10px] text-gray-400 mb-1.5">{pub.date}</span>
                      <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-tjf-blue transition-colors line-clamp-3 flex-1">
                        {pub.title}
                      </h4>
                      <div className="flex items-center gap-1 mt-3 text-tjf-blue text-xs font-bold group-hover:gap-2 transition-all duration-200">
                        {lang === "en" ? "Read More" : "Selengkapnya"} <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── NEWS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="flex items-end justify-between mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 text-tjf-amber text-xs font-bold uppercase tracking-widest mb-2">
                <span className="w-4 h-px bg-tjf-amber" />
                {tr.newsBadge}
              </span>
              <h2 className="font-display text-4xl font-black text-gray-900">{tr.newsTitle}</h2>
            </div>
            <Link href={lp("/news")} className="hidden sm:inline-flex items-center gap-1.5 text-tjf-blue text-sm font-bold hover:gap-3 transition-all duration-200">
              {tr.newsViewAll} <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Featured */}
            <AnimatedSection className="lg:col-span-3" direction="left">
              <Link
                href={lp(`/news/${(newsItems[0] as any).slug}`)}
                className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-300 h-full flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={newsItems[0].image}
                    alt={newsItems[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-tjf-blue text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {newsItems[0].category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs text-gray-400 mb-2">{newsItems[0].date}</p>
                  <h3 className="font-black text-gray-900 text-lg leading-snug mb-3 group-hover:text-tjf-blue transition-colors">
                    {newsItems[0].title}
                  </h3>
                  <p className="text-base text-gray-500 leading-relaxed flex-1 line-clamp-2">{newsItems[0].excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-tjf-blue text-sm font-bold group-hover:gap-3 transition-all duration-200">
                    {tr.pubRead} <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* Side */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {newsItems.slice(1, 4).map((news, i) => (
                <AnimatedSection key={news.id} delay={i * 0.1} direction="right">
                  <Link
                    href={lp(`/news/${(news as any).slug}`)}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden flex hover:border-tjf-blue/30 hover:shadow-card transition-all duration-300"
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="96px"
                      />
                    </div>
                    <div className="flex-1 min-w-0 p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold bg-tjf-amber-light text-tjf-amber px-2 py-0.5 rounded-full">
                          {news.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{news.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-900 leading-snug line-clamp-2 group-hover:text-tjf-blue transition-colors">
                        {news.title}
                      </h4>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ──────────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            {tr.partnersTitle}
          </p>
          <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex gap-6 animate-marquee w-max">
              {[...(partners as { name: string; logo: string }[]), ...(partners as { name: string; logo: string }[])].map((p, i) => (
                <PartnerLogo key={i} name={p.name} logo={p.logo} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-tjf-blue-dark via-tjf-blue to-tjf-green overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <AnimatedSection>
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-4">
              {lang === "en" ? (
                <>Together Building <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-300">the Future of Food</span></>
              ) : (
                <>Bersama Membangun <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-green-300">Masa Depan Pangan</span></>
              )}
            </h2>
            <p className="text-blue-100 mb-10 text-lg max-w-md mx-auto leading-relaxed">
              {lang === "en"
                ? "Join the network of researchers, farmers, and policymakers working together for Indonesia's food security."
                : "Bergabunglah dengan jaringan peneliti, petani, dan pembuat kebijakan yang bekerja bersama untuk ketahanan pangan Indonesia."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder={lang === "en" ? "Your email address" : "Alamat email Anda"}
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/90"
              />
              <button className="bg-white text-tjf-blue font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap">
                {lang === "en" ? "Subscribe" : "Berlangganan"}
              </button>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

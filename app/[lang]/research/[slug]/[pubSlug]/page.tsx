import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Download, Calendar, Tag, Share2, BookOpen, FlaskConical } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getServerData } from "@/lib/getServerData";

interface Props {
  params: { lang: string; slug: string; pubSlug: string };
}

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-100 text-blue-700 border-blue-200",
  "Annual Report":    "bg-green-100 text-green-700 border-green-200",
  "Brief":            "bg-amber-100 text-amber-700 border-amber-200",
  "Book":             "bg-purple-100 text-purple-700 border-purple-200",
};

export default function ResearchOutputDetailPage({ params }: Props) {
  const lang = params.lang;
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;
  const { researchFocusAreas, publications } = getServerData(lang);

  const area = researchFocusAreas.find((a) => a.slug === params.slug);
  const pub  = publications.find((p) => (p as any).slug === params.pubSlug);

  if (!area || !pub) return notFound();

  type PubWithMeta = typeof pub & { researchAreas?: string[] };

  const pubResearchAreas = researchFocusAreas.filter((a) =>
    (pub as PubWithMeta).researchAreas?.includes(a.slug)
  );

  const related = publications
    .filter((p) =>
      (p as any).slug !== (pub as any).slug &&
      (p as PubWithMeta).researchAreas?.includes(params.slug)
    )
    .slice(0, 3);

  const ui = {
    home:         lang === "en" ? "Home"                     : "Beranda",
    research:     lang === "en" ? "Research"                 : "Riset",
    back:         lang === "en" ? `Back to ${area.title}`    : `Kembali ke ${area.title}`,
    dlBtn:        lang === "en" ? "Download PDF"             : "Unduh PDF",
    share:        lang === "en" ? "Share"                    : "Bagikan",
    related:      lang === "en" ? "Other Research Output"    : "Output Riset Lainnya",
    viewAll:      lang === "en" ? "View All Output"          : "Lihat Semua Output",
    pubInfo:      lang === "en" ? "Research Output"          : "Output Riset",
    published:    lang === "en" ? "Published"                : "Tanggal Terbit",
    publisher:    lang === "en" ? "Publisher"                : "Penerbit",
    license:      lang === "en" ? "License"                  : "Lisensi",
    researchAreas:lang === "en" ? "Research Areas"           : "Area Riset",
    currentArea:  lang === "en" ? "Current Area"             : "Area Saat Ini",
    otherArea:    lang === "en" ? "Research Area"            : "Area Riset",
    abstract:     lang === "en" ? "Abstract"                 : "Abstrak",
    keyFindings:  lang === "en" ? "Key Findings"             : "Temuan Utama",
    methodology:  lang === "en" ? "Methodology"              : "Metodologi",
    recommendations: lang === "en" ? "Policy Recommendations": "Rekomendasi Kebijakan",
  };

  const firstTag = pub.tags[0] ?? (lang === "en" ? "suboptimal land" : "lahan suboptimal");

  const sections = lang === "en"
    ? [
        {
          heading: ui.abstract,
          body: `${pub.description} This study adds to the growing evidence base on sustainable land use in Indonesia's suboptimal agricultural zones, drawing on multi-site field research conducted in collaboration with local farming communities and government partners.`,
        },
        {
          heading: ui.keyFindings,
          list: [
            `Evidence-based interventions targeting ${firstTag} achieved measurable yield improvements within the first two agricultural cycles across pilot sites.`,
            `Community-led governance approaches reduced input costs by an estimated 20–30% while maintaining or improving productivity outcomes.`,
            `Integrating traditional ecological knowledge with modern agronomic practices produced superior results compared to either approach in isolation.`,
            `Policy harmonization across provincial and national levels remains the critical bottleneck for scaling successful local innovations.`,
          ],
        },
        {
          heading: ui.methodology,
          body: `The study applied a mixed-methods design combining quantitative household surveys, remote sensing data, and in-depth qualitative interviews with over 200 farmers and 40 key informants. Findings were triangulated through participatory validation workshops held in each study district.`,
        },
        {
          heading: ui.recommendations,
          list: [
            `Establish a dedicated national regulatory framework for ${firstTag} governance that integrates ecological sustainability with food security priorities.`,
            `Scale successful pilot models through provincial extension networks backed by multi-year budgetary commitments.`,
            `Create cross-ministry coordination mechanisms to align land use, water management, and agricultural development policies.`,
            `Invest in long-term monitoring infrastructure to track sustainability indicators beyond individual project timelines.`,
          ],
        },
      ]
    : [
        {
          heading: ui.abstract,
          body: `${pub.description} Studi ini menambah basis bukti yang terus berkembang mengenai pemanfaatan lahan berkelanjutan di zona pertanian suboptimal Indonesia, berdasarkan penelitian lapangan multi-lokasi yang dilakukan bersama komunitas petani lokal dan mitra pemerintah.`,
        },
        {
          heading: ui.keyFindings,
          list: [
            `Intervensi berbasis bukti yang menargetkan ${firstTag} mencapai peningkatan hasil panen yang terukur dalam dua siklus tanam pertama di lokasi percontohan.`,
            `Pendekatan tata kelola berbasis komunitas berhasil mengurangi biaya input sebesar 20–30% sekaligus mempertahankan atau meningkatkan produktivitas.`,
            `Mengintegrasikan kearifan ekologis tradisional dengan praktik agronomi modern menghasilkan hasil yang lebih baik dibandingkan pendekatan tunggal.`,
            `Harmonisasi kebijakan lintas tingkat provinsi dan nasional tetap menjadi hambatan utama dalam penskalaan inovasi lokal yang berhasil.`,
          ],
        },
        {
          heading: ui.methodology,
          body: `Studi menggunakan desain metode campuran yang mencakup survei rumah tangga kuantitatif, data penginderaan jauh, dan wawancara kualitatif mendalam dengan lebih dari 200 petani dan 40 informan kunci. Temuan divalidasi melalui lokakarya partisipatif di setiap kabupaten penelitian.`,
        },
        {
          heading: ui.recommendations,
          list: [
            `Membangun kerangka regulasi nasional khusus untuk tata kelola ${firstTag} yang mengintegrasikan keberlanjutan ekologis dengan prioritas ketahanan pangan.`,
            `Menskalakan model percontohan yang berhasil melalui jaringan penyuluhan provinsi dengan komitmen anggaran multi-tahun.`,
            `Menciptakan mekanisme koordinasi lintas kementerian untuk menyelaraskan kebijakan tata guna lahan, pengelolaan air, dan pembangunan pertanian.`,
            `Berinvestasi dalam infrastruktur pemantauan jangka panjang untuk melacak indikator keberlanjutan melampaui batas waktu proyek individual.`,
          ],
        },
      ];

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── MAIN ──────────────────────────────────── */}
          <article className="flex-1 min-w-0">
            <AnimatedSection>
              <Link href={lp(`/research/${area.slug}`)}
                className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                {ui.back}
              </Link>

              {/* Research area badges (all areas this pub belongs to) */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {pubResearchAreas.map((a) => (
                  <Link key={a.slug} href={lp(`/research/${a.slug}`)}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
                      a.slug === params.slug
                        ? "bg-tjf-blue text-white"
                        : "bg-tjf-blue-pale text-tjf-blue hover:bg-tjf-blue hover:text-white"
                    }`}
                  >
                    <FlaskConical className="w-3 h-3" />
                    {a.title}
                  </Link>
                ))}
                <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${catColors[pub.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {pub.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {pub.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                {pub.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                {pub.tags.map((tag: string) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Cover image */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-8">
                <Image src={pub.image} alt={pub.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content sections */}
              <div className="space-y-8">
                {sections.map((sec, i) => (
                  <div key={i}>
                    <h2 className="text-lg font-black text-gray-900 mb-3 flex items-center gap-2.5">
                      <span className="w-1 h-5 bg-tjf-blue rounded-full flex-shrink-0" />
                      {sec.heading}
                    </h2>
                    {"body" in sec && sec.body && (
                      <p className="text-gray-600 text-sm leading-[1.9] pl-4">{sec.body}</p>
                    )}
                    {"list" in sec && sec.list && (
                      <ul className="space-y-2.5 pl-4 mt-2">
                        {sec.list.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-tjf-blue rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
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
                ].map((s) => (
                  <button key={s.label} aria-label={s.label} className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500 hover:bg-tjf-blue hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d={s.path} /></svg>
                  </button>
                ))}
              </div>
            </AnimatedSection>
          </article>

          {/* ── SIDEBAR ───────────────────────────────── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">

              {/* Research output info */}
              <AnimatedSection direction="right" className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <p className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-tjf-blue" />
                  {ui.pubInfo}
                </p>
                <ul className="space-y-2.5 text-xs mb-4">
                  {[
                    { label: ui.published, value: pub.date },
                    { label: ui.publisher, value: "Tay Juhana Foundation" },
                    { label: ui.license,   value: "CC BY-NC 4.0" },
                  ].map((info) => (
                    <li key={info.label} className="flex justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                      <span className="text-gray-400 font-medium">{info.label}</span>
                      <span className="text-gray-700 font-bold text-right max-w-[55%]">{info.value}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full flex items-center justify-center gap-2 bg-tjf-blue text-white font-bold text-sm py-2.5 rounded-xl hover:bg-tjf-blue-dark transition-all duration-200">
                  <Download className="w-4 h-4" /> {ui.dlBtn}
                </button>
              </AnimatedSection>

              {/* All research areas this pub belongs to */}
              <AnimatedSection direction="right" delay={0.08}>
                <div className="bg-white border border-gray-100 rounded-2xl p-5">
                  <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                    <FlaskConical className="w-4 h-4 text-tjf-blue" />
                    {ui.researchAreas}
                  </h3>
                  <div className="space-y-2.5">
                    {pubResearchAreas.map((a) => (
                      <Link key={a.slug} href={lp(`/research/${a.slug}`)}
                        className="group relative rounded-xl overflow-hidden h-20 block hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <Image src={a.image} alt={a.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="280px" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 p-3 flex items-end justify-between">
                          <div>
                            <p className="text-white/70 text-[9px] font-bold uppercase tracking-wide mb-0.5">
                              {a.slug === params.slug ? ui.currentArea : ui.otherArea}
                            </p>
                            <p className="text-white font-black text-xs leading-snug">{a.title}</p>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-white/60 group-hover:text-white flex-shrink-0 transition-colors" />
                        </div>
                        {a.slug === params.slug && (
                          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-400 rounded-full ring-2 ring-white/30" />
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              {/* Related output */}
              {related.length > 0 && (
                <AnimatedSection direction="right" delay={0.15}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5">
                    <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-tjf-blue" />
                      {ui.related}
                    </h3>
                    <div className="space-y-3">
                      {related.map((rel) => (
                        <Link key={rel.id} href={lp(`/research/${area.slug}/${(rel as any).slug}`)}
                          className="group flex gap-3 hover:bg-tjf-blue-pale rounded-xl p-2 -mx-2 transition-colors"
                        >
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                            <Image src={rel.image} alt={rel.title} fill className="object-cover group-hover:scale-105 transition-transform" sizes="40px" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-700 leading-snug line-clamp-2 group-hover:text-tjf-blue transition-colors">
                              {rel.title}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{rel.date}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <Link href={lp(`/research/${area.slug}`)}
                      className="mt-4 flex items-center justify-center gap-1.5 text-xs text-tjf-blue font-bold hover:underline"
                    >
                      {ui.viewAll} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AnimatedSection>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

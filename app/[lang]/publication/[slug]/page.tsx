import { publications } from "@/lib/data";
import { publicationsEn } from "@/lib/data-en";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Download, Calendar, Tag, Share2, BookOpen, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Props {
  params: { lang: string; slug: string };
}

const catColors: Record<string, string> = {
  "Research Article": "bg-blue-100 text-blue-700 border-blue-200",
  "Annual Report": "bg-green-100 text-green-700 border-green-200",
  "Brief": "bg-amber-100 text-amber-700 border-amber-200",
  "Book": "bg-purple-100 text-purple-700 border-purple-200",
};

const ui = {
  id: {
    home: "Beranda", publications: "Publikasi", back: "Kembali ke Publikasi",
    download: "Unduh Dokumen Lengkap", downloadFree: "PDF · Tersedia gratis untuk publik",
    downloadBtn: "Unduh PDF", share: "Bagikan:", pubInfo: "Info Publikasi",
    category: "Kategori", published: "Tanggal Terbit", publisher: "Penerbit",
    license: "Lisensi", language: "Bahasa Indonesia", related: "Publikasi Terkait",
    viewAll: "Lihat Semua", exploreHub: "Jelajahi Topics",
    exploreDesc: "Temukan lebih banyak riset dan pengetahuan tentang lahan suboptimal.",
    explore: "Jelajahi",
  },
  en: {
    home: "Home", publications: "Publications", back: "Back to Publications",
    download: "Download Full Document", downloadFree: "PDF · Free for public",
    downloadBtn: "Download PDF", share: "Share:", pubInfo: "Publication Info",
    category: "Category", published: "Published", publisher: "Publisher",
    license: "License", language: "English", related: "Related Publications",
    viewAll: "View All", exploreHub: "Explore Topics",
    exploreDesc: "Discover more research and knowledge on suboptimal land.",
    explore: "Explore",
  },
};

const mockContent = `
Lahan suboptimal mencakup berbagai tipe lahan yang secara alami memiliki keterbatasan untuk produksi pertanian, seperti lahan gambut, rawa pasang surut, lahan masam, dan lahan kering beriklim basah. Meskipun demikian, dengan pendekatan teknologi dan manajemen yang tepat, lahan-lahan ini memiliki potensi besar untuk berkontribusi terhadap ketahanan pangan nasional.

Penelitian ini mengkaji berbagai aspek pengelolaan dan pemanfaatan lahan suboptimal di Indonesia, dengan fokus pada inovasi teknologi pertanian yang ramah lingkungan dan berkelanjutan. Temuan utama menunjukkan bahwa dengan kombinasi pendekatan agronomi yang tepat, varietas adaptif, dan pengelolaan air yang efisien, produktivitas lahan suboptimal dapat ditingkatkan secara signifikan.

## Temuan Utama

Hasil penelitian menunjukkan beberapa temuan penting yang dapat menjadi dasar pengembangan kebijakan dan praktik pertanian di lahan suboptimal:

1. **Peningkatan Produktivitas**: Penerapan teknologi pengelolaan air terpadu dapat meningkatkan produktivitas hingga 35-40% pada lahan rawa pasang surut.

2. **Varietas Adaptif**: Pengembangan varietas padi yang adaptif terhadap kondisi lahan masam dan gambut menunjukkan potensi peningkatan hasil panen yang signifikan.

3. **Konservasi Ekosistem**: Pendekatan pertanian yang mempertimbangkan fungsi ekologis lahan gambut terbukti dapat mempertahankan produktivitas jangka panjang sekaligus menjaga layanan ekosistem.

## Rekomendasi Kebijakan

Berdasarkan temuan penelitian, beberapa rekomendasi kebijakan yang diajukan meliputi:

- Pengembangan regulasi tata kelola lahan suboptimal yang terintegrasi dengan kebijakan ketahanan pangan nasional
- Peningkatan investasi pada riset dan pengembangan teknologi pertanian adaptif
- Penguatan kapasitas petani melalui program pelatihan dan pendampingan berbasis komunitas
- Fasilitasi akses pasar bagi produk pertanian dari lahan suboptimal

Penelitian ini diharapkan dapat menjadi kontribusi nyata Tay Juhana Foundation dalam mendorong pemanfaatan lahan suboptimal yang berkelanjutan untuk masa depan pangan Indonesia.
`;

export async function generateStaticParams() {
  return ["en", "id"].flatMap((lang) =>
    publications.map((p) => ({ lang, slug: (p as any).slug }))
  );
}

export default function PublicationDetailPage({ params }: Props) {
  const lang = params.lang as "en" | "id";
  const allPubs = lang === "en" ? publicationsEn : publications;
  const pub = allPubs.find((p) => (p as any).slug === params.slug);
  if (!pub) notFound();

  const related = allPubs.filter((p) => p.id !== pub.id && p.category === pub.category).slice(0, 3);
  const otherRelated = related.length < 3
    ? [...related, ...allPubs.filter((p) => p.id !== pub.id && !related.includes(p)).slice(0, 3 - related.length)]
    : related;

  const paragraphs = mockContent.trim().split("\n\n");
  const t = ui[lang];
  const prefix = `/${lang}`;

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <AnimatedSection>
              <Link
                href={`${prefix}/publication`}
                className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                {t.back}
              </Link>

              {/* Category & date */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColors[pub.category] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                  {pub.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {pub.date}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">
                {pub.title}
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-lg leading-relaxed mb-6 border-l-4 border-tjf-blue pl-4">
                {pub.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                {pub.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium hover:bg-tjf-blue-pale hover:text-tjf-blue transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Cover image */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8">
                <Image src={pub.image} alt={pub.title} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${catColors[pub.category] ?? "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {pub.category}
                  </span>
                </div>
              </div>

              {/* Article content */}
              <div className="prose prose-sm max-w-none">
                {paragraphs.map((para, i) => {
                  if (para.startsWith("## ")) {
                    return (
                      <h2 key={i} className="text-xl font-black text-gray-900 mt-8 mb-4">
                        {para.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (para.startsWith("- ")) {
                    const items = para.split("\n").filter(l => l.startsWith("- "));
                    return (
                      <ul key={i} className="space-y-2 mb-5 mt-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 bg-tjf-blue rounded-full mt-2 flex-shrink-0" />
                            {item.replace("- ", "")}
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.match(/^\d\./)) {
                    const items = para.split("\n").filter(l => l.match(/^\d\./));
                    return (
                      <ol key={i} className="space-y-3 mb-5 mt-2">
                        {items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed">
                            <span className="w-5 h-5 bg-tjf-blue text-white text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              {j + 1}
                            </span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  return (
                    <p key={i} className="text-gray-600 text-sm leading-relaxed mb-4">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Share */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-3">
                <Share2 className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">{t.share}</span>
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

          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              {/* Publication info */}
              <AnimatedSection direction="right" className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-tjf-blue" />
                  {t.pubInfo}
                </h3>
                <ul className="space-y-3">
                  {[
                    { label: t.category,  value: pub.category },
                    { label: t.published, value: pub.date },
                    { label: t.publisher, value: "Tay Juhana Foundation" },
                    { label: t.license,   value: "CC BY-NC 4.0" },
                    { label: lang === "en" ? "Language" : "Bahasa", value: t.language },
                  ].map((info) => (
                    <li key={info.label} className="flex justify-between text-xs">
                      <span className="text-gray-400 font-medium">{info.label}</span>
                      <span className="text-gray-700 font-bold text-right max-w-[55%]">{info.value}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-4 flex items-center justify-center gap-2 bg-tjf-blue text-white font-bold text-sm py-2.5 rounded-xl hover:bg-tjf-blue-dark transition-all duration-200">
                  <Download className="w-4 h-4" />
                  {t.downloadBtn}
                </button>
              </AnimatedSection>

              {/* Related publications */}
              {otherRelated.length > 0 && (
                <AnimatedSection direction="right" delay={0.1}>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5">
                    <h3 className="font-black text-gray-900 text-sm mb-4">{t.related}</h3>
                    <div className="space-y-3">
                      {otherRelated.map((rel) => (
                        <Link
                          key={rel.id}
                          href={`${prefix}/publication/${(rel as any).slug}`}
                          className="group flex gap-3 hover:bg-tjf-blue-pale rounded-xl p-2 -mx-2 transition-colors"
                        >
                          <div className="relative w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                            <Image src={rel.image} alt={rel.title} fill className="object-cover" sizes="36px" />
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
                    <Link
                      href={`${prefix}/publication`}
                      className="mt-4 flex items-center justify-center gap-1.5 text-xs text-tjf-blue font-bold hover:underline"
                    >
                      {t.viewAll} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </AnimatedSection>
              )}

              {/* Topics CTA */}
              <AnimatedSection direction="right" delay={0.15}>
                <div className="bg-gradient-to-br from-tjf-blue to-tjf-blue-dark rounded-2xl p-5 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-dot-pattern opacity-20" />
                  <div className="relative">
                    <p className="font-black text-sm mb-1.5">{t.exploreHub}</p>
                    <p className="text-blue-200 text-xs mb-4 leading-relaxed">{t.exploreDesc}</p>
                    <Link
                      href={`${prefix}/topic`}
                      className="inline-flex items-center gap-1.5 bg-white text-tjf-blue text-xs font-black px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      {t.explore} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

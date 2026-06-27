import AnimatedSection from "@/components/ui/AnimatedSection";
import { useT } from "@/lib/i18n";
import type { Lang } from "@/contexts/LanguageContext";
import ContactForm from "./_form";

interface Props {
  params: { lang: string };
}

export default function ContactPage({ params }: Props) {
  const lang = params.lang;
  const tr = useT(lang as Lang).contact;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-tjf-blue to-tjf-blue-light text-white min-h-[380px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/20 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wide">
              {tr.badge}
            </span>
            <h1 className="font-display text-5xl font-black mb-2">{tr.title}</h1>
            <p className="text-blue-100 text-lg max-w-md">{tr.subtitle}</p>
          </AnimatedSection>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 50" fill="none" preserveAspectRatio="none" className="w-full">
            <path d="M0 50H1440V20C1200 45 960 5 720 20C480 35 240 5 0 20V50Z" fill="white" />
          </svg>
        </div>
      </section>

      <ContactForm tr={tr} lang={lang} />
    </div>
  );
}

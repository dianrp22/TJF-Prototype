import Image from "next/image";
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
      <section className="relative min-h-[420px] flex items-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85"
          alt="Office contact space"
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

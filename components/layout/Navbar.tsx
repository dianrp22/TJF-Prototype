"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { useLang, type Lang } from "@/contexts/LanguageContext";
import { useT } from "@/lib/i18n";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "id", flag: "🇮🇩", label: "ID" },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef                 = useRef<HTMLDivElement>(null);
  const pathname                = usePathname();
  const { lang, setLang }       = useLang();
  const tr                      = useT(lang);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup dropdown bahasa kalau klik di luar
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;

  const navLinks = [
    { href: lp("/topic"), label: "Topics" },
    { href: lp("/research"),      label: tr.nav.research },
    { href: lp("/publication"),     label: tr.nav.resources },
    { href: lp("/initiatives"),   label: tr.nav.initiatives },
    { href: lp("/news"),          label: tr.nav.news },
    { href: lp("/about"),         label: tr.nav.about },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-md border-b border-white/50"
          : "bg-white/95 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href={lang === "en" ? "/" : `/${lang}`} className="flex items-center group">
            <Image
              src="/tjf-logo.png"
              alt="Tay Juhana Foundation"
              width={160}
              height={48}
              className="h-10 w-auto object-contain transition-opacity duration-200 group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? "text-tjf-blue bg-tjf-blue-pale"
                      : "text-gray-600 hover:text-tjf-blue hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-tjf-blue rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right side: lang switcher + CTA */}
          <div className="hidden lg:flex items-center gap-2">

            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-tjf-blue hover:bg-gray-50 transition-all duration-200"
                aria-label="Switch language"
              >
                <Globe className="w-4 h-4" />
                <span className="font-bold text-xs">{lang.toUpperCase()}</span>
              </button>

              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50 animate-fade-in">
                  {LANGS.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
                        lang === code
                          ? "bg-tjf-blue-pale text-tjf-blue"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-base">{flag}</span>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={lp("/contact")}
              className="relative overflow-hidden bg-gradient-to-r from-tjf-blue to-tjf-blue-light text-white text-sm font-semibold px-5 py-2 rounded-xl shadow-md hover:shadow-glow-blue transition-all duration-300 hover:scale-[1.02] shimmer"
            >
              {tr.nav.collaborate}
            </Link>
          </div>

          {/* Mobile Burger */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile lang switcher */}
            <div ref={undefined} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-2 rounded-lg text-gray-500 hover:text-tjf-blue hover:bg-gray-50 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-2 w-28 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                  {LANGS.map(({ code, flag, label }) => (
                    <button
                      key={code}
                      onClick={() => { setLang(code); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                        lang === code ? "bg-tjf-blue-pale text-tjf-blue" : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span>{flag}</span>{label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              className="p-2 rounded-lg text-gray-500 hover:text-tjf-blue hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

      </div>

      {/* Mobile Menu — overlay, tidak dorong konten */}
      {open && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-gray-100 shadow-lg z-40 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-tjf-blue bg-tjf-blue-pale"
                    : "text-gray-700 hover:text-tjf-blue hover:bg-gray-50"
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 mt-1 border-t border-gray-100">
              <Link
                href={lp("/contact")}
                className="block w-full text-center bg-gradient-to-r from-tjf-blue to-tjf-blue-light text-white text-sm font-semibold px-4 py-2.5 rounded-xl"
                onClick={() => setOpen(false)}
              >
                {tr.nav.collaborate}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

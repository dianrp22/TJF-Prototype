"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useT } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();
  const tr = useT(lang).footer;

  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;

  const navLinks = [
    { href: lp("/topic"), label: "Topics" },
    { href: lp("/research"),      label: useT(lang).nav.research },
    { href: lp("/publication"),     label: useT(lang).nav.resources },
    { href: lp("/initiatives"),   label: useT(lang).nav.initiatives },
    { href: lp("/news"),          label: useT(lang).nav.news },
    { href: lp("/about"),         label: useT(lang).nav.about },
  ];

  const socials = [
    {
      label: "Instagram",
      href: "#",
      path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    },
    {
      label: "LinkedIn",
      href: "#",
      path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    },
    {
      label: "YouTube",
      href: "#",
      path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
    {
      label: "Facebook",
      href: "#",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
  ];

  return (
    <footer className="bg-tjf-blue-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-tjf-blue/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-5">
              <Image
                src="/tjf-logo.png"
                alt="Tay Juhana Foundation"
                width={180}
                height={54}
                className="h-11 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <p className="text-blue-300 text-xs mt-2">{tr.tagline}</p>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed max-w-sm">{tr.desc}</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{tr.explore}</h4>
            <ul className="space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-blue-300 hover:text-white text-sm transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200">→</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-white/90">{tr.contact}</h4>
            <ul className="space-y-3">
              <li className="flex gap-2.5 text-sm text-blue-200">
                <Mail className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                info@tayjuhanafoundation.org
              </li>
              <li className="flex gap-2.5 text-sm text-blue-200">
                <MapPin className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" />
                Jakarta, Indonesia
              </li>
            </ul>
            <div className="flex gap-2 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg flex items-center justify-center text-blue-300 hover:text-white transition-all duration-200 hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-blue-300 text-xs">
          <p>{tr.copyright}</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">{tr.privacy}</a>
            <a href="#" className="hover:text-white transition-colors">{tr.faq}</a>
            <a href="#" className="hover:text-white transition-colors">{tr.careers}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Newspaper, BookOpen, Lightbulb,
  Tag, ExternalLink, RotateCcw, ChevronDown, Layers, FolderOpen, Menu, X
} from "lucide-react";
import { useTJFStore } from "@/lib/store";

const TOP_NAV = [
  { href: "/dashboard",              label: "Overview",   icon: LayoutDashboard },
  { href: "/dashboard/news",         label: "Berita",     icon: Newspaper },
  { href: "/dashboard/publications", label: "Publikasi",  icon: BookOpen },
];

const INISIATIF_NAV = [
  { href: "/dashboard/inisiatif/program", label: "Program Inisiatif", icon: Layers },
  { href: "/dashboard/inisiatif/proyek",  label: "Proyek Inisiatif",  icon: FolderOpen },
];

const BOTTOM_NAV = [
  { href: "/dashboard/topics", label: "Topik", icon: Tag },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reset = useTJFStore((s) => s.resetToDefaults);
  const inisiatifActive = pathname.startsWith("/dashboard/inisiatif");
  const [inisiatifOpen, setInisiatifOpen] = useState(inisiatifActive);
  const [sidebarOpen, setSidebarOpen]     = useState(false);

  useEffect(() => {
    if (inisiatifActive) setInisiatifOpen(true);
  }, [inisiatifActive]);

  // tutup sidebar saat navigasi di mobile
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  const SidebarContent = () => (
    <>
      {/* Brand */}
      <div className="px-4 py-5 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-slate-900 font-black text-sm">T</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none truncate">TJF Admin</p>
            <p className="text-slate-500 text-[10px] mt-0.5">Content Manager</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest px-2 mb-2">Menu</p>
        {TOP_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                active ? "bg-amber-400 text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}

        {/* Inisiatif collapsible */}
        <div>
          <button
            onClick={() => setInisiatifOpen(o => !o)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
              inisiatifActive ? "text-amber-400" : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Lightbulb className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1 text-left truncate">Inisiatif</span>
            <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${inisiatifOpen ? "rotate-180" : ""}`} />
          </button>
          {inisiatifOpen && (
            <div className="ml-3 mt-0.5 pl-3 border-l border-slate-800 space-y-0.5">
              {INISIATIF_NAV.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link key={href} href={href}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                      active ? "bg-amber-400 text-slate-900" : "text-slate-500 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{label}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {BOTTOM_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                active ? "bg-amber-400 text-slate-900" : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 py-3 border-t border-slate-800 space-y-1">
        <Link href="/" target="_blank"
          className="flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors">
          <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Lihat Website</span>
        </Link>
        <button
          onClick={() => { if (confirm("Reset semua data ke default?")) reset(); }}
          className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-red-400 text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors w-full">
          <RotateCcw className="w-3 h-3 flex-shrink-0" />
          <span>Reset ke Default</span>
        </button>
        <p className="text-slate-700 text-[9px] px-3">Prototype · localStorage</p>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#f5f6fa] overflow-hidden">
      {/* ── SIDEBAR DESKTOP ──────────────────────────── */}
      {/* Sidebar desktop */}
      <aside className="hidden lg:flex w-56 flex-shrink-0 bg-slate-900 flex-col h-full">
        <SidebarContent />
      </aside>

      {/* Sidebar mobile — drawer overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-slate-900 flex flex-col h-full shadow-2xl">
            <SidebarContent />
          </div>
          {/* backdrop */}
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* ── MAIN ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Topbar mobile */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
          <button onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-7 h-7 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-slate-900 font-black text-xs">T</span>
          </div>
          <span className="font-bold text-sm text-gray-800">TJF Admin</span>
        </div>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

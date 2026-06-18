"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import LangTabs from "./LangTabs";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  lang: "id" | "en";
  onLangChange: (l: "id" | "en") => void;
  sharedContent: React.ReactNode;
  bilingualContent: React.ReactNode;
  onSave: () => void;
  saveLabel?: string;
}

export default function Dialog({
  open, onClose, title, lang, onLangChange,
  sharedContent, bilingualContent, onSave, saveLabel = "Simpan",
}: Props) {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) {
      document.addEventListener("keydown", fn);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Card */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body — two columns */}
        <div className="flex-1 overflow-hidden flex min-h-0">
          {/* Left: Shared */}
          <div className="w-72 flex-shrink-0 border-r border-gray-100 overflow-y-auto p-6 space-y-4 bg-gray-50/50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data Umum</p>
            {sharedContent}
          </div>

          {/* Right: Bilingual */}
          <div className="flex-1 overflow-y-auto flex flex-col min-h-0">
            {/* Lang tab sticky */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-100 bg-white flex-shrink-0 sticky top-0 z-10">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Konten Terjemahan</p>
              <LangTabs lang={lang} onChange={onLangChange} />
            </div>
            <div className="p-6 space-y-5 flex-1">
              {bilingualContent}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex-shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:text-gray-900 rounded-xl hover:bg-gray-100 transition-colors">
            Batal
          </button>
          <button onClick={onSave} className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">
            {saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

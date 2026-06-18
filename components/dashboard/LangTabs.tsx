"use client";

interface Props {
  lang: "id" | "en";
  onChange: (l: "id" | "en") => void;
}

export default function LangTabs({ lang, onChange }: Props) {
  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-xl w-fit">
      {(["id", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          className={`flex items-center gap-1.5 px-4 py-1.5 text-sm font-semibold rounded-lg transition-all duration-150 ${
            lang === l
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <span>{l === "id" ? "🇮🇩" : "🇬🇧"}</span>
          <span>{l === "id" ? "Indonesia" : "English"}</span>
        </button>
      ))}
    </div>
  );
}

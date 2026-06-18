"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  hint?: string;
}

interface MultiCheckProps {
  label: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (next: string[]) => void;
}

interface TagsProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
  hint?: string;
}

interface ParagraphsProps {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
}

const base = "w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
const label = "block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5";
const wrap = "space-y-1";

export function FInput({ label: l, hint, ...props }: InputProps) {
  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <input {...props} className={base + " " + (props.className ?? "")} />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function FTextarea({ label: l, hint, rows = 3, ...props }: TextareaProps) {
  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <textarea {...props} rows={rows} className={base + " resize-none " + (props.className ?? "")} />
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function FSelect({ label: l, options, hint, ...props }: SelectProps) {
  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <select {...props} className={base + " bg-white " + (props.className ?? "")}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function FMultiCheck({ label: l, options, value, onChange }: MultiCheckProps) {
  const toggle = (v: string) =>
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => toggle(o.value)}
            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
              value.includes(o.value)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FTags({ label: l, value, onChange, hint }: TagsProps) {
  const remove = (t: string) => onChange(value.filter((x) => x !== t));
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && e.currentTarget.value.trim()) {
      e.preventDefault();
      const tag = e.currentTarget.value.trim().replace(/,$/, "");
      if (tag && !value.includes(tag)) onChange([...value, tag]);
      e.currentTarget.value = "";
    }
  };
  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <div className="p-2 border border-gray-200 rounded-lg bg-gray-50 min-h-[42px] flex flex-wrap gap-1.5">
        {value.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {t}
            <button type="button" onClick={() => remove(t)} className="hover:text-blue-900">×</button>
          </span>
        ))}
        <input
          type="text"
          onKeyDown={handleKey}
          placeholder="Ketik lalu Enter..."
          className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-gray-400 px-1"
        />
      </div>
      {hint && <p className="text-xs text-gray-400">{hint}</p>}
    </div>
  );
}

export function FParagraphs({ label: l, value, onChange }: ParagraphsProps) {
  const update = (i: number, v: string) => {
    const next = [...value];
    next[i] = v;
    onChange(next);
  };
  const add = () => onChange([...value, ""]);
  const remove = (i: number) => onChange(value.filter((_, idx) => idx !== i));

  return (
    <div className={wrap}>
      <label className={label}>{l}</label>
      <div className="space-y-2">
        {value.map((para, i) => (
          <div key={i} className="relative group">
            <textarea
              value={para}
              onChange={(e) => update(i, e.target.value)}
              rows={3}
              className={base + " resize-none pr-8"}
              placeholder={`Paragraf ${i + 1}...`}
            />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={add}
          className="w-full py-2 text-xs font-semibold text-blue-600 border border-dashed border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
        >
          + Tambah Paragraf
        </button>
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  height?: number;
}

export default function MarkdownEditor({ label, value, onChange, height = 280 }: Props) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      <div className="rounded-xl overflow-hidden border border-gray-200" data-color-mode="light">
        <MDEditor
          value={value}
          onChange={(v) => onChange(v ?? "")}
          height={height}
          preview="live"
          visibleDragbar={false}
        />
      </div>
    </div>
  );
}

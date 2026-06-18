"use client";

import { useState } from "react";

export default function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 w-40">
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm w-36 h-24 flex items-center justify-center p-4 hover:shadow-md transition-shadow">
        {err ? (
          <div className="w-12 h-12 rounded-lg bg-tjf-blue-pale flex items-center justify-center">
            <span className="text-sm font-black text-tjf-blue">{initials}</span>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logo} alt={name} className="object-contain max-h-16 max-w-full" onError={() => setErr(true)} />
        )}
      </div>
      <span className="text-[10px] text-gray-400 font-medium text-center leading-tight line-clamp-2 w-full">{name}</span>
    </div>
  );
}

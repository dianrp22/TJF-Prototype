"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useTJFStore } from "@/lib/store";
import Dialog from "@/components/dashboard/Dialog";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import { FInput, FTextarea, FSelect, FMultiCheck, FTags } from "@/components/dashboard/FormField";

const CATEGORIES = ["Berita Organisasi","Dampak","Kegiatan","Cerita Dampak","Publikasi","Riset"].map((c) => ({ value: c, label: c }));
const TOPIC_OPTS = [
  { value: "food-security",   label: "Ketahanan Pangan" },
  { value: "agriculture",     label: "Pertanian" },
  { value: "suboptimal-land", label: "Lahan Suboptimal" },
  { value: "livelihood",      label: "Penghidupan" },
  { value: "landscape",       label: "Lanskap" },
  { value: "governance",      label: "Tata Kelola" },
];
const catBadge: Record<string, string> = {
  "Berita Organisasi":"bg-blue-100 text-blue-700","Dampak":"bg-green-100 text-green-700",
  "Kegiatan":"bg-amber-100 text-amber-700","Cerita Dampak":"bg-purple-100 text-purple-700",
  "Publikasi":"bg-emerald-100 text-emerald-700","Riset":"bg-teal-100 text-teal-700",
};

const ES = { slug:"", category:"Berita Organisasi", date:"", image:"", topics:[] as string[], tags:[] as string[] };
const EL = { title:"", excerpt:"", content:"" };

function slug(s: string) { return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,""); }
function toMd(c: any) { return Array.isArray(c) ? c.join("\n\n") : (c ?? ""); }

export default function NewsPage() {
  const { newsId, newsEn, addNews, updateNews, deleteNews } = useTJFStore();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [lang, setLang] = useState<"id"|"en">("id");
  const [shared, setShared] = useState({...ES});
  const [fId, setFId] = useState({...EL});
  const [fEn, setFEn] = useState({...EL});

  const filtered = useMemo(() => newsId.filter(n => n.title?.toLowerCase().includes(q.toLowerCase())), [newsId, q]);
  const sS = (k:string, v:any) => setShared(f=>({...f,[k]:v}));
  const sI = (k:string, v:any) => setFId(f=>({...f,[k]:v}));
  const sE = (k:string, v:any) => setFEn(f=>({...f,[k]:v}));
  const cur = lang==="id" ? fId : fEn;
  const set = lang==="id" ? sI : sE;

  const openAdd = () => {
    setEditing(null); setShared({...ES}); setFId({...EL}); setFEn({...EL}); setLang("id"); setOpen(true);
  };
  const openEdit = (item: any) => {
    const en = newsEn.find((n:any) => n.id===item.id) ?? {};
    setEditing(item.id);
    setShared({ slug:item.slug??"", category:item.category??"Berita Organisasi", date:item.date??"", image:item.image??"", topics:item.topics??[], tags:item.tags??[] });
    setFId({ title:item.title??"", excerpt:item.excerpt??"", content:toMd(item.content) });
    setFEn({ title:(en as any).title??"", excerpt:(en as any).excerpt??"", content:toMd((en as any).content) });
    setLang("id"); setOpen(true);
  };
  const save = () => {
    const ip = {...shared,...fId}; const ep = {...shared,...fEn};
    if (editing!==null) { updateNews(editing,"id",ip); updateNews(editing,"en",ep); }
    else addNews(ip, ep);
    setOpen(false);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-xl font-black text-gray-900">Berita</h1>
          <p className="text-sm text-gray-400 mt-0.5">{newsId.length} artikel</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
          <Plus className="w-4 h-4"/>Tambah Berita
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[500px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide"></th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">Judul (ID)</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Judul (EN)</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Kategori</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide hidden md:table-cell">Tanggal</th>
              <th className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item => {
              const en = newsEn.find((n:any) => n.id===item.id);
              return (
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 w-14">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative">
                      {item.image && <Image src={item.image} alt="" fill className="object-cover" sizes="40px"/>}
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <p className="font-semibold text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 font-mono truncate mt-0.5">{item.slug}</p>
                  </td>
                  <td className="px-4 py-3 max-w-[200px] hidden sm:table-cell">
                    <p className="text-gray-600 truncate text-xs">{(en as any)?.title || <span className="text-gray-300 italic">—</span>}</p>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${catBadge[item.category]??"bg-gray-100 text-gray-500"}`}>{item.category}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap hidden md:table-cell">{item.date}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 justify-end">
                      <button onClick={()=>openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                      <button onClick={()=>{if(confirm("Hapus?"))deleteNews(item.id)}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        {filtered.length===0 && <p className="text-center py-12 text-gray-400 text-sm">Tidak ada data</p>}
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={()=>setOpen(false)} title={editing!==null?"Edit Berita":"Tambah Berita"}
        lang={lang} onLangChange={setLang} onSave={save}
        sharedContent={<>
          <FInput label="Slug" value={shared.slug} onChange={e=>sS("slug",e.target.value)} hint="URL-friendly"/>
          <FSelect label="Kategori" value={shared.category} options={CATEGORIES} onChange={e=>sS("category",e.target.value)}/>
          <FInput label="Tanggal" value={shared.date} onChange={e=>sS("date",e.target.value)} placeholder="10 Juni 2026"/>
          <FInput label="URL Gambar" value={shared.image} onChange={e=>sS("image",e.target.value)} placeholder="https://..."/>
          {shared.image && <div className="relative h-28 rounded-xl overflow-hidden bg-gray-100"><Image src={shared.image} alt="" fill className="object-cover" sizes="280px"/></div>}
          <FMultiCheck label="Topik" options={TOPIC_OPTS} value={shared.topics} onChange={v=>sS("topics",v)}/>
          <FTags label="Tags" value={shared.tags} onChange={v=>sS("tags",v)}/>
        </>}
        bilingualContent={<>
          <FInput label="Judul" value={cur.title} onChange={e=>{
            set("title",e.target.value);
            if(!editing && lang==="id") sS("slug",slug(e.target.value));
          }}/>
          <FTextarea label="Ringkasan" rows={2} value={cur.excerpt} onChange={e=>set("excerpt",e.target.value)}/>
          <MarkdownEditor label="Isi Artikel" value={cur.content} onChange={v=>set("content",v)} height={340}/>
        </>}
      />
    </div>
  );
}

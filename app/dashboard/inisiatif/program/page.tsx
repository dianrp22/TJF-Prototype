"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useTJFStore } from "@/lib/store";
import Dialog from "@/components/dashboard/Dialog";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import { FInput, FMultiCheck } from "@/components/dashboard/FormField";

const TOPIC_OPTS = [
  {value:"food-security",label:"Ketahanan Pangan"},{value:"agriculture",label:"Pertanian"},
  {value:"suboptimal-land",label:"Lahan Suboptimal"},{value:"livelihood",label:"Penghidupan"},
  {value:"landscape",label:"Lanskap"},{value:"governance",label:"Tata Kelola"},
];
const ES = {slug:"",image:"",topics:[]as string[],focus:[""]as string[]};
const EL = {title:"",tagline:"",description:""};

function sl(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}

function useStats(slug: string) {
  const storiesId = useTJFStore((s) => s.storiesId);
  return useMemo(() => {
    const proyek = storiesId.filter((s: any) => s.initiativeSlug === slug);
    const provinsi = new Set(proyek.map((s: any) => s.location).filter(Boolean)).size;
    return { proyek: proyek.length, provinsi };
  }, [storiesId, slug]);
}

function ProgramCard({ item, onEdit, onDelete }: { item: any; onEdit: () => void; onDelete: () => void }) {
  const stats = useStats(item.slug);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-36">
        {item.image && <Image src={item.image} alt="" fill className="object-cover" sizes="400px"/>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"/>
      </div>
      <div className="p-4">
        <p className="font-bold text-gray-900 truncate">{item.title}</p>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.tagline}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-3 text-xs text-gray-400">
            <span>{stats.proyek} proyek</span>
            <span>{stats.provinsi} provinsi</span>
          </div>
          <div className="flex gap-1">
            <button onClick={onEdit} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
            <button onClick={onDelete} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InitiativesPage() {
  const {initiativesId,initiativesEn,addInitiative,updateInitiative,deleteInitiative}=useTJFStore();
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<number|null>(null); const [lang,setLang]=useState<"id"|"en">("id");
  const [shared,setShared]=useState({...ES});
  const [fId,setFId]=useState({...EL}); const [fEn,setFEn]=useState({...EL});

  const filtered=useMemo(()=>initiativesId.filter(i=>i.title?.toLowerCase().includes(q.toLowerCase())),[initiativesId,q]);
  const sS=(k:string,v:any)=>setShared(f=>({...f,[k]:v}));
  const sI=(k:string,v:any)=>setFId(f=>({...f,[k]:v}));
  const sE=(k:string,v:any)=>setFEn(f=>({...f,[k]:v}));
  const cur=lang==="id"?fId:fEn; const set=lang==="id"?sI:sE;

  const openAdd=()=>{setEditing(null);setShared({...ES,focus:[""]});setFId({...EL});setFEn({...EL});setLang("id");setOpen(true);};
  const openEdit=(item:any)=>{
    const en=initiativesEn.find((i:any)=>i.id===item.id)??{};
    setEditing(item.id);
    setShared({slug:item.slug??"",image:item.image??"",topics:item.topics??[],focus:item.focus?.length?item.focus:[""]});
    setFId({title:item.title??"",tagline:item.tagline??"",description:item.description??""});
    setFEn({title:(en as any).title??"",tagline:(en as any).tagline??"",description:(en as any).description??""});
    setLang("id");setOpen(true);
  };
  const save=()=>{
    const ip={...shared,...fId}; const ep={...shared,...fEn};
    if(editing!==null){updateInitiative(editing,"id",ip);updateInitiative(editing,"en",ep);}
    else addInitiative(ip,ep);
    setOpen(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-7">
        <div><h1 className="text-xl font-black text-gray-900">Program Inisiatif</h1><p className="text-sm text-gray-400 mt-0.5">{initiativesId.length} program</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-colors"><Plus className="w-4 h-4"/>Tambah Program</button>
      </div>
      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(item=>(
          <ProgramCard key={item.id} item={item}
            onEdit={()=>openEdit(item)}
            onDelete={()=>{if(confirm("Hapus program ini? Proyek di dalamnya tidak ikut terhapus."))deleteInitiative(item.id);}}
          />
        ))}
      </div>
      {filtered.length===0&&<p className="text-center py-12 text-gray-400 text-sm bg-white rounded-2xl border border-gray-200 mt-0">Tidak ada data</p>}

      <Dialog open={open} onClose={()=>setOpen(false)} title={editing!==null?"Edit Program":"Tambah Program"}
        lang={lang} onLangChange={setLang} onSave={save}
        sharedContent={<>
          <FInput label="Slug" value={shared.slug} onChange={e=>sS("slug",e.target.value)}/>
          <FInput label="URL Gambar" value={shared.image} onChange={e=>sS("image",e.target.value)} placeholder="https://..."/>
          {shared.image&&<div className="relative h-28 rounded-xl overflow-hidden bg-gray-100"><Image src={shared.image} alt="" fill className="object-cover" sizes="280px"/></div>}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wide">Fokus Program</label>
            <div className="space-y-1.5">
              {shared.focus.map((f:string,i:number)=>(
                <div key={i} className="flex gap-1.5">
                  <input value={f} onChange={e=>{const n=[...shared.focus];n[i]=e.target.value;sS("focus",n);}} className="flex-1 px-2.5 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"/>
                  <button onClick={()=>sS("focus",shared.focus.filter((_:string,j:number)=>j!==i))} className="px-1.5 text-gray-300 hover:text-red-400 transition-colors text-base">×</button>
                </div>
              ))}
              <button onClick={()=>sS("focus",[...shared.focus,""])} className="w-full py-1.5 text-xs font-semibold text-amber-600 border border-dashed border-amber-200 rounded-lg hover:bg-amber-50 transition-colors">+ Tambah Fokus</button>
            </div>
          </div>
          <FMultiCheck label="Topik" options={TOPIC_OPTS} value={shared.topics} onChange={v=>sS("topics",v)}/>
        </>}
        bilingualContent={<>
          <FInput label="Nama Program" value={cur.title} onChange={e=>{set("title",e.target.value);if(!editing&&lang==="id")sS("slug",sl(e.target.value));}}/>
          <FInput label="Tagline" value={cur.tagline} onChange={e=>set("tagline",e.target.value)}/>
          <MarkdownEditor label="Deskripsi" value={cur.description} onChange={v=>set("description",v)} height={320}/>
        </>}
      />
    </div>
  );
}

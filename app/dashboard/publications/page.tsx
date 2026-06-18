"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useTJFStore } from "@/lib/store";
import Dialog from "@/components/dashboard/Dialog";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import { FInput, FSelect, FMultiCheck, FTags } from "@/components/dashboard/FormField";

const CATEGORIES = ["Brief","Research Article","Annual Report","Book"].map(c=>({value:c,label:c}));
const TOPIC_OPTS = [
  {value:"food-security",label:"Ketahanan Pangan"},{value:"agriculture",label:"Pertanian"},
  {value:"suboptimal-land",label:"Lahan Suboptimal"},{value:"livelihood",label:"Penghidupan"},
  {value:"landscape",label:"Lanskap"},{value:"governance",label:"Tata Kelola"},
];
const RESEARCH_OPTS = [
  {value:"sustainable-food-system",label:"Sistem Pangan Berkelanjutan"},
  {value:"peatland-agriculture-sustainability",label:"Pertanian Gambut"},
  {value:"coconut-research-center",label:"Pusat Riset Kelapa"},
  {value:"coastal-agriculture-water-management",label:"Pertanian Pesisir & Air"},
];
const catBadge: Record<string,string> = {
  "Brief":"bg-blue-100 text-blue-700","Research Article":"bg-teal-100 text-teal-700",
  "Annual Report":"bg-amber-100 text-amber-700","Book":"bg-purple-100 text-purple-700",
};

const ES = {slug:"",category:"Brief",date:"",image:"",tags:[]as string[],topics:[]as string[],researchAreas:[]as string[]};
const EL = {title:"",description:""};

function sl(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}

export default function PublicationsPage() {
  const {publicationsId,publicationsEn,addPublication,updatePublication,deletePublication} = useTJFStore();
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<number|null>(null); const [lang,setLang]=useState<"id"|"en">("id");
  const [shared,setShared]=useState({...ES}); const [fId,setFId]=useState({...EL}); const [fEn,setFEn]=useState({...EL});

  const filtered=useMemo(()=>publicationsId.filter(p=>p.title?.toLowerCase().includes(q.toLowerCase())),[publicationsId,q]);
  const sS=(k:string,v:any)=>setShared(f=>({...f,[k]:v}));
  const sI=(k:string,v:any)=>setFId(f=>({...f,[k]:v}));
  const sE=(k:string,v:any)=>setFEn(f=>({...f,[k]:v}));
  const cur=lang==="id"?fId:fEn; const set=lang==="id"?sI:sE;

  const openAdd=()=>{setEditing(null);setShared({...ES});setFId({...EL});setFEn({...EL});setLang("id");setOpen(true);};
  const openEdit=(item:any)=>{
    const en=publicationsEn.find((p:any)=>p.id===item.id)??{};
    setEditing(item.id);
    setShared({slug:item.slug??"",category:item.category??"Brief",date:item.date??"",image:item.image??"",tags:item.tags??[],topics:item.topics??[],researchAreas:item.researchAreas??[]});
    setFId({title:item.title??"",description:item.description??""});
    setFEn({title:(en as any).title??"",description:(en as any).description??""});
    setLang("id");setOpen(true);
  };
  const save=()=>{
    const ip={...shared,...fId}; const ep={...shared,...fEn};
    if(editing!==null){updatePublication(editing,"id",ip);updatePublication(editing,"en",ep);}
    else addPublication(ip,ep);
    setOpen(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-7">
        <div><h1 className="text-xl font-black text-gray-900">Publikasi</h1><p className="text-sm text-gray-400 mt-0.5">{publicationsId.length} publikasi</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl transition-colors"><Plus className="w-4 h-4"/>Tambah Publikasi</button>
      </div>
      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"/>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{["","Judul (ID)","Judul (EN)","Tipe","Tanggal",""].map((h,i)=><th key={i} className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item=>{
              const en=publicationsEn.find((p:any)=>p.id===item.id);
              return(
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 w-14"><div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative">{item.image&&<Image src={item.image} alt="" fill className="object-cover" sizes="40px"/>}</div></td>
                  <td className="px-4 py-3 max-w-[180px]"><p className="font-semibold text-gray-900 truncate">{item.title}</p><p className="text-xs text-gray-400 font-mono truncate mt-0.5">{item.slug}</p></td>
                  <td className="px-4 py-3 max-w-[180px]"><p className="text-xs text-gray-600 truncate">{(en as any)?.title||<span className="text-gray-300 italic">—</span>}</p></td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${catBadge[item.category]??"bg-gray-100 text-gray-500"}`}>{item.category}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{item.date}</td>
                  <td className="px-4 py-3"><div className="flex gap-1 justify-end">
                    <button onClick={()=>openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>{if(confirm("Hapus?"))deletePublication(item.id)}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<p className="text-center py-12 text-gray-400 text-sm">Tidak ada data</p>}
      </div>

      <Dialog open={open} onClose={()=>setOpen(false)} title={editing!==null?"Edit Publikasi":"Tambah Publikasi"}
        lang={lang} onLangChange={setLang} onSave={save}
        sharedContent={<>
          <FInput label="Slug" value={shared.slug} onChange={e=>sS("slug",e.target.value)}/>
          <FSelect label="Tipe" value={shared.category} options={CATEGORIES} onChange={e=>sS("category",e.target.value)}/>
          <FInput label="Tanggal" value={shared.date} onChange={e=>sS("date",e.target.value)} placeholder="Juni 2026"/>
          <FInput label="URL Gambar" value={shared.image} onChange={e=>sS("image",e.target.value)} placeholder="https://..."/>
          {shared.image&&<div className="relative h-28 rounded-xl overflow-hidden bg-gray-100"><Image src={shared.image} alt="" fill className="object-cover" sizes="280px"/></div>}
          <FMultiCheck label="Topik" options={TOPIC_OPTS} value={shared.topics} onChange={v=>sS("topics",v)}/>
          <FMultiCheck label="Area Riset" options={RESEARCH_OPTS} value={shared.researchAreas} onChange={v=>sS("researchAreas",v)}/>
          <FTags label="Tags" value={shared.tags} onChange={v=>sS("tags",v)}/>
        </>}
        bilingualContent={<>
          <FInput label="Judul" value={cur.title} onChange={e=>{set("title",e.target.value);if(!editing&&lang==="id")sS("slug",sl(e.target.value));}}/>
          <MarkdownEditor label="Deskripsi" value={cur.description} onChange={v=>set("description",v)} height={380}/>
        </>}
      />
    </div>
  );
}

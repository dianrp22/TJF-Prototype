"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, MapPin } from "lucide-react";
import { useTJFStore } from "@/lib/store";
import Dialog from "@/components/dashboard/Dialog";
import MarkdownEditor from "@/components/dashboard/MarkdownEditor";
import { FInput, FTextarea, FSelect, FTags } from "@/components/dashboard/FormField";

const ES = {slug:"",initiativeSlug:"",date:"",image:"",location:"",landType:"",commodity:"",tags:[]as string[]};
const EL = {title:"",excerpt:"",content:""};

function sl(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}
function toMd(c:any){return Array.isArray(c)?c.join("\n\n"):(c??"");}

export default function StoriesPage() {
  const {storiesId,storiesEn,initiativesId,addStory,updateStory,deleteStory}=useTJFStore();
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<number|null>(null); const [lang,setLang]=useState<"id"|"en">("id");
  const [shared,setShared]=useState({...ES}); const [fId,setFId]=useState({...EL}); const [fEn,setFEn]=useState({...EL});

  const initiativeOpts=useMemo(()=>initiativesId.map((i:any)=>({value:i.slug,label:i.title})),[initiativesId]);
  const filtered=useMemo(()=>storiesId.filter(s=>s.title?.toLowerCase().includes(q.toLowerCase())),[storiesId,q]);

  const sS=(k:string,v:any)=>setShared(f=>({...f,[k]:v}));
  const sI=(k:string,v:any)=>setFId(f=>({...f,[k]:v}));
  const sE=(k:string,v:any)=>setFEn(f=>({...f,[k]:v}));
  const cur=lang==="id"?fId:fEn; const set=lang==="id"?sI:sE;

  const openAdd=()=>{setEditing(null);setShared({...ES,initiativeSlug:initiativesId[0]?.slug??""});setFId({...EL});setFEn({...EL});setLang("id");setOpen(true);};
  const openEdit=(item:any)=>{
    const en=storiesEn.find((s:any)=>s.id===item.id)??{};
    setEditing(item.id);
    setShared({slug:item.slug??"",initiativeSlug:item.initiativeSlug??"",date:item.date??"",image:item.image??"",location:item.location??"",landType:item.landType??"",commodity:item.commodity??"",tags:item.tags??[]});
    setFId({title:item.title??"",excerpt:item.excerpt??"",content:toMd(item.content)});
    setFEn({title:(en as any).title??"",excerpt:(en as any).excerpt??"",content:toMd((en as any).content)});
    setLang("id");setOpen(true);
  };
  const save=()=>{
    const ip={...shared,...fId}; const ep={...shared,...fEn};
    if(editing!==null){updateStory(editing,"id",ip);updateStory(editing,"en",ep);}
    else addStory(ip,ep);
    setOpen(false);
  };
  const getInit=(slug:string)=>initiativesId.find((i:any)=>i.slug===slug)?.title??slug;

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-7">
        <div><h1 className="text-xl font-black text-gray-900">Inisiatif</h1><p className="text-sm text-gray-400 mt-0.5">{storiesId.length} inisiatif</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-semibold rounded-xl transition-colors"><Plus className="w-4 h-4"/>Tambah Inisiatif</button>
      </div>
      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"/>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>{["","Judul (ID)","Judul (EN)","Inisiatif","Lokasi",""].map((h,i)=><th key={i} className="text-left px-4 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wide">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(item=>{
              const en=storiesEn.find((s:any)=>s.id===item.id);
              return(
                <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-4 py-3 w-14"><div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 relative">{item.image&&<Image src={item.image} alt="" fill className="object-cover" sizes="40px"/>}</div></td>
                  <td className="px-4 py-3 max-w-[180px]"><p className="font-semibold text-gray-900 truncate">{item.title}</p><p className="text-xs text-gray-400 mt-0.5">{item.date}</p></td>
                  <td className="px-4 py-3 max-w-[180px]"><p className="text-xs text-gray-600 truncate">{(en as any)?.title||<span className="text-gray-300 italic">—</span>}</p></td>
                  <td className="px-4 py-3"><span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-violet-100 text-violet-700">{getInit(item.initiativeSlug)}</span></td>
                  <td className="px-4 py-3">{item.location&&<span className="flex items-center gap-1 text-xs text-gray-500"><MapPin className="w-3 h-3"/>{item.location}</span>}</td>
                  <td className="px-4 py-3"><div className="flex gap-1 justify-end">
                    <button onClick={()=>openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-violet-50 text-gray-400 hover:text-violet-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                    <button onClick={()=>{if(confirm("Hapus?"))deleteStory(item.id)}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length===0&&<p className="text-center py-12 text-gray-400 text-sm">Tidak ada data</p>}
      </div>

      <Dialog open={open} onClose={()=>setOpen(false)} title={editing!==null?"Edit Inisiatif":"Tambah Inisiatif"}
        lang={lang} onLangChange={setLang} onSave={save}
        sharedContent={<>
          <FInput label="Slug" value={shared.slug} onChange={e=>sS("slug",e.target.value)}/>
          <FSelect label="Inisiatif" value={shared.initiativeSlug} options={initiativeOpts} onChange={e=>sS("initiativeSlug",e.target.value)}/>
          <FInput label="Tanggal" value={shared.date} onChange={e=>sS("date",e.target.value)} placeholder="15 Maret 2026"/>
          <FInput label="Lokasi" value={shared.location} onChange={e=>sS("location",e.target.value)}/>
          <FInput label="Tipe Lahan" value={shared.landType} onChange={e=>sS("landType",e.target.value)}/>
          <FInput label="Komoditas" value={shared.commodity} onChange={e=>sS("commodity",e.target.value)}/>
          <FInput label="URL Gambar" value={shared.image} onChange={e=>sS("image",e.target.value)} placeholder="https://..."/>
          {shared.image&&<div className="relative h-28 rounded-xl overflow-hidden bg-gray-100"><Image src={shared.image} alt="" fill className="object-cover" sizes="280px"/></div>}
          <FTags label="Tags" value={shared.tags} onChange={v=>sS("tags",v)}/>
        </>}
        bilingualContent={<>
          <FInput label="Judul" value={cur.title} onChange={e=>{set("title",e.target.value);if(!editing&&lang==="id")sS("slug",sl(e.target.value));}}/>
          <FTextarea label="Ringkasan" rows={2} value={cur.excerpt} onChange={e=>set("excerpt",e.target.value)}/>
          <MarkdownEditor label="Isi Inisiatif" value={cur.content} onChange={v=>set("content",v)} height={340}/>
        </>}
      />
    </div>
  );
}

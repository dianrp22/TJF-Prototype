"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useTJFStore } from "@/lib/store";
import Dialog from "@/components/dashboard/Dialog";
import { FInput, FTextarea } from "@/components/dashboard/FormField";

const ES = {slug:"",count:0,searchKey:"",image:""};
const EL = {title:"",description:""};

function sl(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");}

export default function TopicsPage() {
  const {topicsId,topicsEn,addTopic,updateTopic,deleteTopic}=useTJFStore();
  const [q,setQ]=useState(""); const [open,setOpen]=useState(false);
  const [editing,setEditing]=useState<number|null>(null); const [lang,setLang]=useState<"id"|"en">("id");
  const [shared,setShared]=useState({...ES}); const [fId,setFId]=useState({...EL}); const [fEn,setFEn]=useState({...EL});

  const filtered=useMemo(()=>topicsId.filter(t=>t.title?.toLowerCase().includes(q.toLowerCase())),[topicsId,q]);
  const sS=(k:string,v:any)=>setShared(f=>({...f,[k]:v}));
  const sI=(k:string,v:any)=>setFId(f=>({...f,[k]:v}));
  const sE=(k:string,v:any)=>setFEn(f=>({...f,[k]:v}));
  const cur=lang==="id"?fId:fEn; const set=lang==="id"?sI:sE;

  const openAdd=()=>{setEditing(null);setShared({...ES});setFId({...EL});setFEn({...EL});setLang("id");setOpen(true);};
  const openEdit=(item:any)=>{
    const en=topicsEn.find((t:any)=>t.id===item.id)??{};
    setEditing(item.id);
    setShared({slug:item.slug??"",count:item.count??0,searchKey:item.searchKey??"",image:item.image??""});
    setFId({title:item.title??"",description:item.description??""});
    setFEn({title:(en as any).title??"",description:(en as any).description??""});
    setLang("id");setOpen(true);
  };
  const save=()=>{
    const ip={...shared,...fId}; const ep={...shared,...fEn};
    if(editing!==null){updateTopic(editing,"id",ip);updateTopic(editing,"en",ep);}
    else addTopic(ip,ep);
    setOpen(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-7">
        <div><h1 className="text-xl font-black text-gray-900">Topik</h1><p className="text-sm text-gray-400 mt-0.5">{topicsId.length} topik</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold rounded-xl transition-colors"><Plus className="w-4 h-4"/>Tambah Topik</button>
      </div>
      <div className="relative mb-5 max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cari..." className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(item=>(
          <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-44">
              {item.image&&<Image src={item.image} alt="" fill className="object-cover" sizes="350px"/>}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"/>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{item.title}</p>
                  <p className="text-[10px] text-gray-400 font-mono truncate">{item.slug}</p>
                </div>
                <span className="text-xs font-bold text-gray-400 flex-shrink-0">{item.count}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{item.description}</p>
              <div className="flex gap-1 mt-3 justify-end">
                <button onClick={()=>openEdit(item)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors"><Pencil className="w-3.5 h-3.5"/></button>
                <button onClick={()=>{if(confirm("Hapus?"))deleteTopic(item.id)}} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length===0&&<p className="text-center py-12 text-gray-400 text-sm bg-white rounded-2xl border border-gray-200">Tidak ada data</p>}

      <Dialog open={open} onClose={()=>setOpen(false)} title={editing!==null?"Edit Topik":"Tambah Topik"}
        lang={lang} onLangChange={setLang} onSave={save}
        sharedContent={<>
          <FInput label="Slug" value={shared.slug} onChange={e=>sS("slug",e.target.value)}/>
          <FInput label="URL Gambar" value={shared.image} onChange={e=>sS("image",e.target.value)} placeholder="https://..."/>
          {shared.image&&<div className="relative h-28 rounded-xl overflow-hidden bg-gray-100"><Image src={shared.image} alt="" fill className="object-cover" sizes="280px"/></div>}
          <FInput label="Search Key" value={shared.searchKey} onChange={e=>sS("searchKey",e.target.value)} hint="Kata kunci internal"/>
        </>}
        bilingualContent={<>
          <FInput label="Nama Topik" value={cur.title} onChange={e=>{set("title",e.target.value);if(!editing&&lang==="id")sS("slug",sl(e.target.value));}}/>
          <FTextarea label="Deskripsi" rows={8} value={cur.description} onChange={e=>set("description",e.target.value)}/>
        </>}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin, Layers, Leaf, Filter } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface Story {
  id: string | number;
  slug: string;
  initiativeSlug: string;
  title: string;
  excerpt: string;
  image: string;
  location: string;
  landType: string;
  commodity: string;
  date: string;
  [key: string]: unknown;
}

interface Ui {
  home: string;
  initiatives: string;
  back: string;
  location: string;
  landType: string;
  commodity: string;
  all: string;
  stories: string;
  results: string;
  empty: string;
  readMore: string;
}

interface Props {
  stories: Story[];
  lang: string;
  programSlug: string;
  ui: Ui;
  locations: string[];
  landTypes: string[];
  commodities: string[];
}

export default function StoriesContent({ stories, lang, programSlug, ui, locations, landTypes, commodities }: Props) {
  const lp = (path: string) => lang === "en" ? path : `/${lang}${path}`;

  const [filterLoc,  setFilterLoc]  = useState("all");
  const [filterLand, setFilterLand] = useState("all");
  const [filterCom,  setFilterCom]  = useState("all");

  const filtered = stories.filter((s) =>
    (filterLoc  === "all" || s.location  === filterLoc) &&
    (filterLand === "all" || s.landType  === filterLand) &&
    (filterCom  === "all" || s.commodity === filterCom)
  );

  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={lp("/initiatives")} className="inline-flex items-center gap-1.5 text-tjf-blue font-semibold text-sm mb-8 hover:gap-2.5 transition-all duration-200 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> {ui.back}
        </Link>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-10 space-y-4">
          <div className="flex items-center gap-2 text-gray-500 text-sm font-bold"><Filter className="w-4 h-4" />{lang === "en" ? "Filter Stories" : "Filter Cerita"}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1"><MapPin className="w-3 h-3" /> {ui.location}</p>
              <div className="flex flex-wrap gap-1.5">
                {locations.map((loc) => (
                  <button key={loc} onClick={() => setFilterLoc(loc)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${filterLoc === loc ? "bg-tjf-blue text-white border-tjf-blue" : "bg-white text-gray-600 border-gray-200 hover:border-tjf-blue/40"}`}
                  >{loc === "all" ? ui.all : loc}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> {ui.landType}</p>
              <div className="flex flex-wrap gap-1.5">
                {landTypes.map((lt) => (
                  <button key={lt} onClick={() => setFilterLand(lt)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${filterLand === lt ? "bg-tjf-blue text-white border-tjf-blue" : "bg-white text-gray-600 border-gray-200 hover:border-tjf-blue/40"}`}
                  >{lt === "all" ? ui.all : lt}</button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1"><Leaf className="w-3 h-3" /> {ui.commodity}</p>
              <div className="flex flex-wrap gap-1.5">
                {commodities.map((com) => (
                  <button key={com} onClick={() => setFilterCom(com)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${filterCom === com ? "bg-tjf-blue text-white border-tjf-blue" : "bg-white text-gray-600 border-gray-200 hover:border-tjf-blue/40"}`}
                  >{com === "all" ? ui.all : com}</button>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 font-medium pt-1">{filtered.length} {ui.results}</p>
        </div>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{ui.empty}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((story, i) => (
              <AnimatedSection key={story.id} delay={i * 0.07}>
                <Link href={lp(`/initiatives/${programSlug}/${story.slug}`)} className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-card-hover hover:border-tjf-blue/20 hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={story.image} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex gap-1.5 flex-wrap">
                      <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full"><MapPin className="w-2.5 h-2.5" /> {story.location}</span>
                      <span className="inline-flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full"><Layers className="w-2.5 h-2.5" /> {story.landType}</span>
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-full"><Leaf className="w-2.5 h-2.5" /> {story.commodity}</span>
                      <span className="text-[10px] text-gray-400">{story.date}</span>
                    </div>
                    <h3 className="font-black text-gray-900 text-sm leading-snug mb-2 group-hover:text-tjf-blue transition-colors flex-1 line-clamp-3">{story.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4">{story.excerpt}</p>
                    <div className="inline-flex items-center gap-1 text-tjf-blue text-xs font-bold group-hover:gap-2 transition-all duration-200">{ui.readMore} <ArrowRight className="w-3 h-3" /></div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

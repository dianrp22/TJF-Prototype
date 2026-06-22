"use client";
import { useTJFStore } from "@/lib/store";
import { stats, partners, researchFocusAreas } from "@/lib/data";
import { statsEn, partnersEn, researchFocusAreasEn } from "@/lib/data-en";

export function usePublicData(lang: string) {
  const store = useTJFStore();
  const en = lang === "en";
  return {
    publications:       en ? store.publicationsEn  : store.publicationsId,
    initiatives:        en ? store.initiativesEn   : store.initiativesId,
    newsItems:          en ? store.newsEn           : store.newsId,
    knowledgeTopics:    en ? store.topicsEn         : store.topicsId,
    initiativeStories:  en ? store.storiesEn        : store.storiesId,
    stats:              en ? statsEn                : stats,
    partners:           en ? partnersEn             : partners,
    researchFocusAreas: en ? researchFocusAreasEn   : researchFocusAreas,
  };
}

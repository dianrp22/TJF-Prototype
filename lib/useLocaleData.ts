"use client";

import { useLang } from "@/contexts/LanguageContext";
import { useTJFStore } from "@/lib/store";
import {
  stats              as statsId,
  partners           as partnersId,
  researchFocusAreas as focusId,
} from "@/lib/data";
import { statsEn, partnersEn, researchFocusAreasEn } from "@/lib/data-en";

export function useLocaleData() {
  const { lang } = useLang();
  const en = lang === "en";
  const s = useTJFStore();

  return {
    publications:       en ? s.publicationsEn : s.publicationsId,
    initiatives:        en ? s.initiativesEn  : s.initiativesId,
    newsItems:          en ? s.newsEn         : s.newsId,
    knowledgeTopics:    en ? s.topicsEn       : s.topicsId,
    initiativeStories:  en ? s.storiesEn      : s.storiesId,
    stats:              en ? statsEn as typeof statsId : statsId,
    partners:           en ? partnersEn : partnersId,
    researchFocusAreas: en ? researchFocusAreasEn as typeof focusId : focusId,
  };
}

import {
  publications, initiatives, newsItems, knowledgeTopics,
  initiativeStories, stats, partners, researchFocusAreas,
} from "@/lib/data";
import {
  publicationsEn, initiativesEn, newsItemsEn, knowledgeTopicsEn,
  initiativeStoriesEn, statsEn, partnersEn, researchFocusAreasEn,
} from "@/lib/data-en";

export function getServerData(lang: string) {
  const en = lang === "en";
  return {
    publications:       en ? publicationsEn       : publications,
    initiatives:        en ? initiativesEn         : initiatives,
    newsItems:          en ? newsItemsEn           : newsItems,
    knowledgeTopics:    en ? knowledgeTopicsEn     : knowledgeTopics,
    initiativeStories:  en ? initiativeStoriesEn   : initiativeStories,
    stats:              en ? statsEn               : stats,
    partners:           en ? partnersEn            : partners,
    researchFocusAreas: en ? researchFocusAreasEn  : researchFocusAreas,
  };
}

export type ServerData = ReturnType<typeof getServerData>;

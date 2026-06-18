"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  publications as pubsId,
  initiatives    as initsId,
  newsItems      as newsId,
  knowledgeTopics as topicsId,
  initiativeStories as storiesId,
} from "@/lib/data";
import {
  publicationsEn,
  initiativesEn,
  newsItemsEn,
  knowledgeTopicsEn,
  initiativeStoriesEn,
} from "@/lib/data-en";

type AnyRecord = Record<string, any>;

function nextId(arr: AnyRecord[]): number {
  return arr.length > 0 ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}

const DEFAULTS = () => ({
  newsId:         newsId             as AnyRecord[],
  publicationsId: pubsId             as AnyRecord[],
  initiativesId:  initsId            as AnyRecord[],
  storiesId:      storiesId          as AnyRecord[],
  topicsId:       topicsId           as AnyRecord[],
  newsEn:         newsItemsEn        as AnyRecord[],
  publicationsEn: publicationsEn     as AnyRecord[],
  initiativesEn:  initiativesEn      as AnyRecord[],
  storiesEn:      initiativeStoriesEn as AnyRecord[],
  topicsEn:       knowledgeTopicsEn  as AnyRecord[],
});

interface TJFStore {
  newsId: AnyRecord[];
  publicationsId: AnyRecord[];
  initiativesId: AnyRecord[];
  storiesId: AnyRecord[];
  topicsId: AnyRecord[];
  newsEn: AnyRecord[];
  publicationsEn: AnyRecord[];
  initiativesEn: AnyRecord[];
  storiesEn: AnyRecord[];
  topicsEn: AnyRecord[];

  addNews: (id: Omit<AnyRecord, "id">, en: Omit<AnyRecord, "id">) => void;
  updateNews: (itemId: number, lang: "id" | "en", updates: AnyRecord) => void;
  deleteNews: (itemId: number) => void;

  addPublication: (id: Omit<AnyRecord, "id">, en: Omit<AnyRecord, "id">) => void;
  updatePublication: (itemId: number, lang: "id" | "en", updates: AnyRecord) => void;
  deletePublication: (itemId: number) => void;

  addInitiative: (id: Omit<AnyRecord, "id">, en: Omit<AnyRecord, "id">) => void;
  updateInitiative: (itemId: number, lang: "id" | "en", updates: AnyRecord) => void;
  deleteInitiative: (itemId: number) => void;

  addStory: (id: Omit<AnyRecord, "id">, en: Omit<AnyRecord, "id">) => void;
  updateStory: (itemId: number, lang: "id" | "en", updates: AnyRecord) => void;
  deleteStory: (itemId: number) => void;

  addTopic: (id: Omit<AnyRecord, "id">, en: Omit<AnyRecord, "id">) => void;
  updateTopic: (itemId: number, lang: "id" | "en", updates: AnyRecord) => void;
  deleteTopic: (itemId: number) => void;

  resetToDefaults: () => void;
}

export const useTJFStore = create<TJFStore>()(
  persist(
    (set) => ({
      ...DEFAULTS(),

      // ── News ─────────────────────────────────────────────
      addNews: (idItem, enItem) =>
        set((s) => {
          const newId = nextId(s.newsId);
          return {
            newsId: [...s.newsId, { ...idItem, id: newId }],
            newsEn: [...s.newsEn, { ...enItem, id: newId }],
          };
        }),
      updateNews: (itemId, lang, updates) =>
        set((s) =>
          lang === "id"
            ? { newsId: s.newsId.map((n) => (n.id === itemId ? { ...n, ...updates } : n)) }
            : { newsEn: s.newsEn.map((n) => (n.id === itemId ? { ...n, ...updates } : n)) }
        ),
      deleteNews: (itemId) =>
        set((s) => ({
          newsId: s.newsId.filter((n) => n.id !== itemId),
          newsEn: s.newsEn.filter((n) => n.id !== itemId),
        })),

      // ── Publications ──────────────────────────────────────
      addPublication: (idItem, enItem) =>
        set((s) => {
          const newId = nextId(s.publicationsId);
          return {
            publicationsId: [...s.publicationsId, { ...idItem, id: newId }],
            publicationsEn: [...s.publicationsEn, { ...enItem, id: newId }],
          };
        }),
      updatePublication: (itemId, lang, updates) =>
        set((s) =>
          lang === "id"
            ? { publicationsId: s.publicationsId.map((p) => (p.id === itemId ? { ...p, ...updates } : p)) }
            : { publicationsEn: s.publicationsEn.map((p) => (p.id === itemId ? { ...p, ...updates } : p)) }
        ),
      deletePublication: (itemId) =>
        set((s) => ({
          publicationsId: s.publicationsId.filter((p) => p.id !== itemId),
          publicationsEn: s.publicationsEn.filter((p) => p.id !== itemId),
        })),

      // ── Initiatives ───────────────────────────────────────
      addInitiative: (idItem, enItem) =>
        set((s) => {
          const newId = nextId(s.initiativesId);
          return {
            initiativesId: [...s.initiativesId, { ...idItem, id: newId }],
            initiativesEn: [...s.initiativesEn, { ...enItem, id: newId }],
          };
        }),
      updateInitiative: (itemId, lang, updates) =>
        set((s) =>
          lang === "id"
            ? { initiativesId: s.initiativesId.map((i) => (i.id === itemId ? { ...i, ...updates } : i)) }
            : { initiativesEn: s.initiativesEn.map((i) => (i.id === itemId ? { ...i, ...updates } : i)) }
        ),
      deleteInitiative: (itemId) =>
        set((s) => ({
          initiativesId: s.initiativesId.filter((i) => i.id !== itemId),
          initiativesEn: s.initiativesEn.filter((i) => i.id !== itemId),
        })),

      // ── Stories ───────────────────────────────────────────
      addStory: (idItem, enItem) =>
        set((s) => {
          const newId = nextId(s.storiesId);
          return {
            storiesId: [...s.storiesId, { ...idItem, id: newId }],
            storiesEn: [...s.storiesEn, { ...enItem, id: newId }],
          };
        }),
      updateStory: (itemId, lang, updates) =>
        set((s) =>
          lang === "id"
            ? { storiesId: s.storiesId.map((x) => (x.id === itemId ? { ...x, ...updates } : x)) }
            : { storiesEn: s.storiesEn.map((x) => (x.id === itemId ? { ...x, ...updates } : x)) }
        ),
      deleteStory: (itemId) =>
        set((s) => ({
          storiesId: s.storiesId.filter((x) => x.id !== itemId),
          storiesEn: s.storiesEn.filter((x) => x.id !== itemId),
        })),

      // ── Topics ────────────────────────────────────────────
      addTopic: (idItem, enItem) =>
        set((s) => {
          const newId = nextId(s.topicsId);
          return {
            topicsId: [...s.topicsId, { ...idItem, id: newId }],
            topicsEn: [...s.topicsEn, { ...enItem, id: newId }],
          };
        }),
      updateTopic: (itemId, lang, updates) =>
        set((s) =>
          lang === "id"
            ? { topicsId: s.topicsId.map((t) => (t.id === itemId ? { ...t, ...updates } : t)) }
            : { topicsEn: s.topicsEn.map((t) => (t.id === itemId ? { ...t, ...updates } : t)) }
        ),
      deleteTopic: (itemId) =>
        set((s) => ({
          topicsId: s.topicsId.filter((t) => t.id !== itemId),
          topicsEn: s.topicsEn.filter((t) => t.id !== itemId),
        })),

      // ── Reset ─────────────────────────────────────────────
      resetToDefaults: () => set(DEFAULTS()),
    }),
    {
      name: "tjf-cms-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      partialize: (s) => ({
        newsId: s.newsId, newsEn: s.newsEn,
        publicationsId: s.publicationsId, publicationsEn: s.publicationsEn,
        initiativesId: s.initiativesId, initiativesEn: s.initiativesEn,
        storiesId: s.storiesId, storiesEn: s.storiesEn,
        topicsId: s.topicsId, topicsEn: s.topicsEn,
      }),
    }
  )
);

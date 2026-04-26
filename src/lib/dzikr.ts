export interface DzikrItem {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  notes: string | null;   // null in fitrahive data when no repeat instruction
  fawaid: string;
  source: string;
}

import morningData from "@/data/morning-dhikr.json";
import eveningData from "@/data/evening-dhikr.json";
import dailyDuaData from "@/data/daily-dua.json";
import selectedDuaData from "@/data/selected-dua.json";
import dhikrAfterSalahData from "@/data/dhikr-after-salah.json";

/** All available categories — single source of truth for routing + UI. */
export const CATEGORIES = [
  {
    slug: "morning-dhikr",
    name: "Dzikir Pagi",
    arabic: "أذكار الصباح",
    count: (morningData as DzikrItem[]).length,
    timeHint: "morning" as const,
  },
  {
    slug: "evening-dhikr",
    name: "Dzikir Petang",
    arabic: "أذكار المساء",
    count: (eveningData as DzikrItem[]).length,
    timeHint: "evening" as const,
  },
  {
    slug: "daily-dua",
    name: "Doa Harian",
    arabic: "الأدعية اليومية",
    count: (dailyDuaData as DzikrItem[]).length,
    timeHint: null,
  },
  {
    slug: "selected-dua",
    name: "Doa Pilihan",
    arabic: "أدعية مختارة",
    count: (selectedDuaData as DzikrItem[]).length,
    timeHint: null,
  },
  {
    slug: "dhikr-after-salah",
    name: "Dzikir Setelah Shalat",
    arabic: "أذكار بعد الصلاة",
    count: (dhikrAfterSalahData as DzikrItem[]).length,
    timeHint: null,
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

const DATA_MAP: Record<CategorySlug, DzikrItem[]> = {
  "morning-dhikr":    morningData as DzikrItem[],
  "evening-dhikr":    eveningData as DzikrItem[],
  "daily-dua":        dailyDuaData as DzikrItem[],
  "selected-dua":     selectedDuaData as DzikrItem[],
  "dhikr-after-salah": dhikrAfterSalahData as DzikrItem[],
};

/** Returns the item list for a category slug, or null if unknown. */
export function getItemsBySlug(slug: string): DzikrItem[] | null {
  return DATA_MAP[slug as CategorySlug] ?? null;
}

// ── Legacy helpers (kept for any remaining call sites) ──────────────────
export function getMorningDzikr(): DzikrItem[] { return morningData as DzikrItem[]; }
export function getEveningDzikr(): DzikrItem[] { return eveningData as DzikrItem[]; }
export function getDzikrByType(type: "morning" | "evening"): DzikrItem[] {
  return type === "morning" ? getMorningDzikr() : getEveningDzikr();
}

/** Parses the repeat count from a notes string (e.g. "Dibaca 3x" → 3). */
export function getRepeatCount(notes: string | null): number {
  const match = (notes ?? "").match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

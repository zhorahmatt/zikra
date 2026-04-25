export interface DzikrItem {
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  notes: string;
  fawaid: string;
  source: string;
}

import morningData from "@/data/morning-dhikr.json";
import eveningData from "@/data/evening-dhikr.json";

export function getMorningDzikr(): DzikrItem[] {
  return morningData as DzikrItem[];
}

export function getEveningDzikr(): DzikrItem[] {
  return eveningData as DzikrItem[];
}

export function getDzikrByType(type: "morning" | "evening"): DzikrItem[] {
  return type === "morning" ? getMorningDzikr() : getEveningDzikr();
}

export function getRepeatCount(notes: string): number {
  const match = notes.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 1;
}

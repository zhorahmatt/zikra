const STORAGE_KEY_PREFIX = "zikra_progress_";

export interface ProgressData {
  currentIndex: number;
  completedIndices: number[];
  lastReadAt: string;
}

export function getProgress(type: "morning" | "evening"): ProgressData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + type);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProgress(
  type: "morning" | "evening",
  currentIndex: number,
  completedIndices: number[]
): void {
  if (typeof window === "undefined") return;
  const data: ProgressData = {
    currentIndex,
    completedIndices,
    lastReadAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY_PREFIX + type, JSON.stringify(data));
}

export function resetProgress(type: "morning" | "evening"): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY_PREFIX + type);
}

export function getTodayKey(): string {
  return new Date().toISOString().split("T")[0];
}

export function isMorningTime(): boolean {
  const hour = new Date().getHours();
  return hour >= 4 && hour < 15;
}

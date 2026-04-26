"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { DzikrItem } from "@/lib/dzikr";
import { saveProgress, getProgress } from "@/lib/progress";
import { celebrateComplete } from "@/lib/celebrate";
import { playCompleteDone } from "@/lib/sound";
import DzikrCard from "@/components/DzikrCard";
import ProgressRing from "@/components/ui/ProgressRing";
import ThemeToggle from "@/components/ui/ThemeToggle";

interface ReadingScreenProps {
  type: "morning" | "evening";
  items: DzikrItem[];
}

const AUTO_SCROLL_SPEEDS = [
  { label: "Lambat", value: 1 },
  { label: "Sedang", value: 2 },
  { label: "Cepat", value: 3 },
];

export default function ReadingScreen({ type, items }: ReadingScreenProps) {
  const router = useRouter();
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  // Tracks whether the user actually completed items in THIS session.
  // Used to gate the celebrate effect so it doesn't re-fire on re-entry
  // when progress is restored from localStorage.
  const completedInSessionRef = useRef(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<number | null>(null);

  const title = type === "morning" ? "Dzikir Pagi" : "Dzikir Petang";
  const arabicTitle = type === "morning" ? "أذكار الصباح" : "أذكار المساء";

  // Restore progress (completed items) on mount
  useEffect(() => {
    const progress = getProgress(type);
    if (progress) {
      setCompletedIndices(progress.completedIndices);
      setCurrentIndex(progress.currentIndex);
    }
  }, [type]);

  // Restore scroll position from sessionStorage when navigating back
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const saved = sessionStorage.getItem(`zikra_scroll_${type}`);
    if (saved) {
      // Use requestAnimationFrame to ensure layout is complete before scrolling
      requestAnimationFrame(() => {
        container.scrollTop = parseInt(saved, 10);
      });
    }
  }, [type]);

  // Save scroll position to sessionStorage continuously
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      sessionStorage.setItem(`zikra_scroll_${type}`, String(container.scrollTop));
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [type]);

  // Save progress when it changes
  useEffect(() => {
    if (completedIndices.length > 0 || currentIndex > 0) {
      saveProgress(type, currentIndex, completedIndices);
    }
    // Only fire grand finale if the user actively completed all items in
    // this session (not when progress is merely restored from localStorage).
    if (
      completedIndices.length === items.length &&
      items.length > 0 &&
      completedInSessionRef.current
    ) {
      completedInSessionRef.current = false; // reset so it won't re-fire
      setTimeout(() => {
        celebrateComplete();
        playCompleteDone();
      }, 300);
    }
  }, [type, currentIndex, completedIndices, items.length]);

  // Track current visible card
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/dzikr-(\d+)/);
            if (match) {
              setCurrentIndex(parseInt(match[1], 10));
            }
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    const cards = container.querySelectorAll("[id^='dzikr-']");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [items]);

  // Auto-scroll logic
  useEffect(() => {
    if (autoScroll) {
      const pixelsPerFrame = scrollSpeed * 0.5;
      const tick = () => {
        const container = scrollContainerRef.current;
        if (container) {
          container.scrollTop += pixelsPerFrame;

          // Stop if reached the end
          if (
            container.scrollTop + container.clientHeight >=
            container.scrollHeight - 10
          ) {
            setAutoScroll(false);
            return;
          }
        }
        autoScrollRef.current = requestAnimationFrame(tick);
      };
      autoScrollRef.current = requestAnimationFrame(tick);
    }

    return () => {
      if (autoScrollRef.current) {
        cancelAnimationFrame(autoScrollRef.current);
      }
    };
  }, [autoScroll, scrollSpeed]);

  // Pause auto-scroll on user interaction
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStarted = false;
    const handleTouchStart = () => {
      touchStarted = true;
      if (autoScroll) setAutoScroll(false);
    };
    const handleTouchEnd = () => {
      touchStarted = false;
    };
    const handleWheel = () => {
      if (autoScroll) setAutoScroll(false);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    container.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("wheel", handleWheel);
    };
  }, [autoScroll]);

  const handleComplete = useCallback(
    (index: number) => {
      // Use functional updater so the guard runs against the *latest* state,
      // not a stale closure — prevents duplicate insertion even if called
      // twice in the same React batch (e.g. from bubbled button + card tap).
      setCompletedIndices((prev) => {
        if (prev.includes(index)) return prev;
        completedInSessionRef.current = true; // user actually completed something
        return [...prev, index];
      });

      // Auto-scroll to next
      if (index < items.length - 1) {
        setTimeout(() => {
          const nextEl = document.getElementById(`dzikr-${index + 1}`);
          if (nextEl) {
            nextEl.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 400);
      }
    },
    [items.length]
  );

  return (
    <div className="h-dvh flex flex-col" style={{ backgroundColor: "var(--bg)" }}>
      {/* Sticky top wrapper: header + controls move as one unit */}
      <div
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "var(--bg)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        {/* Top Bar */}
        <header className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 rounded-lg active:bg-surface-container-high/50"
            aria-label="Back"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="text-center">
            <h1
              className="text-base font-semibold"
              style={{ fontFamily: "Manrope", color: "var(--text-primary)" }}
            >
              {title}
            </h1>
            <p
              className="text-xs"
              style={{ fontFamily: "Newsreader", color: "var(--text-muted)", direction: "rtl" }}
            >
              {arabicTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <ProgressRing current={completedIndices.length} total={items.length} />
          </div>
        </header>

        {/* Auto-scroll Controls */}
        <div
          className="flex items-center justify-center gap-3 px-4 py-2 border-t"
          style={{ borderColor: "var(--border-color)" }}
        >
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`
              flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all
              ${autoScroll ? "chip-primary" : ""}
            `}
            style={
              autoScroll
                ? {}
                : {
                    backgroundColor: "var(--bg-card-alt)",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border-color)",
                  }
            }
          >
            {autoScroll ? (
              <>
                <span className="pulse-gentle">●</span> Auto-scroll Aktif
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Auto-scroll
              </>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: "var(--bg-card-alt)",
                color: "var(--text-secondary)",
                border: "1px solid var(--border-color)",
              }}
            >
              {AUTO_SCROLL_SPEEDS.find((s) => s.value === scrollSpeed)?.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="inline-block ml-1"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {showSpeedMenu && (
              <div
                className="absolute top-full right-0 mt-1 rounded-lg shadow-lg overflow-hidden z-50"
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {AUTO_SCROLL_SPEEDS.map((speed) => (
                  <button
                    key={speed.value}
                    onClick={() => {
                      setScrollSpeed(speed.value);
                      setShowSpeedMenu(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                      scrollSpeed === speed.value ? "font-bold" : ""
                    }`}
                    style={{
                      color:
                        scrollSpeed === speed.value
                          ? "var(--primary-green)"
                          : "var(--text-secondary)",
                      backgroundColor:
                        scrollSpeed === speed.value
                          ? "var(--primary-green-surface)"
                          : "transparent",
                    }}
                  >
                    {speed.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dzikr List */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{ scrollBehavior: autoScroll ? "auto" : "smooth" }}
      >
        <div className="container-app flex flex-col gap-8">
          {items.map((item, index) => (
            <DzikrCard
              key={index}
              item={item}
              index={index}
              total={items.length}
              isActive={currentIndex === index}
              onComplete={() => handleComplete(index)}
            />
          ))}

          {/* Completion state */}
          {completedIndices.length === items.length && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🤲</div>
              <h2
                className="text-xl font-bold mb-2"
                style={{ fontFamily: "Newsreader", color: "var(--text-primary)" }}
              >
                Alhamdulillah
              </h2>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
              >
                Kamu telah menyelesaikan {title}
              </p>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
                style={{
                  backgroundColor: "var(--primary-green)",
                  color: "white",
                  fontFamily: "Manrope",
                }}
              >
                Kembali ke Beranda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

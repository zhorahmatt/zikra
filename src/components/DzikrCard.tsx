"use client";

import { useState, useRef } from "react";
import type { DzikrItem } from "@/lib/dzikr";
import { getRepeatCount } from "@/lib/dzikr";
import TasbihCounter from "@/components/ui/TasbihCounter";
import { celebrateSingle } from "@/lib/celebrate";

interface DzikrCardProps {
  item: DzikrItem;
  index: number;
  total: number;
  isActive?: boolean;
  onComplete?: () => void;
}

export default function DzikrCard({
  item,
  index,
  total,
  isActive = false,
  onComplete,
}: DzikrCardProps) {
  const [showLatin, setShowLatin] = useState(false);
  const [showFawaid, setShowFawaid] = useState(false);
  const [done, setDone] = useState(false);
  const selesaiBtnRef = useRef<HTMLButtonElement>(null);
  const repeatCount = getRepeatCount(item.notes);

  return (
    <article
      className={`
        card-elevated p-6 md:p-8 transition-all duration-300
        ${isActive ? "ring-2 ring-primary-container" : ""}
      `}
      id={`dzikr-${index}`}
    >
      {/* Header: Number + Title + Repeat badge */}
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{
              backgroundColor: "var(--primary-green-surface)",
              color: "var(--primary-green)",
            }}
          >
            {index + 1}
          </span>
          <h3
            className="text-base font-semibold leading-snug"
            style={{ color: "var(--text-primary)", fontFamily: "Manrope" }}
          >
            {item.title}
          </h3>
        </div>
      </div>

      {/* Arabic Text */}
      <div className="mb-6">
        <p className="arabic-text">{item.arabic}</p>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-6"
        style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }}
      />

      {/* Translation */}
      <div className="mb-4">
        <p className="translation-text">{item.translation}</p>
      </div>

      {/* Latin toggle */}
      <button
        onClick={() => setShowLatin(!showLatin)}
        className="text-sm font-medium mb-4 flex items-center gap-1.5 transition-colors hover:opacity-80"
        style={{ color: "var(--primary-green)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`transition-transform duration-200 ${showLatin ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {showLatin ? "Sembunyikan Latin" : "Tampilkan Latin"}
      </button>

      {showLatin && (
        <div className="mb-4 pl-4 border-l-2" style={{ borderColor: "var(--border-color)" }}>
          <p className="latin-text">{item.latin}</p>
        </div>
      )}

      {/* Chips: Notes + Source */}
      <div className="flex flex-wrap gap-2 mb-5">
        <span className="chip chip-primary">{item.notes}</span>
        <span className="chip chip-tertiary">{item.source}</span>
      </div>

      {/* Fawaid expandable */}
      {item.fawaid && (
        <div className="mb-5">
          <button
            onClick={() => setShowFawaid(!showFawaid)}
            className="text-sm font-medium flex items-center gap-1.5 transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`transition-transform duration-200 ${showFawaid ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Faedah
          </button>
          {showFawaid && (
            <div
              className="mt-3 p-4 rounded-lg text-sm leading-relaxed"
              style={{
                backgroundColor: "var(--bg-card-alt)",
                color: "var(--text-secondary)",
                fontFamily: "Manrope",
              }}
            >
              {item.fawaid}
            </div>
          )}
        </div>
      )}

      {/* Tasbih counter for items with repeat > 1 */}
      {repeatCount > 1 && (
        <div className="flex justify-center pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <TasbihCounter target={repeatCount} onComplete={onComplete} />
        </div>
      )}

      {/* Single-read completion button */}
      {repeatCount === 1 && onComplete && (
        <div className="flex justify-center pt-4 border-t" style={{ borderColor: "var(--border-color)" }}>
          <button
            ref={selesaiBtnRef}
            onClick={() => {
              if (done) return;
              setDone(true);
              celebrateSingle(selesaiBtnRef.current);
              onComplete();
            }}
            className={`
              px-6 py-2.5 rounded-xl text-sm font-semibold
              transition-all duration-300
              ${done
                ? "scale-110"
                : "active:scale-95 hover:brightness-110"
              }
            `}
            style={{
              backgroundColor: done ? "#4a6741" : "var(--primary-green)",
              color: "white",
              fontFamily: "Manrope",
              boxShadow: done
                ? "0 0 0 4px rgba(74,103,65,0.25)"
                : undefined,
            }}
          >
            {done ? "✅ Selesai" : "Selesai ✓"}
          </button>
        </div>
      )}

      {/* Position indicator */}
      <div className="mt-4 text-center">
        <span
          className="text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
        >
          {index + 1} dari {total}
        </span>
      </div>
    </article>
  );
}

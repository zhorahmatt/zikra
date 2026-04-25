"use client";

import { useState, useRef } from "react";
import type { DzikrItem } from "@/lib/dzikr";
import { getRepeatCount } from "@/lib/dzikr";
import { celebrateSingle, celebrateTasbih } from "@/lib/celebrate";

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
  const [tasbihCount, setTasbihCount] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const repeatCount = getRepeatCount(item.notes);
  const isTasbih = repeatCount > 1;

  // Mark as done (single-read)
  const handleSelesai = () => {
    if (done) return;
    setDone(true);
    celebrateSingle(btnRef.current);
    navigator.vibrate?.(10);
    onComplete?.();
  };

  // Tap tasbih counter in header pill
  const handleTasbihTap = () => {
    if (done) return;
    const next = tasbihCount + 1;
    setTasbihCount(next);
    navigator.vibrate?.(10);
    if (next >= repeatCount) {
      setDone(true);
      celebrateTasbih(btnRef.current);
      onComplete?.();
    }
  };

  const pillDone = done;
  const pillLabel = isTasbih
    ? done
      ? "Selesai"
      : `${tasbihCount}/${repeatCount}`
    : done
    ? "Selesai"
    : "Tandai";

  const handleCardTap = isTasbih ? handleTasbihTap : handleSelesai;

  return (
    <article
      onClick={onComplete && !done ? handleCardTap : undefined}
      className={`
        card-elevated p-5 transition-all duration-300
        ${isActive ? "ring-2 ring-primary-container" : ""}
        ${done ? "opacity-75" : ""}
        ${onComplete && !done ? "cursor-pointer active:scale-[0.99]" : ""}
      `}
      id={`dzikr-${index}`}
    >
      {/* Header row: number badge + title + action pill */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {/* Number / done badge */}
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
            style={{
              backgroundColor: done
                ? "var(--primary-green)"
                : "var(--primary-green-surface)",
              color: done ? "white" : "var(--primary-green)",
              transition: "all 0.3s ease",
            }}
          >
            {done ? "✓" : index + 1}
          </span>
          <h3
            className="text-sm font-semibold leading-snug"
            style={{ color: "var(--text-primary)", fontFamily: "Manrope" }}
          >
            {item.title}
          </h3>
        </div>

        {/* Action pill — top right for ALL card types */}
        {onComplete && (
          <button
            ref={btnRef}
            onClick={isTasbih ? handleTasbihTap : handleSelesai}
            disabled={done}
            className={`
              shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
              transition-all duration-300
              ${done ? "cursor-default" : "active:scale-95 hover:brightness-110"}
              ${isTasbih && !done ? "tabular-nums" : ""}
            `}
            style={{
              backgroundColor: done
                ? "var(--primary-green)"
                : "var(--primary-green-surface)",
              color: done ? "white" : "var(--primary-green)",
              boxShadow: done
                ? "0 0 0 3px rgba(74,103,65,0.2)"
                : undefined,
              fontFamily: "Manrope",
              minWidth: isTasbih ? "4.5rem" : undefined,
              justifyContent: "center",
            }}
            aria-label={
              isTasbih
                ? done
                  ? "Tasbih selesai"
                  : `Tasbih ${tasbihCount} dari ${repeatCount}`
                : done
                ? "Selesai"
                : "Tandai selesai"
            }
          >
            {done ? (
              <>
                <svg
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="3"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {pillLabel}
              </>
            ) : (
              <>
                {isTasbih ? (
                  /* Tasbih: show count/target with a small tap icon */
                  <>
                    <svg
                      width="11" height="11" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    {pillLabel}
                  </>
                ) : (
                  /* Single read: Tandai */
                  <>
                    <svg
                      width="12" height="12" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    Tandai
                  </>
                )}
              </>
            )}
          </button>
        )}
      </div>

      {/* Arabic Text */}
      <div className="mb-4">
        <p className="arabic-text">{item.arabic}</p>
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-4"
        style={{ backgroundColor: "var(--border-color)", opacity: 0.5 }}
      />

      {/* Translation */}
      <div className="mb-3">
        <p className="translation-text">{item.translation}</p>
      </div>

      {/* Latin toggle */}
      <button
        onClick={(e) => { e.stopPropagation(); setShowLatin(!showLatin); }}
        className="text-xs font-medium mb-3 flex items-center gap-1 transition-colors hover:opacity-80"
        style={{ color: "var(--primary-green)" }}
      >
        <svg
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-200 ${showLatin ? "rotate-90" : ""}`}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        {showLatin ? "Sembunyikan Latin" : "Tampilkan Latin"}
      </button>

      {showLatin && (
        <div className="mb-3 pl-3 border-l-2" style={{ borderColor: "var(--border-color)" }}>
          <p className="latin-text">{item.latin}</p>
        </div>
      )}

      {/* Chips: Notes + Source */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className="chip chip-primary">{item.notes}</span>
        <span className="chip chip-tertiary">{item.source}</span>
      </div>

      {/* Fawaid expandable */}
      {item.fawaid && (
        <div className="mb-3">
          <button
            onClick={(e) => { e.stopPropagation(); setShowFawaid(!showFawaid); }}
            className="text-xs font-medium flex items-center gap-1 transition-colors hover:opacity-80"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="12" height="12" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform duration-200 ${showFawaid ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            Faedah
          </button>
          {showFawaid && (
            <div
              className="mt-2 p-3 rounded-lg text-xs leading-relaxed"
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

      {/* Position indicator */}
      <div className="mt-2 text-right">
        <span
          className="text-xs"
          style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
        >
          {index + 1}/{total}
        </span>
      </div>
    </article>
  );
}

"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { DzikrItem } from "@/lib/dzikr";
import { getRepeatCount } from "@/lib/dzikr";
import { celebrateSingle, celebrateTasbih } from "@/lib/celebrate";
import { playSingleDone, playTasbihDone } from "@/lib/sound";

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
  const [isBouncing, setIsBouncing] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const repeatCount = getRepeatCount(item.notes);
  const isTasbih = repeatCount > 1;

  // Mark as done (single-read)
  const handleSelesai = () => {
    if (done) return;
    setDone(true);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
    playSingleDone();
    celebrateSingle(btnRef.current);
    navigator.vibrate?.(10);
    onComplete?.();
  };

  // Tap tasbih counter in header pill
  const handleTasbihTap = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // prevent bubble to article onClick
    if (done) return;
    const next = tasbihCount + 1;
    setTasbihCount(next);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
    navigator.vibrate?.(10);
    if (next >= repeatCount) {
      setDone(true);
      playTasbihDone();
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
    <>
    <article
      onClick={onComplete && !done ? handleCardTap : undefined}
      className={`
        card-elevated p-5 transition-all duration-300
        ${isActive ? "ring-2 ring-primary-container" : ""}
        ${done ? "opacity-75" : ""}
        ${onComplete && !done ? "cursor-pointer active:scale-[0.99]" : ""}
        ${isBouncing ? "animate-card-bounce" : ""}
      `}
      id={`dzikr-${index}`}
    >
      {/* Header: number badge | title + chips | action pill */}
      <div className="flex items-start justify-between gap-2 mb-4">

        {/* Left: number badge */}
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
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

        {/* Middle: title + inline metadata */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold leading-snug mb-1"
            style={{
              color: "var(--text-primary)",
              fontFamily: "Manrope",
              fontSize: "1rem",
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-xs truncate"
            style={{
              color: "var(--text-muted)",
              fontFamily: "Manrope",
            }}
          >
            {item.source}
          </p>
        </div>

        {/* Right: action pill */}
        {onComplete && (
          <button
            ref={btnRef}
            onClick={(e) => {
              e.stopPropagation();
              if (isTasbih) handleTasbihTap(e);
              else handleSelesai();
            }}
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
        className="text-lg mb-3 flex items-center gap-1.5 transition-colors hover:opacity-80"
        style={{ color: "var(--primary-green)", fontFamily: "Newsreader" }}
      >
        <svg
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2"
          className={`transition-transform duration-200 mt-1 ${showLatin ? "rotate-90" : ""}`}
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



      {/* Fawaid — popup trigger */}
      {item.fawaid && (
        <div className="mb-3">
          <button
            onClick={(e) => { e.stopPropagation(); setShowFawaid(true); }}
            className="text-lg flex items-center gap-1.5 transition-colors hover:opacity-80"
            style={{ color: "var(--primary-green)", fontFamily: "Newsreader" }}
          >
            {/* Sparkle / star icon */}
            <svg
              width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2"
              className="mt-0.5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            Lihat Keutamaan
          </button>
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
      <style>{`
        @keyframes cardBounce {
          0% { transform: scale(1); }
          40% { transform: scale(0.96); }
          75% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .animate-card-bounce {
          animation: cardBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </article>

    {/* Fawaid Modal */}
    {showFawaid && typeof document !== "undefined" && createPortal(
      <>
        {/* Backdrop */}
        <div
          onClick={() => setShowFawaid(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            backgroundColor: "rgba(0,0,0,0.4)",
          }}
        />
        {/* Bottom sheet */}
        <div
          style={{
            position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
            maxWidth: "600px", margin: "0 auto",
            animation: "sheetUp 0.25s cubic-bezier(0.32,0.72,0,1) both",
          }}
        >
          <div
            className="rounded-t-2xl p-6 pb-8"
            style={{ backgroundColor: "var(--bg-card)", position: "relative" }}
          >
            {/* X close button — top right */}
            <button
              onClick={() => setShowFawaid(false)}
              aria-label="Tutup"
              style={{
                position: "absolute", top: "1rem", right: "1rem",
                width: 32, height: 32,
                borderRadius: "50%",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-card-alt)",
                color: "var(--text-muted)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Handle */}
            <div
              className="w-10 h-1 rounded-full mx-auto mb-5"
              style={{ backgroundColor: "var(--border-color)" }}
            />
            {/* Icon + Title (one line) */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "var(--primary-green-surface)", color: "var(--primary-green)" }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </span>
              <h2
                style={{
                  fontFamily: "Newsreader",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  lineHeight: 1.3,
                }}
              >
                Keutamaan Membaca {item.title}
              </h2>
            </div>
            {/* Content */}
            <p
              style={{
                fontFamily: "Newsreader",
                fontSize: "1.1rem",
                lineHeight: 1.7,
                color: "var(--primary-green)",
                backgroundColor: "var(--primary-green-surface)",
                borderRadius: "0.75rem",
                padding: "1rem",
              }}
            >
              {item.fawaid}
            </p>
          </div>
        </div>
        <style>{`
          @keyframes sheetUp {
            from { transform: translateY(100%); }
            to   { transform: translateY(0); }
          }
        `}</style>
      </>,
      document.body
    )}
  </>
  );
}

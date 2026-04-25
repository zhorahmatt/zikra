"use client";

import { useState, useCallback, useRef } from "react";
import { celebrateTasbih } from "@/lib/celebrate";

interface TasbihCounterProps {
  target: number;
  onComplete?: () => void;
}

export default function TasbihCounter({ target, onComplete }: TasbihCounterProps) {
  const [count, setCount] = useState(0);
  const isComplete = count >= target;
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleTap = useCallback(() => {
    if (isComplete) return;
    const next = count + 1;
    setCount(next);

    // Haptic feedback
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }

    if (next >= target) {
      celebrateTasbih(btnRef.current);
      if (onComplete) onComplete();
    }
  }, [count, target, isComplete, onComplete]);

  const handleReset = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        ref={btnRef}
        onClick={handleTap}
        disabled={isComplete}
        className={`
          relative w-20 h-20 rounded-full flex items-center justify-center
          shadow-lg active:scale-95 transition-all duration-150
          ${isComplete
            ? "bg-primary-fixed opacity-80"
            : "bg-primary-container hover:bg-primary-container/90"
          }
        `}
        style={{
          boxShadow: isComplete
            ? "none"
            : "0 0 20px rgba(74, 103, 65, 0.2), inset 0 1px 2px rgba(255,255,255,0.1)",
        }}
        aria-label={`Tasbih counter: ${count} of ${target}`}
      >
        <span
          className="text-xl font-bold"
          style={{ color: isComplete ? "var(--primary-green)" : "var(--bg-card)" }}
        >
          {count}
        </span>
      </button>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          {count}/{target}
        </span>
        {count > 0 && (
          <button
            onClick={handleReset}
            className="text-xs underline"
            style={{ color: "var(--text-muted)" }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { isMorningTime } from "@/lib/progress";

/* ── Gear Icon ─────────────────────────────────────────────────────────── */
function GearIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        transform: spinning ? "rotate(90deg)" : "rotate(0deg)",
      }}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

/* ── Settings Popup ────────────────────────────────────────────────────── */
function SettingsPopup({
  onClose,
  onTentang,
  onBahasa,
}: {
  onClose: () => void;
  onTentang: () => void;
  onBahasa: () => void;
}) {
  return (
    <>
      {/* Invisible overlay to close on outside tap */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Popup card — appears above the gear button */}
      <div
        className="absolute bottom-full right-0 mb-2 z-50 settings-popup-enter"
        style={{ minWidth: "200px" }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0px 8px 32px rgba(0,0,0,0.12)",
          }}
        >
          {/* Tentang row */}
          <button
            onClick={onTentang}
            className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--bg-card-alt)] active:bg-[var(--bg-card-alt)]"
            style={{ borderBottom: "1px solid var(--border-color)" }}
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--bg-card-alt)" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary-green)"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4M12 8h.01" />
              </svg>
            </span>
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "Manrope, sans-serif", color: "var(--text-primary)" }}
            >
              Tentang
            </span>
            <svg
              className="ml-auto"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Bahasa row */}
          <button
            onClick={onBahasa}
            className="w-full flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-[var(--bg-card-alt)] active:bg-[var(--bg-card-alt)]"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--bg-card-alt)" }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--primary-green)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 8l6 6" />
                <path d="M4 14s1-1 2-1 2 1 3 1 2-1 3-1 2 1 2 1" />
                <path d="M12 3v3" />
                <rect x="2" y="2" width="10" height="8" rx="2" />
                <path d="M22 22l-5-10-5 10" />
                <path d="M14.5 18h5" />
              </svg>
            </span>
            <span
              className="text-sm font-medium"
              style={{ fontFamily: "Manrope, sans-serif", color: "var(--text-primary)" }}
            >
              Bahasa
            </span>
            <svg
              className="ml-auto"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-muted)"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Little arrow pointing down toward gear */}
        <div
          className="absolute right-5 bottom-0 translate-y-full"
          style={{
            width: 0,
            height: 0,
            borderLeft: "7px solid transparent",
            borderRight: "7px solid transparent",
            borderTop: "7px solid var(--bg-card)",
            filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.06))",
          }}
        />
      </div>
    </>
  );
}

/* ── Coming Soon Bottom Sheet ──────────────────────────────────────────── */
function ComingSoonSheet({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 z-40"
        style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
        onClick={onClose}
      />
      <div
        className="fixed bottom-0 left-0 right-0 z-50 animate-sheet-up"
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <div
          className="rounded-t-2xl p-6 pb-10"
          style={{ backgroundColor: "var(--bg-card)" }}
        >
          <div
            className="w-10 h-1 rounded-full mx-auto mb-6"
            style={{ backgroundColor: "var(--border-color)" }}
          />
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: "var(--bg-card-alt)" }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary-green)"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h2
            className="text-xl text-center mb-2"
            style={{
              fontFamily: "Newsreader, Georgia, serif",
              color: "var(--text-primary)",
              fontWeight: 600,
            }}
          >
            Segera Hadir
          </h2>
          <p
            className="text-sm text-center mb-8"
            style={{
              fontFamily: "Manrope, sans-serif",
              color: "var(--text-muted)",
              lineHeight: 1.6,
            }}
          >
            Pengaturan bahasa sedang dalam pengembangan.
            <br />
            Nantikan pembaruan berikutnya.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-opacity active:opacity-80"
            style={{
              backgroundColor: "var(--primary-green)",
              color: "#ffffff",
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Mengerti
          </button>
        </div>
      </div>
    </>
  );
}

/* ── Main Component ────────────────────────────────────────────────────── */
const TAGLINES = [
  "Dunia begitu bising, temukan tenangmu dalam setiap helaan dzikir.",
  "Jangan biarkan hatimu sepi, saat Allah selalu menunggumu kembali melalui satu baris asma-Nya.",
  "Di mana pun kakimu berpijak, pastikan hatimu tetap terpaut pada-Nya.",
  "Awali harimu dengan mengingat Allah.",
];

export default function LandingScreen() {
  const isMorning = isMorningTime();
  const router = useRouter();

  // SSR renders the last tagline (stable, no hydration mismatch).
  // After hydration useEffect randomizes it on the client only.
  const [tagline, setTagline] = useState(TAGLINES[TAGLINES.length - 1]);
  useEffect(() => {
    setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);
  }, []);

  const [gearSpinning, setGearSpinning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const spinTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleGearClick() {
    // Trigger spin
    setGearSpinning(true);
    if (spinTimeout.current) clearTimeout(spinTimeout.current);
    spinTimeout.current = setTimeout(() => setGearSpinning(false), 520);

    // Toggle popup
    setShowSettings((prev) => !prev);
  }

  function handleTentang() {
    setShowSettings(false);
    router.push("/credits");
  }

  function handleBahasa() {
    setShowSettings(false);
    setShowComingSoon(true);
  }

  // Cleanup timeout on unmount
  useEffect(() => () => { if (spinTimeout.current) clearTimeout(spinTimeout.current); }, []);

  return (
    <>
      <div className="relative min-h-dvh flex flex-col justify-end overflow-hidden">
        {/* Mosque Background */}
        <div className="absolute inset-0">
          <Image
            src="/mosque-bg.png"
            alt="Mosque interior"
            fill
            className="object-cover"
            priority
            quality={85}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>

        {/* Dzkrr logo — icon left, text stack right */}
        <div
          className="absolute top-[25%] left-0 z-10 px-6 flex items-center gap-4"
          style={{ filter: "drop-shadow(0 2px 16px rgba(0,0,0,0.35))" }}
        >
          {/* Prayer icon — enlarged to match combined text height */}
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6.5 3.5 C6 3 5 3.2 4.8 4 L3 10 C2.7 11.2 3.2 12.5 4.3 13.1 L7 14.5 L8 18 C8.3 19.1 9.3 20 10.5 20 L13.5 20 C14.7 20 15.7 19.1 16 18 L17 14.5 L19.7 13.1 C20.8 12.5 21.3 11.2 21 10 L19.2 4 C19 3.2 18 3 17.5 3.5 L15 6 L12 4 L9 6 Z"
              fill="white" opacity="0.15"
            />
            <path d="M9 2 C9 2 7 4 7 7 L7 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M15 2 C15 2 17 4 17 7 L17 12" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            <path
              d="M7 12 C7 12 5 13 5 15 L5 17 C5 19 7 21 9 21 L15 21 C17 21 19 19 19 17 L19 15 C19 13 17 12 17 12 L7 12 Z"
              stroke="white" strokeWidth="1.6" strokeLinejoin="round" fill="rgba(255,255,255,0.12)"
            />
            <path d="M10 8 L10 12 M14 8 L14 12 M12 6 L12 12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          {/* Right: wordmark top, subtext below */}
          <div className="flex flex-col gap-0">
            <span
              style={{
                fontFamily: "var(--font-newsreader), Newsreader, Georgia, serif",
                fontSize: "42px",
                fontWeight: 700,
                color: "#ffffff",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              Dzkrr
            </span>
            <p
              style={{
                fontFamily: "var(--font-manrope), Manrope, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.60)",
                letterSpacing: "0.01em",
                lineHeight: 1.3,
              }}
            >
              Close to your God, anywhere.
            </p>
          </div>
        </div>





        {/* Bottom Card — flush to screen edges, rounded top corners only */}

        <div className="relative z-10">
          <div
            className="p-6 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.96)",
              borderRadius: "28px 28px 0 0",
              paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {/* Heading */}
            <h1
              className="text-2xl font-bold leading-tight mb-2"
              style={{ color: "#1a1c1a", fontFamily: "Manrope" }}
            >
              Mudah baca dzikir
              <br />
              dimana saja
            </h1>
            <p
              className="text-sm mb-6"
              style={{ color: "#73796f", fontFamily: "Manrope" }}
            >
              {tagline}
            </p>

            {/* Two Action Cards */}
            <div className="grid grid-cols-2 gap-3">
              {/* Dzikir Pagi */}
              <Link href="/dzikir/morning" className="block">
                <div
                  className={`rounded-xl p-4 transition-all duration-200 active:scale-[0.98] ${
                    isMorning ? "bg-primary-container text-on-primary-container" : ""
                  }`}
                  style={
                    isMorning
                      ? {}
                      : { backgroundColor: "#f4f3f1", color: "#1a1c1a", border: "1px solid #e3e2e0" }
                  }
                >
                  <div className="mb-3">
                    <svg
                      width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke={isMorning ? "#c2e4b4" : "#4a6741"} strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="5" />
                      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold mb-0.5" style={{ fontFamily: "Manrope" }}>
                    Dzikir Pagi
                  </h2>
                  <span
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ opacity: 0.7, fontFamily: "Manrope", letterSpacing: "0.05em" }}
                  >
                    {isMorning ? "BACA SEKARANG" : "BACA NANTI"}
                  </span>
                </div>
              </Link>

              {/* Dzikir Petang */}
              <Link href="/dzikir/evening" className="block">
                <div
                  className={`rounded-xl p-4 transition-all duration-200 active:scale-[0.98] ${
                    !isMorning ? "bg-primary-container text-on-primary-container" : ""
                  }`}
                  style={
                    !isMorning
                      ? {}
                      : { backgroundColor: "#f4f3f1", color: "#1a1c1a", border: "1px solid #e3e2e0" }
                  }
                >
                  <div className="mb-3">
                    <svg
                      width="28" height="28" viewBox="0 0 24 24" fill="none"
                      stroke={!isMorning ? "#c2e4b4" : "#4a6741"} strokeWidth="1.5"
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </div>
                  <h2 className="text-base font-bold mb-0.5" style={{ fontFamily: "Manrope" }}>
                    Dzikir Petang
                  </h2>
                  <span
                    className="text-xs font-semibold tracking-wide uppercase"
                    style={{ opacity: 0.7, fontFamily: "Manrope", letterSpacing: "0.05em" }}
                  >
                    {!isMorning ? "BACA SEKARANG" : "BACA NANTI"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Settings gear — replaces the old text link */}
            <div className="mt-4 flex justify-end">
              <div className="relative">
                <button
                  id="settings-gear-btn"
                  onClick={handleGearClick}
                  aria-label="Pengaturan"
                  className="flex items-center justify-center w-9 h-9 rounded-xl transition-colors"
                  style={{
                    backgroundColor: showSettings ? "var(--primary-green-surface)" : "#f4f3f1",
                    color: showSettings ? "var(--primary-green)" : "#73796f",
                    border: "1px solid #e3e2e0",
                  }}
                >
                  <GearIcon spinning={gearSpinning} />
                </button>

                {showSettings && (
                  <SettingsPopup
                    onClose={() => setShowSettings(false)}
                    onTentang={handleTentang}
                    onBahasa={handleBahasa}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Sheet */}
      {showComingSoon && (
        <ComingSoonSheet onClose={() => setShowComingSoon(false)} />
      )}

      {/* Animations */}
      <style>{`
        @keyframes popupEnter {
          from { opacity: 0; transform: scale(0.92) translateY(6px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        .settings-popup-enter {
          animation: popupEnter 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes sheetUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .animate-sheet-up {
          animation: sheetUp 0.28s cubic-bezier(0.32, 0.72, 0, 1) both;
        }
      `}</style>
    </>
  );
}

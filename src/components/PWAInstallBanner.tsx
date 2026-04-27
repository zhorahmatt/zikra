"use client";

import { useEffect, useState } from "react";

type Platform = "android" | "ios" | "other";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISSED_KEY = "pwa-install-dismissed-at";
const DISMISS_COOLDOWN_DAYS = 2;

function getPlatform(): Platform {
  const ua = navigator.userAgent;
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/android/i.test(ua)) return "android";
  return "other";
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true)
  );
}

function wasDismissedRecently(): boolean {
  const ts = localStorage.getItem(DISMISSED_KEY);
  if (!ts) return false;
  const diff = Date.now() - parseInt(ts, 10);
  return diff < DISMISS_COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
}

export default function PWAInstallBanner() {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<Platform>("other");
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Already installed as PWA — skip
    if (isStandalone()) return;
    // User dismissed recently — skip
    if (wasDismissedRecently()) return;

    const plat = getPlatform();
    setPlatform(plat);

    if (plat === "android") {
      const handler = (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e as BeforeInstallPromptEvent);
        setShow(true);
      };
      window.addEventListener("beforeinstallprompt", handler);
      return () => window.removeEventListener("beforeinstallprompt", handler);
    }

    if (plat === "ios") {
      // iOS Safari: show manual instructions after short delay
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    setShow(false);
  }

  async function handleInstall() {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShow(false);
    } else {
      dismiss();
    }
    setInstalling(false);
    setDeferredPrompt(null);
  }

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={dismiss}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 998,
          backgroundColor: "rgba(0,0,0,0.25)",
        }}
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Tambahkan ke layar utama"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          backgroundColor: "var(--bg-card)",
          borderRadius: "20px 20px 0 0",
          padding: "28px 24px 36px",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
          animation: "slideUp 0.28s cubic-bezier(0.34,1.1,0.64,1) both",
        }}
      >
        {/* Handle bar */}
        <div
          style={{
            width: 36,
            height: 4,
            borderRadius: 99,
            backgroundColor: "var(--border-color)",
            margin: "0 auto 24px",
          }}
        />

        {/* Icon + heading */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          {/* App icon */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/icon-192.png"
            alt="Dzkrr"
            width={44}
            height={44}
            style={{ borderRadius: 10, flexShrink: 0 }}
          />
          <div>
            <p
              style={{
                fontFamily: "Newsreader",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              Pasang Dzkrr
            </p>
            <p
              style={{
                fontFamily: "Manrope",
                fontSize: "0.75rem",
                color: "var(--text-muted)",
              }}
            >
              Tambahkan ke layar utama
            </p>
          </div>
        </div>

        <p
          style={{
            fontFamily: "Manrope",
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {platform === "ios"
            ? "Buka dengan Safari, ketuk ikon Bagikan di bawah, lalu pilih "Tambahkan ke Layar Utama"."
            : "Simpan Dzkrr di layar utama untuk akses cepat kapan saja — tanpa buka browser."}
        </p>

        {/* iOS: visual step hint */}
        {platform === "ios" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              backgroundColor: "var(--primary-green-surface)",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 20,
            }}
          >
            {/* Share icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary-green)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0 }}
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
            <p
              style={{
                fontFamily: "Manrope",
                fontSize: "0.8rem",
                color: "var(--primary-green)",
                fontWeight: 600,
              }}
            >
              Ketuk ikon Bagikan → &quot;Tambahkan ke Layar Utama&quot;
            </p>
          </div>
        )}

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {platform === "android" && (
            <button
              onClick={handleInstall}
              disabled={installing}
              style={{
                width: "100%",
                padding: "13px",
                borderRadius: 12,
                border: "none",
                backgroundColor: "var(--primary-green)",
                color: "#fff",
                fontFamily: "Manrope",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: installing ? "wait" : "pointer",
                opacity: installing ? 0.7 : 1,
                transition: "opacity 0.15s",
              }}
            >
              {installing ? "Memasang…" : "Pasang Sekarang"}
            </button>
          )}

          <button
            onClick={dismiss}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 12,
              border: "1px solid var(--border-color)",
              backgroundColor: "transparent",
              color: "var(--text-muted)",
              fontFamily: "Manrope",
              fontWeight: 600,
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            {platform === "ios" ? "Sudah mengerti" : "Nanti saja"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Dzkrr",
  description: "Sumber data dan inspirasi di balik Dzkrr.",
};

export default function CreditsPage() {
  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Header — sticky, paper-like, no heavy shadow */}
      <header
        className="sticky top-0 z-50 flex items-center gap-3 px-6 py-4"
        style={{
          backgroundColor: "var(--bg)",
          borderBottom: "1px solid var(--border-color)",
        }}
      >
        <Link
          href="/"
          className="p-2 -ml-2 rounded-lg"
          aria-label="Kembali"
          style={{ color: "var(--text-primary)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1
            className="text-base font-semibold"
            style={{ fontFamily: "Newsreader", color: "var(--text-primary)", fontWeight: 600 }}
          >
            Tentang
          </h1>
          <p
            className="text-xs"
            style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
          >
            Dzkrr berdiri di atas karya orang-orang baik
          </p>
        </div>
      </header>

      <main className="flex-1 px-6 py-8 container-app">

        {/* App blurb — tonal surface, no border noise */}
        <div
          className="rounded-lg p-6 mb-10"
          style={{
            backgroundColor: "var(--primary-green-surface)",
          }}
        >
          <p
            className="text-2xl font-normal mb-3 leading-snug"
            style={{ fontFamily: "Newsreader", color: "var(--primary-green)" }}
          >
            Dzkrr
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--primary-green)", fontFamily: "Manrope", opacity: 0.8 }}
          >
            Aplikasi sederhana untuk membaca dzikir pagi dan petang.
            Dibuat dengan niat baik, dari sumber-sumber yang terpercaya.
            Semoga bermanfaat.
          </p>
        </div>

        {/* Section: Data */}
        <p
          className="text-xs font-semibold uppercase mb-4"
          style={{
            color: "var(--text-muted)",
            fontFamily: "Manrope",
            letterSpacing: "0.1em",
          }}
        >
          Data Dzikir
        </p>

        <div
          className="rounded-lg p-5 mb-10"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          {/* Icon + name */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--primary-green-surface)",
                color: "var(--primary-green)",
              }}
            >
              {/* GitHub mark */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <p
              className="text-sm font-semibold"
              style={{ fontFamily: "Manrope", color: "var(--text-primary)" }}
            >
              fitrahive / dua-dhikr
            </p>
          </div>

          <p
            className="text-sm leading-relaxed mb-4"
            style={{ fontFamily: "Newsreader", color: "var(--text-secondary)", fontSize: "1rem" }}
          >
            Kumpulan doa dan dzikir harian lengkap dengan terjemahan, transliterasi,
            dan faedah. Sumber utama seluruh konten dzikir di aplikasi ini.
          </p>

          <a
            href="https://github.com/fitrahive/dua-dhikr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-opacity hover:opacity-75"
            style={{
              backgroundColor: "var(--bg-card-alt)",
              color: "var(--primary-green)",
              fontFamily: "Manrope",
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            github.com/fitrahive/dua-dhikr
          </a>
        </div>

        {/* Section: Inspiration */}
        <p
          className="text-xs font-semibold uppercase mb-4"
          style={{
            color: "var(--text-muted)",
            fontFamily: "Manrope",
            letterSpacing: "0.1em",
          }}
        >
          Inspirasi Desain
        </p>

        <div
          className="rounded-lg p-5 mb-10"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--primary-green-surface)",
                color: "var(--primary-green)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
                <path d="M3.6 9h16.8M3.6 15h16.8" />
                <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
              </svg>
            </span>
            <div>
              <p
                className="text-sm font-semibold"
                style={{ fontFamily: "Manrope", color: "var(--text-primary)" }}
              >
                Dzikrr
              </p>
              <p
                className="text-xs"
                style={{ fontFamily: "Manrope", color: "var(--text-muted)" }}
              >
                oleh gifa.dev
              </p>
            </div>
          </div>

          <p
            className="text-sm leading-relaxed mb-4"
            style={{ fontFamily: "Newsreader", color: "var(--text-secondary)", fontSize: "1rem" }}
          >
            Aplikasi dzikir yang menginspirasi pendekatan minimalis dan fokus dalam
            membaca dzikir. Terima kasih atas karya yang indah ini.
          </p>

          <div className="flex flex-wrap gap-2">
            <a
              href="https://gifa.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-3 py-1.5 transition-opacity hover:opacity-75"
              style={{
                backgroundColor: "var(--bg-card-alt)",
                color: "var(--text-muted)",
                border: "1px solid var(--border-color)",
                fontFamily: "Manrope",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              gifa.dev
            </a>
          </div>
        </div>

        {/* Footer — Ayat, centered, italic Newsreader */}
        <div className="text-center py-4 pb-10">
          <div
            className="h-px w-12 mx-auto mb-6"
            style={{ backgroundColor: "var(--border-color)" }}
          />
          <p
            className="text-base leading-relaxed mb-1"
            style={{
              fontFamily: "Newsreader",
              fontStyle: "italic",
              color: "var(--text-muted)",
            }}
          >
            &ldquo;Dan tolong-menolonglah kamu dalam kebajikan dan takwa.&rdquo;
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "Manrope", color: "var(--text-muted)", opacity: 0.7 }}
          >
            — QS. Al-Maidah: 2
          </p>
        </div>

      </main>
    </div>
  );
}

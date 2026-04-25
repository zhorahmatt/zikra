"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getMorningDzikr, getEveningDzikr } from "@/lib/dzikr";
import { isMorningTime } from "@/lib/progress";

const QUOTES = [
  '"Remember Me, I will remember you."',
  '"Verily, in the remembrance of Allah do hearts find rest."',
  '"The best of you are those who learn the Quran and teach it."',
];

export default function HomeScreen() {
  const [currentSlide, setCurrentSlide] = useState(isMorningTime() ? 0 : 1);
  const containerRef = useRef<HTMLDivElement>(null);
  const morningCount = getMorningDzikr().length;
  const eveningCount = getEveningDzikr().length;
  const isMorning = isMorningTime();

  const randomQuote = QUOTES[0]; // Keep consistent per session

  const slides = [
    {
      type: "morning" as const,
      arabicTitle: "أذكار الصباح",
      title: "Morning Dzikir",
      subtitle: "The remembrance after dawn",
      count: morningCount,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary-green)"
          strokeWidth="1.5"
          opacity="0.6"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
    {
      type: "evening" as const,
      arabicTitle: "أذكار المساء",
      title: "Evening Dzikir",
      subtitle: "The remembrance before dusk",
      count: eveningCount,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--primary-green)"
          strokeWidth="1.5"
          opacity="0.6"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ),
    },
  ];

  // Scroll handling for slide indicator
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const newSlide = Math.round(scrollLeft / width);
      setCurrentSlide(newSlide);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Initial scroll to current time-based slide
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const initialSlide = isMorning ? 0 : 1;
    container.scrollTo({ left: initialSlide * container.offsetWidth, behavior: "instant" });
  }, [isMorning]);

  return (
    <div
      className="min-h-dvh flex flex-col safe-bottom"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <button className="p-1" aria-label="Menu">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-primary)"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <h1
          className="text-xl font-bold"
          style={{ fontFamily: "Newsreader", color: "var(--text-primary)" }}
        >
          Adzkhar
        </h1>

        <ThemeToggle />
      </header>

      {/* Greeting */}
      <section className="text-center px-6 pt-4 pb-6">
        <span
          className="text-xs font-semibold tracking-widest uppercase block mb-1"
          style={{ color: "var(--text-muted)", fontFamily: "Manrope", letterSpacing: "0.15em" }}
        >
          Assalamualaikum
        </span>
        <h2
          className="text-2xl font-medium mb-2"
          style={{ fontFamily: "Newsreader", color: "var(--text-primary)" }}
        >
          Peace be upon you
        </h2>
        <span
          className="text-sm"
          style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
        >
          {isMorning ? "Waktu dzikir pagi" : "Waktu dzikir petang"}
        </span>
      </section>

      {/* Swipeable Card Carousel */}
      <section className="flex-1 px-4">
        <div
          ref={containerRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-0 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {slides.map((slide, i) => (
            <Link
              key={slide.type}
              href={`/dzikir/${slide.type}`}
              className="snap-center shrink-0 w-full px-2 block"
            >
              <div
                className="card-elevated p-6 flex flex-col justify-between"
                style={{ minHeight: "340px" }}
              >
                {/* Top row: Icon + Badge */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "var(--bg-card-alt)" }}
                  >
                    {slide.icon}
                  </div>
                  <span className="chip chip-primary">
                    <span
                      className="w-2 h-2 rounded-full mr-1.5 inline-block"
                      style={{ backgroundColor: "var(--primary-green)" }}
                    />
                    {slide.count} Verses
                  </span>
                </div>

                {/* Center: Arabic title */}
                <div className="text-center py-8">
                  <p
                    className="text-4xl mb-4"
                    style={{
                      fontFamily: "Newsreader",
                      direction: "rtl",
                      color: "var(--text-primary)",
                    }}
                  >
                    {slide.arabicTitle}
                  </p>
                  <h3
                    className="text-2xl font-medium mb-1"
                    style={{ fontFamily: "Newsreader", color: "var(--text-primary)" }}
                  >
                    {slide.title}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)", fontFamily: "Manrope" }}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Dot Pagination */}
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                containerRef.current?.scrollTo({
                  left: i * (containerRef.current?.offsetWidth || 0),
                  behavior: "smooth",
                });
              }}
              className={`
                rounded-full transition-all duration-300
                ${currentSlide === i
                  ? "w-6 h-2"
                  : "w-2 h-2 opacity-30"
                }
              `}
              style={{
                backgroundColor:
                  currentSlide === i ? "var(--primary-green)" : "var(--text-muted)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="px-4 py-6">
        <div
          className="card-flat flex items-center gap-3 p-4"
        >
          <span className="text-2xl" style={{ color: "var(--primary-green)", opacity: 0.4 }}>
            ❝
          </span>
          <p
            className="text-sm italic flex-1"
            style={{ fontFamily: "Newsreader", color: "var(--text-secondary)" }}
          >
            {randomQuote}
          </p>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav
        className="flex items-center justify-around py-3 border-t safe-bottom"
        style={{ borderColor: "var(--border-color)", backgroundColor: "var(--bg)" }}
      >
        <Link
          href="/"
          className="flex flex-col items-center gap-1 p-2"
          aria-label="Home"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--primary-green)"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: "var(--primary-green)" }}
          />
        </Link>

        <Link
          href="/dzikir/morning"
          className="flex flex-col items-center gap-1 p-2"
          aria-label="Morning Dzikir"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        </Link>

        <Link
          href="/dzikir/evening"
          className="flex flex-col items-center gap-1 p-2"
          aria-label="Evening Dzikir"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </Link>

        <Link
          href="/?view=settings"
          className="flex flex-col items-center gap-1 p-2"
          aria-label="Settings"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </Link>
      </nav>
    </div>
  );
}

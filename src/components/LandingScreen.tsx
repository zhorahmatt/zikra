"use client";

import Image from "next/image";
import Link from "next/link";
import { isMorningTime } from "@/lib/progress";

export default function LandingScreen() {
  const isMorning = isMorningTime();

  return (
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
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Bottom Card */}
      <div className="relative z-10 mx-4 mb-8">
        <div
          className="rounded-2xl p-6 backdrop-blur-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.92)",
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
            Awali harimu dengan mengingat Allah
          </p>

          {/* Two Action Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Dzikir Pagi */}
            <Link href="/dzikir/morning" className="block">
              <div
                className={`
                  rounded-xl p-4 transition-all duration-200 active:scale-[0.98]
                  ${isMorning ? "bg-primary-container text-on-primary-container" : ""}
                `}
                style={
                  isMorning
                    ? {}
                    : {
                        backgroundColor: "#f4f3f1",
                        color: "#1a1c1a",
                        border: "1px solid #e3e2e0",
                      }
                }
              >
                {/* Sun icon */}
                <div className="mb-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isMorning ? "#c2e4b4" : "#4a6741"}
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
                <h2
                  className="text-base font-bold mb-0.5"
                  style={{ fontFamily: "Manrope" }}
                >
                  Dzikir Pagi
                </h2>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{
                    opacity: 0.7,
                    fontFamily: "Manrope",
                    letterSpacing: "0.05em",
                  }}
                >
                  {isMorning ? "BACA SEKARANG" : "BACA NANTI"}
                </span>
              </div>
            </Link>

            {/* Dzikir Petang */}
            <Link href="/dzikir/evening" className="block">
              <div
                className={`
                  rounded-xl p-4 transition-all duration-200 active:scale-[0.98]
                  ${!isMorning ? "bg-primary-container text-on-primary-container" : ""}
                `}
                style={
                  !isMorning
                    ? {}
                    : {
                        backgroundColor: "#f4f3f1",
                        color: "#1a1c1a",
                        border: "1px solid #e3e2e0",
                      }
                }
              >
                {/* Moon icon */}
                <div className="mb-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={!isMorning ? "#c2e4b4" : "#4a6741"}
                    strokeWidth="1.5"
                  >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                </div>
                <h2
                  className="text-base font-bold mb-0.5"
                  style={{ fontFamily: "Manrope" }}
                >
                  Dzikir Petang
                </h2>
                <span
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{
                    opacity: 0.7,
                    fontFamily: "Manrope",
                    letterSpacing: "0.05em",
                  }}
                >
                  {!isMorning ? "BACA SEKARANG" : "BACA NANTI"}
                </span>
              </div>
            </Link>
          </div>

          {/* Credits link */}
          <div className="mt-4 text-center">
            <Link
              href="/credits"
              className="text-xs transition-opacity hover:opacity-80"
              style={{ color: "#73796f", fontFamily: "Manrope" }}
            >
              Tentang & Kredit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

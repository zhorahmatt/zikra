"use client";

import { useTheme } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-7 rounded-full transition-colors duration-300 flex items-center"
      style={{
        backgroundColor:
          theme === "dark" ? "var(--primary-green)" : "var(--border-color)",
      }}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span
        className={`
          absolute w-5 h-5 rounded-full bg-white shadow-sm 
          transition-transform duration-300 flex items-center justify-center
          ${theme === "dark" ? "translate-x-6" : "translate-x-1"}
        `}
      >
        {theme === "dark" ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#334f2b" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#73796f" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        )}
      </span>
    </button>
  );
}

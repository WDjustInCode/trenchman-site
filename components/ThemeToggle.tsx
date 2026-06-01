"use client";

import Link from "next/link";

export default function ThemeToggle({ theme }: { theme: "dark" | "light" }) {
  const isDark = theme === "dark";

  return (
    <Link
      href={isDark ? "/light" : "/"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors text-xs font-bebas tracking-widest uppercase ${
        isDark
          ? "border-gold/30 text-athletic-white/60 hover:border-gold hover:text-gold"
          : "border-gold/30 text-deep-black/50 hover:border-gold hover:text-gold"
      }`}
    >
      {isDark ? (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1zm9-9a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1zM4 12a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2h1zm14.95-6.364a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zM6.757 17.657a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0zm11.9 1.414a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707zM6.05 6.05a1 1 0 0 1-1.414 0l-.707-.707A1 1 0 0 1 5.343 3.93l.707.707a1 1 0 0 1 0 1.414zM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z"/>
          </svg>
          Light
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>
          </svg>
          Dark
        </>
      )}
    </Link>
  );
}

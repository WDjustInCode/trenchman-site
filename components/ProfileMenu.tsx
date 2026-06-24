"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "@/lib/sessionActions";

export interface NavProfile {
  id: string;
  first_initial: string;
  last_initial: string;
}

interface ProfileMenuProps {
  profile: NavProfile | null;
  theme: "dark" | "light";
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function ProfileMenu({ profile, theme, variant, onNavigate }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";
  const textClass = isDark ? "text-athletic-white" : "text-deep-black";
  const mutedTextClass = isDark ? "text-athletic-white/80" : "text-deep-black/80";
  const panelBg = isDark ? "bg-deep-black" : "bg-white";

  if (variant === "mobile") {
    return (
      <div className="border-t border-gold/10 pt-2 flex flex-col gap-4">
        {profile ? (
          <>
            <Link
              href="/profile"
              onClick={onNavigate}
              className={`font-bebas tracking-widest ${textClass} hover:text-gold transition-colors text-lg`}
            >
              Profile
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                onClick={onNavigate}
                className={`font-bebas tracking-widest ${textClass} hover:text-gold transition-colors text-lg text-left`}
              >
                Sign Out
              </button>
            </form>
          </>
        ) : (
          <Link
            href="/sign-in"
            onClick={onNavigate}
            className={`font-bebas tracking-widest ${textClass} hover:text-gold transition-colors text-lg`}
          >
            Sign In
          </Link>
        )}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/sign-in"
          className={`font-bebas tracking-widest ${textClass} hover:text-gold transition-colors text-sm`}
        >
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="w-9 h-9 rounded-full border-2 border-gold flex items-center justify-center font-bebas text-gold text-sm tracking-wider"
        aria-label="Profile menu"
      >
        {profile.first_initial}
        {profile.last_initial}
      </button>
      {open && (
        <>
          <div className="absolute top-full right-0 w-full h-2" />
          <div
            className={`absolute top-full right-0 mt-2 w-40 ${panelBg} border border-gold/40 rounded shadow-lg py-1 z-50`}
          >
            <Link
              href="/profile"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 font-bebas tracking-widest ${mutedTextClass} hover:text-gold hover:bg-gold/5 transition-colors text-sm`}
            >
              Profile
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className={`w-full text-left block px-4 py-2 font-bebas tracking-widest ${mutedTextClass} hover:text-gold hover:bg-gold/5 transition-colors text-sm`}
              >
                Sign Out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

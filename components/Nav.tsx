"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { label: "Academy", href: "/academy" },
  { label: "Gear Store", href: "/store" },
  { label: "Recruiting", href: "/recruiting" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-deep-black/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/trenchman-logomark-gold.svg"
            alt="Trenchman Academy"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <span className="font-novecento text-gold text-xl tracking-widest hidden sm:block">
            TRENCHMAN ACADEMY
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-bebas tracking-widest text-athletic-white hover:text-gold transition-colors text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/academy#register"
            className="bg-gold text-deep-black font-bold text-sm px-5 py-2 rounded hover:bg-gold/80 transition-colors font-bebas tracking-widest uppercase"
          >
            REGISTER
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-athletic-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-deep-black border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-bebas tracking-widest text-athletic-white hover:text-gold transition-colors text-lg"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/academy#register"
            onClick={() => setOpen(false)}
            className="bg-gold text-deep-black font-bold px-5 py-3 rounded text-center font-bebas tracking-widest text-lg uppercase"
          >
            Register Now
          </Link>
        </div>
      )}
    </nav>
  );
}

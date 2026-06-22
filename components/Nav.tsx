"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const homeLinks = [
  { label: "Dark", href: "/" },
  { label: "Dark Alt 1", href: "/home-alt" },
  { label: "Light", href: "/light" },
  { label: "Light Alt 1", href: "/light-alt" },
];

const links = [
  { label: "Academy", href: "/academy" },
  // { label: "Store", href: "/store" }, // hidden: re-enable when store launches
  // { label: "Recruiting", href: "/recruiting" }, // hidden: re-enable when recruiting launches
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [homeOpen, setHomeOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-deep-black/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/trenchman-logomark-gold.svg"
            alt="Trenchman Academy"
            width={36}
            height={36}
            className="h-9 w-auto"
          />
          <span className="font-novecento text-athletic-white/90 text-2xl tracking-widest">
            TRENCHMAN ACADEMY
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {/* Home dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setHomeOpen(true)}
            onMouseLeave={() => setHomeOpen(false)}
          >
            <button className="font-bebas tracking-widest text-athletic-white hover:text-gold transition-colors text-sm flex items-center gap-1">
              Home
              <svg className="w-3 h-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {homeOpen && (
              <>
              <div className="absolute top-full left-0 w-full h-2" />
              <div className="absolute top-full left-0 mt-2 w-44 bg-deep-black border border-gold/40 rounded shadow-lg py-1 z-50">
                {homeLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setHomeOpen(false)}
                    className="block px-4 py-2 font-bebas tracking-widest text-athletic-white/80 hover:text-gold hover:bg-gold/5 transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              </>
            )}
          </div>

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
          <p className="font-bebas tracking-widest text-gold/60 text-xs uppercase">Home</p>
          {homeLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-bebas tracking-widest text-athletic-white/80 hover:text-gold transition-colors text-lg pl-3"
            >
              {l.label}
            </Link>
          ))}
          <div className="border-t border-gold/10 pt-2 flex flex-col gap-4">
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
          </div>
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

"use client";

import { useEffect, useRef } from "react";

export default function ScrollingBanner() {
  const words = [
    "toughness",
    "intelligence",
    "brotherhood",
    "confidence",
    "fortitude",
    "faith",
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Width of one copy of the word set (track holds two copies back-to-back)
    setWidthRef.current = track.scrollWidth / 2;

    const speed = 60; // px per second
    let offset = 0;
    let lastTime: number | null = null;
    let frameId: number;

    const tick = (time: number) => {
      if (lastTime === null) lastTime = time;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      offset += speed * delta;
      if (offset >= setWidthRef.current) {
        offset -= setWidthRef.current;
      }

      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="relative w-full bg-gold overflow-hidden py-4">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {[...words, ...words].map((word, i) => (
          <span key={i} className="flex items-center flex-shrink-0" style={{ gap: "75px" }}>
            <span className="font-bebas text-deep-black text-lg tracking-widest uppercase">
              {word}
            </span>
            <span className="text-deep-black text-xl leading-none flex-shrink-0" style={{ marginRight: "75px" }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

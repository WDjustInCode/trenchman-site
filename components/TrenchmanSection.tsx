"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TiltImage from "@/components/TiltImage";

const traits = [
  { icon: "/icon-1.png", label: "Toughness" },
  { icon: "/icon-2.png", label: "Intelligence" },
  { icon: "/icon-3.png", label: "Brotherhood" },
];

function iconTransform(index: number, activeIndex: number) {
  if (index === activeIndex) return "translateY(0)";
  if (index < activeIndex) return "translateY(-40px)";
  return "translateY(40px)";
}

// First icon transitions out at half the scroll distance of the rest (was eating ~4 swipes before advancing).
const FIRST_STAGE_FRACTION = 0.5;
const WRAPPER_HEIGHT_VH = (traits.length + 1) * 100 - (1 - FIRST_STAGE_FRACTION) * 100;

function getActiveIndex(progress: number) {
  if (progress < FIRST_STAGE_FRACTION) return 0;
  const adjusted = progress - FIRST_STAGE_FRACTION + 1;
  return Math.min(traits.length - 1, Math.max(0, Math.floor(adjusted)));
}

export default function TrenchmanSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const progress = -rect.top / window.innerHeight;
      setActiveIndex(getActiveIndex(progress));
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div ref={wrapperRef} className="relative w-full" style={{ height: `${WRAPPER_HEIGHT_VH}vh` }}>
        <div className="sticky top-0 h-screen w-full bg-deep-black flex flex-col overflow-hidden">
          <div className="flex-1 flex md:items-end min-h-0 pt-4 sm:pt-0 z-10">
            <div className="max-w-6xl mx-auto w-full px-6 flex flex-col sm:flex-row items-center justify-center xl:justify-start gap-2 sm:gap-10 text-center sm:text-left">
              <div className="relative flex-shrink-0 w-[275px] h-[275px]">
                {traits.map((trait, index) => (
                  <div
                    key={trait.label}
                    className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                    style={{
                      transform: iconTransform(index, activeIndex),
                      opacity: index === activeIndex ? 1 : 0,
                    }}
                  >
                    <TiltImage src={trait.icon} alt={trait.label} size={275} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center sm:items-start max-w-md">
                <div className="relative h-7 sm:h-8 w-full overflow-hidden">
                  {traits.map((trait, index) => (
                    <span
                      key={trait.label}
                      className="absolute inset-0 flex items-center justify-center sm:justify-start font-bebas text-iron-grey text-xl sm:text-2xl tracking-widest uppercase transition-all duration-700 ease-out"
                      style={{
                        transform: iconTransform(index, activeIndex),
                        opacity: index === activeIndex ? 1 : 0,
                      }}
                    >
                      {trait.label}
                    </span>
                  ))}
                </div>
                <h2 className="font-novecento text-gold text-4xl md:text-5xl tracking-widest mb-2 sm:mb-3 sm:mt-1 uppercase">
                  The Trenchman
                </h2>
                <p className="text-athletic-white/80 text-base md:text-base leading-relaxed mb-4 sm:mb-6">
                  A warrior of the line of scrimmage; one who battles for every inch with
                  toughness, intelligence, and unbreakable brotherhood.
                </p>
                <Link
                  href="#footer"
                  className="font-bebas font-bold bg-gold text-deep-black text-sm md:text-base px-6 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider leading-none inline-flex items-center justify-center"
                >
                  Join the Brotherhood
                </Link>
              </div>
            </div>
          </div>

          <div className="relative w-full flex-shrink-0 overflow-hidden" style={{ height: "min(512px, 45vw)" }}>
            <Image
              src="/trenchman-definition-section-3.jpg"
              alt="The Trenchman"
              fill
              className="object-cover object-left"
            />
          </div>
        </div>
      </div>
    </>
  );
}

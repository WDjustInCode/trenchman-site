"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(`perspective(500px) rotateX(${-y * 20}deg) rotateY(${x * 20}deg) scale(1.05)`);
  }

  function handleMouseLeave() {
    setTransform("");
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: transform ? "none" : "transform 0.5s ease" }}
      className="inline-block"
    >
      <div className="relative inline-block">
        <Image src={src} alt={alt} width={240} height={240} className="h-60 w-auto" />
        <div className="absolute inset-0 bg-deep-black/20 rounded" />
      </div>
    </div>
  );
}

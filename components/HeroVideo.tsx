"use client";

import { useRef, useState } from "react";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  function togglePlayback() {
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
    } else {
      vid.play();
    }
    setPlaying(!playing);
  }

  return (
    <div className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        src="/lineman-ball-snap.mp4"
        autoPlay
        muted
        playsInline
        onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.4; }}
        onTimeUpdate={(e) => {
          const vid = e.target as HTMLVideoElement;
          if (vid.currentTime >= 4) vid.currentTime = 0;
        }}
        className="absolute inset-0 w-full h-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black/30 via-deep-black/50 to-deep-black" />
      <button
        onClick={togglePlayback}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/50 border border-white/20 text-athletic-white/70 hover:text-athletic-white hover:border-white/50 transition-colors rounded px-3 py-2 text-xs font-bebas tracking-widest uppercase"
      >
        {playing ? (
          <>
            <span className="inline-block w-3 h-3 flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="currentColor" className="w-2.5 h-2.5">
                <rect x="1" y="0" width="3" height="10" />
                <rect x="6" y="0" width="3" height="10" />
              </svg>
            </span>
            Pause
          </>
        ) : (
          <>
            <span className="inline-block w-3 h-3 flex items-center justify-center">
              <svg viewBox="0 0 10 10" fill="currentColor" className="w-2.5 h-2.5">
                <polygon points="0,0 10,5 0,10" />
              </svg>
            </span>
            Play
          </>
        )}
      </button>
    </div>
  );
}

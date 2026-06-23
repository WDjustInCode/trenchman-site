"use client";

export default function ScrollingBanner() {
  const words = [
    "toughness",
    "intelligence",
    "brotherhood",
    "confidence",
    "fortitude",
    "faith",
    "fellowship",
  ];

  return (
    <div className="relative w-full bg-gold/20 border-y border-gold/50 overflow-hidden py-3">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .scrolling-text {
          animation: scroll 20s linear infinite;
        }
      `}</style>
      <div className="scrolling-text flex whitespace-nowrap gap-12">
        {[...words, ...words].map((word, i) => (
          <span
            key={i}
            className="font-bebas text-deep-black text-lg tracking-widest uppercase flex-shrink-0"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

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
    <div className="relative w-full bg-gold overflow-hidden py-3">
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrolling-text {
          animation: scroll 25s linear infinite;
        }
      `}</style>
      <div className="scrolling-text flex whitespace-nowrap">
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

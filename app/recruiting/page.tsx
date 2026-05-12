import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recruiting — Trenchman Academy",
  description:
    "Get seen. Get recruited. Trenchman Academy puts your film in front of college coaches through every camp.",
};

export default function RecruitingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4"
          style={{ fontFamily: "'Rockwell Extra Bold', Georgia, serif" }}
        >
          Get Seen. <span className="text-gold">Get Recruited.</span>
        </h1>
        <p
          className="text-xl tracking-widest text-athletic-white/70 mb-10 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          We film it. We edit it. We distribute it.
        </p>
        <Link
          href="/academy#register"
          className="inline-block bg-gold text-deep-black font-bold text-lg px-10 py-4 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Add Highlight Reel — $75
        </Link>
      </section>

      {/* What's Included */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="text-gold text-4xl tracking-widest mb-10 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          What&apos;s Included
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "🎥",
              title: "Athlete Film at Every Camp",
              desc: "Every registered athlete is filmed during drills and live reps — no extra setup required.",
            },
            {
              icon: "✂️",
              title: "Individually Edited Highlight Reel",
              desc: "Premium tier includes a personal highlight clip edited by our team ($75 add-on for General Admission).",
            },
            {
              icon: "📄",
              title: "Performance Data Sheet",
              desc: "Measurables, drill grades, and position notes compiled and distributed to attending college coaches.",
            },
            {
              icon: "🎓",
              title: "College Coach Attendance",
              desc: "We bring coaches to the camp. Your performance gets evaluated in real time, not just on tape.",
            },
          ].map((item) => (
            <div key={item.title} className="border border-white/10 rounded-lg p-8 flex gap-5">
              <span className="text-3xl flex-shrink-0">{item.icon}</span>
              <div>
                <p
                  className="text-gold text-xl tracking-widest mb-2 uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {item.title}
                </p>
                <p className="text-athletic-white/60 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/5 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-gold text-4xl tracking-widest mb-12 text-center uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { step: "Film", icon: "🎥", desc: "We film every athlete at camp — on drills, in live reps, and during position-specific work." },
              { step: "Edit", icon: "✂️", desc: "Our team cuts individual highlight reels showcasing your best moments and technique." },
              { step: "Distribute", icon: "📬", desc: "Film and data sheets go directly to college coaches in our network — immediately after camp." },
            ].map((s, i) => (
              <div key={s.step} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gold text-deep-black flex items-center justify-center text-2xl font-bold">
                  {i + 1}
                </div>
                <span className="text-3xl">{s.icon}</span>
                <p
                  className="text-gold text-2xl tracking-widest uppercase"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {s.step}
                </p>
                <p className="text-athletic-white/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* College Coach Network */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="text-gold text-4xl tracking-widest mb-6 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          College Coach Network
        </h2>
        <p className="text-athletic-white/70 text-sm mb-10 max-w-2xl">
          We actively recruit college coaches to attend our camps. Athletes get evaluated live — not just on tape. Our coach network spans D-I, D-II, and D-III programs across the Southeast.
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border border-white/10 rounded-lg h-20 flex items-center justify-center text-white/20 text-xs text-center px-2"
            >
              Coach Logo
            </div>
          ))}
        </div>
        <p className="text-athletic-white/40 text-xs mt-4">
          Media partnerships with Rivals, 247Sports, and On3 coming soon.
        </p>
      </section>

      {/* Add-On CTA */}
      <section className="bg-gold/10 border-y border-gold/30 py-16 px-6 text-center">
        <p
          className="text-gold text-4xl tracking-widest mb-4 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Add Highlight Reel to Your Registration
        </p>
        <p className="text-athletic-white/70 text-sm mb-8">
          Only $75 added at checkout. Your film, professionally edited, in coaches&apos; inboxes within 72 hours of camp.
        </p>
        <Link
          href="/academy#register"
          className="inline-block bg-gold text-deep-black font-bold text-xl px-12 py-5 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Register + Add Reel — $225
        </Link>
      </section>

      {/* Franchise Hook */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <p
          className="text-athletic-white/40 text-xs tracking-widest mb-6 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          For Coaches & Trainers
        </p>
        <h2
          className="text-athletic-white text-4xl tracking-widest mb-4 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Bring Trenchman Academy to Your City
        </h2>
        <p className="text-athletic-white/60 text-sm mb-8">
          We&apos;re building a national network of lineman-focused camps. If you&apos;re a coach or trainer interested in a franchise or licensing opportunity, drop your info and we&apos;ll be in touch.
        </p>
        <form className="flex flex-col gap-3 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Your name"
            className="bg-white/10 border border-white/20 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
          />
          <input
            type="email"
            placeholder="Your email"
            className="bg-white/10 border border-white/20 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
          />
          <input
            type="text"
            placeholder="Your city / market"
            className="bg-white/10 border border-white/20 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
          />
          <button
            type="submit"
            className="bg-gold text-deep-black font-bold py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Submit Interest
          </button>
        </form>
      </section>
    </>
  );
}

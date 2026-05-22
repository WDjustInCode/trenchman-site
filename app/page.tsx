import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import TiltImage from "@/components/TiltImage";
import ThemeToggle from "@/components/ThemeToggle";

const verticals = [
  {
    icon: "/academy.png",
    label: "Academy",
    description: "Position-specific training. Grades 3–12.",
    href: "/academy",
  },
  {
    icon: "/gear.png",
    label: "Gear Store",
    description: "Represent the Trench.",
    href: "/store",
  },
  {
    icon: "/recruiting.png",
    label: "Recruiting",
    description: "Get in front of college coaches.",
    href: "/recruiting",
  },
];

const camps = [
  { city: "Charlotte, NC", date: "June 14, 2025", spots: 12, price: "$150" },
  { city: "Atlanta, GA", date: "July 12, 2025", spots: 8, price: "$150" },
  { city: "Raleigh, NC", date: "August 2, 2025", spots: 20, price: "$150" },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "Parent of OL prospect, Class of 2027",
    quote:
      "Coach broke down technique in a way my son had never heard before. Two months later he had his first D2 offer.",
  },
  {
    name: "DeShawn R.",
    role: "8th Grade OL, Charlotte",
    quote: "Best camp I've ever been to. Real reps, real coaching. Not just drills for show.",
  },
  {
    name: "Coach Williams",
    role: "HS OL Coach, Mecklenburg County",
    quote:
      "Trenchman is filling a gap nobody else is touching. My guys came back different.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <HeroVideo />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <ThemeToggle theme="dark" />
          </div>
          <h1
            className="font-rockwell text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 text-athletic-white"
          >
            Built for the Athletes Who Fight in the{" "}
            <span className="text-gold">Trenches.</span>
          </h1>
          <p
            className="font-bebas text-xl md:text-xl tracking-widest text-athletic-white/80 mb-10 uppercase"
            
          >
            Grades 3–12 &bull; Position-Specific &bull; Real Coaching
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/academy#register"
              className="font-bebas font-bold bg-gold text-deep-black text-lg px-8 py-4 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider leading-none inline-flex items-center justify-center"
              
            >
              Register for a Camp
            </Link>
            <Link
              href="/store"
              className="font-bebas font-bold border-2 border-gold text-gold text-lg px-8 py-4 rounded hover:bg-gold/10 transition-colors uppercase tracking-wider"
              
            >
              Shop Gear
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Vertical Strip */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {verticals.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="group rounded-lg p-8 hover:bg-gold/5 transition-all text-center"
          >
            <div className="mb-4 flex justify-center">
              <TiltImage src={v.icon} alt={v.label} />
            </div>
            <p
              className="font-novecento text-athletic-white/90 text-2xl tracking-widest mb-2 uppercase"
              
            >
              {v.label}
            </p>
            <p className="text-gold text-sm">{v.description}</p>
          </Link>
        ))}
      </section>

      {/* Testimonials */}
      <section className="bg-white/5 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-novecento text-gold text-4xl tracking-widest text-center mb-12 uppercase"
            
          >
            From the Trenches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="border-2 border-gold/50 rounded-lg p-6"
              >
                <p className="text-athletic-white/90 text-sm italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-gold text-sm font-bold">{t.name}</p>
                <p className="text-athletic-white/50 text-xs">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Camps */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="font-novecento text-gold text-4xl tracking-widest mb-10 uppercase"

        >
          Upcoming Camps
        </h2>
        <div className="flex flex-col gap-4">
          {camps.map((camp) => (
            <div
              key={camp.city + camp.date}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-gold/40 rounded-lg px-6 py-5 gap-4 hover:border-gold transition-colors"
            >
              <div>
                <p className="font-bebas text-athletic-white text-lg tracking-widest uppercase">{camp.city}</p>
                <p className="text-athletic-white/60 text-sm">{camp.date}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <span className="font-bebas text-gold text-base tracking-widest">{camp.price}</span>
                <span className="font-bebas text-athletic-white/60 tracking-widest">{camp.spots} spots left</span>
                <Link
                  href="/academy#register"
                  className="font-bebas font-bold bg-gold text-deep-black px-5 py-2 rounded hover:bg-gold/80 transition-colors uppercase text-sm tracking-wider"
                  
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/academy"
            className="font-bebas text-gold hover:underline text-sm tracking-wider uppercase"
            
          >
            View Full Schedule →
          </Link>
        </div>
      </section>

      {/* Email Capture */}
      <section className="bg-gold/10 border-y-2 border-gold py-16 px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="font-novecento text-gold text-3xl sm:text-4xl tracking-widest mb-3 uppercase whitespace-nowrap"
            
          >
            ★&nbsp;&nbsp;Join the Trench&nbsp;&nbsp;★
          </h2>
          <p className="text-athletic-white/70 text-sm mb-8">
            Camp alerts, recruiting tips, and gear drops — straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="First name"
              className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold flex-1"
            />
            <input
              type="email"
              placeholder="Email address"
              className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold flex-1"
            />
            <button
              type="submit"
              className="font-bebas font-bold bg-gold text-deep-black px-8 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
              
            >
              Join
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

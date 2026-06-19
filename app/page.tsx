import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import TiltImage from "@/components/TiltImage";
import { getCollectionProducts } from "@/lib/shopify";
import CampList, { type Camp } from "@/components/CampList";

export const dynamic = "force-dynamic";

const verticals = [
  {
    icon: "/academy.png",
    label: "Academy",
    description: "Position-specific training. Grades 3–12.",
    href: "/academy",
  },
  // Hidden until store/recruiting launch — see CLAUDE.md planned integrations
  // {
  //   icon: "/gear.png",
  //   label: "Store",
  //   description: "Represent the Trench.",
  //   href: "/store",
  // },
  // {
  //   icon: "/recruiting.png",
  //   label: "Recruiting",
  //   description: "Get in front of college coaches.",
  //   href: "/recruiting",
  // },
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

export default async function Home() {
  const ticketProducts = await getCollectionProducts("camp-tickets");

  const camps: Camp[] = ticketProducts
    .map((p) => ({
      location: p.metafields?.find((m) => m?.key === "location")?.value ?? "",
      date: p.metafields?.find((m) => m?.key === "date")?.value ?? "",
      ageGroup: p.metafields?.find((m) => m?.key === "age_group")?.value ?? null,
      spots: p.metafields?.find((m) => m?.key === "spots_available")?.value ?? null,
      price: `$${parseFloat(p.priceRange.minVariantPrice.amount).toFixed(0)}`,
    }))
    .filter((c) => c.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <HeroVideo />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="font-rockwell text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 text-athletic-white">
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
              Register for Camp
            </Link>
            {/* Shop Gear CTA hidden until store launches */}
            {/* <Link
              href="/store"
              className="font-bebas font-bold border-2 border-gold text-gold text-lg px-8 py-4 rounded hover:bg-gold/10 transition-colors uppercase tracking-wider"
            >
              Shop Gear
            </Link> */}
          </div>
        </div>
      </section>

      {/* The Trenchman */}
      <section className="relative w-full bg-deep-black overflow-hidden pt-16">
        {/* Dark area above the image — title + copy, top-right */}
        <div className="relative z-11 w-full flex items-center pl-[10%] pr-6 md:-mb-7 md:pr-16">
          <div className="max-w-md">
            <h2 className="font-novecento text-gold text-4xl md:text-4xl tracking-widest mb-3 uppercase">
              The Trenchman
            </h2>
            <p className="text-athletic-white/80 text-base md:text-base leading-relaxed mb-6">
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

        <div
          className="relative z-10 w-full overflow-hidden"
          style={{ height: "min(512px, 45vw)" }}
        >
          <Image
            src="/trenchman-definition-section-2.jpg"
            alt="The Trenchman"
            fill
            className="object-cover object-left"
          />
        </div>
      </section>

      {/* About Gallery */}
      <section className="bg-white/5 border-t-3 border-gold py-26 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2
            className="font-novecento text-gold text-4xl tracking-widest text-center mb-12 uppercase"

          >
            The Trenchman Academy
          </h2>

          {/* Our Mission */}
          <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[3/4] sm:aspect-[16/9]">
            <Image
              src="/about-1.png"
              alt="Our Mission"
              fill
              sizes="(min-width: 768px) 1152px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_30%,_transparent_70%)] sm:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
              <h2 className="font-novecento text-white text-2xl md:text-3xl lg:text-4xl tracking-widest mb-2 sm:mb-4 uppercase">
                Our Mission
              </h2>
              <p className="text-white text-base leading-snug sm:leading-relaxed max-w-2xl">
                In youth football, most offseason development is built around skill
                positions. As a result, the athletes who line up at the line of
                scrimmage often enter the season less prepared and lacking confidence
                in their role. These are players asked to do some of the hardest, most
                important work on the field—yet they&rsquo;re rarely given the time and
                instruction to truly develop.
              </p>
              <p className="text-white text-base leading-snug sm:leading-relaxed mt-2 sm:mt-4">
                That&rsquo;s why we built The Trenchman Academy&trade;.
              </p>
            </div>
          </div>

          {/* Founding Trenchmen + Core Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[32/25]">
              <Image
                src="/about-3.png"
                alt="The Founding Trenchmen"
                fill
                sizes="(min-width: 768px) 576px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_30%,_transparent_70%)] sm:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
                <h2 className="font-novecento text-white text-2xl md:text-3xl lg:text-4xl tracking-widest mb-2 sm:mb-4 uppercase">
                  The Founding Trenchmen
                </h2>
                <p className="text-white text-base leading-snug sm:leading-relaxed">
                  Miles Murray is a 2003 graduate of Tivy High School and a 2007
                  graduate of the U.S. Military Academy. Noah Oviedo is a 1992 graduate
                  of Clark High School and a 1997 graduate of the U.S. Air Force
                  Academy.
                </p>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[3/4] sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[32/25]">
              <Image
                src="/about-2.png"
                alt="Core Values"
                fill
                sizes="(min-width: 768px) 576px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_30%,_transparent_70%)] sm:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
                <h2 className="font-novecento text-white text-2xl md:text-3xl lg:text-4xl tracking-widest mb-2 sm:mb-4 uppercase">
                  Core Values
                </h2>
                <p className="text-white text-base leading-snug sm:leading-relaxed">
                  <span className="font-bold">Fellowship</span> — players
                  learn to trust the man next to them and take pride in working as one
                  unit.
                </p>
                <p className="text-white text-base leading-snug sm:leading-relaxed mt-1.5 sm:mt-3">
                  <span className="font-bold">Faith</span> — we recognize
                  that each athlete is created with purpose and called to use their
                  gifts well, honoring God through their effort, discipline, and how
                  they carry themselves on and off the field.
                </p>
                <p className="text-white text-base leading-snug sm:leading-relaxed mt-1.5 sm:mt-3">
                  <span className="font-bold">Fortitude</span> — we develop
                  the mental and physical toughness required to compete, endure, and
                  execute when it matters most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Trenchman (Upcoming Camps content, formerly Email Capture) */}
      <section className="bg-gold/10 border-y-3 border-gold py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-novecento text-gold text-3xl sm:text-4xl tracking-widest text-center mb-10 uppercase whitespace-nowrap"

          >
            ★&nbsp;&nbsp;Become a Trenchman&nbsp;&nbsp;★
          </h2>
          <CampList camps={camps} registerHref="/academy#register" />
          <div className="mt-6 text-center">
            <Link
              href="/academy"
              className="font-bebas text-gold hover:underline text-sm tracking-wider uppercase"

            >
              View Full Schedule →
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Vertical Strip — store/recruiting hidden, only Academy renders for now */}
      {/* <section className="max-w-sm mx-auto px-6 py-16 grid grid-cols-1 gap-6">
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
      </section> */}

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
    </>
  );
}

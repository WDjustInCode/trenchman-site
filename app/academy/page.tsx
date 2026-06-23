import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CampList, { type Camp } from "@/components/CampList";
import TiltImage from "@/components/TiltImage";
import { getCollectionProducts } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Academy — Trenchman Academy",
  description:
    "Position-specific lineman camps for grades 3–12. Register for an upcoming camp and level up your game.",
};


const coaches = [
  {
    name: "Coach M. Murray",
    role: "Head Trainer",
    background: "Former D-I OL, 8 years coaching at the high school and collegiate level",
    image: "/miles.jpg",
  },
  {
    name: "Coach N. Oviedo",
    role: "OL Specialist",
    background: "Former D-II OL, certified strength & conditioning specialist",
    image: "/noah.jpg",
  },
];

const faqs = [
  {
    q: "What age groups are eligible?",
    a: "We welcome athletes in grades 3 through 12. Sessions are grouped by age and skill level to ensure every athlete gets appropriate coaching.",
  },
  {
    q: "What should athletes bring?",
    a: "Athletic cleats, helmet (if available), hand pads or gloves, water bottle, and athletic wear. Equipment is not required — we have loaners on site.",
  },
  {
    q: "What is the refund policy?",
    a: "Full refunds are available up to 14 days before the camp date. Within 14 days, we offer a credit toward a future camp.",
  },
  {
    q: "How long is each camp?",
    a: "Each camp runs approximately 4 hours, with a water break mid-session. Premium 1-on-1 sessions are 60 minutes and can be added at registration.",
  },
];

function getMeta(product: Awaited<ReturnType<typeof getCollectionProducts>>[number], key: string) {
  return product.metafields?.find((m) => m?.key === key)?.value ?? null;
}

export default async function AcademyPage() {
  const ticketProducts = await getCollectionProducts("camp-tickets");

  // Build camp schedule rows from metafields, sorted by date
  const camps: Camp[] = ticketProducts
    .map((p) => ({
      location: getMeta(p, "location") ?? "",
      date: getMeta(p, "date") ?? "",
      ageGroup: getMeta(p, "age_group") ?? null,
      spots: getMeta(p, "spots_available"),
      price: `$${parseFloat(p.priceRange.minVariantPrice.amount).toFixed(0)}`,
    }))
    .filter((c) => c.date)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <>
      {/* Hero */}
      <section className="pb-26 pt-46 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="font-rockwell max-w-6xl mx-auto text-5xl md:text-7xl text-gold uppercase leading-none mb-4"
        >
          Train Where the{" "}
          <span className="text-athletic-white">Trenches</span> Are Won
        </h1>
        <p
          className="font-bebas text-xl tracking-widest text-iron-grey mb-10 uppercase"
        >
          Position-Specific Lineman Camps &bull; Grades 3–12
        </p>
        <a
          href="#register"
          className="font-bebas font-bold inline-block bg-gold text-deep-black text-lg px-10 py-4 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
        >
          Register for a Camp
        </a>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest mb-12 text-center uppercase"
        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {["Register", "Show Up", "Level Up"].map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold text-deep-black flex items-center justify-center text-4xl font-bold leading-none">
                <span className="-translate-y-[2px] inline-block">{i + 1}</span>
              </div>
              <p className="text-athletic-white/90 font-bebas text-2xl tracking-wide uppercase">
                {step}
              </p>
              <p className="text-athletic-white/60 text-sm">
                {i === 0 && "Choose your camp, pick your tier, and secure your spot online."}
                {i === 1 && "Come ready to work. Real reps, real coaching, real competition."}
                {i === 2 && "Leave with better technique, film, and exposure to college coaches."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Camp Schedule */}
      <section id="register" className="max-w-6xl mx-auto px-6 py-16">
        <h2
          className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest text-center mb-10 uppercase"
        >
          2026 Camp Schedule
        </h2>
        <CampList camps={camps} registerHref="/contact" />
      </section>

      {/* Solo & Group Training */}
      <section className="bg-white/5 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-novecento text-gold text-center text-4xl lg:text-5xl tracking-widest mb-4 text-center uppercase">
            Not Into Camps?
          </h2>
          <p className="text-athletic-white/70 text-center max-w-2xl mx-auto mb-10">
            Camps aren&apos;t the only way to train with us. Book a private session or bring a small group for focused, position-specific coaching.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "/icon-solo.png", label: "Solo Training", copy: "One-on-one technique work, film review, and a training plan built around you.", pricing: "$100", detail: "per 1-hour session" },
              { icon: "/icon-group.png", label: "Group Training", copy: "Bring your squad — small-group sessions built for teammates training together.", pricing: "$200", detail: "up to 6 athletes, 4 hours" },
            ].map((opt) => (
              <Link
                key={opt.label}
                href="/contact"
                className="group rounded-lg p-8 border-2 border-gold/40 hover:border-gold hover:bg-gold/5 transition-all flex flex-col items-center text-center gap-4"
              >
                <TiltImage src={opt.icon} alt={opt.label} size={160} />
                <p className="text-gold text-2xl tracking-widest uppercase">{opt.label}</p>
                <p className="text-athletic-white/70 text-sm">{opt.copy}</p>
                <div className="mt-auto pt-4 border-t border-gold/30 w-full">
                  <p className="text-gold text-3xl font-bold">{opt.pricing}</p>
                  <p className="text-athletic-white/60 text-xs mt-1">{opt.detail}</p>
                </div>
                <span className="font-bebas font-bold text-gold text-sm tracking-wider uppercase group-hover:underline">
                  Contact Us →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Profiles */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-novecento text-gold text-center text-4xl lg:text-5xl tracking-widest mb-10 uppercase"
          >
            Your Coaches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {coaches.map((c) => (
              <div key={c.name} className="border-2 border-gold/40 rounded-lg p-8 flex gap-6">
                <div className="relative w-24 self-stretch rounded-lg border-2 border-gold/60 flex-shrink-0 overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover scale-150"
                  />
                </div>
                <div>
                  <p className="text-athletic-white font-bold text-lg">{c.name}</p>
                  <p className="text-gold text-sm tracking-widest mb-2 uppercase">
                    {c.role}
                  </p>
                  <p className="text-athletic-white/60 text-sm">{c.background}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white/5 py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-novecento text-gold text-4xl tracking-widest mb-10 uppercase"
          >
            FAQ
          </h2>
          <div className="flex flex-col gap-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b-2 border-gold/30 pb-6">
                <p className="text-athletic-white font-bold mb-2">{faq.q}</p>
                <p className="text-athletic-white/60 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gold/10 border-y-3 border-gold py-16 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest mb-10 uppercase flex items-center justify-center gap-3"
          >
            <span aria-hidden="true" className="flex-shrink-0">★</span>
            <span className="max-w-[150px] sm:max-w-none">Ready to Work?</span>
            <span aria-hidden="true" className="flex-shrink-0">★</span>
          </h2>
          <a
            href="#register"
            className="font-bebas font-bold inline-block bg-gold text-deep-black text-xl px-12 py-5 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
          >
            Secure Your Spot
          </a>
        </div>
      </section>
    </>
  );
}

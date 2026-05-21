import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academy — Trenchman Academy",
  description:
    "Position-specific lineman camps for grades 3–12. Register for an upcoming camp and level up your game.",
};

const camps = [
  {
    date: "June 14, 2025",
    location: "Charlotte, NC",
    ageGroup: "Grades 3–8",
    price: "$150",
    spots: 12,
  },
  {
    date: "July 12, 2025",
    location: "Atlanta, GA",
    ageGroup: "Grades 3–12",
    price: "$150",
    spots: 8,
  },
  {
    date: "August 2, 2025",
    location: "Raleigh, NC",
    ageGroup: "Grades 5–12",
    price: "$150",
    spots: 20,
  },
];

const coaches = [
  {
    name: "Coach D. Thompson",
    role: "Head Trainer",
    background: "Former D-I OL, 8 years coaching at the high school and collegiate level",
  },
  {
    name: "Coach M. Harris",
    role: "OL Specialist",
    background: "Former D-II OL, certified strength & conditioning specialist",
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

export default function AcademyPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4"
        >
          Train Where the{" "}
          <span className="text-gold">Trenches</span> Are Won
        </h1>
        <p
          className="text-xl tracking-widest text-athletic-white/70 mb-10 uppercase"
          
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
          className="font-novecento text-gold text-4xl tracking-widest mb-12 text-center uppercase"

        >
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {["Register", "Show Up", "Level Up"].map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gold text-deep-black flex items-center justify-center text-2xl font-bold">
                {i + 1}
              </div>
              <p
                className="text-gold text-2xl tracking-widest uppercase"
                
              >
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
          className="font-novecento text-gold text-4xl tracking-widest mb-10 uppercase"

        >
          2025 Camp Schedule
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gold/40">
                {["Date", "Location", "Age Group", "Price", "Spots Left", ""].map((h) => (
                  <th
                    key={h}
                    className="pb-4 text-athletic-white/50 text-xs uppercase tracking-widest pr-6"
                    
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {camps.map((camp) => (
                <tr
                  key={camp.date + camp.location}
                  className="border-b border-gold/20 hover:bg-white/5 transition-colors"
                >
                  <td className="py-4 pr-6 text-athletic-white">{camp.date}</td>
                  <td className="py-4 pr-6 text-athletic-white">{camp.location}</td>
                  <td className="py-4 pr-6 text-athletic-white/70">{camp.ageGroup}</td>
                  <td className="py-4 pr-6 text-gold font-bold">{camp.price}</td>
                  <td className="py-4 pr-6 text-athletic-white/60">{camp.spots} left</td>
                  <td className="py-4">
                    <a
                      href="#pricing"
                      className="font-bebas font-bold bg-gold text-deep-black px-5 py-2 rounded hover:bg-gold/80 transition-colors uppercase text-sm tracking-wider inline-block"
                      
                    >
                      Register
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="bg-white/5 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2
            className="font-novecento text-gold text-4xl tracking-widest mb-10 text-center uppercase"
            
          >
            Pricing Tiers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                tier: "General Admission",
                price: "$150–175",
                features: ["Full camp access", "Group instruction", "Coaching feedback", "Certificate of completion"],
                highlight: false,
              },
              {
                tier: "Premium",
                price: "$225–275",
                features: ["Everything in General", "Individual highlight clip", "Video package included", "Priority drill placement"],
                highlight: true,
              },
              {
                tier: "Elite 1-on-1",
                price: "$300–400",
                features: ["Private 60-min session", "Personalized technique breakdown", "Film review with coach", "Recruiting guidance"],
                highlight: false,
              },
            ].map((t) => (
              <div
                key={t.tier}
                className={`rounded-lg p-8 border flex flex-col gap-4 ${
                  t.highlight
                    ? "border-2 border-gold bg-gold/10"
                    : "border-2 border-gold/40"
                }`}
              >
                {t.highlight && (
                  <span
                    className="text-xs text-deep-black bg-gold px-3 py-1 rounded-full w-fit uppercase tracking-widest"
                    
                  >
                    Most Popular
                  </span>
                )}
                <p
                  className="text-gold text-2xl tracking-widest uppercase"
                  
                >
                  {t.tier}
                </p>
                <p
                  className="font-rockwell text-athletic-white text-4xl font-bold"
                >
                  {t.price}
                </p>
                <ul className="flex flex-col gap-2 mt-2">
                  {t.features.map((f) => (
                    <li key={f} className="text-athletic-white/70 text-sm flex gap-2">
                      <span className="text-gold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#register"
                  className={`font-bebas font-bold mt-auto text-center py-3 rounded uppercase tracking-wider text-sm transition-colors ${
                    t.highlight
                      ? "bg-gold text-deep-black hover:bg-gold/80"
                      : "border-2 border-gold text-gold hover:bg-gold/10"
                  }`}
                  
                >
                  Select {t.tier}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coach Profiles */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="font-novecento text-gold text-4xl tracking-widest mb-10 uppercase"

        >
          Your Coaches
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coaches.map((c) => (
            <div key={c.name} className="border-2 border-gold/40 rounded-lg p-8 flex gap-6">
              <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/60 flex-shrink-0 flex items-center justify-center text-2xl">
                🏈
              </div>
              <div>
                <p className="text-athletic-white font-bold text-lg">{c.name}</p>
                <p
                  className="text-gold text-sm tracking-widest mb-2 uppercase"
                  
                >
                  {c.role}
                </p>
                <p className="text-athletic-white/60 text-sm">{c.background}</p>
              </div>
            </div>
          ))}
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
      <section className="py-20 px-6 text-center">
        <h2
          className="font-novecento text-gold text-5xl tracking-widest mb-6 uppercase"
          
        >
          Ready to Work?
        </h2>
        <a
          href="#register"
          className="font-bebas font-bold inline-block bg-gold text-deep-black text-xl px-12 py-5 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
          
        >
          Secure Your Spot
        </a>
      </section>
    </>
  );
}

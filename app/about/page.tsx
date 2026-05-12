import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Trenchman Academy",
  description:
    "The story behind Trenchman Academy — who we are, why linemen, and what we're building.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4"
        >
          Built in the <span className="text-gold">Trenches.</span>
        </h1>
      </section>

      {/* Founder Story */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <p
              className="text-gold text-3xl tracking-widest mb-6 uppercase"
              
            >
              The Story
            </p>
            <div className="flex flex-col gap-4 text-athletic-white/80 text-sm leading-relaxed">
              <p>
                Trenchman Academy was built by players, for players. After years of watching linemen get overlooked — pushed to the back of camps, glossed over in recruiting, and robbed of real coaching — we decided to do something about it.
              </p>
              <p>
                The athletes who play in the trenches are the most important players on the field and the most underserved in development. Every offensive play runs through the line. Every defensive stop starts there. We train the players who make everything else possible.
              </p>
              <p>
                Our coaching staff brings decades of combined experience playing and coaching at the high school, collegiate, and professional levels. We know what it takes — and we know how to teach it.
              </p>
            </div>
          </div>
          <div className="relative h-80 md:h-full min-h-[300px] rounded-lg overflow-hidden border border-gold/20">
            <Image
              src="/trenchman-branding-2.png"
              alt="Trenchman Academy"
              fill
              className="object-cover opacity-80"
            />
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white/5 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <p
            className="text-gold text-xs tracking-widest mb-4 uppercase"
            
          >
            Our Mission
          </p>
          <blockquote
            className="font-rockwell text-athletic-white text-3xl md:text-4xl uppercase leading-snug"
          >
            &ldquo;To develop the most technically sound, physically dominant, and recruiting-ready linemen in the country — one camp at a time.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Why Linemen */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2
          className="text-gold text-4xl tracking-widest mb-8 uppercase"
          
        >
          Why Linemen?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              stat: "5",
              label: "Players on Every Snap",
              desc: "Every offensive play starts with the O-line. No matter how good your skill players are, they need a wall in front of them.",
            },
            {
              stat: "#1",
              label: "Most Underserved Position",
              desc: "Skill players dominate camps, combines, and recruiting coverage. Linemen have been left behind — until now.",
            },
            {
              stat: "∞",
              label: "Ceiling for Development",
              desc: "Technique-driven positions have the highest coaching upside. A great lesson on footwork at age 12 pays off for 10 years.",
            },
          ].map((item) => (
            <div key={item.label} className="border border-white/10 rounded-lg p-8 text-center">
              <p
                className="font-rockwell text-gold text-5xl font-bold mb-2"
              >
                {item.stat}
              </p>
              <p
                className="text-gold text-lg tracking-widest mb-3 uppercase"
                
              >
                {item.label}
              </p>
              <p className="text-athletic-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2
          className="text-gold text-5xl tracking-widest mb-6 uppercase"
          
        >
          Ready to Join the Trench?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/academy#register"
            className="bg-gold text-deep-black font-bold text-lg px-10 py-4 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
            
          >
            Register for a Camp
          </Link>
          <Link
            href="/store"
            className="border-2 border-athletic-white text-athletic-white font-bold text-lg px-10 py-4 rounded hover:bg-white/10 transition-colors uppercase tracking-wider"
            
          >
            Shop Gear
          </Link>
        </div>
      </section>
    </>
  );
}

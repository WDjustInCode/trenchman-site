import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import TrenchmanSection from "@/components/TrenchmanSection";
import ScrollingBanner from "@/components/ScrollingBanner";
import { getCollectionProducts } from "@/lib/shopify";
import CampList, { type Camp } from "@/components/CampList";

export const dynamic = "force-dynamic";

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
                <h1 className="font-rockwell text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 text-gold">
                    Built for the Athletes Who Fight in the{" "}
                    <span className="text-athletic-white">Trenches.</span>
                </h1>
                <p
                    className="font-bebas text-xl md:text-xl tracking-widest text-iron-grey mb-10 uppercase"
                    
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
            <TrenchmanSection />

            <ScrollingBanner />

            {/* About Gallery */}
            <section className="bg-white/5 border-t-3 border-gold py-16 lg:py-24 px-6">
                <div className="max-w-6xl mx-auto space-y-6">
                    <h2
                        className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest mb-12 uppercase"

                    >
                        The Trenchman Academy
                    </h2>

                    {/* Our Mission */}
                    <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[3/4] sm:aspect-[4/4] md:aspect-[4/3] lg:aspect-[5/2] xl:aspect-[8/3]">
                        <Image
                        src="/about-1.png"
                        alt="Our Mission"
                        fill
                        sizes="(min-width: 768px) 1152px, 100vw"
                        className="object-cover"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_30%,_transparent_70%)] lg:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
                            <h2 className="font-bebas text-athletic-white text-xl md:text-2xl lg:text-3xl tracking-widest mb-2 sm:mb-4 uppercase">
                                Our Mission
                            </h2>
                            <p className="text-athletic-white text-sm sm:text-base leading-snug sm:leading-relaxed max-w-4xl">
                                In youth football, most offseason development is built around skill
                                positions. As a result, the athletes who line up at the line of
                                scrimmage often enter the season less prepared and lacking confidence
                                in their role. These are players asked to do some of the hardest, most
                                important work on the field—yet they&rsquo;re rarely given the time and
                                instruction to truly develop.
                            </p>
                            <p className="text-athletic-white text-sm sm:text-base leading-snug sm:leading-relaxed mt-2 sm:mt-4">
                                That&rsquo;s why we built The Trenchman Academy&trade;.
                            </p>
                        </div>
                    </div>

                    {/* Founding Trenchmen + Core Values */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[3/4] sm:aspect-[4/4] md:aspect-[16/10] lg:aspect-[4/4] xl:aspect-[6/4]">
                            <Image
                                src="/about-2.png"
                                alt="Core Values"
                                fill
                                sizes="(min-width: 768px) 576px, 100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_30%,_transparent_70%)] sm:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
                                <h2 className="font-bebas text-white text-xl md:text-2xl lg:text-3xl tracking-widest mb-2 sm:mb-4 uppercase">
                                Core Values
                                </h2>
                                <p className="text-white text-sm sm:text-base leading-snug sm:leading-relaxed">
                                <span className="font-bold">Fellowship</span> — players
                                learn to trust the man next to them and take pride in working as one
                                unit.
                                </p>
                                <p className="text-white text-sm sm:text-base leading-snug sm:leading-relaxed mt-1.5 sm:mt-3">
                                <span className="font-bold">Faith</span> — we recognize
                                that each athlete is created with purpose and called to use their
                                gifts well, honoring God through their effort, discipline, and how
                                they carry themselves on and off the field.
                                </p>
                                <p className="text-white text-sm sm:text-base leading-snug sm:leading-relaxed mt-1.5 sm:mt-3">
                                <span className="font-bold">Fortitude</span> — we develop
                                the mental and physical toughness required to compete, endure, and
                                execute when it matters most.
                                </p>
                            </div>
                        </div>
                        <div className="relative rounded-lg overflow-hidden shadow-xl shadow-black/50 aspect-[4/4] sm:aspect-[5/3] md:aspect-[16/8] lg:aspect-[4/4] xl:aspect-[6/4]">
                            <Image
                                src="/about-3.png"
                                alt="The Founding Trenchmen"
                                fill
                                sizes="(min-width: 768px) 576px, 100vw"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_20%,_transparent_70%)] sm:bg-[linear-gradient(to_top,_rgba(8,7,6,0.92)_0%,_rgba(8,7,6,0.92)_12%,_transparent_60%)] flex flex-col items-start justify-end text-left px-4 pb-5 sm:px-6 sm:pb-6">
                                <h2 className="font-bebas text-white text-xl md:text-2xl lg:text-3xl tracking-widest mb-2 sm:mb-4 uppercase">
                                The Founding Trenchmen
                                </h2>
                                <p className="text-white text-sm sm:text-base leading-snug sm:leading-relaxed">
                                Miles Murray is a 2003 graduate of Tivy High School and a 2007
                                graduate of the U.S. Military Academy. Noah Oviedo is a 1992 graduate
                                of Clark High School and a 1997 graduate of the U.S. Air Force
                                Academy.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Become a Trenchman (Upcoming Camps content, formerly Email Capture) */}
            <section className="bg-gold/10 border-y-3 border-gold py-16 lg:py-24 px-6">
                <div className="max-w-6xl mx-auto">
                <h2
                    className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest text-center mb-10 uppercase flex items-center justify-center gap-3"

                >
                    <span aria-hidden="true" className="flex-shrink-0">★</span>
                    <span className="max-w-[210px] sm:max-w-none">Become a Trenchman</span>
                    <span aria-hidden="true" className="flex-shrink-0">★</span>
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
                <p className="mt-8 text-center text-white/80 text-sm sm:text-base">
                    Looking for a group or solo session?{" "}
                    <Link href="/contact" className="text-gold hover:underline font-bold">
                    Contact us
                    </Link>
                    .
                </p>
                </div>
            </section>

            {/* Why Linemen */}
            <section className="bg-white/5 py-16 lg:py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="font-novecento text-gold text-4xl lg:text-5xl tracking-widest ml-0 mb-8 uppercase">
                    Why Trenchman?
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
                    <div key={item.label} className="border-2 border-gold/50 rounded-lg p-8">
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
            </div>
            </section>
        </>
    );
}

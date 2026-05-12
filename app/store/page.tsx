import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gear Store — Trenchman Academy",
  description:
    "Represent the Trench. Shop Trenchman Academy apparel, hats, and gear.",
};

const products = [
  { name: "Trenchman Tee", price: "$35", category: "Apparel", tag: "Best Seller" },
  { name: "Trench Hoodie", price: "$65", category: "Apparel", tag: null },
  { name: "Snapback Hat", price: "$30", category: "Apparel", tag: null },
  { name: "Long Sleeve Training Shirt", price: "$40", category: "Apparel", tag: null },
  { name: "Hand Pads", price: "$45", category: "Equipment", tag: null },
  { name: "Training Resistance Band", price: "$25", category: "Equipment", tag: null },
];

export default function StorePage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4"
          style={{ fontFamily: "'Rockwell Extra Bold', Georgia, serif" }}
        >
          Gear for the <span className="text-gold">Trenches</span>
        </h1>
        <p
          className="text-xl tracking-widest text-athletic-white/70 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Represent the brand. Represent the work.
        </p>
      </section>

      {/* Bundle Upsell */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="bg-gold/10 border border-gold rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p
              className="text-gold text-2xl tracking-widest uppercase mb-1"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Camp + Gear Bundle
            </p>
            <p className="text-athletic-white/70 text-sm">
              Register for any camp and add a starter gear bundle — save up to $20.
            </p>
          </div>
          <Link
            href="/academy#register"
            className="bg-gold text-deep-black font-bold px-8 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider whitespace-nowrap flex-shrink-0"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Bundle & Save
          </Link>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        <h2
          className="text-gold text-3xl tracking-widest mb-8 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Apparel
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
          {products
            .filter((p) => p.category === "Apparel")
            .map((product) => (
              <div
                key={product.name}
                className="border border-white/10 rounded-lg overflow-hidden hover:border-gold/40 transition-colors group"
              >
                <div className="bg-white/5 h-48 flex items-center justify-center relative">
                  <span className="text-5xl">👕</span>
                  {product.tag && (
                    <span
                      className="absolute top-3 left-3 bg-gold text-deep-black text-xs px-2 py-1 rounded uppercase tracking-widest"
                      style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                    >
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-athletic-white text-sm font-bold mb-1">{product.name}</p>
                  <p className="text-gold font-bold">{product.price}</p>
                  <button className="mt-3 w-full border border-gold text-gold text-xs py-2 rounded hover:bg-gold hover:text-deep-black transition-colors uppercase tracking-wider font-bold">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        <h2
          className="text-gold text-3xl tracking-widest mb-8 uppercase"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Equipment
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
          {products
            .filter((p) => p.category === "Equipment")
            .map((product) => (
              <div
                key={product.name}
                className="border border-white/10 rounded-lg overflow-hidden hover:border-gold/40 transition-colors"
              >
                <div className="bg-white/5 h-48 flex items-center justify-center">
                  <span className="text-5xl">🏋️</span>
                </div>
                <div className="p-4">
                  <p className="text-athletic-white text-sm font-bold mb-1">{product.name}</p>
                  <p className="text-gold font-bold">{product.price}</p>
                  <button className="mt-3 w-full border border-gold text-gold text-xs py-2 rounded hover:bg-gold hover:text-deep-black transition-colors uppercase tracking-wider font-bold">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Coming Soon */}
        <div className="border border-dashed border-gold/30 rounded-lg p-12 text-center">
          <p
            className="text-gold text-3xl tracking-widest mb-3 uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Proprietary Training Tools — Coming Soon
          </p>
          <p className="text-athletic-white/60 text-sm mb-6">
            Trenchman-designed equipment built for OL/DL development. Be first in line.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 border border-white/20 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold flex-1 text-sm"
            />
            <button
              type="submit"
              className="bg-gold text-deep-black font-bold px-6 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

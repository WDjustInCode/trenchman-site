import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { getCollectionProducts } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Gear Store — Trenchman Academy",
  description:
    "Represent the Trench. Shop Trenchman Academy apparel, hats, and gear.",
};

function formatPrice(amount: string) {
  return `$${parseFloat(amount).toFixed(0)}`;
}

export default async function StorePage() {
  const products = await getCollectionProducts("gear");

  const apparel = products.filter((p) => p.tags.includes("apparel"));
  const equipment = products.filter((p) => p.tags.includes("equipment"));
  // Fall back: if no tags set yet, show all gear products under Apparel
  const apparelList = apparel.length > 0 ? apparel : products;
  const equipmentList = apparel.length > 0 ? equipment : [];

  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1
          className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4"
        >
          Gear for the <span className="text-gold">Trenches</span>
        </h1>
        <p className="text-xl tracking-widest text-athletic-white/70 uppercase">
          Represent the brand. Represent the work.
        </p>
      </section>

      {/* Bundle Upsell */}
      <section className="max-w-6xl mx-auto px-6 mb-6">
        <div className="bg-gold/10 border-2 border-gold rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-gold text-2xl tracking-widest uppercase mb-1">
              Camp + Gear Bundle
            </p>
            <p className="text-athletic-white/70 text-sm">
              Register for any camp and add a starter gear bundle — save up to $20.
            </p>
          </div>
          <Link
            href="/academy#register"
            className="font-bebas font-bold bg-gold text-deep-black px-8 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider whitespace-nowrap flex-shrink-0"
          >
            Bundle & Save
          </Link>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        {apparelList.length > 0 && (
          <>
            <h2 className="font-novecento text-gold text-3xl tracking-widest mb-8 uppercase">
              Apparel
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
              {apparelList.map((product) => (
                <div
                  key={product.id}
                  className="border-2 border-gold/40 rounded-lg overflow-hidden hover:border-gold transition-colors group"
                >
                  <div className="bg-white/5 h-48 flex items-center justify-center relative">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-5xl">👕</span>
                    )}
                    {product.tags.includes("best-seller") && (
                      <span className="absolute top-3 left-3 bg-gold text-deep-black text-xs px-2 py-1 rounded uppercase tracking-widest">
                        Best Seller
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-athletic-white text-sm font-bold mb-1">{product.title}</p>
                    <p className="text-gold font-bold">
                      {formatPrice(product.priceRange.minVariantPrice.amount)}
                    </p>
                    <AddToCartButton variantId={product.variants.nodes[0].id} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {equipmentList.length > 0 && (
          <>
            <h2 className="font-novecento text-gold text-3xl tracking-widest mb-8 uppercase">
              Equipment
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-16">
              {equipmentList.map((product) => (
                <div
                  key={product.id}
                  className="border-2 border-gold/40 rounded-lg overflow-hidden hover:border-gold transition-colors"
                >
                  <div className="bg-white/5 h-48 flex items-center justify-center relative">
                    {product.featuredImage ? (
                      <Image
                        src={product.featuredImage.url}
                        alt={product.featuredImage.altText ?? product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-5xl">🏋️</span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-athletic-white text-sm font-bold mb-1">{product.title}</p>
                    <p className="text-gold font-bold">
                      {formatPrice(product.priceRange.minVariantPrice.amount)}
                    </p>
                    <AddToCartButton variantId={product.variants.nodes[0].id} />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {products.length === 0 && (
          <p className="text-athletic-white/50 text-center py-16">
            Products coming soon.
          </p>
        )}

        {/* Coming Soon */}
        <div className="border-2 border-dashed border-gold/60 rounded-lg p-12 text-center">
          <p className="text-gold text-3xl tracking-widest mb-3 uppercase">
            Proprietary Training Tools — Coming Soon
          </p>
          <p className="text-athletic-white/60 text-sm mb-6">
            Trenchman-designed equipment built for OL/DL development. Be first in line.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold flex-1 text-sm"
            />
            <button
              type="submit"
              className="font-bebas font-bold bg-gold text-deep-black px-6 py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm"
            >
              Notify Me
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

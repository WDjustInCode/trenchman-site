import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";

export type Camp = {
  location: string;
  date: string;
  ageGroup?: string | null;
  spots: string | null;
  price: string;
  variantId: string | null;
};

export default function CampList({ camps }: { camps: Camp[] }) {
  if (camps.length === 0) {
    return (
      <p className="text-athletic-white/40 text-sm text-center py-8">
        No camps scheduled yet — check back soon.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {camps.map((camp) => (
        <div
          key={camp.location + camp.date}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-2 border-gold/40 rounded-lg px-6 py-5 gap-4 hover:border-gold transition-colors"
        >
          <div>
            <p className="font-bebas text-athletic-white text-lg tracking-widest uppercase">{camp.location}</p>
            <p className="text-athletic-white/60 text-sm">
              {camp.date}{camp.ageGroup ? ` · ${camp.ageGroup}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <span className="font-bebas text-gold text-base tracking-widest">{camp.price}</span>
            {camp.spots !== null && (
              <span className="font-bebas text-athletic-white/60 tracking-widest">{camp.spots} spots left</span>
            )}
            {camp.spots === "0" ? (
              <button
                disabled
                className="font-bebas font-bold bg-iron-grey/40 text-athletic-white/50 px-5 py-2 rounded uppercase text-sm tracking-wider cursor-not-allowed"
              >
                Sold Out
              </button>
            ) : camp.variantId ? (
              <AddToCartButton
                variantId={camp.variantId}
                label="Register"
                className="font-bebas font-bold bg-gold text-deep-black px-5 py-2 rounded hover:bg-gold/80 transition-colors uppercase text-sm tracking-wider"
              />
            ) : (
              <Link
                href="/contact"
                className="font-bebas font-bold bg-gold text-deep-black px-5 py-2 rounded hover:bg-gold/80 transition-colors uppercase text-sm tracking-wider"
              >
                Register
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

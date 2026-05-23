"use client";

import { useState } from "react";
import { createCheckout } from "@/lib/shopify";

interface Props {
  variantId: string;
  label?: string;
  className?: string;
}

export default function AddToCartButton({ variantId, label = "Add to Cart", className }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const checkoutUrl = await createCheckout(variantId);
      window.location.href = checkoutUrl;
    } catch {
      setLoading(false);
    }
  }

  const base = "font-bebas font-bold w-full py-3 rounded uppercase tracking-wider text-sm transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
  const defaultStyle = "mt-3 border-2 border-gold text-gold hover:bg-gold hover:text-deep-black";

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${base} ${className ?? defaultStyle}`}
    >
      {loading ? "Loading…" : label}
    </button>
  );
}

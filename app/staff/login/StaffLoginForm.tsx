"use client";

import { useState } from "react";
import { staffSignIn } from "./actions";

export default function StaffLoginForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    const result = await staffSignIn(formData);
    if (result && !result.success) {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <input
        type="password"
        name="password"
        placeholder="Staff password"
        required
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <button
        type="submit"
        disabled={status === "pending"}
        className="font-bebas font-bold bg-gold text-deep-black py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Signing In..." : "Sign In"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm text-center">{error}</p>}
    </form>
  );
}

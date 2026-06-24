"use client";

import { useState } from "react";
import { createProfileAction } from "./actions";

export default function ProfileForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    const result = await createProfileAction(formData);
    if (result && !result.success) {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto">
      <div className="flex gap-4">
        <input
          type="text"
          name="firstInitial"
          placeholder="First initial"
          required
          maxLength={1}
          className="flex-1 bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white text-center placeholder:text-white/40 focus:outline-none focus:border-gold text-sm uppercase"
        />
        <input
          type="text"
          name="lastInitial"
          placeholder="Last initial"
          required
          maxLength={1}
          className="flex-1 bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white text-center placeholder:text-white/40 focus:outline-none focus:border-gold text-sm uppercase"
        />
      </div>
      <input
        type="text"
        name="phoneLast4"
        placeholder="Last 4 digits of phone"
        required
        maxLength={4}
        inputMode="numeric"
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white text-center placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <button
        type="submit"
        disabled={status === "pending"}
        className="font-bebas font-bold bg-gold text-deep-black py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Creating..." : "Create Profile"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm text-center">{error}</p>}
    </form>
  );
}

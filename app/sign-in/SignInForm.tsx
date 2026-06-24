"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn, selectProfile, type SignInCandidate } from "./actions";

export default function SignInForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "error" | "not_found" | "disambiguate">(
    "idle"
  );
  const [error, setError] = useState("");
  const [candidates, setCandidates] = useState<SignInCandidate[]>([]);

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    const result = await signIn(formData);
    if (!result) return;
    if (result.status === "error") {
      setStatus("error");
      setError(result.error);
    } else if (result.status === "not_found") {
      setStatus("not_found");
    } else if (result.status === "disambiguate") {
      setCandidates(result.candidates);
      setStatus("disambiguate");
    }
  }

  if (status === "disambiguate") {
    return (
      <div className="flex flex-col gap-4 max-w-sm mx-auto">
        <p className="text-athletic-white/70 text-sm text-center uppercase tracking-wider">
          More than one profile matches — pick yours
        </p>
        {candidates.map((c) => (
          <form key={c.id} action={selectProfile.bind(null, c.id)}>
            <button
              type="submit"
              className="w-full text-left rounded-lg p-4 border-2 border-gold/40 hover:border-gold hover:bg-gold/5 transition-all"
            >
              <p className="font-bebas text-athletic-white tracking-wider uppercase text-sm">
                Joined {new Date(c.created_at).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
              <p className="text-athletic-white/60 text-xs uppercase tracking-wider mt-1">
                {c.trainingTypes.length > 0 ? c.trainingTypes.join(", ") + " training" : "No sessions logged yet"}
              </p>
            </button>
          </form>
        ))}
      </div>
    );
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
        placeholder="Last 4 digits of phone number"
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
        {status === "pending" ? "Signing In..." : "Sign In"}
      </button>
      {status === "error" && <p className="text-red-400 text-sm text-center">{error}</p>}
      {status === "not_found" && (
        <p className="text-red-400 text-sm text-center">
          No profile found with that info. Check your details or sign up below.
        </p>
      )}
      <p className="text-athletic-white/60 text-sm text-center">
        New here?{" "}
        <Link href="/sign-up" className="text-gold hover:text-gold/80">
          Create a profile
        </Link>
      </p>
    </form>
  );
}

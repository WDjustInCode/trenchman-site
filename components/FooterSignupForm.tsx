"use client";

import { useRef, useState } from "react";
import { subscribeToNewsletter } from "@/lib/subscribe";

export default function FooterSignupForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

  const canSubmit = firstName.trim() !== "" && email.trim() !== "" && role !== "";

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    const result = await subscribeToNewsletter(formData);
    if (result.success) {
      setStatus("success");
      setFirstName("");
      setEmail("");
      setRole("");
      formRef.current?.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <>
      <form ref={formRef} action={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-white/10 border-2 border-gold/40 rounded px-3 py-2 text-sm flex-1 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-2 border-gold/40 rounded px-3 py-2 text-sm flex-1 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-center gap-3">
          <div
            role="group"
            aria-label="I am:"
            className="bg-white/10 border-2 border-gold/40 rounded px-3 py-2 inline-flex items-center gap-4 text-sm"
          >
            <span className="text-athletic-white/40">I am:</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-iron-grey has-[:checked]:text-athletic-white cursor-pointer">
                <span className="relative w-3.5 h-3.5 inline-block">
                  <input
                    type="radio"
                    name="role"
                    value="Athlete"
                    checked={role === "Athlete"}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer absolute inset-0 w-3.5 h-3.5 opacity-0 cursor-pointer"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-iron-grey pointer-events-none" />
                  <span className="absolute inset-1 rounded-full bg-gold opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </span>
                Athlete
              </label>
              <label className="flex items-center gap-2 text-iron-grey has-[:checked]:text-athletic-white cursor-pointer">
                <span className="relative w-3.5 h-3.5 inline-block">
                  <input
                    type="radio"
                    name="role"
                    value="Guardian"
                    checked={role === "Guardian"}
                    onChange={(e) => setRole(e.target.value)}
                    className="peer absolute inset-0 w-3.5 h-3.5 opacity-0 cursor-pointer"
                  />
                  <span className="absolute inset-0 rounded-full border-2 border-iron-grey pointer-events-none" />
                  <span className="absolute inset-1 rounded-full bg-gold opacity-0 peer-checked:opacity-100 pointer-events-none" />
                </span>
                Guardian
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!canSubmit || status === "pending"}
            className="font-bebas font-bold bg-gold text-deep-black text-sm px-4 py-2 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold"
          >
            {status === "pending" ? "Joining..." : "Join"}
          </button>
        </div>
        {status === "success" && (
          <p className="text-gold text-xs">You&apos;re in — welcome to the brotherhood.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs">Something went wrong. Please try again.</p>
        )}
      </form>
    </>
  );
}

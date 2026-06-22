"use client";

import { useRef, useState } from "react";
import { sendContactMessage } from "./actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const canSubmit = name.trim() !== "" && email.trim() !== "" && role !== "";

  async function handleSubmit(formData: FormData) {
    setStatus("pending");
    const result = await sendContactMessage(formData);
    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
    }
  }

  return (
    <form
      ref={formRef}
      action={handleSubmit}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <div
        role="group"
        aria-label="I am a:"
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 flex items-center gap-4 text-sm"
      >
        <span className="text-athletic-white/40">I am:</span>
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-iron-grey has-[:checked]:text-athletic-white cursor-pointer">
            <span className="relative w-4 h-4 inline-block">
              <input
                type="radio"
                name="role"
                value="Athlete"
                checked={role === "Athlete"}
                onChange={(e) => setRole(e.target.value)}
                className="peer absolute inset-0 w-4 h-4 opacity-0 cursor-pointer"
              />
              <span className="absolute inset-0 rounded-full border-2 border-iron-grey pointer-events-none" />
              <span className="absolute inset-1 rounded-full bg-gold opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </span>
            Athlete
          </label>
          <label className="flex items-center gap-2 text-iron-grey has-[:checked]:text-athletic-white cursor-pointer">
            <span className="relative w-4 h-4 inline-block">
              <input
                type="radio"
                name="role"
                value="Guardian"
                checked={role === "Guardian"}
                onChange={(e) => setRole(e.target.value)}
                className="peer absolute inset-0 w-4 h-4 opacity-0 cursor-pointer"
              />
              <span className="absolute inset-0 rounded-full border-2 border-iron-grey pointer-events-none" />
              <span className="absolute inset-1 rounded-full bg-gold opacity-0 peer-checked:opacity-100 pointer-events-none" />
            </span>
            Guardian
          </label>
        </div>
      </div>
      <textarea
        name="message"
        placeholder="Your message"
        required
        rows={5}
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm resize-none"
      />
      <button
        type="submit"
        disabled={status === "pending" || !canSubmit}
        className="font-bebas font-bold bg-gold text-deep-black py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "pending" ? "Sending..." : "Send Message"}
      </button>
      {status === "success" && (
        <p className="text-gold text-sm text-center">
          Message sent — we&apos;ll be in touch soon.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

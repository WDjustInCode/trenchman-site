"use client";

import { useRef, useState } from "react";
import { sendContactMessage } from "./actions";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");

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
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        required
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm"
      />
      <textarea
        name="message"
        placeholder="Your message"
        required
        rows={5}
        className="bg-white/10 border-2 border-gold/40 rounded px-4 py-3 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold text-sm resize-none"
      />
      <button
        type="submit"
        disabled={status === "pending"}
        className="font-bebas font-bold bg-gold text-deep-black py-3 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider text-sm disabled:opacity-60"
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

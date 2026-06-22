import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact — Trenchman Academy",
  description:
    "Get in touch with Trenchman Academy — questions about camps, recruiting, or partnerships.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-10 lg:py-24 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1 className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4">
          Get in <span className="text-gold">Touch.</span>
        </h1>
        <p className="text-xl tracking-widest text-athletic-white/70 mb-2 uppercase">
          Questions about camp, group, or solo training? We&apos;re here.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <ContactForm />
      </section>
    </>
  );
}

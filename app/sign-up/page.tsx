import type { Metadata } from "next";
import SignUpForm from "./SignUpForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign Up — Trenchman Academy",
  description: "Create your athlete profile to track camp, group, and solo training progress.",
};

export default function SignUpPage() {
  return (
    <>
      <section className="pt-30 lg:pt-50 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1 className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4">
          Create Your <span className="text-gold">Profile.</span>
        </h1>
        <p className="text-xl tracking-widest text-athletic-white/70 mb-2 uppercase">
          Track your camp, group, and solo training progress.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-15 pb-32">
        <SignUpForm />
      </section>
    </>
  );
}

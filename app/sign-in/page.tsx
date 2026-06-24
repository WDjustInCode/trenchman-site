import type { Metadata } from "next";
import SignInForm from "./SignInForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign In — Trenchman Academy",
  description: "Sign in to your athlete profile to view your training progress.",
};

export default function SignInPage() {
  return (
    <>
      <section className="pt-30 lg:pt-50 px-6 text-center bg-gradient-to-b from-gold/10 to-transparent">
        <h1 className="font-rockwell text-5xl md:text-7xl text-athletic-white uppercase leading-none mb-4">
          Welcome <span className="text-gold">Back.</span>
        </h1>
        <p className="text-xl tracking-widest text-athletic-white/70 mb-2 uppercase">
          Sign in to view your training progress.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-6 pt-15 pb-32">
        <SignInForm />
      </section>
    </>
  );
}

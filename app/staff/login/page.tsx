import type { Metadata } from "next";
import StaffLoginForm from "./StaffLoginForm";

export const metadata: Metadata = {
  title: "Staff Login — Trenchman Academy",
};

export default function StaffLoginPage() {
  return (
    <section className="pt-30 lg:pt-50 px-6 pb-32 text-center bg-gradient-to-b from-gold/10 to-transparent">
      <h1 className="font-rockwell text-4xl md:text-6xl text-athletic-white uppercase leading-none mb-8">
        Staff <span className="text-gold">Login.</span>
      </h1>
      <StaffLoginForm />
    </section>
  );
}

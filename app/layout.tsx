import type { Metadata } from "next";
import { Bevan, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const bevan = Bevan({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bevan",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "Trenchman Academy — Built for the Athletes Who Fight in the Trenches",
  description:
    "Position-specific lineman training, gear, and recruiting exposure for grades 3–12. Register for a camp, shop gear, and get seen by college coaches.",
  openGraph: {
    title: "Trenchman Academy",
    description: "Built for the Athletes Who Fight in the Trenches.",
    images: ["/trenchman-branding-1.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bevan.variable} ${bebasNeue.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <footer className="bg-deep-black border-t border-gold/30 py-12 px-6 mt-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-bebas text-gold text-xl tracking-widest mb-3">Trenchman Academy</p>
              <p className="text-athletic-white/70 text-sm">Built for the Athletes Who Fight in the Trenches.</p>
            </div>
            <div>
              <p className="font-bebas text-gold tracking-widest mb-3">Join the Trench</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-white/10 border border-white/20 rounded px-3 py-2 text-sm flex-1 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="bg-gold text-deep-black font-bold text-sm px-4 py-2 rounded hover:bg-gold/80 transition-colors"
                >
                  Join
                </button>
              </form>
            </div>
            <div>
              <p className="font-bebas text-gold tracking-widest mb-3">Follow Us</p>
              <div className="flex gap-4 text-athletic-white/70 text-sm">
                <a href="#" className="hover:text-gold transition-colors">Instagram</a>
                <a href="#" className="hover:text-gold transition-colors">X / Twitter</a>
                <a href="#" className="hover:text-gold transition-colors">YouTube</a>
              </div>
            </div>
          </div>
          <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-white/10 text-center text-white/40 text-xs">
            © {new Date().getFullYear()} Trenchman Academy. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}

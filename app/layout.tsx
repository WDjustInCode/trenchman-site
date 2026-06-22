import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { ConditionalNav, ConditionalFooter } from "@/components/ConditionalRootChrome";

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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ijs2uww.css" />
      </head>
      <body>
        <ConditionalNav />
        <main>{children}</main>
        <ConditionalFooter>
          <footer id="footer" className="bg-deep-black py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end gap-10">
              <div className="flex-shrink-0">
                <Image
                  src="/trenchman-logo.svg"
                  alt="Trenchman Academy"
                  width={461}
                  height={481}
                />
              </div>
              <div className="flex flex-col gap-8 md:pt-4 pb-[25px] flex-1">
                <div>
                  <h2 className="font-novecento text-gold text-4xl tracking-widest uppercase">Built for the Athletes Who Fight in the{" "}
                  <span className="text-athletic-white">Trenches.</span></h2>
                </div>
                <div>
                  <p className="font-bebas text-gold tracking-widest mb-3">Join the Brotherhood</p>
                  <p className="text-athletic-white/70 text-sm mb-4">
                    Camp alerts, recruiting tips, and gear drops — straight to your inbox.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="First name"
                      className="bg-white/10 border-2 border-gold/40 rounded px-3 py-2 text-sm flex-1 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      className="bg-white/10 border-2 border-gold/40 rounded px-3 py-2 text-sm flex-1 text-athletic-white placeholder:text-white/40 focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="font-bebas font-bold bg-gold text-deep-black text-sm px-4 py-2 rounded hover:bg-gold/80 transition-colors uppercase tracking-wider"
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
            </div>
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gold/20 text-center text-white/40 text-xs">
              © {new Date().getFullYear()} Trenchman Academy. All rights reserved.
            </div>
          </footer>
        </ConditionalFooter>
      </body>
    </html>
  );
}

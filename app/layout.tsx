import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import { ConditionalNav, ConditionalFooter } from "@/components/ConditionalRootChrome";
import FooterSignupForm from "@/components/FooterSignupForm";
import { getCurrentProfile } from "@/lib/session";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getCurrentProfile();

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/ijs2uww.css" />
      </head>
      <body>
        <ConditionalNav profile={profile} />
        <main>{children}</main>
        <ConditionalFooter>
          <footer id="footer" className="bg-deep-black py-12 px-6">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end gap-10">
              <div className="flex-shrink-0 flex">
                <Image
                  src="/trenchman-logo.svg"
                  alt="Trenchman Academy"
                  width={461}
                  height={481}
                  className="h-auto md:w-[320px] lg:w-[400px]"
                />
              </div>
              <div className="flex flex-col gap-8 md:pt-4 pb-[25px] flex-1">
                <div>
                  <h2 className="font-novecento text-gold text-4xl tracking-widest uppercase">Built for the Athletes Who Fight in the{" "}
                  <span className="text-athletic-white">Trenches.</span></h2>
                </div>
                <div>
                  <p className="font-bebas text-gold tracking-widest mb-3">Join the Brotherhood</p>
                  {/* <p className="text-athletic-white/70 text-sm mb-4">
                    Camp alerts, recruiting tips, and gear drops — straight to your inbox.
                  </p> */}
                  <FooterSignupForm />
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

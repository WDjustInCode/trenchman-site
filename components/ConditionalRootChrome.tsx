"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import AltNav from "@/components/AltNav";

export function ConditionalNav() {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/light-alt") return null;
  if (pathname === "/") return <AltNav />;
  return <Nav />;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/home-alt" || pathname === "/light-alt") return null;
  return <>{children}</>;
}

"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";

export function ConditionalNav() {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/home-alt") return null;
  return <Nav />;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/home-alt") return null;
  return <>{children}</>;
}

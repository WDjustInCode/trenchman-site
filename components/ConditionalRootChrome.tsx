"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import AltNav from "@/components/AltNav";
import type { NavProfile } from "@/components/ProfileMenu";

export function ConditionalNav({ profile }: { profile: NavProfile | null }) {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/light-alt") return null;
  if (pathname === "/" || pathname === "/academy" || pathname === "/contact")
    return <AltNav profile={profile} />;
  return <Nav profile={profile} />;
}

export function ConditionalFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/light" || pathname === "/home-alt" || pathname === "/light-alt") return null;
  return <>{children}</>;
}

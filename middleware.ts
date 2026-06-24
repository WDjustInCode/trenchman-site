import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STAFF_COOKIE, getStaffMarker } from "@/lib/staffAuth";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/staff/login") {
    return NextResponse.next();
  }

  const cookie = request.cookies.get(STAFF_COOKIE)?.value;
  const expected = await getStaffMarker();
  if (!cookie || cookie !== expected) {
    return NextResponse.redirect(new URL("/staff/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: "/staff/:path*" };

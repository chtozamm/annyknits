import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!request.cookies.get("access_token")) {
    // if (
    //   request.nextUrl.pathname.startsWith("/signin") ||
    //   request.nextUrl.pathname.startsWith("/signup")
    // ) {
    return NextResponse.redirect(new URL("/signin", request.url));
    // }
    // return NextResponse.next();
    // } else if (
    //   request.nextUrl.pathname.startsWith("/signin") ||
    //   request.nextUrl.pathname.startsWith("/signup")
    // )
  }
  return NextResponse.next();
  // else return NextResponse.redirect(new URL("/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/", "/signin", "/signup"],
  matcher: "/",
};

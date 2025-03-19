import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookiesStorage = await cookies();
  const token = cookiesStorage.get("token");
  if (token) {
    try {
      await jwtVerify(token.value, key);
      console.log(request.url);
      if (request.url === "/") {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    } catch {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/home/:path*", "/"],
};

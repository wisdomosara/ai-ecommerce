import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the user is authenticated by looking for the user cookie
  const userCookie = request.cookies.get("shop_user")?.value
  const isAuthenticated = !!userCookie

  // Get the path the user is trying to access
  const path = request.nextUrl.pathname

  // Protected routes that require authentication
  const protectedRoutes = ["/profile", "/orders", "/checkout"]

  // Check if the current path starts with any protected route
  const isProtectedRoute = protectedRoutes.some((route) => path === route || path.startsWith(`${route}/`))

  // If trying to access a protected route without authentication, redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL(`/login`, request.url)
    url.searchParams.set("redirectTo", path)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: ["/profile/:path*", "/orders/:path*", "/checkout/:path*"],
}


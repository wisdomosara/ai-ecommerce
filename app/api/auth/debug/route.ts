import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const vercelUrl = process.env.VERCEL_URL || "localhost:3000"

  // Format the redirect URI the same way as in the Google auth route
  const redirectUri = vercelUrl.includes("localhost")
    ? `http://${vercelUrl}/api/auth/google`
    : `https://${vercelUrl}/api/auth/google`

  return NextResponse.json({
    message: "Auth debug information",
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL_URL: vercelUrl,
    },
    redirectUri: redirectUri,
    googleConfig: {
      clientIdConfigured: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecretConfigured: !!process.env.GOOGLE_CLIENT_SECRET,
    },
  })
}


import { NextResponse } from "next/server"

export async function GET() {
  // Only include environment variables that are safe to expose
  const debugInfo = {
    VERCEL_URL: process.env.VERCEL_URL || "Not set",
    NODE_ENV: process.env.NODE_ENV || "Not set",
    hasGoogleClientId: !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
  }

  return NextResponse.json({
    message: "Debug information",
    timestamp: new Date().toISOString(),
    environment: debugInfo,
  })
}


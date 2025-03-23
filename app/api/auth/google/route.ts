import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OAuth2Client } from "google-auth-library";

// Get environment variables with fallbacks
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
const VERCEL_URL = process.env.VERCEL_URL || "localhost:3000";

// Use VERCEL_URL directly for the redirect URI
// Add https:// prefix if not localhost
const REDIRECT_URI = VERCEL_URL.includes("localhost")
  ? `http://${VERCEL_URL}/api/auth/google`
  : `https://${VERCEL_URL}/api/auth/google`;

export async function GET(request: NextRequest) {
  try {
    console.log("Google OAuth handler called");
    console.log("Using redirect URI from VERCEL_URL:", REDIRECT_URI);

    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const redirectTo = searchParams.get("state") || "/";

    // If no code, this is the initial request - redirect to Google OAuth
    if (!code) {
      console.log("No code found, redirecting to Google OAuth");

      const oauth2Client = new OAuth2Client(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET,
        REDIRECT_URI
      );

      // Generate the authorization URL
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"],
        state: redirectTo, // Pass the redirectTo as state parameter
        prompt: "consent",
      });

      return NextResponse.redirect(authUrl);
    }

    // If we have a code, exchange it for tokens
    console.log("Code received, exchanging for tokens");

    const oauth2Client = new OAuth2Client(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URI
    );

    // Exchange the code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    if (!tokens || !tokens.access_token) {
      console.error("Failed to get tokens from Google");
      return NextResponse.redirect(
        new URL(`/login?error=auth_failed`, request.nextUrl.origin)
      );
    }

    // Get user info using the access token
    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      console.error("Failed to fetch user info");
      return NextResponse.redirect(
        new URL(`/login?error=user_info_failed`, request.nextUrl.origin)
      );
    }

    const userData = await userInfoResponse.json();

    // Create a user object
    const user = {
      id: userData.sub,
      name: userData.name,
      email: userData.email,
      role: "customer",
      image: userData.picture,
      lastViewed: [],
      savedItems: [],
      orders: [],
    };

    // Set the cookie
    const cookieStore = await cookies();
    cookieStore.set("shop_user", JSON.stringify(user), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: false, // Allow JavaScript access
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    console.log("User authenticated successfully, redirecting to:", redirectTo);

    // Redirect to the original destination
    return NextResponse.redirect(new URL(redirectTo, request.nextUrl.origin));
  } catch (error) {
    console.error("Error in Google OAuth flow:", error);
    return NextResponse.redirect(
      new URL(`/login?error=server_error`, request.nextUrl.origin)
    );
  }
}

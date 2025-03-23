"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import Cookies from "js-cookie"

export default function DebugPage() {
  const { user, isAuthenticated, logout } = useAuth()
  const [cookieUser, setCookieUser] = useState<any>(null)
  const [envVars, setEnvVars] = useState<any>({})

  useEffect(() => {
    // Get user from cookie
    const userCookie = Cookies.get("shop_user")
    if (userCookie) {
      try {
        setCookieUser(JSON.parse(userCookie))
      } catch (e) {
        console.error("Failed to parse cookie:", e)
      }
    }

    // Get environment variables
    setEnvVars({
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "Not set",
      hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      hasVercelUrl: !!process.env.VERCEL_URL,
      nodeEnv: process.env.NODE_ENV,
      origin: typeof window !== "undefined" ? window.location.origin : "SSR",
    })
  }, [])

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Debug Page</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Authentication State</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <strong>Is Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}
            </p>

            <div className="mb-4">
              <p className="font-semibold mb-1">Context User:</p>
              <pre className="bg-muted p-2 rounded overflow-auto max-h-60">
                {JSON.stringify(user, null, 2) || "Not logged in"}
              </pre>
            </div>

            <div className="mb-4">
              <p className="font-semibold mb-1">Cookie User:</p>
              <pre className="bg-muted p-2 rounded overflow-auto max-h-60">
                {JSON.stringify(cookieUser, null, 2) || "No cookie found"}
              </pre>
            </div>

            {isAuthenticated && (
              <Button variant="destructive" onClick={logout}>
                Logout
              </Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-2 rounded overflow-auto max-h-60">{JSON.stringify(envVars, null, 2)}</pre>

            <div className="mt-4">
              <p className="font-semibold mb-1">Cookies:</p>
              <pre className="bg-muted p-2 rounded overflow-auto max-h-60">
                {typeof document !== "undefined" ? document.cookie : "SSR"}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


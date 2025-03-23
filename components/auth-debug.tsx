"use client"

import { useAuth } from "@/components/auth-provider"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Cookies from "js-cookie"

export default function AuthDebug() {
  const { user, isAuthenticated } = useAuth()
  const [showDebug, setShowDebug] = useState(false)

  const cookieUser = Cookies.get("shop_user")
  let parsedCookieUser = null

  try {
    if (cookieUser) {
      parsedCookieUser = JSON.parse(cookieUser)
    }
  } catch (e) {
    console.error("Failed to parse cookie:", e)
  }

  if (!showDebug) {
    return (
      <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50" onClick={() => setShowDebug(true)}>
        Debug Auth
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-auto">
      <CardHeader className="py-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm">Auth Debug</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setShowDebug(false)}>
            Close
          </Button>
        </div>
      </CardHeader>
      <CardContent className="text-xs">
        <div className="space-y-2">
          <div>
            <p className="font-semibold">Auth State:</p>
            <p>isAuthenticated: {isAuthenticated ? "true" : "false"}</p>
          </div>

          <div>
            <p className="font-semibold">Context User:</p>
            <pre className="bg-muted p-2 rounded overflow-auto">{JSON.stringify(user, null, 2)}</pre>
          </div>

          <div>
            <p className="font-semibold">Cookie User:</p>
            <pre className="bg-muted p-2 rounded overflow-auto">{JSON.stringify(parsedCookieUser, null, 2)}</pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface GoogleSignInButtonProps {
  onClick?: () => void
  disabled?: boolean
  text?: string
  redirectTo?: string
}

export default function GoogleSignInButton({
  onClick,
  disabled = false,
  text = "Continue with Google",
  redirectTo = "/",
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [clientId, setClientId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [redirectUri, setRedirectUri] = useState<string | null>(null)

  // Get the client ID from environment variables and fetch the redirect URI
  useEffect(() => {
    setClientId(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || null)

    // Fetch the redirect URI from our debug endpoint
    fetch("/api/auth/debug")
      .then((res) => res.json())
      .then((data) => {
        setRedirectUri(data.redirectUri)
      })
      .catch((err) => {
        console.error("Failed to fetch redirect URI:", err)
      })
  }, [])

  const handleGoogleSignIn = async () => {
    if (onClick) {
      onClick()
      return
    }

    if (!clientId) {
      setError("Google Client ID not configured")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Encode the redirectTo in the state parameter
      const authUrl = `/api/auth/google?state=${encodeURIComponent(redirectTo)}`

      // Redirect to our API route which will handle the OAuth flow
      window.location.href = authUrl
    } catch (error) {
      console.error("Error during Google Sign-In:", error)
      setError("Failed to initiate Google Sign-In")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {redirectUri && (
        <div className="text-xs text-muted-foreground">
          <p>Make sure this redirect URI is authorized in Google Cloud Console:</p>
          <code className="bg-muted p-1 rounded">{redirectUri}</code>
        </div>
      )}

      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={disabled || isLoading || !clientId}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Signing in...
          </span>
        ) : (
          <>
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {text}
          </>
        )}
      </Button>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/auth-provider"
import GoogleSignInButton from "@/components/google-sign-in-button"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/"

  // Add this near the top of the component, after the searchParams declaration
  const errorParam = searchParams.get("error")
  const errorMessages: Record<string, string> = {
    auth_failed: "Authentication failed. Please try again.",
    user_info_failed: "Could not retrieve your information. Please try again.",
    server_error: "An error occurred. Please try again later.",
  }

  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [formError, setFormError] = useState("")

  // Add this after the existing error state declaration
  const [authError, setAuthError] = useState(
    errorParam ? errorMessages[errorParam as keyof typeof errorMessages] || "Authentication failed" : "",
  )

  // Add this in the useEffect or at the component level
  useEffect(() => {
    if (authError) {
      setFormError(authError)
    }
  }, [authError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError("")

    if (!email || !password) {
      setFormError("Please fill in all fields")
      return
    }

    try {
      setIsFormLoading(true)
      await login(email, password, redirectTo)
    } catch (error) {
      setFormError("Invalid email or password")
    } finally {
      setIsFormLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Login to Your Account</h1>
          <p className="text-muted-foreground">Enter your email and password to login</p>
        </div>

        <div className="space-y-4">
          {/* Google Sign-In Button */}
          <GoogleSignInButton redirectTo={redirectTo} />

          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="mx-4 text-sm text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {formError && <p className="text-sm font-medium text-destructive">{formError}</p>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isFormLoading}>
              {isFormLoading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Login
                </span>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href={`/register${redirectTo !== "/" ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`}
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}


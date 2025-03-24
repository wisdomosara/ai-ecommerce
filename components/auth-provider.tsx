"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "seller" | "admin"
  image?: string
  lastViewed?: string[]
  savedItems?: string[]
  orders?: any[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string, redirectPath?: string) => Promise<void>
  loginWithGoogle: (redirectPath?: string) => Promise<void>
  register: (name: string, email: string, password: string, redirectPath?: string) => Promise<void>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  addToLastViewed: (productId: string) => void
  toggleSavedItem: (productId: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Cookie configuration
const USER_COOKIE = "shop_user"
const COOKIE_OPTIONS: Cookies.CookieAttributes = { expires: 7, path: "/", sameSite: "lax" }

// Add these constants at the top of the file, after the existing constants
const USER_STORAGE_KEY = "shop_user_data"

// Google OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: (callback?: (notification: any) => void) => void
          renderButton: (element: HTMLElement, options: any) => void
        }
      }
    }
  }
}

interface GoogleCredentialResponse {
  credential: string
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [redirectPath, setRedirectPath] = useState<string | null>(null)
  const [googleInitialized, setGoogleInitialized] = useState(false)
  const router = useRouter()

  // Check if user is logged in on mount
  // Update the useEffect that loads the user data to check localStorage first:
  useEffect(() => {
    const loadUserData = () => {
      // Try to load from localStorage first (faster)
      const storedUser = localStorage.getItem(USER_STORAGE_KEY)

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          setUser(parsedUser)
          setIsAuthenticated(true)
          console.log("User loaded from localStorage:", parsedUser)
          return true // Successfully loaded from localStorage
        } catch (error) {
          console.error("Failed to parse user from localStorage:", error)
          localStorage.removeItem(USER_STORAGE_KEY)
        }
      }

      // Fall back to cookie if localStorage failed or is empty
      const userCookie = Cookies.get(USER_COOKIE)
      if (userCookie) {
        try {
          const parsedUser = JSON.parse(userCookie)
          setUser(parsedUser)
          setIsAuthenticated(true)

          // Sync to localStorage for faster access next time
          localStorage.setItem(USER_STORAGE_KEY, userCookie)

          console.log("User loaded from cookie:", parsedUser)
          return true
        } catch (error) {
          console.error("Failed to parse user from cookie:", error)
          Cookies.remove(USER_COOKIE, { path: "/" })
        }
      }

      return false // Failed to load user data
    }

    // Load user data immediately
    loadUserData()

    // Set up an interval to check for cookie changes (helps with multiple tabs)
    const intervalId = setInterval(loadUserData, 1000)

    return () => clearInterval(intervalId)
  }, [])

  // Handle redirect after authentication - only when redirectPath changes
  useEffect(() => {
    if (isAuthenticated && redirectPath) {
      console.log("Redirecting authenticated user to:", redirectPath)
      router.push(redirectPath)
      setRedirectPath(null)
    }
  }, [isAuthenticated, redirectPath, router])

  // Load Google OAuth script
  useEffect(() => {
    if (GOOGLE_CLIENT_ID && !googleInitialized && typeof window !== "undefined") {
      const loadGoogleScript = () => {
        console.log("Loading Google Sign-In script...")
        const script = document.createElement("script")
        script.src = "https://accounts.google.com/gsi/client"
        script.async = true
        script.defer = true
        script.onload = () => {
          if (window.google?.accounts) {
            try {
              console.log("Initializing Google Sign-In...")
              window.google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleGoogleCredentialResponse,
                auto_select: false,
                cancel_on_tap_outside: true,
                use_fedcm_for_prompt: false,
              })
              setGoogleInitialized(true)
              console.log("Google Sign-In initialized successfully")
            } catch (error) {
              console.error("Error initializing Google Sign-In:", error)
            }
          }
        }
        script.onerror = (error) => {
          console.error("Error loading Google Sign-In script:", error)
        }
        document.body.appendChild(script)
      }

      // Ensure the script is loaded after the DOM is fully loaded
      if (document.readyState === "complete") {
        loadGoogleScript()
      } else {
        window.addEventListener("load", loadGoogleScript)
        return () => {
          window.removeEventListener("load", loadGoogleScript)
        }
      }
    }
  }, [googleInitialized])

  // Add an event listener for cookie changes

  // Add this inside the AuthProvider component, after the existing useEffect hooks
  useEffect(() => {
    // Listen for messages from the popup window
    const handleMessage = (event: MessageEvent) => {
      // Verify the origin
      if (event.origin !== window.location.origin) return

      // Check if it's our authentication message
      if (event.data && typeof event.data === "object" && "success" in event.data) {
        console.log("Received authentication message:", event.data)

        if (event.data.success && event.data.user) {
          // Update the auth state
          setUser(event.data.user)
          setIsAuthenticated(true)
          console.log("Authentication successful, user state updated")

          // Redirect if needed
          if (redirectPath) {
            router.push(redirectPath)
            setRedirectPath(null)
          }
        } else {
          console.error("Authentication failed:", event.data.error)
        }
      }
    }

    window.addEventListener("message", handleMessage)

    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [router, redirectPath])

  const handleGoogleCredentialResponse = async (response: GoogleCredentialResponse) => {
    console.log("Google credential response received:", { hasCredential: !!response.credential })

    if (response.credential) {
      try {
        console.log("Sending credential to backend...")
        const res = await fetch("/api/auth/google/callback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
            redirectTo: redirectPath || "/",
          }),
        })

        const data = await res.json()
        console.log("Backend response:", data)

        if (data.success) {
          console.log("Google login successful, user:", data.user)

          // Manually update the state and cookie
          if (data.user) {
            setUser(data.user)
            setIsAuthenticated(true)
            updateUserCookie(data.user)
            console.log("User state and cookie updated")
          }

          // Redirect to the specified path
          const redirectUrl = data.redirectTo || "/"
          console.log("Redirecting to:", redirectUrl)

          // Use router for client-side navigation
          router.push(redirectUrl)
        } else {
          console.error("Google login failed:", data.error)
        }
      } catch (error) {
        console.error("Error during Google login:", error)
      }
    }
  }

  // Update the updateUserCookie function to also update localStorage:
  const updateUserCookie = useCallback((userData: User) => {
    console.log("Updating user data:", userData)

    // Update cookie
    Cookies.set(USER_COOKIE, JSON.stringify(userData), COOKIE_OPTIONS)

    // Update localStorage for faster access
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
  }, [])

  const login = async (email: string, password: string, redirect?: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role: "customer",
      lastViewed: [],
      savedItems: [],
      orders: [],
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    updateUserCookie(mockUser)

    if (redirect) {
      setRedirectPath(redirect)
    }
  }

  const loginWithGoogle = async (redirect?: string) => {
    console.log("Initiating Google login, redirect path:", redirect)

    if (!GOOGLE_CLIENT_ID) {
      console.error("Google Client ID not configured")
      return
    }

    if (!googleInitialized || !window.google?.accounts) {
      console.error("Google Sign-In is not initialized yet")

      // Fallback to manual initialization if not already initialized
      if (window.google?.accounts) {
        try {
          console.log("Attempting on-demand initialization of Google Sign-In")
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: handleGoogleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: false,
          })
          setGoogleInitialized(true)
          console.log("Google Sign-In initialized on demand")
        } catch (error) {
          console.error("Error initializing Google Sign-In on demand:", error)
          return
        }
      } else {
        return
      }
    }

    // Store the redirect path for after authentication
    if (redirect) {
      console.log("Setting redirect path:", redirect)
      setRedirectPath(redirect)
    }

    // Trigger the Google Sign-In prompt with error handling
    try {
      console.log("Prompting Google Sign-In...")
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.log(
            "Google Sign-In prompt not displayed or skipped:",
            notification.getNotDisplayedReason() || notification.getSkippedReason(),
          )

          // Fallback to a custom Google Sign-In flow if the prompt fails
          fallbackGoogleSignIn(redirect)
        }
      })
    } catch (error) {
      console.error("Error displaying Google Sign-In prompt:", error)

      // Fallback to a custom Google Sign-In flow if the prompt fails
      fallbackGoogleSignIn(redirect)
    }
  }

  // Fallback method for Google Sign-In
  const fallbackGoogleSignIn = (redirect?: string) => {
    console.log("Using fallback Google Sign-In method")

    if (!GOOGLE_CLIENT_ID) return

    // Create a popup window for Google Sign-In
    const width = 500
    const height = 600
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + "/api/auth/google/redirect")}&response_type=token&scope=email%20profile`

    window.open(
      url,
      "Google Sign-In",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`,
    )

    // Store the redirect path for after authentication
    if (redirect) {
      setRedirectPath(redirect)
    }
  }

  const register = async (name: string, email: string, password: string, redirect?: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "3",
      name,
      email,
      role: "customer",
      lastViewed: [],
      savedItems: [],
      orders: [],
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    updateUserCookie(mockUser)

    if (redirect) {
      setRedirectPath(redirect)
    }
  }

  // Update the logout function to clear both cookie and localStorage:
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    Cookies.remove(USER_COOKIE, { path: "/" })
    localStorage.removeItem(USER_STORAGE_KEY)

    // Dispatch a custom event that other components can listen for
    if (typeof window !== "undefined") {
      const logoutEvent = new Event("user-logout")
      window.dispatchEvent(logoutEvent)
    }
  }

  const updateUser = useCallback(
    (userData: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...userData } as User
        setUser(updatedUser)
        updateUserCookie(updatedUser)
      }
    },
    [user, updateUserCookie],
  )

  const addToLastViewed = useCallback(
    (productId: string) => {
      if (user) {
        const lastViewed = user.lastViewed || []
        // Remove the product if it already exists to avoid duplicates
        const filteredLastViewed = lastViewed.filter((id) => id !== productId)
        // Add the product to the beginning of the array
        const updatedLastViewed = [productId, ...filteredLastViewed].slice(0, 10) // Keep only the 10 most recent

        updateUser({ lastViewed: updatedLastViewed })
      }
    },
    [user, updateUser],
  )

  const toggleSavedItem = useCallback(
    (productId: string) => {
      if (user) {
        const savedItems = user.savedItems || []
        let updatedSavedItems: string[]

        if (savedItems.includes(productId)) {
          // Remove the product if it's already saved
          updatedSavedItems = savedItems.filter((id) => id !== productId)
        } else {
          // Add the product if it's not saved
          updatedSavedItems = [...savedItems, productId]
        }

        updateUser({ savedItems: updatedSavedItems })
      }
    },
    [user, updateUser],
  )

  const contextValue = {
    user,
    isAuthenticated,
    login,
    loginWithGoogle,
    register,
    logout,
    updateUser,
    addToLastViewed,
    toggleSavedItem,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


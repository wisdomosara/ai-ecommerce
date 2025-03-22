"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import Cookies from "js-cookie"

interface User {
  id: string
  name: string
  email: string
  role: "customer" | "seller" | "admin"
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Cookie configuration
const USER_COOKIE = "shop_user"
const COOKIE_OPTIONS = { expires: 7, path: "/", sameSite: "Lax" as const }

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on mount
  useEffect(() => {
    const userCookie = Cookies.get(USER_COOKIE)
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie)
        setUser(parsedUser)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse user from cookie:", error)
        Cookies.remove(USER_COOKIE)
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "1",
      name: "John Doe",
      email,
      role: "customer",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    Cookies.set(USER_COOKIE, JSON.stringify(mockUser), COOKIE_OPTIONS)
  }

  const loginWithGoogle = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "2",
      name: "Google User",
      email: "google.user@example.com",
      role: "customer",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    Cookies.set(USER_COOKIE, JSON.stringify(mockUser), COOKIE_OPTIONS)
  }

  const register = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "3",
      name,
      email,
      role: "customer",
    }

    setUser(mockUser)
    setIsAuthenticated(true)
    Cookies.set(USER_COOKIE, JSON.stringify(mockUser), COOKIE_OPTIONS)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    Cookies.remove(USER_COOKIE)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        loginWithGoogle,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

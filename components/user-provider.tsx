"use client"

import type React from "react"
import { createContext, useContext } from "react"
import { useAuth } from "@/components/auth-provider"

interface UserContextType {
  updateUser: (userData: any) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { updateUser: authUpdateUser } = useAuth() || {} // Use optional chaining

  const updateUser = (userData: any) => {
    if (authUpdateUser) {
      authUpdateUser(userData)
    } else {
      console.warn("updateUser called outside of AuthProvider context")
    }
  }

  return (
    <UserContext.Provider
      value={{
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}


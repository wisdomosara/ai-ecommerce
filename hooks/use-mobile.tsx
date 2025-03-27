"use client"

import { useState, useEffect } from "react"

export function useMobile(): boolean {
  // Start with null to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // This code only runs on the client
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check on mount
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  // Return false during SSR to avoid hydration mismatch
  return isMobile === null ? false : isMobile
}

